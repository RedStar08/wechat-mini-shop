// 记录请求次数
let ajaxTimes = 0;
const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1';
export const request = (params) => {
  ajaxTimes++;
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  params.url = baseURL + params.url;
  // 如果是私人请求则添加header
  let header = {...params.header };
  if (params.url.includes('/my/')) {
    header.Authorization = wx.getStorageSync('token');
    params.header = header;
  }
  return new Promise((resolve, rejected) => {
    wx.request({
      ...params,
      success: (result) => {
        resolve(result);
      },
      fail: (error) => {
        rejected(error);
      },
      complete: () => {
        ajaxTimes--;
        // 最后一次请求完毕之后，关闭加载面板
        if (ajaxTimes === 0) {
          wx.hideLoading();
        }
      }
    });
  });
}