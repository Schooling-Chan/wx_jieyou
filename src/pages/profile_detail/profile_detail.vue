<template>
    <div class="profile_container">
      <div class="tip">点击可修改个人头像和昵称哦</div>
      <div class="top">
        <div class="row">
          <lebal class="font">
            头像
          </lebal>
          <lebal class="right_content">
            <img class="img left"  src="../../../static/images/system_info.png">
            <span class="right"> > </span>
          </lebal>
        </div>
      </div>
      <div class="contain">
        <div class="row">
          <lebal class="font">
            昵称
          </lebal>
          <lebal class="right_content">
            <span>忘忧草</span>
            <span class="right"> > </span>
          </lebal>
        </div>
      </div>
      <div class="contain">
        <div class="row">
          <label class="left">
            <img class="img"  src="../../../static/images/system_info.png">
          </label>
          <label class="name">&nbsp;&nbsp;系统消息</label>
          <label class="right">
            >
          </label>
        </div>
        <div class="row">
          <label class="left">
            <img class="img"  src="../../../static/images/profile.png">
          </label>
          <label class="name">&nbsp;&nbsp;我的资料</label>
          <label class="right">
            >
          </label>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
            }
        },
        watch:{
        }
    }
</script>

<style scoped lang="scss">
  .profile_container{
    background-color: #f5f5f5;
  }
  .tip{
    background-color: #f5f5f5;
    height:30px;
    width:100%;
    font-size:12px;
    color: #C8C8C8;
    line-height: 30px;
    padding-left:10px ;
  }
  .top{
    margin-bottom:8px;
    background-color:white;
    overflow:hidden;
    height: 80px;
    width: 100%;
    line-height: 80px;
    .row{
      .font{
        padding-left: 20px;
        height:20px;
        float:left;
        font-size: 18px;
      }
      .right_content{
        float:right;
        overflow: hidden;
        .img{
          float:left;
          width: 80rpx;
          height:80rpx;
          margin: 10rpx;
          padding: 20rpx;
          padding-top: 20rpx;
          border-radius: 50%;
          border: 1px white solid;
        };
        .right{
          padding-left: 15px;
          padding-right: 15px;
          float:right;
          color: #C8C8C8;
        }
      }
    }

  }
  .contain{
    margin-top: 10px;
    background:#FFFFFF;
    font-size:15px;
    .row{
      padding: 0px 18px;
      border-bottom: 1px #E8E8E8 solid;
      height: 55px;
      line-height: 55px;
      .img {
        float:left;
        width: 20px;
        height: 20px;
        padding-top:16px;
      }
      .name {
        float:left;
      }
    }
    .right {
      float: right;
      color: #C8C8C8;
      line-height:55px;
    }
    .left {
      width:80%;
    }
  }
</style>
