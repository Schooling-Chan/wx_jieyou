<template>
  <div class="mainBox">
    <!-- 搜索 -->
    <div class="searchBox">
      <div class="inputBox" @click="goSearch">
        <text class="iconfont iconsearch"></text>
        <div class="inputBox-tips">疑难解答</div>
      </div>
    </div>

    <!-- 写信 -->
    <div class="writeBox">
      <div class="title"><div class="title-text">暖心时刻</div></div>
      <div class="writeBox-content">
        <div class="writeBox-content-wletter">
          <div class=" iconxinfeng iconfont"></div>
          <div class="wletter-title">写信</div>
          <div class="wletter-tips">倾述你的烦恼，释放自己</div>
        </div>
        <div class="writeBox-content-special">
          <div class="hletter">
            <div class=" iconhuixin iconfont"></div>
            <span class="wletter-title">回信</span>
          </div>
          <div class="questions" @click="goSearch">
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
           <text @click="changeTab" :class="{'active': tabIndex == 0}" data-id="0">最新动态</text>
           <text @click="changeTab" :class="{'active': tabIndex == 1}" data-id="1">热门动态</text>
        </scroll-view>
      </div>
      <swiper class="swiperBox" :current="tabIndex" @change="pageChange" ><!--:style="{height:allHeight.swiperBox +'px'}"-->
        <swiper-item >
          <scroll-view class='scroll-view-list'  style="height: 100%; width: 100%" scroll-y="true"  scroll-x="false" scroll-with-animation @scroll="scrollH" :throttle="false">
            <!-- 热门帖子 -->
            <div class="invitationBox">
              <div class="title"><div class="title-text">热门动态</div></div>
              <div class="invitation">
                <a class="invitation-persons" @click='goPage' data-id="2222">
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
                </a>
                <a class="invitation-persons">
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
                </a>
                <a class="invitation-persons">
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
                </a>
                <a class="invitation-persons">
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
                </a>
                <a class="invitation-persons">
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
                </a>
              </div>
            </div>
          </scroll-view>
        </swiper-item>
        <swiper-item>
          <scroll-view style="height: 100%; width: 100%" scroll-y="true"  scroll-with-animation @scroll="scrollH" :throttle="false">
            <!-- 热门帖子 -->
            <div class="invitationBox">
              <div class="title"><div class="title-text">最新动态</div></div>
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
          </scroll-view>
        </swiper-item>
      </swiper>
    </div>

  </div>
</template>

<script>


export default {
  data:{
    wHeight:null,
    allHeight:{
      dynamicBox:null,
      searchBox:null,
      writeBox:null
    },
    tabIndex:0,
    changeClass:'dynamicBox',
    temp:null,
    dataList:{}
  },
  methods:{
    getHeight:function(ele){
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
    changeTab(e){
      this.tabIndex = e.currentTarget.dataset.id * 1;
    },
    pageChange(e){
      let _this = this;
  
      if ("touch" === e.mp.detail.source) {
          this.tabIndex = e.target.current;
      }
    },
    goPage(e){
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({url:"../content/main?id=" + id});
    },
    goSearch(e){
      wx.navigateTo({url:"../search/main" });
    },
    scrollH(e) {
      let scrollTop = e.mp.detail.scrollTop;
      if(this.temp === null){
        this.temp = this.allHeight.dynamicBox;
      }

      scrollTop > 5 ? (this.allHeight.dynamicBox=this.wHeight,this.changeClass = 'dynamicBox dynamicBox-active') : null;//dynamicBox-active
      scrollTop === 0 ? (this.allHeight.dynamicBox=this.temp,this.changeClass = 'dynamicBox'):null;
    }
  },
  onLoad:function(){
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.wHeight = res.windowHeight;
      },
    });
    this.getHeight({'searchBox':'.searchBox', 'writeBox':'.writeBox'});
  },
  mounted:function(e){
    this.allHeight.dynamicBox = this.wHeight - this.allHeight.searchBox - this.allHeight.writeBox;
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
    // color: rgb(151, 151, 151);
    &-text {
        width: 28%;
        // text-align: center;
        background: $bg;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        // margin: auto;
    }
    /* &::before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 34%;
        height: 4rpx;
        background: #ccc;
    } */
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
  }

  &-active{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
  }
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
      // box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
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