<template>
    <div class="mailbox_container">
      <van-tabs :active="active" >
        <van-tab title="回信草稿箱">
          <div class="receiving"  @tap="toReply_letter(item)" v-for="(index,item) in replyDraft" :key='index'>
            <div class="receiving_box">
              <div class="receiving_information">
                <span></span>
                <img v-if="replyDraft[item].toUser" :src="replyDraft[item].toUser.avatarUrl" alt="">
                <span v-if="replyDraft[item].toUser">{{replyDraft[item].toUser.nickname}}</span>
              </div>
            </div>
            <div class="receiving_img">
              <div class="content_font">
                <div class="right">
                  <p v-if="replyDraft[item].fromUser"><span>From:</span>{{replyDraft[item].fromUser.nickname}}</p>
                  <p class="ct">&nbsp&nbsp{{replyDraft[item].content}}</p>
                  <p>{{replyDraft[item].gmtCreate}}</p>
                </div>
                <div class="left">
                  <img src="../../../static/images/youchuo.jpg" alt="">
                </div>
              </div>
              <div class="cover">
                <div class="box1"></div>
                <div class="box2"></div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="寄信草稿箱">
          <div class="receiving" @tap="toSend_letter(item)" v-for="(index,item) in sendLetterDraft" :key='index'>
            <div class="receiving_box">
              <div class="receiving_information">
                <span></span>
                <img v-if="sendLetterDraft[item].toUser" :src="sendLetterDraft[item].toUser.avatarUrl" alt="">
                <span v-if="sendLetterDraft[item].toUser">{{sendLetterDraft[item].toUser.nickname}}</span>
              </div>
            </div>
            <div class="receiving_img">
              <div class="content_font">
                <div class="right">
                  <p v-if="sendLetterDraft[item].fromUser"><span>To:</span>{{sendLetterDraft[item].fromUser.nickname}}</p>
                  <p class="ct">&nbsp&nbsp{{sendLetterDraft[item].content}}</p>
                  <p>{{sendLetterDraft[item].gmtCreate}}</p>
                </div>
                <div class="left">
                  <img src="../../../static/images/youchuo.jpg" alt="">
                </div>
              </div>
              <div class="cover">
                <div class="box1"></div>
                <div class="box2"></div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data(){
            return{
                active:'',
                replyLetterDraft:'',
            }
        },
        computed: {
            ...mapState(['replyDraft','sendLetterDraft'])
        },
        methods:{
            toReply_letter(draft_id){
                //跳转到回信页面
                wx.navigateTo({
                    url:'/pages/replyLetter/main?draft_id='+draft_id
                })
            },
            toSend_letter(draft_id){
                //跳转到写信页面
                wx.navigateTo({
                    url:'/pages/write_letter/main?draft_id='+draft_id
                })
            }
        }
    }
</script>

<style scoped lang="scss">
  .mailbox_container{
    font-size:16px;
    display:flex;
    flex-direction:column;
    .receiving{
      width:90%;
      margin: auto;
      border-top: 1px solid #f5f5f5;
      border-bottom: 0.5px solid #f5f5f5;
      height:5.8rem;
      .receiving_box{
        font-size:.26rem;
        margin-top:0.2rem;
        margin-left: 0.2rem;
        margin-right: 0.2rem;
        .receiving_information{
          overflow: hidden;
          width:100%;
          height:1rem;
          margin-bottom:.2rem;
          flex-direction:row;
          vertical-align:middle;
          img{
            height:0.8rem;
            width: 0.8rem;
            vertical-align:middle
          }
          span{
            display:inline;
            height:100%;
            line-height:1rem;
            vertical-align:middle
          }
          .small{
            /*float:right;*/
            height:0.4rem;
            width:0.4rem;
            vertical-align:middle;
            margin-left:60%;
            color:#D34D3C;
            font-size:16px;
            font-weight:bold;

          }
        }
      }
      .receiving_img{
        .content_font{
          overflow:hidden;
          width:91%;
          text-align:center;
          padding:20px 10px;
          height:150px;
          background:#fff;
          border-top:10px solid #eee;
          border-right:10px solid #eee;
          border-left:10px solid #eee;
          border-bottom:10px solid #eee;
          box-shadow: 0 0 10px rgba(0,0,0,0.10);
          margin:0 auto;
          margin-bottom:-60px;
          border-image:repeating-linear-gradient(-45deg,transparent 0,transparent 0.5rem,#ffc9c7 0,#ffc9c7 1rem,#dcedff 0,transparent 0,transparent 1.5rem,#dcedff 0,#dcedff 2rem) 20;
          .right{
            line-height: 60px;
            float:left;
            font-weight:20px;
            span{
              font-size:20px;
            }
            .ct{
              display:block;
              width:13em;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .left{
            height:2rem;
            width: 2rem;
            float:right;
            img{
              height:2rem;
              width: 2rem;
              /*vertical-align:middle*/
            }
            .yidu{
              height:1rem;
              width: 1.2rem;
            }
          }
        }
      }
    }

  }

</style>
