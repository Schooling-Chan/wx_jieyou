<template>
  <div>
    <div class="top">
    </div>
    <div class="receiving_img">
      <div class="content_font">
        <div class="right">
          <button @click="submit()">完成</button>
          <button @click="submitDraft()">草稿</button>
          <p class="mail_name" > To:{{name}}</p>
          <div class="row">
            <label class="word-count">{{word_count}}/字数</label>
          </div>
          <div class="text_letter mail_content">
                      <textarea
                        class="text_content"
                        v-model='content'
                        :maxlength='number'
                        placeholder="请输入你想对他说的话"
                      ></textarea>
            <div>
            </div>
          </div>
          <p  class="none"></p>
        </div>
        <div class="left">
          <!--            邮票-->
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
    import {put,showSuccess,get} from '@/util'
    import {mapState} from 'vuex'
    export default{
        data(){
            return{
                number:1200,//信的字数
                word_count: 0,//字数
                content:'',//回信的内容
                id:'',//回信的id
                receive_Letter:{},
                name:'',
            }
        },
        onLoad(){
            wx.setNavigationBarTitle({
                title: '回信'
            })
        },
        computed: {
            ...mapState(['receiveLetter','replyDraft'])
        },
        watch:{
            content () {
                this.word_count = this.content.length//监听以写的字数
            },
        },
        beforeMount(){
            if(this.$mp.query.indexId){
                this.id=this.$mp.query.indexId
                this.name=this.$mp.query.name
            }
            if(this.$mp.query.draft_id){
                this.getReply_draft()
            }
        },
        methods:{
            async reyplyLetter(){
                try {
                    let that = this
                    const params = {
                        'letterId': that.id,
                        'content': that.content,
                    }
                    let header = {
                        'token': wx.getStorageSync('token'),
                        'Content-Type': 'application/json'
                    }
                    const res = await put('/jieyou/api/letter',params, header)
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },
            async reyplyLetterDraft(){
                try {
                    let that = this
                    const params = {
                        'letterId': that.id,
                        'content': that.content,
                    }
                    let header = {
                        'token': wx.getStorageSync('token'),
                        'Content-Type': 'application/json'
                    }
                    const res = await put('/jieyou/api/letter/draft',params, header)
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },
            submit(){
                if(this.word_count){
                    this.reyplyLetter()
                    showSuccess('发送成功')
                    this.content=''
                    this.name=''
                }else{
                    showModal('','请编辑要回信的内容哦')
                }
            },
            submitDraft(){
                if(this.word_count){
                    this.reyplyLetterDraft()
                    showSuccess('已存为草稿')
                    this.content=''
                    this.name=''
                }else{
                    showModal('','请编辑要回信的内容哦')
                }
            },
            async getReply_draft(){
                //寄信箱详情通知
                try {
                    let header = {
                        'token': wx.getStorageSync('token'),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                    let that = this
                    that.indexId =that.replyDraft[this.$mp.query.draft_id].sourceId
                    const url='/jieyou/api/letter/'+that.indexId
                    const res = await get(url,'',header)
                    that.reply_draft=res.data.object
                    //console.log( '222s',that.reply_draft)
                    that.name=that.reply_draft.toUser.nickname
                    that.content=that.reply_draft.replyContent
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },
        }
    }
</script>
<style scoped lang="scss" >
  .receiving_img{
    .cover .box1{
      margin-top:.05rem;
      height:1rem;
      width:100%;
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
      // text-align:center;
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
        .mail_name{
          //margin-top: 20px;
          line-height:40px;
          font-size:16px;
          font-weight:bold;
        }
        .mail_content , .text_letter{
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
        .row{
          margin-top: 10px;
          float:right;
        }
        .row , .text_letter{
          margin-top: 10px;
          height:auto;
          font-size:14px;
          .text_content{
            margin-top: 10px;
            height:calc(100vh - 100px);
          }
        }
        button {
          margin-right:6px;
          float:right;
          width:17%;
          border-radius:20px;
          background: #a6d7ff;
          font-size:12px;
          color:#FFFFFF;
        }
        button:last-child{
          margin-right:-5px;
        }
      }
      .left{
        /*float:right;*/
      }
    }
  }
</style>
