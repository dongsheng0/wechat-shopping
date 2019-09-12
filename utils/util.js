
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const setH5url = (backH5hash= '/home') => {
  // 获取用户信息
  let webToken = wx.getStorageSync('webToken');
  let userid = wx.getStorageSync('userid');
  let userInfo = wx.getStorageSync('userInfo');
  let {
    nickName,
    avatarUrl
  } = userInfo
  let h5url = ''
  if (backH5hash.indexOf('?') != -1){
    h5url = `/#${backH5hash}webToken=${webToken}&userid=${userid}&nickName=${encodeURIComponent(nickName)}&avatarUrl=${encodeURIComponent(avatarUrl)}`
  } else {
    h5url = `/#${backH5hash}?webToken=${webToken}&userid=${userid}&nickName=${encodeURIComponent(nickName)}&avatarUrl=${encodeURIComponent(avatarUrl)}`
  }
  return h5url
}
module.exports = {
  formatTime,
  setH5url
}
