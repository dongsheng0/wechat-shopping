//index.js
// app.globalData.userInfo
const app = getApp()
const http = require('../../utils/http.js')
const webHost =
  Page({
    data: {
      webSrc: this.globalData.webSrc
    },
    initPage() {
      let webToken = wx.getStorageSync('webToken');
      let userid = wx.getStorageSync('userid');
      let userInfo = wx.getStorageSync('userInfo');
      let {
        nickName,
        avatarUrl
      } = userInfo
      this.webSrc = this.globalData.webSrc;
      // const webHost = 'https://h.roztop.com/pages';
      this.setData({
        webSrc: `${webHost}/#/home?webToken=${webToken}&userid=${userid}&nickName=${encodeURIComponent(nickName)}&avatarUrl=${encodeURIComponent(avatarUrl)}`
      })
    },
    onShow() {
      this.initPage()
    },
    onLoad: function () {
      this.initPage()
    }
  })