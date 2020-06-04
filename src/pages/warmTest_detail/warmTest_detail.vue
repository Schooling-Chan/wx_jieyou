<template>
  <div class="testDetailContainer">
      <p v-if="role" class="role">您已经是暖心师了哦，不用再升级哦！</p>
      <div  v-if="!role">
        <p v-if="goal2">我的得分：<lable>{{goal2}}</lable></p>
        <van-button type="primary" size="normal" @click="toTest2()">开始测试</van-button>
      </div>
  </div>
</template>

<script>
    export default {
        data(){
            return{
                role:'',//角色
                goal2:'',
            }
        },
        beforeMount(){
                this.goal2=wx.getStorageSync('goal2')
                const userinfo=wx.getStorageSync('userinfo')
                this.role=userinfo.role
        },
        methods:{
            toTest2(){
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
  .role{
    font-size:16px;
    font-weight:40px;
    margin-left:-70px;
    width:70%;
    margin-bottom: 5px;
  }
</style>
