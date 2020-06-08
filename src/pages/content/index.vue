<template>
  <div class="mainBox">
    <!-- 动态 -->
    <div class="articleBox"  >
      <div class="article-persons-head">
        <img :src="dataContent.user.avatarUrl" alt="头像" class="perImg" >
        <span>{{dataContent.user.nickname}}</span>
        <div class="time">{{dataContent.gmtCreate}}</div>
      </div>
      <div class="article-persons-content">
        <div class="details">{{dataContent.content}}
        </div>
        <div class="picBox">
          <img :src="imgs" alt="" v-for="(imgs,key) in dataContent.pictureUrls" :key="key">
        </div>
      </div>
      <div class="footer" @click="startThings" :data-user="dataContent.user.userId">
        <div :class="'give iconfont icond '+ {'iconliked':liked}" data-choose="like">{{likenum > 99 ? '99+' : likenum}}</div>
        <div class="comment iconfont iconc" data-choose="comment" >{{commentsCount > 99 ? '99+' : commentsCount}}</div>
      </div>
    </div>
    <!-- 文章 -->
    <div class="commentBox">
      <div class="title iconComments iconfont1" @click="showComments">评论({{commentsCount}})</div>
      <div :class="'commentList '+ {'show':check}">
          <div class="comments" v-for="(item,index) in dataComments" :key="index" :id="item.id">
            <div class="head">
              <img :src="item.user.avatarUrl" alt="头像" class="perImg">
              <span>{{item.user.nickname}}</span>
              <span :class="'hidden ' + {'label':item.user.role}">暖心师</span>
            </div>
            <div class="content">
              {{item.content}}
            </div>
            <footer class="footer" @click="startComment" :data-user="item.user.userId" :data-parents="item.id">
              <div class="comment iconfont iconc" >{{item.replyCount}}</div>
            </footer>
            <div class="answerList" >
              <div class="answers"   v-for="(sec,key) in test[item.id]" :key="key" :v-if="(item.replyCount > 0)" @click="startComment" :data-user="sec.user.userId" :data-parents="item.id">
                <div class="nameHead">
                  <span>{{sec.user.nickname}}</span>
                  回复
                  <span>{{sec.replyUserNickname}}</span>
                </div>
                <div class="details">
                  {{sec.content}}
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    <!-- 评论 -->
    <div class="discussBox">
      <textarea name="" id="dicuss" placeholder="我要评论" fixed="true" :focus="dicussShow" cursor-spacing="10" @blur="dicussLeft" @input="discussInput" maxlength="200" :value="replyContent"></textarea>
      <button class="postBtn" @click="postComments">发送</button>
    </div>
  </div>
</template>

<script>
import $http from '../../../static/plugins/ajax';

export default {
  data:{
    dicussShow:false,
    commentsCount: 0,//动态总数
    comments:'hidden',//点击显示评论
    dataContent:{},//动态详情
    liveMessageId:null,//动态id
    dataComments:null,//评论数据
    check:false,//节流阀
    secondComments:{},//二级评论
    replyId:null,//回复者
    replyContent:null,
    replyParent:null,
    test:null,
    liked:null,//记录like值
    likenum:0,//记录like数量
    commentsNum:1,
    defaultId:null
  },
  methods:{
    startThings(e){
      // console.log(e.mp.target.dataset.choose);
      let choose = e.mp.target.dataset.choose;
      choose === "comment" ? this.startComment(e) : (choose === "like" ? this.changeLike() : null);
    },
    changeLike(e){
      let _this = this;
      if(this.liked){
        $http.myAxios({
          url:'/jieyou/api/like/liveMessage/'+ this.liveMessageId,
          header : {
              'content-type': 'application/x-www-form-urlencoded',
              "token": wx.getStorageSync('token')
          },
          method:'delete'
        }).then(res=>{
          console.log(res);
          this.liked = false
          if(this.likenum === 0) return
          this.likenum--;
        }).catch(err=>{
          console.log(err);
        });
        return;
      }
      $http.myAxios({
          url:'/jieyou/api/like/liveMessage/'+ this.liveMessageId,
          header : {
              'content-type': 'application/x-www-form-urlencoded',
              "token": wx.getStorageSync('token')
          },
          method:'post'
        }).then(res=>{
          console.log(res);
          this.liked = true;
          if(this.likenum >= 100) {
            this.likenum = '99+';
            return;
          }
          this.likenum++;
        }).catch(err=>{
          console.log(err);
        });
    },
    startComment(e){//聚焦评论框
      // console.log(e);
      this.replyParent = e.currentTarget.dataset.parents;
      this.replyId = e.currentTarget.dataset.user;
      // this.liveMessageId = e.currentTarget.dataset.user;
      return this.dicussShow = true;
    },
    dicussLeft(e){
      // console.log(e);
      return this.dicussShow = false;
    },
    discussInput(e){
      this.replyContent = e.target.value;
    },
    showComments(e){//显示评论
      let _this = this;
      if(this.check) {
        this.check = false;
        return;
      }
      
      $http.myAxios({
        url:'/jieyou/api/comment/liveMessage/'+ _this.liveMessageId,
        data:{
          pageNum: _this.commentsNum,
          pageSize: 10
        }
      }).then(res=>{
        return _this.dataComments = res.object;
      }).then( res=>{
        console.log(res);
        res.forEach(async (item,index)=>{
          return await this.loadData(item.id);
        })
      }).then( res=>{
        let time = setTimeout(()=>{
          clearInterval(time);
          _this.test = _this.secondComments;
          // this.comments = this.comments === 'show' ? 'hidden' : 'show';
          this.check = true;
          // console.log(_this.test);
        },1000)
        
      });
    },
     loadData(commentId){//获取二级评论
      let _this = this;
       $http.myAxios({//获取内容
        url:'/jieyou/api/comment/' + commentId + '/subComment',
        data:{
          commentId
        }
      }).then(res=>{
        _this.secondComments[commentId] = (res.object);
        // console.log(typeof commentId);
        
        // _this.secondCommentscommentId = res.object;
        //  return res.object;

        // console.log(res.object);
        // _this.commentsCount = _this.dataContent.commentCount
      }).catch(err=>{
        console.log(err);
      });
    },
    postComments(e){//提交评论数据
      // console.log(this.liveMessageId,this.replyParent,);
      let _this = this;
      this.replyId = this.replyId || null;
      this.replyParent = this.replyParent || null;
      $http.myAxios({
        url:'/jieyou/api/comment/liveMessage',
        method:'post',
        data:{
          content: _this.replyContent,
          liveMessageId:_this.liveMessageId,
          replyUserId: _this.replyId,
          parentId:_this.replyParent
        }
      }).then(res=>{
        console.log(res);
        _this.replyContent = null;
        _this.commentsCount++;
      }).catch(err=>{
        console.log(err);
      })
    }
  },
  onLoad(e){//加载数据
    this.liveMessageId = e.id;
    this.dataContent = {};
  },
  onShow(){
    let _this = this;
    $http.myAxios({//获取内容
      url:'/jieyou/api/liveMessage/'+this.liveMessageId,
    }).then(res=>{
      _this.dataContent = res.object;
      // console.log( _this.dataContent);
      _this.commentsCount = _this.dataContent.commentCount;
      _this.liked = _this.dataContent.isLike;
      _this.likenum = _this.dataContent.likeCount;
      this.check = false;
      this.secondComments = {};
      this.dataComments = null;
      this.commentsNum = 1;
    }).catch(err=>{
      console.log(err);
    })
  },
  onPullDownRefresh(e){
    this.check = false;
    this.secondComments = {};
    this.dataComments = null;
    this.commentsNum = 1;
    let time = setTimeout(async ()=>{
      clearInterval(time);
      await this.showComments();
      wx.hideNavigationBarLoading();
    },1000);

  },
  onReachBottom: function () {//下拉刷新
    var _this=this;
    if(this.dataComments.length < 10 || !this.check) return;
    $http.myAxios({
      url:'/jieyou/api/comment/liveMessage/'+ _this.liveMessageId,
      data:{
        pageNum: ++_this.commentsNum,
        pageSize: 10
      }
    }).then(results=>{
      // _this.dataList = results.object;
      results.object.forEach(async item=>{
        await _this.dataComments.push(item);
        await _this.loadData(item.id);
      })
      console.log(_this.dataComments);
      let time = setTimeout(()=>{
        clearInterval(time);
        // console.log(_this.secondComments);
        
         _this.test = _this.secondComments;
        // _this.secondComments = null;
        
        this.check = true;
      },1000)
    })
  },
}
</script>

<style scoped lang="scss">
@import url('../../../static/fonts/invitation/index.css');

$padding: .2rem;

.show{
  display: block!important;
}

.hidden{
  display: none;
}

.mainBox {
    font-size: 100rpx;
    // padding: $padding;
    overflow-x: hidden;
    font-family: "微软雅黑";
}

//头像
.perImg{
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 3%;
  transform: translateY(-50%);
}
//回复
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

.articleBox{
  padding: $padding;
  margin: $padding;
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
          margin-top: .2rem;
          color: rgb(117,122,125);
        }
        .picBox{
          margin: $padding 0;
          img{
            height: 2rem;
            width: 30%;
            margin-left: $padding;
          }
        }
      }
      
    }
  }
  
}

.commentBox{
  font-size: .32rem;
  margin: $padding $padding 18% $padding ;
  .title{
    font-size: .35rem;
    margin-top: .2rem;
    border-bottom: 2rpx solid rgb(215, 215, 215);
    padding: .1rem ;
  }
  .commentList{
    display: none;
    .comments{
      padding: $padding;
      position: relative;
      min-height: 2rem;
      margin: .24rem auto;
      border-bottom: 1rpx solid #EEEEEE;
      // text-align: center;
      .head{
        position: relative;
        height: .8rem;
        line-height: 0.8rem;
        span{
          position: relative;
          left: 15%;
          // top: 50%;
          transform: translateY(-50%);
          color: rgba($color: #000, $alpha: .8);
          font-size: .25rem;
        }
        .label{
          display: inline;
          border: 1px solid #CCD63A;
          left: 20%;
          border-radius: .25rem;
          padding: .05rem;
          color: #CCD63A;
        }
      }
      .content{
        margin: .2rem auto;
        font-size: .28rem;
        color: #565656;
        text-align: left;
      }
      .footer{
        .comment{
        color: #5990E7;
        }
      }
      .answerList{
        background: #F1F1F1;
        width: 90%;
        margin: auto;
        // height: 1rem;
        .answers{
          padding: $padding;
          color: #7A7A7A;
          border-bottom: 1rpx solid #BCBCBC;
          font-size: .25rem;
          .nameHead{
            span{
              font-weight: 555;
              color: #000;
            }
          }
        }
      }
    }
  }
}

.discussBox{
  position: fixed;
  font-size: .3rem;
  height: auto;
  bottom: 0;
  background: #fff;
  z-index: 100;
  width: 100%;
  border-top: 2rpx solid #d7d7d7;
  .postBtn{
    background: #00B26A;
    color: #fff;
    height: 0.72rem;
    line-height: 0.72rem;
    margin: .24rem .08rem;
    padding: .35rem auto;
    width: 20%;
    font-size: .3rem;
    float: left;
  }
  #dicuss{
    padding: $padding;
    margin: $padding .08rem;
    border: 2rpx solid rgb(215, 215, 215);
    border-radius: 10rpx;
    height: 0.35rem;
    line-height: 0.35rem;
    width: 70%;
    float: left;
  }
  &::after{
    content: '';
    clear: both;
    display: block;
  }
}
</style>