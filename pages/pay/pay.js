// pages/pay/pay.js
import { showToast, requestPayment } from '../../utils/async-wx.js';
import { request } from '../../request/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
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
    let cart = wx.getStorageSync('cart') || [];
    // 筛选出选中的商品
    cart = cart.filter(item => item.checked);
    // 计算总价格，总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(item => {
      totalNum += item.goods_number;
      totalPrice += item.goods_price * item.goods_number;
    });
    // 更新数据
    this.setData({ address, cart, totalPrice, totalNum });
  },

  // 商品结算
  async handlePay() {
    // 支付之前先获取 token
    const token = wx.getStorageSync('token', this.data.token);
    if (!token) wx.navigateTo({ url: '/pages/auth/auth' });
    // 1.创建订单
    // 准备请求参数
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.address.all;
    const cart = this.data.cart;
    const goods = [];
    cart.forEach(item => {
      goods.push({
        goods_id: item.goods_id,
        goods_number: item.goods_number,
        goods_price: item.goods_price
      })
    });
    const orderParams = { order_price, consignee_addr, goods };
    // 创建订单，获取订单号
    const { order_number } = await request({ url: "/my/orders/create", method: "POST", data: orderParams });
    // console.log(order_number);
    // 发起 预支付接口
    // const { pay } = await request({ url: "/my/orders/req_unifiedorder", method: "POST", data: { order_number } });
    // console.log(pay);
    // 发起微信支付 
    // await requestPayment(pay);
    await showToast({ title: "token错误，暂无法支付", icon: 'none' });

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