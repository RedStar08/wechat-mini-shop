// pages/goods_detail/goods_detail.js
import { request } from '../../request/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: {},
    isCollect: false,
    goods_id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const { goods_id } = options;
    // console.log(goods_id);
    this.setData({ goods_id });
    this.getGoodsDetail(goods_id);
  },
  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    const result = await request({ url: '/goods/detail', data: { goods_id } });
    const { message, meta } = result.data;
    if (meta.status !== 200) return;
    // console.log(message, meta);
    // 判断当前商品是否收藏
    const collect = wx.getStorageSync('collect') || [];
    const isCollect = collect.some(item => item.goods_id === goods_id);
    // 将数据写回
    this.setData({
      goodsInfo: {
        goods_id: goods_id,
        goods_name: message.goods_name,
        goods_price: message.goods_price,
        goods_introduce: message.goods_introduce,
        goods_small_logo: message.goods_small_logo,
        pics: message.pics
      },
      isCollect
    })
  },
  // 预览大图片
  handlePreviewImage(e) {
    // console.log(e); // 获取当前链接
    const { current } = e.currentTarget.dataset;
    // 构建需要预览图片的http链接列表
    const urls = this.data.goodsInfo.pics.map(item => item.pics_big);
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  // 添加购物车
  handleAddCart() {
    // 获取购物车数据
    let cart = wx.getStorageSync('cart') || [];
    // 查找是否存在当前商品
    const index = cart.findIndex((item) => item.goods_id === this.data.goodsInfo.goods_id);
    if (index === -1) {
      // 没有找到，第一次添加
      this.data.goodsInfo.goods_number = 1;
      this.data.goodsInfo.checked = true;
      cart.push(this.data.goodsInfo);
    } else { // 找到了，数量加1
      cart[index].num++;
    }
    // 数据保存
    wx.setStorageSync("cart", cart);
    // 提示用户
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // true 节流
      mask: true
    });
  },
  // 添加商品到购物车
  handleCollectGoods() {
    let isCollect = false;
    // 获取收藏的缓存数据
    const collect = wx.getStorageSync('collect') || [];
    // 查找是否收藏当前商品
    const index = collect.findIndex(item => item.goods_id === this.data.goodsInfo.goods_id);
    if (index === -1) {
      // 不存在当前商品，需要进行收藏
      collect.push(this.data.goodsInfo);
      isCollect = true;
      // 提示用户
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    } else {
      // 存在当前商品，取消收藏
      collect.splice(index, 1);
      isCollect = false;
      // 提示用户
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
    }
    // 写回缓存
    wx.setStorageSync('collect', collect);
    this.setData({ isCollect });

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getGoodsDetail(this.data.goods_id);
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