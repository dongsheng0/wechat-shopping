const baseUrl = 'https://h.roztop.com';
const app = getApp();
const loginApi = '/cgi/user/login';

function wxLogin() {
  return new Promise((resolve, reject) => {
    console.log('wx.login接口前')
    wx.login({
      success: function (result) {
        console.log('wx.login接口成功')
        wx.getUserInfo({
          success: res => {
            console.log(' wx.getUserInfo成功')
            // app.globalData.userInfo = res.userInfo
            http({
              url: loginApi,
              data: {
                code: result.code,
                encryptedData: res.encryptedData,
                iv: res.iv
              },
              method: 'post',
            }).then(res => {
              let { webToken, userid} = res.rs;
              if (webToken == '') {
                wx.showToast({
                  title: res.msg
                });
              } else {
                wx.setStorageSync('webToken', webToken);
                wx.setStorageSync('userid', userid);
                console.log('登录成功');
                wx.navigateTo({
                  url: '/pages/index/index',
                });
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
          title: '网络异常',
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