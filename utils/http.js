const baseUrl = 'https://h.roztop.com';
const app = getApp();
const loginApi = '/cgi/user/login';

function wxLogin(encryptedData, iv) {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function (res) {
        http({
          url: loginApi,
          data: {
            code: res.code,
            encryptedData,
            iv
          },
          method: 'post',
        }).then(res => {
          let token = res.data.token;
          if (token == '') {
            // wx.navigateTo({
            //   url: '/pages/login/login',
            // });
          } else {
            wx.setStorageSync('token', res.data.token);
            resolve();
          }
        });
      },
      fail: function (err) {
        console.log(err);
        // wx.hideLoading()
      },
    });
  });
}

function login(url, data) {
  // return new Promise((resolve, reject) => {
  //   let userInfo = wx.getStorageSync('userInfo');
  //   let userData = {
  //     wxname: userInfo.nickName,
  //     photo: userInfo.avatarUrl,
  //   };
  //   http({
  //       url: url,
  //       data: Object.assign(data, userData),
  //       method: 'post',
  //     })
  //     .then(res => {
  //       console.log('登录接口成功');
  //       console.log(res);
  //       if (res.success) {
  //         wx.setStorage({
  //           key: 'token',
  //           data: res.data.token,
  //           success: () => {
  //             resolve(res);
  //           },
  //         });
  //       } else {
  //         reject(res);
  //       }
  //     })
  //     .catch(error => {
  //       console.log(res);
  //       reject(error);
  //     });
  // });
}

const http = ({
  url = '',
  data = {},
  method = ''
} = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: getUrl(url),
      data: data,
      method: method,
      complete: function (res) {},
      success: function (res) {
        // console.log(res)
        if (res.data.success) {
          resolve(res.data);
        } else if (res.statusCode == 401) {
          // wx.showModal({
          //   title: '警告',
          //   content: '没有授权部分功能将无法正常使用',
          //   showCancel: true,
          //   cancelText: '取消',
          //   cancelColor: '#f00',
          //   confirmText: '去授权',
          //   success: function (res) {
          //     if (res.confirm) {
          //       wx.openSetting();
          //     }
          //   }
          // })
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
  login: login,
  wxLogin: wxLogin,
};