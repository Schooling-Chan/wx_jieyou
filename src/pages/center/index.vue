<template>
  <div class="centerContainer">
<!--    <div v-if="showLogin">-->
<!--      <LoginWindow @changeShow="getModel(arguments)" ref="lw"></LoginWindow>-->
<!--    </div>-->
    <div class="top" @tap="toProfile">
      <div class="userinfo" >
        <img  :src="userinfo.avatarUrl" alt="">
      </div>
      <div class="name">
        <label>{{userinfo.nickname}}</label>
        <p class="notice"></p>
      </div>
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
    // import LoginWindow from '@/components/LoginWindow'
    import {get} from '@/util'
    export default {
    // components: {
    //         LoginWindow
    //     },
    data(){
        return{
            // 用三元运算符直接读取缓存里面的用户信息
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
    mounted (){},
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
                //当拿到数据时，通过actions分发
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
                console.log('从前端返回的正确的信息是：', res)
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
                console.log('从前端返回的正确的信息是：', res)
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
                console.log('从前端返回的正确的信息是：', res)
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
                console.log('从前端返回的正确的信息是：', res)
                that.$store.dispatch('getReplySendLetterDraft',that.sendLetterDraft)
                //当拿到数据时，通过actions分发
            } catch (e) {
                console.log('从后端返回的执行错误的信息是：', e)
            }
        },
        // getModel (val) {//控制登录弹窗消息
        //     console.log('val', val)
        //     // 将第一个信息false赋值到showLogin变量中，控制登录弹窗消息
        //     this.showLogin = val[0]
        //     //this.userinfo = val[1]
        // },
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
