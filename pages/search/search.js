// pages/search/search.js
import { request } from '../../request/index.js';
import { showToast } from '../../utils/async-wx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: '',
    isFocus: false,
    goodsList: []
  },
  timer: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  handleInput(e) {
    // console.log(e.detail);
    const { value } = e.detail;
    // 判断输入是否合法
    const query = value.trim();
    // 不合法，重置状态
    if (query.length === 0) return this.setData({ query: '', isFocus: false, goodsList: [] });
    // 合法，显示按扭，发送请求
    this.setData({ isFocus: true });
    // 发送请求 (节流)
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.getSearchGoods(query);
    }, 1000);
  },
  async getSearchGoods(query) {
    // 请求数据
    const result = await request({ url: '/goods/qsearch', data: { query } });
    // console.log(result);
    const { message, meta } = result.data;
    if (meta.status !== 200) return showToast({ title: '数据请求失败', icon: 'none', duration: 1500, mask: false });
    this.setData({ goodsList: message });
  },
  handleCancel() {
    // 清空数据
    this.setData({ query: '', isFocus: false, goodsList: [] });
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