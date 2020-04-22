<template>
  <div class="main">


    <!-- 热门帖子 -->
    <div class="invitationBox">
      <div class="title"><div class="title-text">热门动态</div></div>
      <div class="invitation">
        <div class="invitation-persons">
          <div class="invitation-persons-head">
            <img src="../../../static/images/1.jpg" alt="头像" class="perImg">
            <span>心猿意马</span>
            <div class="time">2020-01-02 18:00:00 </div>
            <!-- <div class="iconfont icong">1110</div> -->
          </div>
          <div class="invitation-persons-content">
            <div class="invitation-persons-content-title">C/C++语言学习交流qun，从基础到项目实战，全方面系统分享 </div>
            <div class="details">目前信息化产业发展势头很好，互联网就成为了很多普通人想要涉及的行业，因为相比于传统行业，互联网行业涨薪幅度大，机会也多，所以就会大批的人想要转行来学习c++开发。
            目前来讲市场上需要的c++人员非常多，而且按照现在的势头，以后会需要更多的c++开发人员，理由是以后每个人公司都会有自己的网站，有自己的开发部，对于用户体验看的非常重要。所以c++程序员就会很吃香。
            学习c++语言，除了要学习语法，还要学习内存、字符编码、调试技巧以及编程思维，这些知识点本教程都做了详细讲解。
            加入我的C/C++语言学习交流qq裙：110355025，免费领取，整理了一套最新的C语言基础教程。这套「c语言入门教程将多年的编程经验灌输其中，典型的实践派。既适合初学者入门（学习语法），也适合程序员进阶（学习底层）。
            </div>
          </div>
          <div class="footer">
            <div class="give iconfont icond">55</div>
            <div class="comment iconfont iconc">55</div>
          </div>
        </div>
        <div class="invitation-persons">
          <div class="invitation-persons-head">
            <img src="../../../static/images/1.jpg" alt="头像" class="perImg">
            <span>心猿意马</span>
            <div class="time">2020-01-02 18:00:00</div>
          </div>
          <div class="invitation-persons-content">
            <div class="invitation-persons-content-title">C/C++语言学习交流qun，从基础到项目实战，全方面系统分享 </div>
            <div class="details">目前信息化产业发展势头很好，互联网就成为了很多普通人想要涉及的行业，因为相比于传统行业
            </div>
          </div>
          <div class="footer">
            <div class="give iconfont icond">99+</div>
            <div class="comment iconfont iconc">55</div>
          </div>
        </div>
        <div class="invitation-persons">
          <div class="invitation-persons-head">
            <img src="../../../static/images/1.jpg" alt="头像" class="perImg">
            <span>心猿意马</span>
            <div class="time">2020-01-02 18:00:00 </div>
            <!-- <div class="iconfont icong">1110</div> -->
          </div>
          <div class="invitation-persons-content">
            <div class="invitation-persons-content-title">C/C++语言学习交流qun，从基础到项目实战，全方面系统分享 </div>
            <div class="details">目前信息化产业发展势头很好，互联网就成为了很多普通人想要涉及的行业，因为相比于传统行业，互联网行业涨薪幅度大，机会也多，所以就会大批的人想要转行来学习c++开发。
            目前来讲市场上需要的c++人员非常多，而且按照现在的势头，以后会需要更多的c++开发人员，理由是以后每个人公司都会有自己的网站，有自己的开发部，对于用户体验看的非常重要。所以c++程序员就会很吃香。
            学习c++语言，除了要学习语法，还要学习内存、字符编码、调试技巧以及编程思维，这些知识点本教程都做了详细讲解。
            加入我的C/C++语言学习交流qq裙：110355025，免费领取，整理了一套最新的C语言基础教程。这套「c语言入门教程将多年的编程经验灌输其中，典型的实践派。既适合初学者入门（学习语法），也适合程序员进阶（学习底层）。
            </div>
          </div>
          <div class="footer">
            <div class="give iconfont icond">55+</div>
            <div class="comment iconfont iconc">55</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  
}
</script>

<style scoped lang="scss">
@import url('../../../static/fonts/invitation/index.css');

//invitationBox
.invitationBox{
  .invitation{
    
    min-height: 2.5rem;
    &-persons{
      min-height: 3.5rem;
      margin-bottom: .15rem;
      background: #fff;
      border-radius: .15rem;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
      &-head{
        width: 100%;
        height: 1rem;
        font-size: .26rem;
        position: relative;
        border-bottom: 1px solid rgb(237,238,242);
        
        .perImg{
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 3%;
          transform: translateY(-50%);
        }
        span{
          position: absolute;
          font-weight: 666;
          left: 15%;
          top: 18%;
          color: rgba($color: #000, $alpha: .8);
        }
        .time{
          display: inline;
          position: absolute;
          bottom: 5%;
          left: 18%;
          color: rgba($color: #000, $alpha: .5);
        }
      }

      &-content{
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        // text-align: center;
        padding: .2rem .2rem 0 .2rem;
        min-height: 2.5rem;
        &-title{
          font-size: .35rem;
          font-weight: 555;
          overflow-y: hidden;
        }
        .details{
          font-size: .3rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
          display: -webkit-box;
          word-break: break-word;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3; 
          margin-top: .2rem;
          color: rgba($color: #000, $alpha: .7);
        }
        
      }
      .footer{
          height: 0.5rem;
          padding: 0.1rem .2rem;
          position: relative;
          font-size: .3rem;
          .comment, .give{
            position: absolute;
            right: 5%;
            transform: translateY(-50%);
          }
          .give{
            right: 21%;
          }
      }
    }
  }
}
</style>