<template>
  <main class="centerContainer">
    <div class="title">
      <img class="avatarImg" :src="userInfo.avatarUrl" alt="">
      <span class="userName">{{userInfo.nickName}}</span>
      <span class="btn"><van-button round type="info" size="small" color="#01B7FA">退出登录</van-button></span>
    </div>
    <div class="headBox">
      <div class="content">
        <div class="letter"  @tap="toMailBox">
          <div class="letter-pic"><img src="" alt="">
          </div>
          <span class="letter-span">信箱</span>
        </div>
        <div class="drawLetter" @tap="toDrawLetterDetail">
          <div class="drawLetter-pic"><img src="" alt="">
          </div>
          <span class="drawLetter-span">草稿箱</span>
        </div>
        <div class="news" @tap="toCommentsDetail">
          <div class="news-pic"><img src="" alt="">
          </div>
          <span class="news-span">评论</span>
        </div>
      </div>
    </div>
    <div class="information">
      
    </div>
  </main>
</template>
<script>

    // const LOGOUT_URL ="http://120.55.44.167:40001/mock/19/jieyou/api/logout"
    export default {
    data(){
        return{
            userInfo: {},//用户信息
        }
    },
    beforeMount(){
        console.log('---beforeMount---');
        //获取用户登录信息
        this.handleGetUserInfo();
        // this.$fly.get(LOGOUT_URL)
        //     .then( (response) => {
        //         console.log(response);
        //         let moviesArr = response.data.subjects
        //         this.moviesArr = moviesArr
        //     })
        //     .catch( (error) => {
        //         console.log(error);
        //     });
    },
    methods:{
        // 获取用户登录信息
        handleGetUserInfo(){
            wx.getUserInfo({
                success: (data) => {
                    console.log(data);
                    // 更新data中的数据
                    this.userInfo = data.userInfo
                },
                fail: () => {
                    console.log('获取失败');
                }
            })
        },
        toMailBox(){
            //跳转到信箱页面
            wx.navigateTo({
                url: '/pages/mailbox/main'
            })
        },
        toProfileDetail(){
            //跳转到个人资料详情
            wx.navigateTo({
                url: '/pages/profile_detail/main'
            })
        },
        toSystemDetail(){
            //跳转到个人系统消息
            wx.navigateTo({
                url: '/pages/system_detail/main'
            })
        },
        toCommentsDetail(){
            //跳转到个人系统消息
            wx.navigateTo({
                url: '/pages/comments_detail/main'
            })
        },
        toDrawLetterDetail(){
            //跳转到个人系统消息
            wx.navigateTo({
                url: '/pages/drawLetter_detail/main'
            })
        }
    }

}
</script>

<style scoped lang="scss">
.centerContainer{
  display:flex;
  flex-direction:column;
  background-color: white;
  font-size: 60rpx;
  overflow-x: hidden;
}
.title{
  border-bottom:1px solid #f5f5f5;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size:.3rem;
  .avatarImg{
    width:1.5rem;
    height:1.5rem;
    border-radius:.5rem;
}
  .userName {
    font-size:.3rem;
    font-weight: bold;
    padding-left:.3rem;
  }
  .btn{
    margin-left:3rem;
  }

}

.headBox{
  position: relative;
  font-size: .26rem;
  .content{
    background: #fff;
    height: 1.9rem;
    line-height: 1.9rem;
    display: flex;
    overflow: hidden;

    .letter-pic,.drawLetter-pic,.news-pic{
      position: relative;
      height: 1rem;
      width: 1rem;
      line-height: 1rem;
      border-radius: 50%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      img{
        height: 100%;
        width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .letter, .drawLetter,.news{
      height: 1.6rem;
      text-align: center;
      flex: 2;
      display: flex;
      flex-direction: column;
      justify-content:space-around;
      overflow: hidden;
      margin: 0 auto;

      span{
        height: .3rem;
        line-height: .3rem;
        width: 100%;
        margin-top: .39rem;
        display: block;
      }
    }

    .letter .letter-pic{
      background: white;
    }
    .drawLetter .drawLetter-pic{
      background:white;
    }
    .news .news-pic{
      background: white;
    }
  }
}

.information{
  background-color: #d8efff;
  font-size:.26rem;
  margin-top:0.2rem;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
  .system_information, .comments_information,.profile_information{
    overflow: hidden;
    width:100%;
    height:1.5rem;
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
      line-height:1.5rem;
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


</style>
