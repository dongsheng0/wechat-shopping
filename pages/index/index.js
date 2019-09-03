//index.js
//获取应用实例
// app.globalData.userInfo
const app = getApp()
const http = require('../../utils/http.js')
Page({
  data: {
    webSrc: 'http://192.168.1.8:2000/#/home'
  },
  onLoad: function () {
    // let webToken = wx.getStorageSync('webToken', webToken);
    let webToken2 = '22222222222222'
    this.setData({
      webSrc: `http://192.168.1.8:2000/#/home?webToken=${webToken2}`
    })
  }
})