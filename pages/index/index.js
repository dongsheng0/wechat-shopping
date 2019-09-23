const app = getApp()
const http = require('../../utils/http.js')
let host = app.globalData.webHost

import {
  setH5url
} from './../../utils/util'
Page({
  data: {
    h5url: `${host}${app.globalData.h5url}`
  },
  initPage() {
    this.setData({
      h5url: `${host}${app.globalData.h5url}`
    })
  },
  onShow() {
    this.initPage()
  },
  onLoad: function () {
    this.initPage()
    wx.showShareMenu()
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log(res);
      }
     })
  },
  onShareAppMessage(options) {
    console.log(options.webViewUrl)
  }
})