const http = require('../../utils/http.js')
import {
  setH5url
} from '../../utils/util'
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isAuthorize: false,
    backH5hash: ''
  },
  //绑定授权按钮
  bindGetUserInfo: function (res) {
    let that = this
    if (res.detail.userInfo) {
      // console.log('用户点击了授权按钮')
      wx.setStorage({
        key: 'can_getuserinfo',
        data: 1,
      })
      http.wxLogin().then(res => {
        // 根据h5跳转的来源 登录完害的返回到原来的页面 ， 但是得把token更新
        app.globalData.h5url = setH5url(that.data.backH5hash)
        // wx.redirectTo({
        //   url: '/pages/index/index',
        // });
        wx.navigateBack();
      })
    } else {
      wx.setStorage({
        key: 'can_getuserinfo',
        data: 0,
      })
      wx.showToast({
        title: '请授权登录'
      });
    }
  },
  bindCancel() {
    wx.navigateBack();
  },
  // 已经授权登录
  bindlogin() {
    // var pages = getCurrentPages();
    // //当前页面
    // var currpage = pages[pages.length - 1]
    // var prevpage = pages[pages.length - 2]
    // wx.navigateBack();
    let that = this
    http.wxLogin().then(res => {
      // 重新获取token
      app.globalData.h5url = setH5url(that.data.backH5hash)
      wx.navigateBack();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      backH5hash: options.backH5hash
    })
    let that = this
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) { // 已经授权
          that.setData({
            isAuthorize: true
          })
        } else {
          that.setData({
            isAuthorize: false
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})