let baseURL = 'http://182183.xyz:40001/mock/23';

module.exports.myAxios = function(arg) {

    let {
        url = '',
            data = {},
            header = {
                'content-type': 'application/json', // 默认值
                "token": "a4a3e938-59e0-39e0-ad6f-601f29c2e2d9"
            },
            method = 'get',
            dataType = 'json'
    } = arg;
    wx.showLoading({
        title: '加载中' // 数据请求前loading
    })
    return new Promise(resolve => {
        mpvue.request({
            url: baseURL + url,
            data: data,
            header: header,
            method: method,
            success: function(res) {
                wx.hideLoading();
                resolve(res.data);
            },
        })
    });
};