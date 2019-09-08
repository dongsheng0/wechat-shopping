//index.js
// app.globalData.userInfo
const app = getApp()
const http = require('../../utils/http.js')
const webHost = 
Page({
  data: {
    webSrc: ''
  },
  onShow() {
    // let webToken = wx.getStorageSync('webToken');
    // let userid = wx.getStorageSync('userid');
    // const webHost = 'https://h.roztop.com/pages';
    // this.setData({
    //   webSrc: `${webHost}/#/home?webToken=${webToken}&userid=${userid}`
    // })
  },
  onLoad: function () {
    let webToken = wx.getStorageSync('webToken');
    let userid = wx.getStorageSync('userid');
    const webHost = 'https://h.roztop.com/pages';
    this.setData({
      webSrc: `${webHost}/#/home?webToken=${webToken}&userid=${userid}`
    })
  }
})