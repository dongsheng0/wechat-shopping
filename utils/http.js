const baseUrl = 'https://www.hulala.com';
const app = getApp();
const loginApi = '/cgi/user/login';

function wxLogin(backH5Url) {
  return new Promise((resolve, reject) => {
    console.log('wx.login接口前')
    wx.login({
      success: function (result) {
        console.log('wx.login接口成功')
        wx.getUserInfo({
          success: res => {
            console.log(' wx.getUserInfo成功')
            http({
              url: loginApi,
              data: {
                code: result.code,
                encryptedData: res.encryptedData,
                iv: res.iv
              },
              method: 'post',
            }).then(r => {
              let {
                webToken,
                userid
              } = r.rs;
              if (webToken == '') {
                wx.showToast({
                  title: r.msg
                });
              } else {
                // 只有登录成功后才把所有信息加到本地
                wx.setStorageSync('userInfo', res.userInfo);
                // 登录成功只是保存token
                wx.setStorageSync('webToken', webToken);
                wx.setStorageSync('userid', userid);
                console.log('熊++登录成功');
                resolve(r)
              }
            });
          },
          fail: err => {
            wx.redirectTo({
              url: '/pages/login/login'
            })
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
      header: getHeader(),
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
    'content-type': 'application/x-www-form-urlencoded'
  };
  try {
    let webToken = wx.getStorageSync('webToken');
    let userid = wx.getStorageSync('userid');
    let  temp = {
      userid,
      webToken,
    };
    if (webToken.length > 0) {
      return {...headers, ...temp}
    }
    return headers;
  } catch (e) {
    return headers;
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