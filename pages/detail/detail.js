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

    if (options.recommendUser) { //推荐页面
      // recommendUser=(推荐人)&type=(类别 0 景区 1酒店 2 商品)&id=(主类ID)&subId=(子类ID 门票ID、房型ID、商品规格ID)
      let url = ''
      let subId = options.subId
      switch (options.type) {
        case '0':
          url = `/scenic/${subId}`

          break;
        case '1':
          url = `/hotel/${subId}`

          break;
        case '2':
          url = `/goods/${subId}`
          break;

        default:
          url = '/home'
          break;
      }
      this.initPage(setH5url(url))
    } else {
      this.initPage(options.currentH5Url)
    }
  },
  onShareAppMessage(options) {
    console.log(options.webViewUrl)
  }
})