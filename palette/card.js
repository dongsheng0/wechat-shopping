export default class Cards {
  constructor(data) {
    this.data = data
    this.title = '熊加加优选'
  }
  palette(index) {
    return ({
      width: '330rpx',
      height: '700rpx',
      background: '#fff',
      views: [
        _image(this.data.pics[index]),
        _des(this.data.spread_big_title, bigTitleHeight, '13px', '#424242'),
        _des(this.data.spread_mid_title, midTitleHeight, '10px', '#555'),
        _des(this.data.spread_mid_desc, descHeight, '8px', '#727272'),
        _logo(),
        _des(this.title, logoHeight + 5, '11px', '#424242', '10'),
        _qrcode(this.data.code_url),
      ],
    });
  }
}

const startLeft = 10;
const gapSize = 70;
const common = {
  left: `${startLeft}rpx`,
  fontSize: '40rpx',
};
const topStart = 10
const imgTop = 200
const bigTitleHeight = 100 + imgTop
const midTitleHeight = 80 + bigTitleHeight
const descHeight = 100 + midTitleHeight
const logoHeight = 100 + descHeight
const logoUrl = '../../img/share_logo.png'

function _image(url) {
  return ({
    type: 'image',
    url,
    css: {
      top: `${topStart}rpx`,
      left: `${startLeft}rpx`,
      width: '300rpx',
      height: '240rpx',
      borderRadius: '10rpx',
    },
  });
}

function _logo() {
  return ({
    type: 'image',
    url: logoUrl,
    css: {
      top: `${logoHeight}rpx`,
      left: `${startLeft}rpx`,
      width: '50rpx',
      height: '50rpx'
    },
  });
}

function _qrcode(url) {
  return ({
    type: 'image',
    url: logoUrl,
    css: {
      top: `${logoHeight-8}rpx`,
      right: '10rpx',
      width: '60rpx',
      height: '60rpx'
    },
  });
}

function _des(content, top, fontSize, color, left) {
  const des = {
    type: 'text',
    text: content,
    css: {
      left: left ? `${startLeft+65}rpx` : `${startLeft}rpx`,
      fontSize,
      color,
      top: `${top}rpx`,
    },
  };
  return des;
}


// function _textDecoration(decoration, index, color) {
//   return ({
//     type: 'text',
//     text: decoration,
//     css: [{
//       top: `${startTop + index * gapSize}rpx`,
//       color: color,
//       textDecoration: decoration,
//     }, common],
//   });
// }