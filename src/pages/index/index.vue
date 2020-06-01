<template>
  <main class="mainBox">
    <!-- 头部 -->
    <div class="headBox">
      <div class="judge">
        <img src="../../../static/images/machine.png" alt="">
        <div class="judge-text">
          <div>心理评测</div>
          <span>答题预测当前情况</span>
        </div>
      </div>
      <div class="doctor">
        <img src="../../../static/images/volunteer.png" alt="">
        <div class="doctor-text">
          <div>成为暖心师</div>
          <span>帮助别人也是帮助自己</span>
        </div>
      </div>
    </div>

    <!-- 每日一记 -->
    <div class="noteBox" >
      <div class="title"><div class="title-text">每日打卡</div></div>
      <div class="content" >
        <div class="expression" >
          <div class="comment-pic" @tap="goNew" data-set="expression"><img src="../../../static/images/heart.png" alt="" data-set="expression"></div>
          <span>心情打卡</span>
        </div>
        <div class="medical" >
          <div class="comment-pic" @click="goNew" data-set="medical"><img src="../../../static/images/kitmedical.png" alt="" data-set="medical"></div>
          <span>用药记录</span>
        </div>
        <div class="weight" >
          <div class="comment-pic"  @click="goNew" data-set="weight"><img src="../../../static/images/weight.png" alt="" data-set="weight"></div>
          <span>体重记录</span>
        </div>
        <div class="hospital" >
          <div class="comment-pic"  @click="goNew" data-set="hospital"><img src="../../../static/images/hospital.png" alt="" data-set="hospital"></div>
          <span>导航医院</span>
        </div>
      </div>
    </div>

    <!-- 情绪统计 -->
    <div class="emotionBox">
      <div class="title"><div class="title-text">情绪统计</div></div>
      <div class="details">
        <span v-for="(item,key) in moods" :key="key">{{key}}:{{item}}</span>
      </div>
      <div class="mp-echarts">
       <mpvue-echarts :echarts="echarts" :onInit="initChart"/>
      </div>
      <div class="mp-echarts twos" >
       <mpvue-echarts :echarts="echarts" :onInit="ecBarInit" canvasId="bar" />
      </div>
      <div class="mp-echarts">
        <mpvue-echarts :echarts="echarts" :onInit="ecAllInit" canvasId="scatter" />
      </div>
    </div>
  </main>
</template>

<script>
import mpvueEcharts from 'mpvue-echarts';
import $http from '../../../static/plugins/ajax';


let echarts = require('../../../static/plugins/echarts.min');
// let $http = require('../../utils/ajax');
let expressions = {
        month:null,
        week:null
      },
      weight = {
        month:null,
        week:null
      };

function baseEcharts( canvas, width, height, options = {
    backgroundColor: '#fff',
    color: ['#37A2DA'],


    legend: {
        type: 'plain',
        id: 'tips',
        show: true,
        top: '10rpx',
        data: ['心情指数']
    },
    grid: {
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
        type: 'value',
        name: '心情指数',
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
    },
    series: [{
        name: '心情指数',
        type: 'line',
        smooth: true,
        data: [18, 98, 65, 30, 78, 40, 33]
    }]
}) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height
    })
    canvas.setChart(chart)
    chart.setOption(options)
    return chart;
};


export default {
  data () {
    return {
      echarts,
      initChart: function(canvas, width, height){
        baseEcharts(canvas, width, height);
      },
      ecBarInit: function(canvas, width, height){
        baseEcharts(canvas, width, height, {
          backgroundColor: '#fff',
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  crossStyle: {
                      color: '#999'
                  }
              }
          },
          color:["#7DC2E6"],
          xAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value',
            name: '体重(kg)',
          },
          series: [{
              data: [120, 180, 150, 80, 70, 110, 130],
              type: 'bar'
          }]
        });
      },
      ecAllInit: function(canvas, width, height) {
        baseEcharts(canvas, width, height, {
          backgroundColor: '#fff',
          color:['#37a2da', '#32c5e9'],
          legend: {
            data: ['心情指数','体重']
          },
          xAxis: [
            {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            }
          ],
           yAxis: [
              {
                  type: 'value',
                  name: '体重/kg',
                  min: 0,
                  max: 200,
                  interval: 40,
                  axisLabel: {
                      formatter: '{value} '
                  }
              },
              {
                  type: 'value',
                  name: '心情',
                  min: 0,
                  max: 100,
                  interval: 20,
                  axisLabel: {
                      formatter: '{value}'
                  }
              }
          ],
          series: [
              {
                  name: '体重',
                  type: 'bar',
                  data: [120, 200, 150, 80, 70, 110, 130, 66, 68, 55, 80, 60]
              },
              {
                  name: '心情',
                  type: 'line',
                  // smooth: true,
                  yAxisIndex: 1,
                  data: [20, 20, 15, 80, 70, 10, 30, 66, 68, 55, 80, 60]
              }
          ]
        });
      },
      moods:{
        20: '生气，',
        40: '伤心，',
        60: '平静，',
        80: '开心，',
        100: '兴奋',
      }
    }
  },
  components: {
    mpvueEcharts
  },
  onShow () {
    console.dir(this.getData().then(res=>{
      console.log(res);
      
    }));
    
  },
  mounted(){
    
    
  },
  methods:{
    goNew:function(e){//跳转页面
      let choose = e.mp.target.dataset.set;
      console.log(e.mp.target);
      
      switch(choose){
        case 'expression':
          wx.navigateTo({url:"../mood/main"});
          break;
        case 'medical':
        case 'weight':
          wx.navigateTo({url:"../record/main"});
          break;
        case 'hospital':
          // wx.navigateTo({url:"../address/main"});
          this.address();
          
          break;
      }
    },
    address:function(e){//跳转地图
      let plugin = requirePlugin('routePlan');

      let key = 'VFKBZ-HQWKD-QTA4G-PZ7TG-O66PS-7EBLY';  //使用在腾讯位置服务申请的key
      let referer = '化忧小栈';   //调用插件的小程序的名称
      let endPoint = JSON.stringify({  //终点
        'name': '广东省中医院',
        'latitude': 23.124852,
        'longitude': 113.258812
      });
      wx.navigateTo({
        url: 'plugin://routePlan/route-plan?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
      });
    },
    getData:async function(e){
      let weight = await ($http.myAxios({
        url:'/jieyou/api/weight/mine/all',
        data:{
          'timeInterval': {
            month:'month',
            year:'year',
          }
        }
      }));
      let mood = await ($http.myAxios({
        url:'/jieyou/api/moodRecord/mine/all',
        data:{
          'timeInterval': {
            month:'month',
            year:'year',
          }
        }
      }));

      return [weight, mood];
    }
  }
}
</script>

<style scoped lang="scss">

$bg:#f0f0f0;
.mainBox {
    background: $bg;
    font-size: 100rpx;
    overflow-x: hidden;
}

.title {
    height: 1rem;
    font-size: .36rem;
    font-weight: 666;
    margin-top: 10rpx;
    line-height: 1rem;
    background: $bg;
    position: relative;
    color: rgb(151, 151, 151);
    &-text {
        width: 28%;
        text-align: center;
        background: $bg;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
    &::before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 34%;
        height: 4rpx;
        background: #ccc;
    }
}
// headBox
.headBox{
  width: 100%;
  background: #fff;
  height: 2.6rem;
  line-height: 2.6rem;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  box-sizing: border-box;
  align-items: center;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
  .judge,.doctor{
    background: linear-gradient(45deg, rgb(26,222,224), rgb(230, 230, 230));
    flex: 1;
    width: 35%;
    line-height: 2.08rem;
    margin: 0 .5rem;
    height: 2.08rem;
    border-radius: 25rpx;
    overflow: hidden;
    position: relative;
    img{
      width: .6rem;
      height: 0.6rem;
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translateX(-50%);
    }
    &-text{
      width: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      color: #fff;
      height: 100%;
      overflow: hidden;
      div{
        width: 100%;
        font-size: .36rem;
        font-weight: 666;
        height: 0.5rem;
        line-height: .5rem;
        overflow: hidden; 
        margin-top: .88rem;
      }
      span{
        font-size: .20rem;
        display: inline-block;
        height: 0.25rem;
        line-height: 0.25rem;
      }

      &:hover{
        background: rgba($color: #fff, $alpha: .5);
      }
    }
  }
  .doctor{
    background: linear-gradient(45deg, rgb(96,160,250), rgb(230, 230, 230));
  }
}
// noteBox
.noteBox{
  position: relative;
  min-height: 3rem;
  font-size: .26rem;
  // margin: 0 auto .3rem auto;
  

  .medical .comment-pic{
    background: linear-gradient(45deg, rgb(191,213,252), rgb(230, 230, 230));
  }
  .expression .comment-pic,.hospital .comment-pic{
    background: linear-gradient(45deg, rgb(156,222,255), rgb(230, 230, 230));
  }
  .weight .comment-pic{
    background: linear-gradient(45deg, rgb(140,229,227), rgb(230, 230, 230));
  }

  .content{
    background: #fff;
    height: 1.9rem;
    line-height: 1.9rem;
    display: flex;
    overflow: hidden;

    .comment-pic{
      position: relative;
      height: 1rem;
      width: 1rem;
      line-height: 1rem;
      border-radius: 50%;
      z-index: 100;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      img{
        height: 50%;
        width: 50%;
        position: absolute;
        z-index: 99;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      &:hover{
        background: rgba($color: rgb(151, 151, 151), $alpha: .5);
      }
    }

    .expression, .medical, .hospital,.weight{
      height: 1.6rem;
      text-align: center;
      flex: 2;
      display: flex;    
      flex-direction: column;
      justify-content:space-around;
      overflow: hidden;
      margin: 0 auto;

      span{
        height: .3rem;
        line-height: .3rem;
        width: 100%;
        margin-top: .39rem;
        display: block;
        color: rgb(151, 151, 151);
      }
    }
    
  }
}

.emotionBox{
  min-height: 5rem;
  .details{
    font-size: .3rem;
    background: #fff;
    text-align: center;
    height: 1rem;
    line-height: 1rem;
    color: #BEBEBE;
  }
  .mp-echarts {
    width: 100%;
    height: 5rem;
    &.twos{
      height: 8rem;
    }
  }
}
</style>
