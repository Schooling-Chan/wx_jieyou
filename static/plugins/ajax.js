let baseURL = 'http://49.232.153.206:9000';

module.exports.myAxios = function(arg) {

    let {
        url = '',
            data = {},
            header = {
                'content-type': 'application/json', // 默认值
                "token": wx.getStorageSync('token')
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

                if (res.data.errorCode === 4001) {
                    wx.redirectTo({
                        url: '/pages/login/main',
                    })
                    return;
                }
                resolve(res.data);
            },
        })
    });
};