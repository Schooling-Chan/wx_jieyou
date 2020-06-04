<template>
<div class="testDetailContainer">
  <div>
    <p v-if="goal">我的得分：<lable>{{goal}}</lable></p>
    <van-button type="primary" size="normal" @click="toTest1()">开始测试</van-button>
  </div>
</div>
</template>

<script>
    export default {
        data(){
            return{
                goal:'',
            }
        },
        beforeMount(){
                this.goal=wx.getStorageSync('goal')
        },
        methods:{
            toTest1(){
                //跳转到回信详情页面
                wx.navigateTo({
                    url:'/pages/test/main'
                })
            },
        }
    }
</script>

<style scoped>
  .testDetailContainer{
    font-size:16px;
    height:100%;
    width:100%;
    position:absolute;
    top: 50%;
    left: 50%;
    margin-top: -50%;
    margin-left: -15%;
  }
  p{
    font-size:20px;
    line-height:40px;
    margin-bottom: 10px;
    /*font-weight: bold;*/
  }
</style>
