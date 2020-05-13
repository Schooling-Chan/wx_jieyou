import config from './config'
// 消息提示框
export function showSuccess (text) {
  // wx.showToast是小程序现成的API，其中title是提示的内容,icon是显示的图标
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

export function showModal (title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}


// get工具函数
export function get (url, data,header) {
  // 返回的是一个Promise对象
  return request(url, 'GET', data,header)
}


// post工具函数
export function post (url, data,header) {
  // 返回的是一个Promise对象
  return request(url, 'POST', data,header)
}


export function del (url, data,header) {
  // 返回的是一个Promise对象
  return request(url, 'DELETE', data,header)
}




// 将Promise对象封装在request()函数中
function request (url, method, data,header = {
  'Content-Type': 'application/x-www-form-urlencoded'
}){
  // 将wx.request请求API包装成一个Promise对象
  return new Promise((resolve, reject) => {
    // wx.request是微信的API
    wx.request({
      url: config.host + url,
      data,
      method,
      header,
      success: function (res) {
        console.log('请求返回到前端的信息：', res)
        resolve(res)
        reject(res)
      },
      error: function (res) {
        resolve(res)
        reject(res)
      }
    })
  })
}
