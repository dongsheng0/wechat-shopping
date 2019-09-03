//app.js
const http = require('./utils/http.js')
App({
  userLogin() {

  },
  onLaunch: function () {
    wx.getSetting({
      success(res) {        
        if (JSON.stringify(res.authSetting) == "{}" || !res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              wx.checkSession({ // 判断是否过期
                success: function () {
                  //存在登陆态
                  let webToken = wx.getStorageSync('webToken', webToken)
                  if (webToken == '') {
                    http.wxLogin()
                  }
                },
                fail: function () {
                  http.wxLogin()
                }
              })
            }
          })
        }
      }
    })
    
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({

    //       });
    //     }
    //   },
    // });
  },
  globalData: {
    userInfo: null,
    appid: '', //
    secret: '', //
    webToken: ''
  },
});