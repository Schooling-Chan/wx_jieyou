<template>
  <div  class="examSdsContainer">
    <ul class="examSds">
      <div class="question" v-if="examWarmer[index_id]">问题{{examWarmer[index_id].index+1}}、{{examWarmer[index_id].question}}</div>
      <van-radio-group  :value="radio2" @change="onChange($event)">
        <van-radio  :name="item.index"  icon-size="12px" :checked-color="color" :v-if="examWarmer[index_id]"  v-for="(item,index) in examWarmer[index_id].answers" :key="index">
          <span>{{item.answerContent}}</span>
        </van-radio>
      </van-radio-group>
      <div class="btn">
        <van-row>
          <van-col span="8" v-if="index_id!= 0"><van-button type="primary" size="small" @click="last2">上一题</van-button></van-col>
          <van-col span="8" v-if="index_id!=19"><van-button type="primary" size="small" @click="ifNext2">下一题</van-button></van-col>
          <van-col span="8" v-else><van-button type="primary" size="small" @click="ifSubmit2">提交</van-button></van-col>
        </van-row>
      </div>
    </ul>
  </div>
</template>

<script>
    import {get,showModal,post} from "../../util";
    export default {
        data(){
            return{
                radio2:'',
                color:'#25B077',
                size:'10px',
                allRadio: [],//提交给后台的真题数据
                index_id:'0',//刚开始选择的题目
                answers2:[],//选择的答案
                radio2_answers:[],//暖心题目每道题选中的资料
                radio_id:'',//每道题的选择
                examWarmer:[],//后台所有升级暖心师题目和选项
            }},
        beforeMount(){
            this.getExamWarmer()
        },
        methods:{
            onChange(event) {
                this.radio2=event.mp.detail;
                this.radio2_answers.splice(this.index_id,1,this.radio2);
                console.log(this.radio2_answers);
            },
            async getExamWarmer(){
                //获得暖心师判断题目
                try {
                    let header = {
                        'token': wx.getStorageSync('token'),
                        'Content-Type': 'application/json'
                    }
                    const res = await get('/jieyou/api/exam/warmer','',header)
                    this.examWarmer=res.data.object
                    console.log( '44444',this.examWarmer)
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },
            last2(){
                //点击上一个
                if(this.index_id){
                    this.index_id--;
                    this.radio2=this.radio2_answers[this.index_id];
                }
            },
            ifNext2(){
                //判断能否下一个
                if(this.radio2_answers[this.index_id]){
                    this.next2();
                }else{
                    showModal('','请答完这道题才能进入下一题哦')
                }
            },
            next2(){
                //点击下一个
                this.index_id++;
                this.radio2='';
            },
            ifSubmit2(){
                this.radio2_answers.forEach((item,index)=> {
                    this.answers2.push({answerIndex:item,problemIndex:index});
                })
                this.submit2()
            },
            async submit2(){
                //提交提交抑郁评测答案
                let that = this
                const params = {
                    answers:that.answers2
                }
                console.log('params',params)
                let header = {
                    'token': wx.getStorageSync('token'),
                    'Content-Type': 'application/json'
                }
                try {
                    const res = await post('/jieyou/api/exam/warmer',params,header)
                    console.log(res)
                    that.answers2=[]
                    that.radio_answers2=[]
                    that.index_id2='0'
                    that. radio2= ''
                    wx.setStorageSync('goal2', res.data.object)
                    if(res.data.object>=80){
                        wx.getStorageSync('userinfo.role','1')
                    }
                    wx.navigateTo({
                        //提交后若成功直接调转到分数页面
                        url:'/pages/test_goal/main?num=1'
                    })
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },
        },
    }
</script>
<style scoped>
  .examSdsContainer{
    display: flex;
    flex-direction: column;
    font-size:14px;
  }
  .question{
    font-size:18px;
    line-height:35px;
    font-weight:40px;
    width:90%;
    margin-bottom: 5px;
  }
  span{
    display:inline-block;
    line-height:60px;
    margin-top:-20px !important;
  }
  .examSds{
    font-size:18px;
    height:100%;
    width:100%;
    border-color: #1ADEE0;
    margin-left:13px;
    /*position:absolute;*/
    /*top: 50%;*/
    /*left: 50%;*/
    /*margin-top: -50%;*/
    /*margin-left: -30%;*/
  }
</style>
