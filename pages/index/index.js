//Page Object
import { request } from '../../request/index.js';

Page({
  data: {
    swiperList: [],
    cateList: [],
    floorList: []
  },
  //options(Object)
  onLoad: function(options) {
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();

  },
  async getSwiperList() {
    const result = await request({ url: '/home/swiperdata' });
    // console.log(result);
    const { message, meta } = result.data;
    // console.log(message, meta);
    if (meta.status !== 200) return;
    message.forEach(item => item.navigator_url = item.navigator_url.replace('main', 'goods_detail'));
    this.setData({
      swiperList: message
    });

  },
  async getCateList() {
    const result = await request({ url: '/home/catitems' });
    // console.log(result);
    const { message, meta } = result.data;
    // console.log(message, meta);
    if (meta.status !== 200) return;
    this.setData({
      cateList: message
    });

  },
  async getFloorList() {
    const result = await request({ url: '/home/floordata' });
    // console.log(result);
    const { message, meta } = result.data;
    // console.log(message, meta);
    if (meta.status !== 200) return;
    message.forEach(item => {
      item.product_list.forEach(item1 => item1.navigator_url = item1.navigator_url.replace('goods_list', 'goods_list/goods_list'));
    });
    this.setData({
      floorList: message
    });

  },
  onReady: function() {

  },
  onShow: function() {

  },
  onHide: function() {

  }
});