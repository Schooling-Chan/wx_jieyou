<template>
  <div class="mainBox">
    <div class="articleBox">
      <div class="article-persons-content">
        <div class="article-persons-content-title">C/C++语言学习交流qun，从基础到项目实战，全方面系统分享 </div>
        <span class="iconfont iconlook number">555</span>
        <div class="details">目前信息化产业发展势头很好，互联网就成为了很多普通人想要涉及的行业，因为相比于传统行业，互联网行业涨薪幅度大，机会也多，所以就会大批的人想要转行来学习c++开发。
        目前来讲市场上需要的c++人员非常多，而且按照现在的势头，以后会需要更多的c++开发人员，理由是以后每个人公司都会有自己的网站，有自己的开发部，对于用户体验看的非常重要。所以c++程序员就会很吃香。
        学习c++语言，除了要学习语法，还要学习内存、字符编码、调试技巧以及编程思维，这些知识点本教程都做了详细讲解。
        加入我的C/C++语言学习交流qq裙：110355025，免费领取，整理了一套最新的C语言基础教程。这套「c语言入门教程将多年的编程经验灌输其中，典型的实践派。既适合初学者入门（学习语法），也适合程序员进阶（学习底层）。目前信息化产业发展势头很好，互联网就成为了很多普通人想要涉及的行业，因为相比于传统行业，互联网行业涨薪幅度大，机会也多，所以就会大批的人想要转行来学习c++开发。
        目前来讲市场上需要的c++人员非常多，而且按照现在的势头，以后会需要更多的c++开发人员，理由是以后每个人公司都会有自己的网站，有自己的开发部，对于用户体验看的非常重要。所以c++程序员就会很吃香。
        学习c++语言，除了要学习语法，还要学习内存、字符编码、调试技巧以及编程思维，这些知识点本教程都做了详细讲解。
        加入我的C/C++语言学习交流qq裙：110355025，免费领取，整理了一套最新的C语言基础教程。这套「c语言入门教程将多年的编程经验灌输其中，典型的实践派。既适合初学者入门（学习语法），也适合程序员进阶（学习底层）。
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  onLoad(e){
    let id = e.id;
    console.log(e);
  }
}
</script>

<style scoped lang="scss">
@import url('../../../static/fonts/invitation/index.css');

$padding: .2rem;

.mainBox {
    font-size: 100rpx;
    padding: $padding;
    overflow-x: hidden;
    font-family: "微软雅黑";
}

.number{
  color: #B8B8B8;
  height: 55rpx;
  line-height: 55rpx;
  left: 8%;
  bottom: 8%;
  font-size:35rpx;
  position:relative;
  margin-top: .2rem ;
}

.articleBox{
  padding: $padding;
  border-radius: .15rem;
  border: 1rpx solid rgb(231, 231, 231);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  .article{
    min-height: 2.5rem;
    
    &-persons{
      min-height: 3.5rem;
      margin: .15rem 0;
      background: #fff;
      
      &-head{
        width: 100%;
        height: 1rem;
        font-size: .26rem;
        position: relative;
        border-bottom: 1px solid rgb(237,238,242);
        
        
        span{
          position: absolute;
          // font-weight: 666;
          // color: #1E5CAE;
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
          color: #69C8BB;
          overflow-y: hidden;
        }
        .details{
          font-size: .3rem;
          margin: .2rem auto;
          color: rgb(117,122,125);
        }
        
      }
      
    }
  }
  
}

</style>