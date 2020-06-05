<template>
    <div class="mailbox_container">
      <van-tabs @click="onClick($event)">
        <van-tab title="收信箱">
          <div class="receiving" @tap="toMailboxDetail_Receive(item)" v-for="(index,item) in receiveLetter" :key='index'>
            <div class="receiving_box">
              <div class="receiving_information">
                <span></span>
                <img v-if="receiveLetter[item].toUser" :src="receiveLetter[item].toUser.avatarUrl" alt="">
                &nbsp&nbsp<span v-if="receiveLetter[item].toUser">{{receiveLetter[item].toUser.nickname}}</span>
              </div>
            </div>
            <div class="receiving_img">
              <div class="content_font">
                <div class="right">
                  <p v-if="receiveLetter[item].fromUser"><span>From:  </span>{{receiveLetter[item].fromUser.nickname}}</p>
                  <p class="ct">&nbsp&nbsp{{receiveLetter[item].content}}</p>
                  <p>{{receiveLetter[item].gmtCreate}}</p>
                </div>
                <div class="left">
                  <img src="../../../static/images/youchuo.jpg" alt="">
                  <img v-if="receiveLetter[item].isRead" class="yidu" src="../../../static/images/yidu.png" alt="">
                  <img v-if="!receiveLetter[item].isRead" class="yidu" src="../../../static/images/weidu.png" alt="">
                </div>
              </div>
              <div class="cover">
                <div class="box1"></div>
                <div class="box2"></div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="寄信箱">
          <div class="receiving" @tap="toMailboxDetail_Send(item)" v-for="(index,item) in sendLetter" :key='index'>
            <div class="receiving_box">
              <div class="receiving_information">
                <span></span>
                <img v-if="sendLetter[item].toUser" :src="sendLetter[item].toUser.avatarUrl" alt="">
                &nbsp&nbsp <span v-if="sendLetter[item].toUser">{{sendLetter[item].toUser.nickname}}</span>
              </div>
            </div>
            <div class="receiving_img">
              <div class="content_font">
                <div class="right">
                  <p v-if="sendLetter[item].fromUser"><span>To:  </span>{{sendLetter[item].fromUser.nickname}}</p>
                  <p class="ct">&nbsp&nbsp{{sendLetter[item].content}}</p>
                  <p>{{sendLetter[item].gmtCreate}}</p>
                </div>
                <div class="left">
                  <img src="../../../static/images/youchuo.jpg" alt="">
                  <img v-if="sendLetter[item].isRead" class="yidu" src="../../../static/images/yidu.png" alt="">
                  <img v-if="!sendLetter[item].isRead" class="yidu" src="../../../static/images/weidu.png" alt="">
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
        data () {
            return {
                active:'0',
                array:{},
            }
        },
        computed: {
            ...mapState(['sendLetter','receiveLetter'])
        },
        mounted(){
            console.log('receiveLetter',this.receiveLetter)
        },
        methods: {
            onClick (event) {
                console.log(event)
                this.title = '点击标签'+event.mp.detail.name;
                this.icon='none';
            },
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
          height:135px;
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
            line-height: 55px;
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
