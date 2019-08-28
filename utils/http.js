const baseUrl = 'https://h.roztop.com';
const app = getApp();
const loginApi = '/cgi/user/login';

function wxLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function (result) {
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            http({
              url: loginApi,
              data: {
                code: result.code,
                encryptedData: res.encryptedData,
                iv: res.iv
              },
              method: 'post',
            }).then(res => {
              let token = res.data.web_token;
              reject(res)
              if (token == '') {
                // wx.navigateTo({
                //   url: '/pages/login/login',
                // });

              } else {
                wx.setStorageSync('token', res.data.token);
                resolve();
              }
            });
          }
        })

      },
      fail: function (err) {
        console.log(err);
        // wx.hideLoading()
      },
    });
  });
}



const http = ({
  url = '',
  data = {},
  method = ''
} = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      url: getUrl(url),
      data: data,
      method: method,
      complete: function (res) {},
      success: function (res) {
        if (res.data.code == 0) {
          resolve(res.data);
        } else if (res.data.code == 401) {
          wx.showModal({
            title: '警告',
            content: '没有授权部分功能将无法正常使用',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#f00',
            confirmText: '去授权',
            success: function (res) {
              if (res.confirm) {
                wx.openSetting();
              }
            }
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            mask: true,
            duration: 2000,
          });
          reject(res);
        }
      },

      fail: function ({
        errMsg
      }) {
        wx.showToast({
          title: '网络又异常',
          icon: 'error',
          mask: true,
          duration: 2000,
        });
      },
    });
  });
};

const getUrl = url => {
  if (url.indexOf('://') == -1) {
    url = baseUrl + url;
    // console.log(url)
  }
  return url;
};

const getHeader = () => {
  let headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  try {
    let token = wx.getStorageSync('token');
    if (token.length > 0) {
      headers.Authorization = 'Bearer ' + token;
      return headers;
    }
    return headers;
  } catch (e) {
    return {};
  }
};

module.exports = {
  get(url, data = {}) {
    return http({
      url,
      data,
    });
  },
  post(url, data = {}, method = 'post') {
    return http({
      url,
      data,
      method,
    });
  },
  wxLogin: wxLogin,
};