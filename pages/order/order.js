// pages/order/order.js
import { request } from '../../request/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      name: '全部',
      isActive: true
    }, {
      id: 1,
      name: '待付款',
      isActive: false
    }, {
      id: 2,
      name: '待收货',
      isActive: false
    }, {
      id: 3,
      name: '退货/退款',
      isActive: false
    }],
    type: 1,
    orders: []
  },

  /**
   * 生命周期函数--监听页面加载
   * onLoad 会在 onShow 生命周期之前，所以可以先准备好 type 值，然后通过 type 值判断 tabs 处于哪一个位置
   */
  onLoad: function(options) {
    // console.log(options);
    const { type } = options;
    this.setData({ type });
  },
  handleItemChanged(e) {
    // console.log(e);
    const currentIndex = e.detail.index;
    const { tabs } = this.data;
    tabs.forEach((item, index) => item.isActive = (currentIndex === index ? true : false));
    this.setData({ tabs });
    // 每次切换 tab 发起请求
    this.getOrders(currentIndex + 1);
  },

  // 获取订单列表的方法
  async getOrders(type) {
    // 发送请求
    const result = await request({ url: '/my/orders/all', data: { type } });
    // 处理时间
    let { orders } = result.data.message;
    orders = orders.map(item => ({...item, create_time_cn: (new Date(item.create_time * 1000).toLocaleString()) }));
    this.setData({ orders });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 获取 token 值
    const token = wx.getStorageSync("token");
    if (!token) return wx.navigateTo({ url: '/pages/auth/auth' });
    // 通过 type 判断当前 tabs 的位置
    const { type, tabs } = this.data;
    tabs.forEach((item, index) => item.isActive = (type - 1 === index ? true : false));
    this.setData({ tabs });
    // 每次展示页面 发起请求
    this.getOrders(type);
  }
})