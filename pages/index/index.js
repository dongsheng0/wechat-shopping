//index.js
//获取应用实例
// app.globalData.userInfo
const app = getApp()
const http = require('../../utils/http.js')
Page({
  data: {
    webSrc: 'http://10.29.33.22:2000'
  },
  onLoad: function () {
    // let webToken = wx.getStorageSync('webToken', webToken);
    let webToken2 = '22222222222222'
    this.setData({
      webSrc: `http://10.29.33.22:2000?webToken=${webToken2}`
    })
  }
})