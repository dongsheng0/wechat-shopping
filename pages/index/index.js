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
  },
  onShareAppMessage(options) {
    console.log(options.webViewUrl)
  }
})