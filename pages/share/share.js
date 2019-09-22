import Card from '../../palette/card';
import {
  get
} from '../../utils/http'
Page({
  imagePath: '',

  /**
   * 页面的初始数据
   */
  data: {
    target: '', // 二级分类ID 门票ID，房型ID或者商品分类ID 
    type: '0', // 类别 0景区 1酒店 2商品
    template: [],
    details: {},
    imageLits: [],
    checkValues: []
  },
  checkboxChange(e) {
    this.setData({
      checkValues: e.detail.value
    })
    console.log(this.data.checkValues);
  },
  onImgOK(e) {
    this.setData({
      imageLits: this.data.imageLits.concat(e.detail.path)
    });
  },
  // 保存图片
  saveImage() {
    let that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.checkValues,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      target: options.target,
      type: options.type
    });
  },
  share(ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    var that = this
    return {
      title: '分享给好友',
      path: 'pages/index/index', //点击分享消息是打开的页面
      imageUrl: that.data.details.pics ? that.data.details.pics[0] : '',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
        var shareTickets = res.shareTickets;
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onLaunch() {},
  onReady: function () {
    let that = this
    get('/cgi/user/spread', {
      type: this.data.type,
      target: this.data.target
    }).then(res => {
      let result = res.rs
      let list = []
      let Palette = new Card(res.rs);
      result.pics.forEach((item, index) => {
        list.push(Palette.palette(index))
      })
      this.setData({
        template: list,
        details: result
      });
    })
  },
});