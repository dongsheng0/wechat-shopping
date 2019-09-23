//app.js
const http = require('./utils/http.js');
import {
  setH5url
} from './utils/util';
App({
  onLaunch: function (options) {
    console.log('app.js页面加载的');
    // this.authorize();
  },
  // const webHost = '';
  globalData: {
    h5url: '', // web-view使用的h5地址
    webHost: 'http://localhost:2000',
    // webHost: 'http://192.168.43.131:2000',
    // webHost: 'https://www.xiongjiajia.com/pages',
    backH5hash: '', // 跳回h5的地址
    userInfo: null,
    appid: '', //
    secret: '', //
    webToken: '',
  },
});