//index.js
// app.globalData.userInfo
const app = getApp()
const http = require('../../utils/http.js')
const webHost =
  Page({
    data: {
      webSrc: 'https://h.roztop.com/pages'
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
      let userInfo = wx.getStorageSync('userInfo');
      let {
        nickName,
        avatarUrl
      } = userInfo
      // const webHost = 'http://10.29.33.127:2000';
      const webHost = 'https://h.roztop.com/pages';
      this.setData({
        webSrc: `${webHost}/#/home?webToken=${webToken}&userid=${userid}&nickName=${encodeURIComponent(nickName)}&avatarUrl=${encodeURIComponent(avatarUrl)}`
      })
    }
  })