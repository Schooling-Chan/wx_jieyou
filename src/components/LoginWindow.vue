<template>
  <div>
    <div class="modal-mask">
    </div>
    <div class="modal-dialog">
      <div class="modal-content">
        <img class="img" src="/static/images/jieyou.png">
        <div class="content-text">
          <p class="key-bold">为你解忧是一款暖心神器。</p>
          <p class="key-bold">将生活想象成通关打怪，打败自己的心魔加分，被心魔打败减分。</p>
          <p class="little-tip">举个例子：</p>
          <p class="little-content">
            今天心情很糟糕，可以写信找暖心姐姐；
          </p>
          <p class="little-content">
            今天很开心，可以写信找暖心姐姐；
          </p>
        </div>
      </div>
      <div class="modal-footer">
         <!-- 小程序集成的API，通过button来授权登录 -->
        <button open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="bindGetUserInfo">
          授权并登录
        </button>
      </div>
    </div>
  </div>
</template>
<script>
    import {post} from '@/util'
    export default {
        data() {
            return {
                userInfo:{
                },
                userId:'',
                nickName:'',
                avatarUrl:'',
                wxNickname:'',
                wxAvatarUrl:'',
                gender:'',
                code:'',
            }
        },
        methods: {
            bindGetUserInfo () {
                let that = this
                // 查看是否授权
                wx.getSetting({
                    success (res) {
                        if (res.authSetting['scope.userInfo']) {
                            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                            wx.login({
                                success (res) {
                                    if (res.code) {
                                        that.code = res.code
                                        console.log('测试',res)
                                        that.in()
                                        // 发起网络请求
                                    } else {
                                        wx.showToast({
                                            title: '登录失敗',
                                            icon: 'none',
                                            duration: 10000
                                        })
                                        setTimeout(function () {
                                            wx.hideToast()
                                        }, 2000)
                                    }
                                }
                            })
                        }
                    },
                    fail(res) {
                        wx.showToast({
                            title: res,
                            icon: 'none',
                            duration: 10000
                        })
                    }
                })
            },
            async login () {
                let that = this
                let params = {
                    'code': that.code,
                    'gender':that.gender,
                    'wxAvatarUrl':that.wxAvatarUrl,
                    'wxNickname':that.wxNickname,
                }
                let header = {
                    'Content-Type': 'application/json'
                }
                console.log(params)
                const res = await post('/jieyou/api/login', params,header)
                console.log(444, res)
                if (res.header.token) {
                    wx.setStorageSync('token', res.header.token)
                    wx.setStorageSync('userinfo', res.data.object)
                } else if (res.statusCode === 5000) {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 10000
                    })
                }
            },
            async in () {
                let that = this
                wx.getUserInfo({
                    success :res=> {
                        that.userInfo=res.userInfo;
                        that.wxAvatarUrl=that.userInfo.avatarUrl;
                        that.wxAvatarUrl=that.userInfo.avatarUrl;
                        that.gender=that.userInfo.gender;
                        that.wxNickname=that.userInfo.nickName;
                        that.login()
                    }
                })
                that.$emit('changeShow', false)
            },
        },
    }
</script>

<style lang='scss'>
.modal-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.5;
  overflow: hidden;
  z-index: 9000;
  color: #fff;
}
.modal-dialog {
  box-sizing: border-box;
  width: 560rpx;
  overflow: hidden;
  position: fixed;
  top: 30%;
  left: 0;
  z-index: 9999;
  background: #fff;
  margin: -150rpx 95rpx;
  border-radius: 16rpx;
}
.modal-content {
  box-sizing: border-box;
  display: flex;
  padding: 0rpx 53rpx 50rpx 53rpx;
  font-size: 32rpx;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.content-tip {
  text-align: center;
  font-size: 36rpx;
  color: #333333;
}
.content-text {
  height:130px;
  padding:10px 0px 50px 0px;
  font-size:14px;
}
.modal-footer {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  border-top: 1px solid #e5e5e5;
  font-size: 16px;
  font-weight:bold;
  height: 45px;
  line-height: 45px;
  text-align: center;
  background:#feb600;
}
button {
  width: 100%;
  background: linear-gradient(135deg, rgb(26,222,224), rgb(230, 230, 230));
  color:#FFFFFF;
  font-weight:bold;
}
.img {
  width: 280px;
  height:90px;
}
.little-tip {
  padding-top:15px;
  padding-bottom:3px;
  font-size: 14px;
  font-weight:bold;
  color: #feb600;
}
.little-content {
  padding-top:5px;
  font-size: 13px;
  color:#606060;
}
.key-bold {
  padding-top:5px;
  font-size: 14px;
  font-weight:bold;
}
</style>
