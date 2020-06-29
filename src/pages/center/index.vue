<template>
  <div class="centerContainer">
    <div class="top" @tap="toProfile">
      <div class="userinfo" >
        <img  :src="userinfo.avatarUrl" alt="">
      </div>
      <div class="name">
        <label>{{userinfo.nickname}}</label>
        <p class="notice"></p>
      </div>
    </div>
    <div class="none"></div>
    <div class="headBox">
      <div class="content">
        <div class="letter"  @tap="toMailBox">
          <div class="letter-pic">
            <lable class="img"><i  class="iconfont  iconxin"></i></lable>
          </div>
          <span class="letter-span">信箱</span>
        </div>
        <div class="drawLetter" @tap="toDrawLetterDetail">
          <div class="drawLetter-pic">
            <lable class="img"><i  class="iconfont  iconcaogaoxiang"></i></lable>
          </div>
          <span class="drawLetter-span">草稿箱</span>
        </div>
        <div class="news" @tap="toWriteLetter">
          <div class="news-pic">
            <lable class="img"><i  class="iconfont  iconbianji"></i></lable>
          </div>
          <span class="news-span">写信</span>
        </div>
      </div>
    </div>
    <div class="contain row1"  @tap="toSystemDetail">
      <div class="row">
        <label class="left">
          <lable class="img"><i  class="iconfont  iconxitongxiaoxi1"></i></lable>
        </label>
        <label class="name" >&nbsp;&nbsp;系统消息</label>
        <label class="right">
          >
        </label>
      </div>
    </div>
    <div class="contain"  @tap="toProfile">
      <div class="row">
        <label class="left">
          <lable class="img"><i  class="iconfont  iconwode"></i></lable>
        </label>
        <label class="name" >&nbsp;&nbsp;我的资料</label>
        <label class="right">
          >
        </label>
      </div>
    </div>
    <div class="contain"  @tap="toCommentsDetail">
      <div class="row">
        <label class="left">
          <lable class="img"><i  class="iconfont  iconwodepinglun"></i></lable>
        </label>
        <label class="name">&nbsp;&nbsp;我的评论</label>
        <label class="right">
          >
        </label>
      </div>
    </div>
  </div>
</template>
<script>
    import {get} from '@/util'
    export default {
        data(){
            return{
                userinfo: '',
                // showLogin:false,
                token:'',
                receiveLetter:[],
                sendLetter:[],
                comment:[],
                replyDraft:[],
                sendLetterDraft:[],
            }
        },
        onLoad(){
            wx.setNavigationBarTitle({
                title: '个人中心'
            })
        },
        onShow(){
            this.getReceiveLetter()
            this.getSendLetter()
            this.getComment()
            this.replyLetterDraft()
            this.SendLetterDraft()
            this.userinfo=wx.getStorageSync('userinfo')
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
            async getReceiveLetter(){
                //收信箱详情通知
                try {
                    let header = {
                        'token': wx.getStorageSync('token'),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                    const res = await get('/jieyou/api/annotation/receiveLetter','',header)
                    let that = this
                    that.receiveLetter = res.data.object
                    that.$store.dispatch('getReceiveLetter',that.receiveLetter)
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },
            async getSendLetter(){
                //寄信箱详情通知
                try {
                    let header = {
                        'token': wx.getStorageSync('token'),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                    const res = await get('/jieyou/api/annotation/sendLetter','',header)
                    let that = this
                    that.sendLetter = res.data.object
                    that.$store.dispatch('getSendLetter',that.sendLetter)
                    //当拿到数据时，通过actions分发
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },
            async getComment(){
                //寄信箱详情通知
                try {
                    let header = {
                        'token': wx.getStorageSync('token'),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                    const res = await get('/jieyou/api/annotation/comment','',header)
                    let that = this
                    that.comment = res.data.object
                    that.$store.dispatch('getComment',that.comment)
                    //当拿到数据时，通过actions分发
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },
            async replyLetterDraft(){
                //寄信箱详情通知
                try {
                    let header = {
                        'token': wx.getStorageSync('token'),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                    const res = await get('/jieyou/api/annotation/replyLetterDraft','',header)
                    let that = this
                    that.replyDraft = res.data.object
                    that.$store.dispatch('getReplyLetterDraft',that.replyDraft)
                    //当拿到数据时，通过actions分发
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },
            async SendLetterDraft(){
                //寄信箱详情通知
                try {
                    let header = {
                        'token': wx.getStorageSync('token'),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                    const res = await get('/jieyou/api/annotation/sendLetterDraft','',header)
                    let that = this
                    that.sendLetterDraft = res.data.object
                    that.$store.dispatch('getReplySendLetterDraft',that.sendLetterDraft)
                    //当拿到数据时，通过actions分发
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },
        },
    }
</script>

<style scoped lang="scss">
  @import "../../../static/fonts/invitation/font.css";
  .top{
    height: 80px;
    width: 100%;
    background: linear-gradient(135deg, rgb(26,222,224), rgb(230, 230, 230));
    padding-top: 30px;
    display: block;
    .userinfo{
      padding-bottom: 5px;
      padding-left:15px;
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
  }
  .contain{
    /*margin-top: 10px;*/
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
      font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
      font-weight: 666;
    }
    .left {
      width:80%;
    }
  }
  .row1{
    margin-top:25px;
    border-top: 1px #E8E8E8 solid;
    /*border-bottom-color: white;*/
  }
  .none{
    height:10px;
    width:10px;
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
