// pages/user/user.js
import { getSetting, openSetting, chooseAddress } from '../../utils/async-wx.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    allCollect: 0
  },
  handleGetUserInfo(e) {
    // console.log(e);
    const { userInfo } = e.detail;
    // console.log(userInfo);
    this.setData({ userInfo });
    // 保存在缓存中
    wx.setStorageSync('userInfo', userInfo);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const userInfo = wx.getStorageSync('userInfo') || {};
    const collect = wx.getStorageSync('collect') || [];
    const allCollect = collect.length;
    this.setData({ userInfo, allCollect });
  },
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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