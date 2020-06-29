<template>
  <div>
    <div class="goal_container" v-if="show">
      <div class="loading">
        <div class="left"></div>
        <div class="right"></div>
        <div class="progress">{{goal2}}分
        </div>
      </div>
      <div class="goal_tip">
        <h1 class="title">{{tip}}</h1>
        <h2 class="title2">{{tip2}}</h2>
        <h2 class="title2">需要达到80分才能通过考试哦</h2>
        <div class="btn1">
        <span v-if="!role">
          <van-button type="primary"  size="normal" @click="toTest2()">立即测试</van-button>
        </span>
          <span>
        <van-button type="primary" size="normal" @click="toIndex()">返回首页</van-button>
        </span>
        </div>
      </div>
    </div>
    <div class="goal_container" v-if="!show">
      <div class="loading">
        <div class="left"></div>
        <div class="right"></div>
        <div class="progress">{{goal}}分
        </div>
      </div>
      <div class="btn">
        <span>
          <van-button type="primary"  size="normal" @click="toTest1()">重新测试</van-button>
        </span>
        <span>
        <van-button type="primary" size="normal" @click="toIndex()">返回首页</van-button>
        </span>
      </div>
      <div class="content">
        <div class="title1">
          以下是不同抑郁水平在人群中的分布
        </div>
        <div class="yiyu">
          <img src="../../../static/images/yiyu.jpg" alt="">
        </div>
        <div class="title">
          <h1 class="title">分数详情</h1>
        </div>
        <div class="jieshao">
          <p v-if="one">
          <lable>
            您处于无抑郁状态。
          </lable>
            你的得分低于国内常模分,你在过去的七天中
            没有出现抑郁状态
            生活中,你能够对很多事情持乐观的态
            度,能够迅速、高效地转换、消除抑郁情
            绪,有一个积极健康的人生
            可以说你基本上是开心地过好每一天
            呢,要好好保持啊,相信你的明天会更
            好
          </p>
          <p v-if="two">
            <lable>
              您处于轻度抑郁状态。
            </lable>
            別担心,你可能只是被抑郁情绪的包围而
            丙扰着。
            在情绪方面,心情压抑、郁闷、沮
            丧,对日常活动缺乏兴趣,对前途悲观
            失望,精神创伤常盘踞在脑中,以至于
            精神不振,脑力迟钝,甚至为此感到羞
            愧。
            在认知方面,注意力无法集中,记忆
            力降低,思维迟缓,自尊心和自信心降
            低,自我评价下降,常夸大自己的缺点
            和失误,认为自己没有价值,没人关
            爱,并为此自责和自罪。在行为方面,
            动作迟滞、无精打采、表现为被动、依
            赖、退缩,不愿意与人主动交往。
          </p>
          <p v-if="three">
            <label>
              您处于中度抑郁状态。
            </label>
            在情绪方面,心情压抑、郁闷、沮丧,
            情绪低下、心境恶劣,仿佛对很多事情都
            丧失了兴趣,常常感到疲惫无力,对前途
            悲观失望,精神创伤常盘踞在脑中,以致
            精神不振,脑力迟钝,同时还为此感到羞
            在认知方面,注意力无法集中,记忆力
            降低,思维迟缓,自尊心和自信心降低,
            自我评价下降,常夸大自己的缺点和失
            误,感觉很多事情都不如别人,认为自己
            没有价值,没人关爱,并为此自责和自
            罪
            在行为方面,动作迟滞、无精打采、表
            现为被动、依赖、退缩,不愿意与人主动
            交往,有不同程度的睡眠障碍(嗜睡或失
            眠),食欲出现大增或減退。
          </p>
          <p v-if="four">
            <label>
              您处于重度抑郁状态。
            </label>
            在情绪方面:心情压抑、郁闷、沮
            丧,情绪低下、心境恶劣;仿佛对很多事
            情都丧失了兴趣;常常感到疲惫无力,对
            前途悲观失望;精神创伤常盘踞在脑中,
            以致精神不振,脑力迟钝,为此感到羞
            愧
            在认知方面:注意力无法集中;记忆
            力降低;思维迟缓;自尊心和自信心降
            低,自我评价下降;常夸大自己的缺点和
            失误,感觉很多事情都不如别人,认为自
            己没有价值,没人关爱,并为此自责和自
            罪;偶尔会有自杀的想法或行为。
            在行为方面:动作迟滞、无精打采、
            表现为被动、依赖、退缩;不同程度的社
            交障碍,如不愿意与人主动交往等;有不
            同程度的睡眠障碍,嗜睡或失眠;食欲出
            现大增或減退
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: "goal",
        data(){
            return{
                role:'',//角色
                goal2:'',
                goal:'',
                show:false,
                tip:"对不起",
                tip2:"你的申请没有通过",
                one:false,
                two:false,
                three:false,
                four:false,
            }
        },
        onShow(){
            console.log(this.$mp.query.num);
            if(this.$mp.query.num == 1){
                this.goal2=wx.getStorageSync('goal2')
                if(this.goal2>=80){
                    wx.getStorageSync('userinfo.role','1')
                    this.tip="恭喜你"
                    this.tip2="你已经成为暖心师了"
                }else{
                    this.tip="对不起"
                    this.tip2="你的申请没有通过"
                }
                this.show=true
            }else{
                this.goal=wx.getStorageSync('goal')
                console.log(this.goal)
                if(this.goal<53){
                    this.one=true;
                }else if(this.goal<63){
                    this.two=true;
                }else if(this.goal<73){
                    this.three=true;
                }else{
                    this.four=true;
                }
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

<style scoped lang="scss">
  .goal_container{
    .goal_tip{
      margin-top:-80px;
      .title{
        text-align: center;
        font-size:20px;
        font-weight:30px;
        line-height:50px;
      }
      .title2{
        font-size:16px;
        text-align: center;
        line-height:50px;
        font-weight:20px;
      }
      .btn1{
        text-align: center;
        span{
          padding-right:10px;
        }
      }
    }
    .content{
      font-size:16px;
      padding:10px;
      .title{
        margin-top:10px;
        text-align: center;
        height:20px;
        /*font-size:20px;*/
        /*font-weight:bold;*/
        /*color: #96dbff;*/
      }
      .tip{
        font-size:13px;
        margin-bottom:30px;
        line-height:30px;
      }
      .title1{
        margin-top:15px;
        /*font-size:20px;*/
        /*font-weight:bold;*/
      }
      .jieshao{
        background: #f5f5f5;
        margin-top:10px;
        line-height:30px;
        padding:10px 20px 10px 20px;
      }
      .title1_font{
        font-size:16px;
        margin-top:20px;
      }
      .yiyu{
        /*padding-top:20px;*/
        /*margin-top:10px;*/
      }
    }
    .btn{
      text-align: center;
      margin-top:-80px;
      span{
        padding-right:10px;
      }
    }
  }
  .loading {
    margin-top:20px !important;
    margin: 100px auto;
    width: 8em;
    height: 8em;
    position: relative;
  }

  .loading .progress {
    position: absolute;
    width: 6em;
    height: 6em;
    background-color: white;
    border-radius: 50%;
    left: 1em;
    top: 1em;
    line-height: 6em;
    text-align: center;
  }

  .left,
  .right {
    width: 4em;
    height: 8em;
    overflow: hidden;
    position: relative;
    float: left;
    background-color: #07C160
  }

  .left {
    border-radius: 8em 0 0 8em;
  }

  .right {
    border-radius: 0 8em 8em 0;
  }

  .left:after,
  .right:after {
    content: "";
    position: absolute;
    display: block;
    width: 4em;
    height: 8em;
    background-color: white;
    border-radius: 8em 0 0 8em;
    background-color: #07C160;
  }

  .right:after {
    content: "";
    position: absolute;
    display: block;
    border-radius: 0 8em 8em 0;
  }
  .left:after {
    transform-origin: right center;
  }

  .right:after {
    transform-origin: left center;
    transform: rotateZ(45deg);
  }
</style>
