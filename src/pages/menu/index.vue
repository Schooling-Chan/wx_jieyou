<template>
  <div class="mainBox">
    <!-- 搜索 -->
    <div class="searchBox">
      <div class="inputBox" @click="goSearch" data-id="1">
        <text class="iconfont iconsearch"></text>
        <div class="inputBox-tips">搜索暖心师</div>
      </div>
    </div>

    <!-- 写信 -->
    <div class="writeBox">
      <div class="title"><div class="title-text">暖心时刻</div></div>
      <div class="writeBox-content">
        <div class="writeBox-content-wletter" @click="goLetter" data-id="0">
          <div class=" iconxinfeng iconfont"></div>
          <div class="wletter-title">写信</div>
          <div class="wletter-tips">倾述你的烦恼，释放自己</div>
        </div>
        <div class="writeBox-content-special">
          <div class="hletter" @click="goLetter" data-id="1">
            <div class=" iconhuixin iconfont"></div>
            <span class="wletter-title">收信箱</span>
          </div>
          <div class="questions" @click="goSearch" data-id="2">
            <div class=" iconjieda iconfont"></div>
            <span class="wletter-title">疑难解答</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 动态 -->
    <div :class="changeClass " :style="{height:allHeight.dynamicBox +'px'}" >
      <div class="menu">
        <scroll-view scroll-with-animation  scroll-y="true"  >
           <text @click="changeTab" class='active' data-id="0">最新动态</text>
           <!-- <text @click="changeTab" :class="{'active': tabIndex == 1}" data-id="1">信总览</text> -->
        </scroll-view> 
      </div>
      <swiper class="swiperBox" :current="tabIndex" @change="pageChange" >
        <swiper-item>
          <scroll-view class='scroll-view-list' scroll-y scroll-with-animation @scroll="scrollH" :throttle="false" >
            <!-- 热门帖子 -->
            <div class="invitationBox">
              <div class="title"><div class="title-text">最新动态</div></div>
              <div class="invitation">
                <a class="invitation-persons" v-for="(item,index) in dataList" :key="index" @click='goPage' :data-id="item.id" >
                  <div class="invitation-persons-head">
                    <img :src="item.user.avatarUrl" alt="头像" class="perImg">
                    <span>{{item.user.nickname}}</span>
                    <div class="time">{{item.gmtCreate}}</div>
                  </div>
                  <div class="invitation-persons-content">
                    <div class="details">{{item.content}}
                    </div>
                  </div>
                  <div :class="{'picBox':item.pictureUrls} +' clearfix'">
                    <img :src="imgs" alt="" v-for="(imgs,key) in item.pictureUrls" :key="key">
                  </div>
                  <div class="footer">
                    <div class="iconfont iconlook number">{{item.viewCount  > 99 ? '99+' : item.viewCount}}</div>
                    <div :class="'give iconfont icond '+ {'iconliked':item.isLike}" @click="isLike">{{item.likeCount > 99 ? '99+' : item.likeCount}}</div>
                    <div class="comment iconfont iconc">{{item.commentCount > 99 ? '99+' : item.commentCount}}</div>
                  </div>
                </a>
              </div>
            </div>
          </scroll-view>
        </swiper-item>
        <swiper-item>
          <!-- <scroll-view style="height: 100%; width: 100%" scroll-y="true"  scroll-with-animation @scroll="scrollH" :throttle="false">
            <div class="invitationBox">
              <div class="title"><div class="title-text">信总览</div></div>
              <div class="invitation">
              </div>
            </div>
          </scroll-view> -->
        </swiper-item>
      </swiper>
    </div>

  </div>
</template>

<script>
import $http from '../../../static/plugins/ajax';

export default {
  data:{
    wHeight:null,
    wWidth:null,
    allHeight:{
      dynamicBox:null,
      searchBox:null,
      writeBox:null
    },
    tabIndex:0,
    changeClass:'dynamicBox',
    temp:null,
    dataList:[],
    num:1
  },
  methods:{
    getHeight:function(ele){//获取高度
      let query = wx.createSelectorQuery(),
      that = this;
      for (const key in ele) {
          if (ele.hasOwnProperty(key)) {
            const element = ele[key];
            
            query.select(element).boundingClientRect().exec(function (res) {
              if(res.length > 1) res.shift();
              that.allHeight[key] = res[0].height;
            });
          }
        }
      
    },
    changeTab(e){//左右滑动
      this.tabIndex = e.currentTarget.dataset.id * 1;
    },
    pageChange(e){//点击左右变化
      let _this = this;
  
      if ("touch" === e.mp.detail.source) {
          this.tabIndex = e.target.current;
      }
    },
    goPage(e){//进入详情页面
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({url:"../content/main?id=" + id + "&_=" + (+new Date())});
    },
    goLetter(e){
      let id = e.currentTarget.dataset.id;
      if(parseInt(id)===0){
        wx.navigateTo({url:"../write_letter/main"});
        return;
      }
      wx.navigateTo({url:"../mailbox/main"});
    },
    goSearch(e){//进入搜索页面
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({url:"../search/main?id=" + id });
    },
    scrollH(e) {//滑动进入查看动态
      let scrollTop = e.mp.detail.scrollTop,
      time = null;
      if(this.temp === null){
        this.temp = this.allHeight.dynamicBox;
      }

      
      scrollTop > 5 ? (this.allHeight.dynamicBox=this.wHeight,this.changeClass = 'dynamicBox dynamicBox-active') : null;//dynamicBox-active
      scrollTop === 0 ? (time = setTimeout(()=>{
        clearInterval(time);
        this.allHeight.dynamicBox=this.temp;
        this.changeClass = 'dynamicBox';
      }, 150)) :null;
    }
  },
  onLoad:function(){
    let that = this;
    wx.setNavigationBarTitle({
        title: '发现'
    })
    wx.getSystemInfo({
      success: function(res) {
        that.wHeight = res.windowHeight;
        that.wWidth = res.windowWidth;
      },
    });
    this.getHeight({'searchBox':'.searchBox', 'writeBox':'.writeBox'});
  },
  onShow:function(e){
    this.allHeight.dynamicBox = this.wHeight - this.allHeight.searchBox - this.allHeight.writeBox;
    let _this = this;
    ///jieyou/api/liveMessage/latest
    if(this.changeClass === 'dynamicBox dynamicBox-active'){
      this.allHeight.dynamicBox=this.wHeight
    }
    $http.myAxios({
      url:'/jieyou/api/liveMessage/latest',
      data:{
        'pageNum':_this.num,
        'pageSize':10
      }
    }).then(results=>{
      _this.dataList = results.object;
      console.log(_this.dataList);
    })
  },
  onReachBottom: function () {//下拉刷新
    var _this=this;
    if(this.dataList.length < 10) return;
    $http.myAxios({
      url:'/jieyou/api/liveMessage/latest',
      data:{
        'pageNum':++_this.num,
        'pageSize':10
      }
    }).then(results=>{
      // _this.dataList = results.object;
      results.object.forEach(item=>{
        _this.dataList.push(item);
      })
      console.log(_this.dataList);
    })
  },
}
</script>


<style scoped lang="scss">
@import url('../../../static/fonts/invitation/index.css');
$bg:#fff;
$padding: 0 .2rem;
.mainBox {
    background: $bg;
    font-size: 100rpx;
    overflow-x: hidden;
}

.title {
    height: 1rem;
    font-size: .36rem;
    // font-weight: 666;
    margin-top: 10rpx;
    line-height: 1rem;
    background: $bg;
    position: relative;
    &-text {
        width: 28%;
        background: $bg;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }
}

//search
.searchBox{
  height: 1rem;
  background: #fff;
  line-height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 2rpx solid rgb(215, 215, 215);
  border-bottom: 2rpx solid rgb(215, 215, 215);

  .inputBox{
    position: relative;
    width: 80%;
    height: 0.7rem;
    line-height: 0.7rem;
    font-size: .3rem;
    border-radius: 50rpx;
    background: rgb(240, 240, 240);

    .iconfont.iconsearch{
      position: absolute;
      left: 3%;
      top: 0;
      width: 0.4rem;
      height: 0.7rem;
      line-height: 0.7rem;
    }
    &-tips{
      padding: 0 .8rem;
      color: rgb(160, 160, 160);
    }
  }
}


//writeBox
.writeBox{
  padding: $padding;
  font-size: .3rem;
  &-content{
    width: 100%;
    background: #fff;
    height: 2.6rem;
    line-height: 2.6rem;
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
    box-sizing: border-box;
    align-items: center;
    position: relative;


    &>div{
      width: 35%;
      line-height: 2.08rem;
      height: 2.08rem;
      flex: 1;
      // overflow: hidden;
      position: relative;
      
      margin: 0 .2rem;
    }
    &-wletter{
      border-radius: 25rpx;
      border: 1rpx solid #E8E8E8;
      position: relative;
      &:hover{
        background: #EBEFF4;
      }
      .iconfont{
        width: 0.65rem;
        height: 0.65rem;
        line-height: 0.65rem;
        left: 13%;
        top: 13%;
        background: #06E4D3;
        border-radius: 50%;
      }

      .wletter-title{
        font-size: .32rem;
        text-align: center;
        transform: translateY(90%);
        height: 0.45rem;
        line-height: 0.45rem;
      }
      .wletter-tips{
        font-size: .28rem;
        color: #6E7572;
        text-align: center;
        height: 0.45rem;
        transform: translateY(150%);
        line-height: 0.45rem;
        
      }
    }
    &-special{
      &>div{
        border-radius: inherit;
        border: 1rpx solid #E8E8E8;
        width: 98%;
        height: 45%;
        position: relative;
        border-radius: 25rpx;
        overflow: hidden;
        &:hover{
          background: #EBEFF4;
        }
        .wletter-title{
          line-height: 0.3rem;
          text-align: center;
          position: absolute;
          top: 50%;
          left: 40%;
          transform: translateY(-50%);
        }
        .iconfont{
          width: 0.65rem;
          height: 0.65rem;
          line-height: 0.65rem;
          left: 13%;
          top: 13%;
          border-radius: 50%;
        }
      }
      .hletter{
        margin-bottom: .18rem;
        .iconfont{
          background: #00A99D;
        }
      }
      .questions{
        margin-top: .18rem;
        .iconfont{
          background: #856BFF;
        }
      }
    }
  }
}


// .dynamicBox
.dynamicBox{
  position: relative;
  .menu{
    height: 1rem;
    line-height: 1rem;
    font-size: .3rem;
    border-bottom: 1px solid #dfdfdf;
    background: #fff;
    text{
      display: inline-block;
      width: 2rem;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      &.active{
        border-bottom: 2px solid #69C8BB;
        font-weight: 666;
        color: #69C8BB;
        font-size: .35rem;
      }
    }
  }
  .swiperBox{
    margin-top: 2px;
    height: 91%;
    background: #fff;
    .scroll-view-list{
      height: 100%;
    }
  }

  &-active{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
  }
}

.clearfix::after{
  content: '';
  display: block;
  clear: both;
}

//invitationBox
.invitationBox{
  padding: $padding;
  .invitation{
    min-height: 2.5rem;
    
    &-persons{
      min-height: 3.5rem;
      margin: .15rem 0;
      background: #fff;
      border-radius: .15rem;
      border: 1rpx solid rgb(231, 231, 231);
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
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
        
        .iconlook::before{
          font-size: 40rpx;
          height: 40rpx;
          width: 40rpx;
        }
      }

      &-content{
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        // text-align: center;
        padding: .2rem .2rem 0 .2rem;
        min-height: 1.5rem;
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
          color: rgb(117,122,125);
        }
        
      }
      .picBox{
        // display: flex;
        width: 100%;
        // flex-wrap: nowrap;
        overflow: hidden;
        box-sizing: border-box;
        // align-items: center;
        height: 2rem;
        margin: .2rem auto;
        img{
          // flex:1;
          height: 100%;
          float: left;
          width: 30%;
          margin-left: .2rem;
        }
      }
      .footer{
        height: 0.5rem;
        padding: 0.1rem .2rem;
        position: relative;
        font-size: .3rem;
        .comment, .give, .number{
          position: absolute;
          right: 5%;
          transform: translateY(-50%);
        }
        .give{
          right: 21%;
        }
        .number{
          right: 35%;
        }
      }
    }
  }
}
</style>