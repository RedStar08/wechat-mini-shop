/**
 * promise 形式  getSetting
 */
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result) => {
        resolve(result);
      },
      fail: (error) => {
        reject(error);
      }
    });
  });
}

/**
 * promise 形式  openSetting
 */
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result) => {
        resolve(result);
      },
      fail: (error) => {
        reject(error);
      }
    });
  });
}

/**
 * promise 形式  chooseAddress
 */
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => {
        resolve(result);
      },
      fail: (error) => {
        reject(error);
      }
    });
  });
}

/**
 * promise 形式  showModal
 */
export const showModal = (options) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      ...options,
      success: (result) => {
        resolve(result);
      },
      fail: (error) => {
        reject(error);
      }
    });
  });
}

/**
 * promise 形式  showToast
 */
export const showToast = (options) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      ...options,
      success: (result) => {
        resolve(result);
      },
      fail: (error) => {
        reject(error);
      }
    });
  });
}

export const requestPayment = (options) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...options,
      success: (result) => {
        resolve(result);
      },
      fail: (error) => {
        reject(error);
      }
    });
  });
}

export const login = (options) => {
  return new Promise((resolve, reject) => {
    wx.login({
      ...options,
      success: (result) => {
        resolve(result);
      },
      fail: (error) => {
        reject(error);
      }
    });
  });
}