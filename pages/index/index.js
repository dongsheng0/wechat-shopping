//index.js
// app.globalData.userInfo
const app = getApp()
const http = require('../../utils/http.js')

Page({
  data: {
    webSrc: ''
  },
  onLoad: function () {
    let webToken = wx.getStorageSync('webToken');
    let userid = wx.getStorageSync('userid');
    const webHost = 'http://10.29.33.127:2000';
    this.setData({
      webSrc: `${webHost}/#/home?webToken=${webToken}&userid=${userid}`
    })
  }
})