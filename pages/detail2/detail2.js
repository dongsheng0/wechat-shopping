const app = getApp()
const http = require('../../utils/http.js')
let host = app.globalData.webHost

import {
  setH5url
} from './../../utils/util'
Page({
  data: {
    h5url: ""
  },
  initPage(url) {
    this.setData({
      h5url: `${host}${url}`
    })
  },
  onLaunch() {},
  onReady: function () {

  },
  // onShow() {
  //   this.initPage()
  // },
  onLoad: function (options) {
    console.log(options.currentH5Url);
    this.initPage(setH5url(options.currentH5Url))
  },
  onShareAppMessage(options) {
    console.log(options.webViewUrl)
  }
})