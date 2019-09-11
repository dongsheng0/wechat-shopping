//app.js
const http = require('./utils/http.js')

App({

  onLaunch: function (options) {
    http.wxLogin()
    // this.authorize(); 
    // 直接授权登录（options.query 参数与分享配置有关，后续文章介绍）

  },
  // const webHost = '';
   globalData: {
    webHost: 'http://localhost:2000/#/home',
    backH5url: '', // 跳回h5的地址
    // webHost: 'https://h.roztop.com/pages',
    userInfo: null,
    appid: '', //
    secret: '', //
    webToken: ''
  },
})

