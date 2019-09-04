//index.js
//获取应用实例
// app.globalData.userInfo
const app = getApp()
const http = require('../../utils/http.js')
cost webHost = 'http://192.168.43.101:2000'
Page({
  data: {
    webSrc: ''
  },
  onLoad: function () {
     let webToken = wx.getStorageSync('webToken');
      let userid = wx.getStorageSync('userid');
      this.setData({
        webSrc: `${webHost}/#/home?webToken=${webToken}&userid=${userid}`
      })
  }
})