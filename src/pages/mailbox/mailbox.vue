<template>
    <div class="mailbox_container">
      <van-tabs @click="onClick($event)">
        <van-tab title="收信箱">
          <div class="receiving">
          <div class="receiving_box">
            <div class="receiving_information">
              <span></span>
              <img src="../../../static/images/2.jpg" alt="">
              <span>解忧秒新人用户名</span>
              <img  class="small" src="../../../static/images/small.png" alt="">
              <span>存入草稿箱</span>
            </div>
          </div>
          <div class="receiving_img">
              <div class="content_font">
                <div class="right">
                  <p><span>To:</span>用户名</p>
                  <p>2020.4.21</p>
                </div>
                <div class="left">
                  <img src="../../../static/images/2.jpg" alt="">
                </div>
              </div>
              <div class="cover">
                <div class="box1"></div>
                <div class="box2"></div>
              </div>
            </div>
        </div>
          <div class="receiving">
            <div class="receiving_box">
              <div class="receiving_information">
                <span></span>
                <img src="../../../static/images/2.jpg" alt="">
                <span>解忧秒新人用户名</span>
                <img  class="small" src="../../../static/images/2.jpg" alt="">
              </div>
            </div>
            <div class="receiving_img">
              <div class="content_font">
                <div class="right">
                  <p><span>To:</span>用户名</p>
                  <p>2020.4.21</p>
                </div>
                <div class="left">
                  <img src="../../../static/images/2.jpg" alt="">
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
          <div class="post_letterBox">
            <div class="post_box">
                <div class="receiving_information">
                  <span></span>
                  <img src="../../../static/images/2.jpg" alt="">
                  <span>解忧秒新人用户名</span>
                  <img  class="small" src="../../../static/images/small.png" alt="">
                  <span>存入草稿箱</span>
                </div>
              </div>
            <div class="post_img">
                <div class="content_font">
                  <div class="right">
                    <p><span>To:</span>用户名</p>
                    <p>2020.4.21</p>
                  </div>
                  <div class="left">
                    <img src="../../../static/images/2.jpg" alt="">
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
    export default {
        data () {
            return {
                active:'0'
            }
        },
        methods: {
            onClick (event) {
                console.log(event)
                this.title = '点击标签'+event.mp.detail.name;
                this.icon='none';
            }
        }
    }
</script>

<style scoped lang="scss">
  .mailbox_container{
    display:flex;
    flex-direction:column;
    .receiving{
      width:90%;
      margin: auto;
      border-top: 1px solid #f5f5f5;
      border-bottom: 0.5px solid #f5f5f5;
      height:5.8rem;
      .receiving_box{
        /*border:1px solid pink;*/
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
            line-height: 100px;
            float:left;
            font-weight:40px;
            span{
              font-size:24px;
            }
          }
          .left{
            float:right;
            img{
              height:2rem;
              width: 2rem;
              /*vertical-align:middle*/
            }
          }
        }
      }
    }

  }

</style>
