//app.js
const http = require('./utils/http.js')

App({

  onLaunch: function (options) {
    http.wxLogin()
    // this.authorize(); 
    // 直接授权登录（options.query 参数与分享配置有关，后续文章介绍）

  },

   globalData: {
    userInfo: null,
    appid: '', //
    secret: '', //
    webToken: ''
  },
})

