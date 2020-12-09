// pages/cart/cart.js
import { getSetting, openSetting, chooseAddress, showModal, showToast } from '../../utils/async-wx.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 取出缓存的地址
    const address = wx.getStorageSync('address') || {};
    const cart = wx.getStorageSync('cart') || [];
    // 设置地址信息
    this.setData({ address });
    // 设置购物车状态信息
    this.setCartStatus(cart);
  },

  // 添加收货地址 wx.chooseAddress
  // 2 获取 用户 对小程序 所授予 获取地址的  权限 状态 scope
  //   1 假设 用户 点击获取收货地址的提示框 确定  authSetting scope.address 
  //     scope 值 true 直接调用 获取收货地址
  //   2 假设 用户 从来没有调用过 收货地址的api 
  //     scope undefined 直接调用 获取收货地址
  //   3 假设 用户 点击获取收货地址的提示框 取消   
  //     scope 值 false 
  //     1 诱导用户 自己 打开 授权设置页面(wx.openSetting) 当用户重新给与 获取地址权限的时候 
  //     2 获取收货地址
  //   4 把获取到的收货地址 存入到 本地存储中
  async handleChooseAddress() {
    // console.log('add addr');
    // 不能直接获取用户的地址，需要先判断用户当前对于地址的权限
    try {
      // 1 获取 权限状态
      const setting = await getSetting();
      const scopeAddress = setting.authSetting["scope.address"];
      // console.log(scopeAddress);
      // 2 判断 权限状态
      if (scopeAddress === false) {
        await openSetting();
      }
      // 4 调用获取收货地址的 api
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      // 5 存入到缓存中
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error);
    }
  },
  // 计算购物车的状态
  setCartStatus(cart) {
    // 计算是否全选，总价格，总数量
    let allChecked = cart.length === 0 ? false : true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(item => {
      if (item.checked) {
        totalNum += item.goods_number;
        totalPrice += item.goods_price * item.goods_number;
      } else {
        allChecked = false;
      }
    });
    // 更新数据
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    });
    // 更新缓存
    wx.setStorageSync('cart', cart);
  },
  // 切换选中状态
  handleItemChanged(e) {
    // console.log(e);
    const { index } = e.currentTarget.dataset;
    const { cart } = this.data;
    // 选中状态取反
    cart[index].checked = !cart[index].checked;
    // 更新购物车状态
    this.setCartStatus(cart);
  },
  // 全选按扭触发
  handleAllChecked() {
    let { cart, allChecked } = this.data;
    // 全选取反
    allChecked = !allChecked;
    cart.forEach(item => item.checked = allChecked);
    // 更新购物车状态
    this.setCartStatus(cart);
  },
  // 商品增减
  async handleNumEdit(e) {
    // console.log(e.currentTarget);
    const { index, edit } = e.currentTarget.dataset;
    const { cart } = this.data;
    // 判断是否只剩一件商品
    if (cart[index].goods_number === 1 && edit === -1) {
      const res = await showModal({ title: '删除商品', content: '您是否要删除该商品？' });
      if (res.confirm) {
        cart.splice(index, 1);
      }
    } else {
      cart[index].goods_number += edit;
    }
    // 更新缓存
    this.setCartStatus(cart);
  },
  // 商品结算
  async handlePay() {
    const { address, totalNum } = this.data;
    if (totalNum === 0) return await showToast({ title: '请添加商品！', icon: 'none' });
    if (!address.userName) return await showToast({ title: '请添加收获地址！' });
    wx.navigateTo({ url: '/pages/pay/pay' });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})