// pages/category/category.js
import { request } from '../../request/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateList: [],
    asideList: [],
    cateItem: [],
    currentIndex: 0,
    cateItemTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const Cates = wx.getStorageSync('cates');
    if (!Cates) {
      this.getCateList();
    } else { // 设置过期时间为 1 分钟
      if (Date.now() - Cates.time > 1000 * 60 * 1) {
        this.getCateList();
      } else {
        const message = Cates.data;
        const asideList = message.map(item => item.cat_name);
        const cateItem = message[0].children;
        this.setData({
          cateList: message,
          asideList,
          cateItem
        });
      }
    }

  },
  async getCateList() {
    const result = await request({ url: '/categories' });
    // console.log(result);
    const { message, meta } = result.data;
    // console.log(message, meta);
    if (meta.status !== 200) return;
    wx.setStorageSync('cates', { time: Date.now(), data: message });
    const asideList = message.map(item => item.cat_name);
    const cateItem = message[0].children;
    this.setData({
      cateList: message,
      asideList,
      cateItem
    });

  },
  handleTap(e) {
    // console.log(e.target);
    const { index } = e.target.dataset;
    const cateItem = this.data.cateList[index].children;
    // console.log(this.data.cateList);
    this.setData({
      currentIndex: index,
      cateItem,
      cateItemTop: 0
    })
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