<template>
    <div class="mailbox_detailContainer">
      <div class="receiving_img" v-if="id">
        <div class="content_font">
          <div class="right">
            <p class="mail_name" v-if="sendLetter_detail.fromUser">To:{{sendLetter_detail.fromUser.nickname}}</p>
            <p class="mail_time">{{sendLetter_detail.gmtCreate}}</p>
            <p class="mail_content">
              &nbsp&nbsp&nbsp{{sendLetter_detail.sendContent}}
            </p>
            <p  class="none">
            </p>
          </div>
          <div class="left">
          </div>
        </div>
        <div class="cover">
          <div class="box1"></div>
          <div class="box2"></div>
        </div>
      </div>
      <div class="receiving_img" v-if="!id">
        <div class="content_font">
          <div class="right">
            <p class="small" v-if="receiveLetter_detail.toUser" @tap="toReplyLetter(indexId,receiveLetter_detail.toUser.nickname)" >回信 <img class='small_img' src="../../../static/images/love.png" alt=""></p>
            <p class="mail_name" v-if="receiveLetter_detail.fromUser">From:{{receiveLetter_detail.fromUser.nickname}}</p>
            <p class="mail_time">{{receiveLetter_detail.gmtCreate}}</p>
            <p class="mail_content">
              &nbsp&nbsp&nbsp{{receiveLetter_detail.sendContent}}
            </p>
            <p  class="none">
            </p>
          </div>
          <div class="left">
          </div>
        </div>
        <div class="cover">
          <div class="box1"></div>
          <div class="box2"></div>
        </div>
      </div>
    </div>
</template>

<script>
  import {get} from '@/util'
  import {mapState} from 'vuex'
    export default {
        data(){
            return{
                sendLetter_detail:{},
                receiveLetter_detail:{},
                id:'',
                indexId:'',
            }
        },
        computed: {
            ...mapState(['sendLetter','receiveLetter'])
        },
        methods:{
            toReplyLetter(indexId,name){
                //跳转到回信详情页面
                wx.navigateTo({
                    url:'/pages/replyLetter/main?indexId='+indexId +'&name='+name
                })
            },
            async getSendLetter_detail(){
                //寄信箱详情通知
                try {
                    let header = {
                        'token': wx.getStorageSync('token'),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                    let that = this
                    that.id = that.sendLetter[this.$mp.query.item].sourceId
                    const url='/jieyou/api/letter/'+that.id
                    const res = await get(url,'',header)
                    that.sendLetter_detail=res.data.object
                    console.log( '222s',that.sendLetter_detail)
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },
            async getReceiveLetter_detail(){
                //寄信箱详情通知
                try {
                    let header = {
                        'token': wx.getStorageSync('token'),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                    let that = this
                    that.indexId =that.receiveLetter[this.$mp.query.index].sourceId
                    const url='/jieyou/api/letter/'+that.indexId
                    const res = await get(url,'',header)
                    that.receiveLetter_detail=res.data.object
                    console.log( '222s',that.receiveLetter_detail)
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },
        },
       beforeMount(){
            if(this.$mp.query.index){
                this.getReceiveLetter_detail()
            }
            if(this.$mp.query.item){
                this.getSendLetter_detail()
            }
        },
    }
</script>

<style scoped lang="scss">
.mailbox_detailContainer{
  display:flex;
  flex-direction:column;
  background-color: #f0faff;
}
.receiving_img{
  .cover .box1{
    margin-top:.05rem;
    height:1rem;
    width:100%;
    /*border:1px solid darkslategray;*/
    position:relative;
    background:conic-gradient(transparent 23%,#fde5ca 0,#fde5ca 77%,transparent 0);
  }//底部
  .cover .box1::before{
    content:"";
    position:absolute;
    top:0px;
    border-top:.06rem solid transparent;
    border-bottom: .03rem solid transparent;
    border-right: .2rem solid #d29d65;
  }//右三角
  .cover .box1::after{//左三角
    content:"";
    position:absolute;
    top:0;
    right:0;
    border-top:.06rem solid transparent;
    border-bottom: .03rem solid transparent;
    border-left: .2rem solid #d29d65;
  }
  .content_font{
    overflow:hidden;
    width:91%;
    text-align:center;
    padding:20px 10px;
    height:auto;
    background:#fff;
    border-top:10px solid #eee;
    /*border-right:10px solid #eee;*/
    /*border-left:10px solid #eee;*/
    box-shadow: 0 0 10px rgba(0,0,0,0.10);
    margin:0 auto;
    margin-bottom:-60px;
    border-image:repeating-linear-gradient(-45deg,transparent 0,transparent 0.5rem,#ffc9c7 0,#ffc9c7 1rem,#dcedff 0,transparent 0,transparent 1.5rem,#dcedff 0,#dcedff 2rem) 20;
    .right{
      /*float:left;*/
      .small{
        /*float:right;*/
        /*height:0.4rem;*/
        /*width:0.4rem;*/
        /*vertical-align:middle;*/
        margin-left:60%;
        color:#D34D3C;
        font-size:16px;
        font-weight:bold;
        .small_img{
          height:0.4rem;
          width:0.4rem;
        }
      }
      .mail_name{
         font-size:20px;
         //font-weight:bold;
         line-height:60px;
       }
      .mail_time{
        font-size:16px;
        //font-weight:bold;
        line-height:40px;
      }
      .mail_content {
        /*设置文本的行距及下划线*/
        display: inline;
        padding-bottom: 4px;
        border-bottom: 1px dashed #b5b8b8;
        position: relative;
        line-height: 38px;

        &:before {
          width: 493px;
          height: 1px;
          display: inline-block;
          position: absolute;
          bottom: -1px;
          content: "";
          // e3ddd1 f4efe8
          background: #f4efe8;
          border-bottom: none;
        }

        &:after {
          position: absolute;
          content: "";
          width: 493px;
          bottom: 0;
          left: 0;
          height: 1px;
          display: inline-block;
          border-bottom: 1px dashed #b5b8b8;
        }
      }
      .none{
        height:80px;
        width:100%;;
      }
    }
    .left{
      /*float:right;*/
    }
  }
}
</style>
