<template>
<div  class="examSdsContainer">
  <ul class="examSds">
    <div class="question" v-if="examSds[index_id]">问题{{examSds[index_id].index+1}}、{{examSds[index_id].question}}</div>
    <van-radio-group  :value="radio" @change="onChange($event)">
      <van-radio  name="1"  icon-size="12px" :checked-color="color">
        <span>A.没有或很少时间</span>
      </van-radio>
      <van-radio  name="2"  icon-size="12px" :checked-color="color">
        <span>B.小部分时间</span>
      </van-radio>
      <van-radio name="3"  icon-size="12px" :checked-color="color">
       <span> C.相当多时间</span>
      </van-radio>
      <van-radio  name="4"  icon-size="12px" :checked-color="color">
        <span>D.绝大部分或全部时间</span>
      </van-radio>
    </van-radio-group>
    <div class="btn">
      <van-row>
        <van-col span="8" v-if="index_id != 0"><van-button type="primary" size="small" @click="last">上一题</van-button></van-col>
        <van-col span="8" v-if="index_id != 19"><van-button type="primary" size="small" @click="ifNext">下一题</van-button></van-col>
        <van-col span="8" v-else><van-button type="primary" size="small" @click="ifSubmit">提交</van-button></van-col>
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
                color:'#25B077',
                size:'10px',
                examSds:[],//后台抑郁评测题目
                allRadio: [],//提交给后台的真题数据
                radio: '',
                index_id:'0',//刚开始选择的题目
                answers:[],//选择的答案
                radio_answers:[],//抑郁症每道题选中的资料
                radio_id:'',//每道题的选择
            }},
        beforeMount(){
                this.getExamSds()
        },
        methods:{
            onChange(event) {
                    this.radio=event.mp.detail;
                    this.radio_answers.splice(this.index_id,1,this.radio);
                    console.log(this.radio_answers);
            },
            async getExamSds(){
                //获得抑郁判断题目
                try {
                    let header = {
                        'token': wx.getStorageSync('token'),
                        'Content-Type': 'application/json'
                    }
                    const res = await get('/jieyou/api/exam/sds','',header)
                    this.examSds=res.data.object
                    console.log( 'this.examSds',this.examSds)
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },
            last(){
                //点击上一个
                if(this.index_id){
                    this.index_id--;
                    this.radio=this.radio_answers[this.index_id];
                }
            },
            ifNext(){
                //判断能否下一个
               // console.log(this.radio_index[this.index_id])
                if(this.radio_answers[this.index_id]){
                    this.next();
                }else{
                    showModal('','请答完这道题才能进入下一题哦')
                }
            },
            next(){
                //点击下一个
                this.index_id++;
                this.radio='';
            },
            ifSubmit(){
                this.radio_answers.forEach((item,index)=> {
                    this.answers.push({answerIndex:--item,problemIndex:index});
                })
                this.submit()
            },
            async submit(){
                //提交提交抑郁评测答案
                let that = this
                const params = {
                    answers:that.answers
                }
                console.log('params',params)
                let header = {
                    'token': wx.getStorageSync('token'),
                    'Content-Type': 'application/json'
                }
                try {
                    const res = await post('/jieyou/api/exam/sds',params,header)
                    // console.log('11111',res)
                    that.answers=[]
                    that.radio_answers=[]
                    that.index_id='0'
                    that.radio= ''
                    wx.setStorageSync('goal', res.data.object)
                    wx.navigateTo({
                        //提交后若成功直接调转到分数页面
                        url:'/pages/test_detail/main'
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
   font-size:16px;
   line-height:35px;
   font-weight:40px;
   width:70%;
   margin-bottom: 5px;
 }
  span{
    display:inline-block;
    line-height:60px;
    margin-top:-20px !important;
  }
   .examSds{
     font-size:16px;
     height:100%;
     width:100%;
     border-color: #1ADEE0;
     position:absolute;
     top: 50%;
     left: 50%;
     margin-top: -50%;
     margin-left: -30%;
   }
</style>

