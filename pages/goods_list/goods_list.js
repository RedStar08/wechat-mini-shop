// pages/goods_list/goods_list.js
import { request } from '../../request/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      name: '综合',
      isActive: true
    }, {
      id: 1,
      name: '销量',
      isActive: false
    }, {
      id: 2,
      name: '价格',
      isActive: false
    }],
    goodsList: []
  },
  // 查询参数
  queryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  // 总数据条数
  totalPages: 0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 启动参数
    // console.log(options);
    this.queryParams.cid = options.cat_id || '';
    this.queryParams.query = options.query || '';
    this.getGoodsList();
  },
  handleItemChanged(e) {
    // console.log(e);
    const currentIndex = e.detail.index;
    const tabs = this.data.tabs;
    tabs.forEach((item, index) => item.isActive = (currentIndex === index ? true : false));
    this.setData({
      tabs
    })
  },
  async getGoodsList() {
    const result = await request({ url: '/goods/search', data: this.queryParams });
    // console.log(result);
    const { message, meta } = result.data;
    // console.log(message, meta);
    if (meta.status !== 200) return;
    this.totalPages = Math.ceil(message.total / this.queryParams.pagesize);
    this.setData({
      goodsList: [...this.data.goodsList, ...message.goods]
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // console.log('reach bottom', this.totalPages);
    if (this.totalPages > this.queryParams.pagenum) { // 还有数据
      this.queryParams.pagenum++;
      this.getGoodsList();
    } else { // 没有数据
      wx.showToast({
        title: '没有更多数据了哟~',
        icon: 'none',
        duration: 1500,
        mask: false
      });
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: async function() {
    // 开始重置操作 清空数组、重置查询参数
    this.setData({
      goodsList: []
    });
    this.queryParams.pagenum = 1;
    // 重新加载数据
    await this.getGoodsList();
    // 加载完毕之后关闭下来刷新页面
    wx.stopPullDownRefresh();
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})