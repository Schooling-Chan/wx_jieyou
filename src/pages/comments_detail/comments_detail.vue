<template>
    <div class="comments_detailContainer">
      <div class="comments_detail">
        <div class="right">
          <img class='img' src="../../../static/images/youchuo.jpg" alt="">
          <div class="body">
            <p class="nickname">忘忧草</p>
            <p class="time_role">04-13&nbsp&nbsp暖心师</p>
            <p class="content">心念感恩，铭记心中</p>
            <div class="content_link">我是链接</div>
          </div>
        </div>
        <div class="left">
          <span>点赞数</span>
          <span class="like"><img class="like" src="../../../static/images/love1.png" alt=""></span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style scoped lang="scss">
.comments_detailContainer{
  display: flex;
  flex-direction: column;
}
  .comments_detail{
    height:400px;
    width:100%;
    .right{
      float:left;
      .img{
       // background-color:#1ADEE0;
        float:left;
        width: 60px;
        height:60px;
        border-radius: 50%;
        //border: 1px white solid;
      }
      .body{
        float:right;
        .nickname{
          margin-top:5px;
          font-size:16px;
        }
        .time_role{
          color: #C8C8C8;
          font-size:13px;
          line-height: 20px;
        }
        .content{
          font-size:16px;
        }
      }
    }
    .left{
      float:right;
      color: #C8C8C8;
      font-size:13px;
      .like{
        margin-left: 5px;
        margin-right: 5px;
        width:15px;
        height:15px;
      }
    }
  }

</style>

