<template>
  <div class="mainBox">
    <div class="articleBox">
      <div class="article-persons-content">
        <div class="article-persons-content-title">{{dataDetails.question}} </div>
        <span class="iconfont iconlook number">{{dataDetails.helpfulCount}}</span>
        <div class="details" v-html="dataDetails.answer">{{dataDetails.answer}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $http from '../../../static/plugins/ajax';

export default {
  data:{
    dataDetails:null,
  },
  onLoad(e){
    let id = e.id;
    wx.setNavigationBarTitle({
        title: '化忧百科'
    })
    $http.myAxios({
      url:'/jieyou/api/faq/help/' + id,
      
    }).then(res=>{
      console.log(res);
      this.dataDetails = res.object;
    }).catch(err=>{
      console.log(err);
      
    })
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