<template>
  <div class="centerContainer">
    <div v-if="showLogin">
      <LoginWindow @changeShow="getModel(arguments)" ref="lw"></LoginWindow>
    </div>
    <div class="top">
      <div class="userinfo" >
        <img  :src="userinfo.avatarUrl" alt="">
      </div>
      <div class="name">
        <label>{{userinfo.nickname}}</label>
        <p class="notice"></p>
      </div>
      <button class="outlogin" @click="loginout">
        退出登录
      </button>
    </div>
    <div class="headBox">
          <div class="content">
            <div class="letter"  @tap="toMailBox">
              <div class="letter-pic"><img src="../../../static/images/letter.png" alt="">
              </div>
              <span class="letter-span">信箱</span>
            </div>
            <div class="drawLetter" @tap="toDrawLetterDetail">
              <div class="drawLetter-pic"><img src="../../../static/images/drawLetter.png" alt="">
              </div>
              <span class="drawLetter-span">草稿箱</span>
            </div>
            <div class="news" @tap="toWriteLetter">
              <div class="news-pic"><img src="../../../static/images/news.png" alt="">
              </div>
              <span class="news-span">写信</span>
            </div>
          </div>
        </div>
    <div class="contain">
      <div class="row">
        <label class="left">
          <img class="img"  src="../../../static/images/system_info.png">
        </label>
        <label class="name" @tap="toSystemDetail">&nbsp;&nbsp;系统消息</label>
        <label class="right">
          >
        </label>
      </div>
      <div class="row">
        <label class="left">
          <img class="img"  src="../../../static/images/profile.png">
        </label>
        <label class="name" @tap="toProfile" >&nbsp;&nbsp;我的资料</label>
        <label class="right">
          >
        </label>
      </div>
    </div>
    <div class="contain">
      <div class="row">
        <label class="left">
          <img class="img"  src="../../../static/images/comment.png">
        </label>
        <label class="name" @tap="toCommentsDetail">&nbsp;&nbsp;我的评论</label>
        <label class="right">
          >
        </label>
      </div>
    </div>
  </div>
</template>
<script>
    import LoginWindow from '@/components/LoginWindow'
    import {showSuccess, showModal, post, get,del} from '@/util'
    export default {
    components: {
            LoginWindow
        },
    data(){
        return{
            // 用三元运算符直接读取缓存里面的用户信息
            userinfo: wx.getStorageSync('userinfo') ? wx.getStorageSync('userinfo') : {},
            showLogin:false,
            token:'',
        }
    },
    mounted (){
            const userinfo = wx.getStorageSync('userinfo')
            // 如果缓存中有userinfo的信息，说明用户登录了。
            if (userinfo) {
                // 将用户信息储存到data的userinfo字段里面，this.userinfo就是指的这个字段。
                this.userinfo= userinfo
                console.log('用户信息',this.userinfo)
            } else {
                wx.hideTabBar()
                this.showLogin = true
            }
        },
    methods:{
        toMailBox(){
         //跳转到信箱页面
            wx.navigateTo({
                url:'/pages/mailbox/main'
            })
        },
        toDrawLetterDetail(){
            //跳转到信箱页面
            wx.navigateTo({
                url:'/pages/drawLetter_detail/main'
            })
        },
        toWriteLetter(){
            //跳转到评论页面
            wx.navigateTo({
                url:'/pages/write_letter/main'
            })
        },
        toSystemDetail(){
            //跳转到评论页面
            wx.navigateTo({
                url:'/pages/system_detail/main'
            })
        },
        toProfile(){
            //跳转到评论页面
            wx.navigateTo({
                url:'/pages/profile_detail/main'
            })
        },
        toCommentsDetail(){
            //跳转到评论页面
            wx.navigateTo({
                url:'/pages/comments_detail/main'
            })
        },
        getModel (val) {//控制登录弹窗消息
            console.log('val', val)
            // 将第一个信息false赋值到showLogin变量中，控制登录弹窗消息
            this.showLogin = val[0]
            //this.userinfo = val[1]
        },
        async loginout() {
            try {
                let that = this
                that.token = wx.getStorageSync('token')
                const params= {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'token': that.token,
                }
                let header = {
                    'token': wx.getStorageSync('token'),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
                const res = await del('/jieyou/api/logout', params,header)
                console.log('从后端返回的执行正确的信息是：', res)
                if(res.data.success){
                    wx.setStorageSync('token', '')
                    wx.setStorageSync('userinfo', '')
                    wx.showToast({
                        title: '退出成功',//提示文字
                        duration:2000,//显示时长
                    })
                    wx.reLaunch({
                        url: '/pages/center/main'
                    })
                }else{
                    wx.showToast({
                        title: '加载中',//提示文字
                        duration:2000,//显示时长
                    })
                }
            } catch (e) {
                console.log('从后端返回的执行错误的信息是：', e)
            }
        },
    },
}
</script>

<style scoped lang="scss">
  .top{
    height: 80px;
    width: 100%;
    background: linear-gradient(135deg, rgb(26,222,224), rgb(230, 230, 230));
    padding-top: 30px;
    display: block;
    .userinfo{
      padding-bottom: 5px;
      float: left;
      img{
        width: 120rpx;
        height:120rpx;
        margin: 10rpx;
        border-radius: 50%;
        border: 1px #D0D0D0 solid;
      }
    }
    .login{
      padding-bottom: 5px;
      float: left;
      img{
        width: 120rpx;
        height:120rpx;
        margin: 10rpx;
      }
    }
    .name{
      padding-top: 30px;
      padding-left: 5px;
      color: #FFFFFF;
      font-size: 16px;
      font-weight:bold;
      float: left;
      .notice{
        color: #D8D8D8;
        font-size: 12px;
        .number{
          font-size: 15px;
          color: #FFFFFF;
          font-weight: bold;
        }
      }
      .a-line{
        background:#EA5149;
        border: none;
        display: inline;
        font-size: 16px;
        color: #FFFFFF;
        text-decoration:underline;
      }
    }
    .outlogin{
      margin-top: 30px;
      margin-right:60px;
      height:30px;
      width:25%;
      line-height: 30px;
      color: #FFFFFF;
      border-color: #FFFFFF;
      background: transparent;
      font-size: 16px;
      font-weight:bold;
    }
    .outlogin::after{
      border-color: #FFFFFF;
    }
  }
  .contain{
    margin-top: 10px;
    background:#FFFFFF;
    font-size:15px;
    .row{
      padding: 0px 18px;
      border-bottom: 1px #E8E8E8 solid;
      height: 55px;
      line-height: 55px;
      .img {
        float:left;
        width: 20px;
        height: 20px;
        padding-top:16px;
      }
      .name {
        float:left;
      }
    }
    .right {
      float: right;
      color: #C8C8C8;
      line-height:55px;
    }
    .left {
      width:80%;
    }
  }
  .headBox{
  position: relative;
  font-size: .26rem;
  .content{
    background: #fff;
    height: 1.9rem;
    line-height: 1.9rem;
    display: flex;
    overflow: hidden;

    .letter-pic,.drawLetter-pic,.news-pic{
      position: relative;
      height: 1rem;
      width: 1rem;
      line-height: 1rem;
      border-radius: 50%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      img{
        height: 100%;
        width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .letter, .drawLetter,.news{
      height: 1.6rem;
      text-align: center;
      flex: 2;
      display: flex;
      flex-direction: column;
      justify-content:space-around;
      overflow: hidden;
      margin: 0 auto;

      span{
        height: .3rem;
        line-height: .3rem;
        width: 100%;
        margin-top: .39rem;
        display: block;
      }
    }

    .letter .letter-pic{
      background: white;
    }
    .drawLetter .drawLetter-pic{
      background:white;
    }
    .news .news-pic{
      background: white;
    }
  }
}

</style>
