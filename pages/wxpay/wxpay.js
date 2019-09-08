// pages/wxpay/wxpay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let orderNo = decodeURIComponent(options.orderNo)
    let that = this;
    wx.requestPayment({
      timeStamp: decodeURIComponent(options.timestamp),
      nonceStr: decodeURIComponent(options.nonceStr),
      package: decodeURIComponent(options.package),
      signType: decodeURIComponent(options.signType),
      paySign: decodeURIComponent(options.paySign),
      success: function (res) {
        wx.showToast({
          title: '微信接口支付成功'+res
        });
        console.log(res)
        console.log('支付成功')
        var pages = getCurrentPages();
        //当前页面
        var currpage = pages[pages.length - 1]
        var prevpage = pages[pages.length - 2]
        // prevpage.setData({
        //   web_src: 'https://xxxxx/?orderNo=' + orderNo 
        //   //赋值会自动跳转到当前页面，你就可以在前端H5页面中通过url参数接收，然后判断是否支付成功后的操作
        // })
        wx.navigateBack();
      },
      fail: function (res) {
        wx.showToast({
          title: '微信接口支付失败' + res
        });
        var pages = getCurrentPages(); //获取你页数集  
        console.log(pages) //打印一下自己看一下
        // //当前页面
        var currpage = pages[pages.length - 1]
        var prevpage = pages[pages.length - 2]
        // prevpage.setData({
        //   web_src: 'https://xxxx.com/?orderNo=' + orderNo   //支付失败也可以写判断，我这里他就是自动自己回到付款页面，我就不在传值判断了
        // })
        wx.navigateBack();
      },
      complete: function (res) {
        wx.showToast({
          title: '微信接口支付complete返回函数' + res
        });
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