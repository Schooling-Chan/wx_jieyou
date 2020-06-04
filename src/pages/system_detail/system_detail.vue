<template>
    <div>
      <div class="system_detail system"  v-for="(index,item) in systemAnnotation" :key='index' >
        <div class="left">
          <img class="img"  src="../../../static/images/system_detail02.png">
          <span class="name">
            <lable class="info">系统公告
              <lable class="greencircle" v-if="systemAnnotation[item].isRead"></lable>
              <lable class="redcircle" v-if="!systemAnnotation[item].isRead"></lable>
            </lable>
            <lable class="content">系统的内容{{systemAnnotation[item].content}}</lable>
          </span>
       </div>
        <div class="right">
            <lable class="time">{{systemAnnotation[item].gmtCreate}}</lable>
        </div>
      </div>
      <div class="system_detail receiveLetter" @tap="toMailboxDetail_Receive(item)"    v-for="(index,item) in receiveLetter" :key='index' >
        <div class="left">
          <img class="img"  src="../../../static/images/system_detail02.png">
          <span class="name">
            <lable class="info">信箱通知
              <lable class="greencircle" v-if="receiveLetter[item].isRead"></lable>
              <lable class="redcircle" v-if="!receiveLetter[item].isRead"></lable>
            </lable>
            <lable class="content " v-if="sendLetter[item].toUser">收到了一封来{{sendLetter[item].toUser.nickname}}信</lable>
            <div class="content1">{{sendLetter[item].content}}</div>
          </span>
        </div>
        <div class="right">
          <lable class="time">{{sendLetter[item].gmtCreate}}</lable>
        </div>
      </div>
      <div class="system_detail sendLetter" @tap="toMailboxDetail_Send(item)" v-for="(index,item) in sendLetter" :key='index' >
        <div class="left">
          <img class="img"  src="../../../static/images/system_detail02.png">
          <span class="name">
            <lable class="info">信箱通知
              <lable class="greencircle" v-if="sendLetter[item].isRead "></lable>
              <lable class="redcircle" v-if="!sendLetter[item].isRead "></lable>
            </lable>
            <lable class="content" v-if="sendLetter[item].fromUser">你已成功寄出给{{sendLetter[item].fromUser.nickname}}的信</lable>
            <div class="content1">{{sendLetter[item].content}}</div>
          </span>
        </div>
        <div class="right">
          <lable class="time">{{sendLetter[item].gmtCreate}}</lable>
        </div>
      </div>
      <div class="system_detail comment" v-for="(index,item) in comment" :key='index'>
        <div class="left">
          <img class="img"  src="../../../static/images/system_detail02.png">
          <span class="name">
            <lable class="info">评论通知
              <lable class="greencircle" v-if="!commentCount"></lable>
              <lable class="redcircle" v-if="commentCount"></lable>
            </lable>
            <div class="content">{{sendLetter[item].fromUser}}评论了你</div>
            <div class="content1">{{comment[item].content}}</div>
          </span>
        </div>
        <div class="right">
          <lable class="time">{{comment[item].gmtCreate}}</lable>
        </div>
      </div>
    </div>
</template>

<script>
    import {showSuccess, showModal, get,post} from '@/util'
    import {mapState} from 'vuex'
    export default {
        data(){
            return{
                systemAnnotation:[],
                system:{},
                systemCount:'',
                commentCount:'',
                letterCount:'',
            }
        },
        computed: {
            ...mapState(['sendLetter','comment','receiveLetter'])
        },
        beforeMount(){
            this.getSystemCount()
            this.getUnReadCount()
            this.getCommentCount()
            this.getSystemAnnotation()
           // console.log('sendLetter',this.sendLetter)
            //console.log('comment',this.comment)
            //console.log('receiveLetter',this.receiveLetter)
        },
        methods:{
            toMailboxDetail_Send(item){
                //跳转到信详情页面
                wx.navigateTo({
                    url:'/pages/mailbox_detail/main?item='+ item
                })
            },
            toMailboxDetail_Receive(index){
                //跳转到信详情页面
                wx.navigateTo({
                    url:'/pages/mailbox_detail/main?index='+ index
                })
            },
            async getUnReadCount(){
                //异步获取未读消息的数量
                try {
                    let header = {
                        'token': wx.getStorageSync('token'),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                    const res = await get('/jieyou/api/annotation/unReadCount','',header)
                    let that = this
                    that.systemCount = res.data.system
                    that.commentCount = res.data.commentCount
                    that.letterCount = res.data.letterCount
                    that.commentCount = res.data.commentCount
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },
            async getSystemCount(){
                try {
                    let header = {
                        'token': wx.getStorageSync('token'),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                    const res = await get('/jieyou/api/annotation/system','',header)
                    let that = this
                    that.system = res.data.object
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },
            async getCommentCount(){
                try {
                    let header = {
                        'token': wx.getStorageSync('token'),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                    const res = await get('/jieyou/api/annotation/comment','',header)
                    let that = this
                    that.comment = res.data.comment
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },
            async getSystemAnnotation(){
                //寄信箱详情通知
                try {
                    const res = await get('/jieyou/api/annotation/system')
                    let that = this
                    that.systemAnnotation = res.data.object
                    //console.log(that.systemAnnotation)
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },
        }
    }
</script>

<style scoped lang="scss">
.system_detail{
  margin-top: 5px;
  background-color:#f5f5f5;
  font-size:14px;
  width:100%;
  height:80px;
  line-height: 80px;
}
  .left{
    position:absolute;
    margin-left: 10px;
    float:left;
    .img{
      background-color:#1ADEE0;
      width: 50rpx;
      height:50rpx;
      margin: 10rpx;
      margin-top:15px;
      padding: 20rpx;
      border-radius: 50%;
      border: 1px white solid;
    }
    .name{
      position: relative;
      top:-30px;
      left:15px;
      .info{
        position: relative;
        color:#626262;
        .greencircle{
          position: absolute;
          margin: 56px 8px;
          width: 4px;
          height: 4px;
          background: #1ADEE0;
          border-radius: 50%;
          border: 1px solid #1ADEE0;
        }
        .redcircle{
          position: absolute;
          margin: 56px 10px;
          width: 4px;
          height: 4px;
          background: #e07b69;
          border-radius: 50%;
          border: 1px solid #e07b69;
        }
      }
      .content{
        position: relative;
        top:18px;
        left:-58px;
        display:inline-block;
        height: 30px;
        border: #1ADEE0;
        font-size:12px;
        color:#626262;
      }
      .content1{
        display:block;
        width:40%;
        margin-top:-45px;
        margin-left:51px;
        font-size:12px;
        color:#626262;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .right{
    float:right;
    height:60rpx;
    width:20%;
    font-size:13px;
    line-height: 60rpx;
    color: #C8C8C8;
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
</style>
