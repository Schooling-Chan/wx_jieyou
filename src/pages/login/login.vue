<template>
  <div>
    <div class="up">
      <img src="../../../static/images/youchuo.jpg"/>
      <p>为你解忧</p>
      <div class="line"></div>
    </div>
    <div>
      <p class="p1">登录后将授权得以下权限</p>
      <p class="p2">获得你的公开信息（昵称、头像等）</p>
      <button class="btn" open-type="getUserInfo"  @getuserinfo="bindGetUserInfo">微信授权登录</button>
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
        onLoad(){
            wx.setNavigationBarTitle({
                title: '微信登陆'
            })
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
                console.log("loginres",res)
                if (res.header.token) {
                    wx.setStorageSync('token', res.header.token)
                    wx.setStorageSync('userinfo', res.data.object)
                    
                    wx.reLaunch({
                        url: '/pages/index/main'
                    })
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
            },
        },
    }
</script>

<style scoped>
  .up img{
    width:139rpx;
    height:139rpx;
    margin-top:125rpx;
    margin-left:306rpx;
  }
  .up p{
    width: 100%;
    text-align: center;
    font-size:32rpx;
    font-weight:500;
    color:rgba(51,51,51,1);
  }
  .line{
    width:500rpx;
    height:1rpx;
    background:rgba(234,234,234,1);
    margin-left:125rpx;
    margin-top:50rpx;
  }
  .p1{
    margin-top:48rpx;
    width: 100%;
    text-align: center;
    font-size:28rpx;
    font-weight:500;
    color:rgba(51,51,51,1);

  }
  .p2{
    width: 100%;
    text-align: center;
    margin-top:39rpx;
    font-size:24rpx;
    font-weight:500;
    color:rgba(153,153,153,1);
  }
  .btn{
    width:300rpx;
    height:88rpx;
    line-height: 88rpx;
    background:linear-gradient(90deg,rgba(61,203,104,1) 0%,rgba(56,178,93,1) 100%);
    box-shadow:0rpx 3rpx 20rpx 0rpx rgba(0, 0, 0, 0.05);
    border-radius:10rpx;
    margin-top:80rpx;
    margin-left:225rpx;
    font-size:32rpx;
    font-weight:500;
    color:rgba(255,255,255,1);
  }
</style>
