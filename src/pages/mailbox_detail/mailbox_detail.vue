<template>
    <div class="mailbox_detailContainer">
      <div class="receiving_img">
        <div class="content_font">
          <div class="right">
            <p>To:用户名</p>
            <p>2020.4.21</p>
          </div>
          <div class="left">
            <!--                <img src="../../../static/images/system_info.png" alt="">邮票-->
            邮票
          </div>
        </div>
        <div class="cover">
          <div class="box1"></div>
          <div class="box2"></div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped lang="scss">
.mailbox_detailContainer{
  display:flex;
  flex-direction:column;
  background-color: #f0faff;
  .receiving_img{
    .cover .box1{
      margin-top:.05rem;
      height:1rem;
      width:100%;
      /*border:1px solid darkslategray;*/
      position:relative;
      background:conic-gradient(transparent 23%,#fde5ca 0,#fde5ca 77%,transparent 0);
    }//底部
    .cover .box1::before{
      content:"";
      position:absolute;
      top:0px;
      border-top:.06rem solid transparent;
      border-bottom: .03rem solid transparent;
      border-right: .2rem solid #d29d65;
    }//右三角
    .cover .box1::after{//左三角
      content:"";
      position:absolute;
      top:0;
      right:0;
      border-top:.06rem solid transparent;
      border-bottom: .03rem solid transparent;
      border-left: .2rem solid #d29d65;
    }
    .content_font{
      overflow:hidden;
      width:91%;
      text-align:center;
      padding:20px 10px;
      height:350px;
      background:#fff;
      border-top:10px solid #eee;
      /*border-right:10px solid #eee;*/
      /*border-left:10px solid #eee;*/
      box-shadow: 0 0 10px rgba(0,0,0,0.10);
      margin:0 auto;
      margin-bottom:-60px;
      border-image:repeating-linear-gradient(-45deg,transparent 0,transparent 0.5rem,#ffc9c7 0,#ffc9c7 1rem,#dcedff 0,transparent 0,transparent 1.5rem,#dcedff 0,#dcedff 2rem) 20;
      .right{
        float:left;
      }
      .left{
        float:right;
      }
    }
  }
}

</style>
