<template>
  <main class="mainBox" :style="{height:wHeight+'px'}">
    <div class="mask"></div>
    <div class="searchBox" >
      <div class="iconfont iconback" @click="navback"></div>
      <input placeholder="搜索内容"  name="search" @focus="change" data-id='0' :style="{color:inputColor}" confirm-type='search' v-model="keyword" @confirm="confirm"/>
    </div>
    <div class="cardBox" >
      <div class="cardList" @click="godetails" v-for="(item, index) in dataList" :key="index" :data-id="item.id">
        <div class="title">{{item.question}}</div>
        <div class="content" ><span v-html="item.answer">{{item.answer}}</span></div>
        <div class="iconfont1 iconlook number">{{item.helpfulCount}}</div>
      </div>
    </div>
  </main>
</template>

<script>
import $http from '../../../static/plugins/ajax';

export default {
  data:{
    wHeight:null,
    height:null,
    inputColor:'#CECECE',
    dataList:null,
  },
  methods:{
    navback() {
      wx.navigateBack()
    },
    change(e){
      this.inputColor = '#000';
    },
    confirm(e) {
      console.log(e.target.value);
      $http.myAxios({
        url:'/jieyou/api/faq/help',
        data:{
          question:e.target.value
        }
      }).then(res=>{
        console.log(res);
        this.dataList = res.object;
      }).catch(err=>{
        console.log(err);
      })
    },
    godetails(e){
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({url:"../search_details/main?id=" + id});
    }
  },
  onLoad(){
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.wHeight = res.windowHeight;
        that.height = res.statusBarHeight;
      },
    });
    $http.myAxios({
      url:'/jieyou/api/faq/help',
    }).then(res=>{
      console.log(res);
      this.dataList = res.object;
    }).catch(err=>{
      console.log(err);
      
    })
  }
}
</script>

<style scoped lang="scss">
@import url('../../../static/fonts/invitation/index.css');

$bg:#EFEFEF;
.mainBox {
    background: $bg;
    font-size: 100rpx;
    overflow-x: hidden;
}
.mask{
  position: fixed;
  width: 100%;
  top: 0%;
  height: 4%;
  background: #fff;
  z-index: 100;
}
//searchBox
.searchBox{
  position: fixed;
  width: 100%;
  top: 4%;
  background: #fff;
  color: #000;
  z-index: 100;

  display: flex;
  height: 7%;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 0 .3rem;
  box-sizing: border-box;
  font-size: .3rem;
  border-bottom: 2px solid rgb(215, 215, 215);
  .iconfont{
    width: 0.64rem;
    height: 0.64rem;
    line-height: 0.64rem;
    right: auto;
    bottom: auto;
  }
  input{
    background: #F7F7F7;
    font-size: .3rem;
    color: #CECECE;
    border-radius: 40rpx;
    padding: .1rem .3rem;
    transform: translateX(0.64rem);
  }
}

//cardBox
.cardBox{
  position: relative;
  font-size: .3rem;
  box-sizing: border-box;
  padding: .2rem;
  top: 11%;
  .cardList{
    position: relative;
    min-height: 2rem;
    background: #fff;
    border-radius: 10rpx;
    box-sizing: border-box;
    padding: .3rem .4rem;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    margin: .3rem 0;
    .title{
      font-size: .34rem;
      font-weight: 455;
      font-family: "微软雅黑";
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      display: -webkit-box;
      word-break: break-word;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; 
    }
    .content{
      margin: .24rem auto;
      color: #757a7d;
    }
    .number{
      color: #B8B8B8;
      height: 55rpx;
      line-height: 55rpx;
      font-size: .3rem;
      // left: 14%;
      bottom: 8%;
      transform: translateX(10%);
    }
    
    &:hover{
      background: rgba(255, 255, 255, 0.3);
    }
  }
}
</style>