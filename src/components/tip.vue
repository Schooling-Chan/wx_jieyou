<template>
  <div class="tip">
    <lable>
      <p>
         你还不是暖心师哦，
        <img class='small_img' src="../../../static/images/love.png" alt="">
      </p>
      <p>快来答题成为暖心师吧！</p>
    </lable>
  </div>
</template>

<script>
    export default {}
</script>

<style scoped lang="scss">
  .tip{
    width: 100%;
    height: 100%;
    background-color:#f5f5f5;
  }
  lable{
    position:fixed;
    top:50%;
    left:30%;
    font-size:16px;
    color: #C8C8C8;
    .small_img{
      height:0.4rem;
      width:0.4rem;
    }
  }
</style>
