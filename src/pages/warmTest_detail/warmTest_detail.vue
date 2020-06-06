<template>
  <div>
    <div :class="'testDetailContainer '+ {'show': show}" >
      <p v-if="role" class="role">您已经是暖心师了哦，不用再升级哦！</p>
      <div  v-if="!role">
        <p v-if="goal2">我的得分：<lable>{{goal2}}</lable></p>
        <span>
          <van-button type="primary" size="normal" @click="toTest2()">开始测试</van-button>
        </span>
        <span>
          <van-button type="primary" size="normal" @click="toIndex()">返回首页</van-button>
        </span>
      </div>
    </div>
    <div :class="'testDetailContainer '+ {'show': !show}" >
      <div>
        <p v-if="goal">我的得分：<lable>{{goal}}</lable></p>
        <span>
          <van-button type="primary" size="normal" @click="toTest1()">开始测试</van-button>
        </span>
        <span>
          <van-button type="primary" size="normal" @click="toIndex()">返回首页</van-button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data(){
            return{
                role:'',//角色
                goal2:'',
                goal:'',
                show:false,
            }
        },
        onShow(){
          console.log(this.$mp.query.num);
          
            if(this.$mp.query.num == 1){
                this.show=true
                this.goal2=wx.getStorageSync('goal2')
                const userinfo=wx.getStorageSync('userinfo')
                this.role=userinfo.role
            }else{
                this.goal=wx.getStorageSync('goal')
                this.show=false
            }
        },
        methods:{
            toTest1(){
                //跳转到回信详情页面
                wx.navigateTo({
                    url:'/pages/test/main'
                })
            },
            toTest2(){
                //跳转到回信详情页面
                wx.navigateTo({
                    url:'/pages/warmTest/main'
                })
            },
            toIndex(){
                //跳转到首页详情页面
                wx.switchTab({
                    url:'/pages/index/main'
                })
            }
        }
    }
</script>

<style scoped>

  .show{
    display: block ! important;
  }
  .testDetailContainer{
    display: none;
    font-size:16px;
    height:100%;
    width:100%;
    position:absolute;
    top: 50%;
    left: 50%;
    margin-top: -50%;
    margin-left: -35%;
  }
  p{
    font-size:20px;
    line-height:40px;
    margin-bottom: 10px;
    margin-left:60px;
    /*font-weight: bold;*/
  }
  .role{
    font-size:16px;
    font-weight:40px;
    margin-left:-70px;
    width:70%;
    margin-bottom: 5px;
  }
  span{
    margin-left:30px;
    width:50%;
  }
</style>
