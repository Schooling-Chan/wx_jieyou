<template>
    <div>
      <div class="system_detail">
        <div class="left">
          <img class="img"  src="../../../static/images/system_detail02.png">
          <span class="name">
            <lable class="info">系统公告</lable>
            <lable class="content">系统的内容hhhhhhhhhhhhhhhhhhhhhh</lable>
          </span>
       </div>
        <div class="right">
            <lable class="time">2020/05/01</lable>
        </div>
      </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped lang="scss">
.system_detail{
  margin-top: 5px;
  background-color:#f5f5f5;
  font-size:14px;
  width:100%;
  height:70px;
  line-height: 80px;
}
  .left{
    position:absolute;
    margin-left: 10px;
    float:left;
    .img{
      background-color:#1ADEE0;
      width: 70rpx;
      height:70rpx;
      margin: 10rpx;
      padding: 20rpx;
      border-radius: 50%;
      border: 1px white solid;
    }
    .name{
      position: relative;
      top:-40px;
      left:15px;
      .info{
        position: relative;
        color:#626262;
      }
      .content{
        position: relative;
        top:30px;
        left:-58px;
        display:inline-block;
        height: 20px;
        border: #1ADEE0;
        font-size:12px;
        color:#626262;
      }
    }
  }
  .right{
    float:right;
    height:60rpx;
    width:20%;
    font-size:13px;
    line-height: 60rpx;
    color: #C8C8C8;
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
