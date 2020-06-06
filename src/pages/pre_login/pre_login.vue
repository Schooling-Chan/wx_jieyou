<template>
  <div class="container">
    <img  class="img" src="../../../static/images/youchuo.jpg">
    <div class="text">为你解忧</div>
    <div class="btn" @click="weChatClick">
      <img src="../../../static/images/wechat.png">
      <text>微信登陆</text>
    </div>
  </div>
</template>

<script>
    export default {
        onLoad(){
            wx.setNavigationBarTitle({
                title: '微信登陆'
            })
        },
        methods: {
            weChatClick () {
                let that = this;
                wx.checkSession({
                    success: function(res){
                        //session 未过期，并且在本生命周期一直有效
                        wx.switchTab({
                            url:'/pages/index/main?to_index=1',
                        })
                    },
                    fail: function(res){
                        wx.redirectTo({
                            url: '/pages/login/main'
                        })
                        //登录态过期
                    }
                })
            },
        },
    }

</script>

<style scoped>
  .container{
    width: 100%;
    position: relative;
  }
  .img{
    width: 160rpx;
    height: 160rpx;
    position: absolute;
    top: 122rpx;
  }
  .text{
    position: absolute;
    top: 310rpx;
    height:51rpx;
    font-size:36rpx;
    font-weight:500;
    line-height:48rpx;
    color:rgba(85,85,85,1);
    opacity:1;
    white-space: nowrap;
  }
  .btn{
    position: absolute;
    top: 500rpx;
    width:550rpx;
    height:88rpx;
    background:linear-gradient(90deg,rgba(60,203,104,1) 0%,rgba(56,178,93,1) 100%);
    box-shadow:0rpx 3rpx 20rpx rgba(0,0,0,0.05);
    opacity:1;
    border-radius:10rpx;
    display: flex;
  }
  .btn image{
    width: 44rpx;
    height: 40rpx;
    padding-left: 180rpx;
    padding-top: 25rpx;
  }
  .btn text{
    padding-left: 19rpx;
    line-height: 88rpx;
    width:118rpx;
    height:44rpx;
    font-size:30rpx;
    font-weight:500;
    color:rgba(255,255,255,1);
    opacity:1;
    white-space: nowrap;
  }
</style>
