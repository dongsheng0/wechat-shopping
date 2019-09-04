const http = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  login() {
    console.log('authorize前')
    wx.authorize({
      scope: 'scope.userInfo',
      success(e) {
        console.log('authorize成功')
        wx.checkSession({ // 判断是否过期
          success: function () {
            console.log('//存在登陆态')
            let webToken = wx.getStorageSync('webToken', webToken)
            if (webToken == '') {
              http.wxLogin()
            }
          },
          fail: function () {
            console.log('//无登陆态')
            http.wxLogin()
          }
        })
      },
      fail(e) {
        console.log('authorize fail')
        console.log(e)
      },
      complete(e) {
        console.log('authorize component')
        console.log(e)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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