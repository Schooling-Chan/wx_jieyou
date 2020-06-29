<template>
  <div>
    <div class="testDetailContainer " v-if="show">
      <p v-if="role" class="role">您已经是暖心师了哦，不用再升级哦！</p>
      <div  v-if="!role">
        <div class="ceping">
          <div class="tip">
            <span class="title1">成为暖心师</span>
            <p class="title1_font">快来升级为暖心师，为他人排忧解难吧</p>
          </div>
          <div class="title">
            <h1 class="title">暖心师是什么？</h1>
          </div>
          <div class="jieshao">
            <p>每一位孩子都是一个小天使,而暖心师们则是
              群善良的大天使他们就像一个个温暖的树洞,
              倾听着你的心声他们是黑暗中的明灯,指引着
              迷茫不安的心灵</p>
          </div>
          <div class="title">
            <h1 class="title">暖心师需要做什么?</h1>
          </div>
          <div class="jieshao">
            <p>暖心师首先需要做的就是尽快回复小天使们的
              信件,用自己的专业知识、人生经验提供建议
              和帮助,用文字的力量给予最真诚的温暖和陪
              伴。</p>
          </div>
          <div class="title">
            <h1 class="title">如何成为暖心师?</h1>
          </div>
          <div class="jieshao">
            <p>如果你年满十八周岁,就可以参加暖心师考
              试,通过考试后就可以成为暖心师啦</p>
          </div>
          <div class="low">
            <!--            <p v-if="goal2">我的得分：<lable>{{goal2}}</lable></p>-->
            <span>
          <van-button type="primary" size="normal" @click="toTest2()">立即测试</van-button>
        </span>
          </div>
        </div>
        <!--        <span>-->
        <!--          <van-button type="primary" size="normal" @click="toIndex()">返回首页</van-button>-->
        <!--        </span>-->
      </div>
    </div>
    <div class="testDetailContainer "  v-if="!show">
      <div class="ceping" >
        <div class="tip">
          <span class="title1">抑郁水平自我核查</span>
          <p class="title1_font">如果你最近被低落的情绪所包围而不得解,快来自我核查一下</p>
        </div>
        <div>
          <h1 class="title">测评介绍</h1>
          <div class="row">
            <van-row>
              <van-col span="8">20道题</van-col>
              <van-col span="8">约需10分钟</van-col>
              <van-col span="8">单维度</van-col>
            </van-row>
          </div>
          <div class="jieshao">
            <p>
              该量表为SDS抑郁自评量表,美国教育卫生部推荐用
              于精神药理学研究的量表之一。如果你
            </p>
            <p>1)显著而持久的情感低落,抑郁悲观;</p>
            <p>2)思维联想速度缓慢,反应迟钝</p>
            <p>3)行为缓慢,不想做事,不愿和周围人接触交往;</p>
            <p>4)记忆力下降、注意力障碍;</p>
            <p>5)睡眠障碍、乏力、食欲减退</p>
            <p>这五项中出现任意两项,而持续两周以上,你有必要
              从这里获取力量</p>
          </div>
        </div>
        <div>
          <h1 class="title">测评须知</h1>
          <div class="jieshao">
            <p>
              1.根据一周内的状况来进行答题
            </p>
            <p>2.自评量表需由受试者本人,参考自身情况来完成</p>
            <p>2)思维联想速度缓慢,反应迟钝</p>
            <p>3量表分值仅能作为一项参考指标,而非绝对标
              准,若数值偏高建议至专业医院进行诊断</p>
          </div>
        </div>
        <div class="low">
          <!--          <p v-if="goal">我的得分：<lable>{{goal}}</lable></p>-->
          <span>
          <van-button type="primary" size="normal" @click="toTest1()">立即测试</van-button>
          </span>
          <!--          <span>-->
          <!--          <van-button type="primary" size="small" @click="toIndex()">返回首页</van-button>-->
          <!--          </span>-->
        </div>
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
            console.log(this.$mp.query.num1);
            if(this.$mp.query.num1== 1){
                this.show=true
                // this.goal2=wx.getStorageSync('goal2')
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

<style scoped  lang="scss">

  .testDetailContainer{
    .ceping{
      font-size:16px;
      margin: auto;
      padding:10px;
    }
    .title{
      margin-top:10px;
      text-align: center;
      height:20px;
      font-size:20px;
      font-weight:bold;
      /*color: #96dbff;*/
    }
    .tip{
      font-size:13px;
      margin-bottom:30px;
      line-height:30px;
    }
    .title1{
      font-size:20px;
      font-weight:bold;
    }
    .row{
      text-align: center;
      height:20px;
      margin-top:5px;
    }
    .jieshao{
      background: #f5f5f5;
      margin-top:10px;
      line-height:30px;
      padding:10px 20px 10px 20px;
    }
    .low{
      //text-align: center;
      //height:60px;
      //margin-top:20px;
      span{
        position:fixed;
        bottom: 0;
        left:38%;
      }
    }
    /*display: none;*/
    /*font-size:16px;*/
    /*height:100%;*/
    /*width:100%;*/
    /*position:absolute;*/
    /*top: 50%;*/
    /*left: 50%;*/
    /*margin-top: -50%;*/
    /*margin-left: -35%;*/
  }
  /*p{*/
  /*  font-size:20px;*/
  /*  line-height:40px;*/
  /*  margin-bottom: 10px;*/
  /*  margin-left:60px;*/
  /*  !*font-weight: bold;*!*/
  /*}*/
  /*.role{*/
  /*  font-size:16px;*/
  /*  font-weight:40px;*/
  /*  margin-left:-70px;*/
  /*  width:70%;*/
  /*  margin-bottom: 5px;*/
  /*}*/
  /*span{*/
  /*  margin-left:30px;*/
  /*  width:50%;*/
  /*}*/

</style>
