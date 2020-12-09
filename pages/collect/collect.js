// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      name: '商品收藏',
      isActive: true
    }, {
      id: 1,
      name: '品牌收藏',
      isActive: false
    }, {
      id: 2,
      name: '店铺收藏',
      isActive: false
    }, {
      id: 3,
      name: '浏览足迹',
      isActive: false
    }],
    collect: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  handleItemChanged(e) {
    // console.log(e);
    const currentIndex = e.detail.index;
    const { tabs } = this.data;
    tabs.forEach((item, index) => item.isActive = (currentIndex === index ? true : false));
    this.setData({ tabs });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const collect = wx.getStorageSync('collect') || [];
    this.setData({ collect });
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