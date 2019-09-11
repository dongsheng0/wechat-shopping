const http = require('../../utils/http.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isAuthorize: false
  },
  //绑定授权按钮
  bindGetUserInfo: function (res) {
    if (res.detail.userInfo) {
      // console.log('用户点击了授权按钮')
      http.wxLogin()
    } else {
      console.log('用户点击了取消按钮')
    }
  },

    tap() {
      var pages = getCurrentPages();
        //当前页面
        var currpage = pages[pages.length - 1]
        var prevpage = pages[pages.length - 2]
        prevpage.setData({
          web_src: 'http://10.29.33.127:2000#/goods/order/1'
          //赋值会自动跳转到当前页面，你就可以在前端H5页面中通过url参数接收，然后判断是否支付成功后的操作
        })
        wx.navigateBack();
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