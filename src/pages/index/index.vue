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
    <div class="noteBox">
      <div class="title"><div class="title-text">每日打卡</div></div>
      <div class="content">
        <div class="medical">
          <div class="comment-pic"><img src="../../../static/images/heart.png" alt=""></div>
          <span>心情打卡</span>
        </div>
        <div class="medical">
          <div class="comment-pic"><img src="../../../static/images/kitmedical.png" alt=""></div>
          <span>用药记录</span>
        </div>
        <div class="weight">
          <div class="comment-pic"><img src="../../../static/images/weight.png" alt=""></div>
          <span>体重记录</span>
        </div>
        <div class="hospital">
          <div class="comment-pic"><img src="../../../static/images/hospital.png" alt=""></div>
          <span>附近医院</span>
        </div>
      </div>
    </div>

    <!-- 情绪统计 -->
    <div class="emotionBox">
      <div class="title"><div class="title-text">情绪统计</div></div>
      <div class="mp-echarts">
       <mpvue-echarts :echarts="echarts" :onInit="initChart"/>
      </div>
      <div class="mp-echarts twos" >
       <mpvue-echarts :echarts="echarts" :onInit="ecBarInit" canvasId="bar" />
      </div>
      <div class="mp-echarts">
        <mpvue-echarts :echarts="echarts" :onInit="ecScatterInit" canvasId="scatter" />
      </div>
    </div>
  </main>
</template>

<script>
// import * as echarts from '../../../static/plugins/echarts.min'
import mpvueEcharts from 'mpvue-echarts'

let echarts = require('../../../static/plugins/echarts.min');

function initChart (canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart)
  var option = {
    backgroundColor: '#fff',
    color: ['#37A2DA', '#67E0E3'],
    
    
    legend: {
      type:'plain',
      id:'tips',
      show: true,
      bottom: '20rpx',
      data: ['最新成交价', '预购队列']
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
      }
    },
    series: [{
      name: '最新成交价',
      type: 'line',
      smooth: true,
      data: [18, 36, 65, 30, 78, 40, 33]
    }, {
      name: '预购队列',
      type: 'line',
      smooth: true,
      data: [12, 50, 51, 35, 70, 30, 20]
    }]
  }
  chart.setOption(option)
  return chart
}

let barChart, scatterChart;
function getBarOption () {
  return {
    backgroundColor: '#fff',
    color: ['#37a2da', '#32c5e9', '#67e0e3'],
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'line' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['热度', '正面', '负面']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '热度',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [300, 270, 340, 344, 300, 320, 310]
      },
      {
        name: '正面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: [120, 102, 141, 174, 190, 250, 220]
      },
      {
        name: '负面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'left'
          }
        },
        data: [-20, -32, -21, -34, -90, -130, -110]
      }
    ]
  }
}
function getScatterOption () {
  var data1 = []
  var data2 = []
  for (var i = 0; i < 10; i++) {
    data1.push(
      [
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 40)
      ]
    )
    data2.push(
      [
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100)
      ]
    )
  }
  var axisCommon = {
    axisLabel: {
      textStyle: {
        color: '#C8C8C8'
      }
    },
    axisTick: {
      lineStyle: {
        color: '#fff'
      }
    },
    axisLine: {
      lineStyle: {
        color: '#C8C8C8'
      }
    },
    splitLine: {
      lineStyle: {
        color: '#C8C8C8',
        type: 'solid'
      }
    }
  }
  return {
    color: ['#FF7070', '#60B6E3'],
    backgroundColor: '#fff',
    xAxis: axisCommon,
    yAxis: axisCommon,
    legend: {
      data: ['aaaa', 'bbbb']
    },
    visualMap: {
      show: false,
      max: 100,
      inRange: {
        symbolSize: [20, 70]
      }
    },
    series: [{
      type: 'line',
      name: 'aaaa',
      data: data1
    },
    {
      name: 'bbbb',
      type: 'line',
      data: data2
    }
    ],
  }
}
export default {
  data () {
    return {
      echarts,
      initChart,
      ecBarInit: function (canvas, width, height) {
        barChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(barChart);
        barChart.setOption(getBarOption());
        return barChart
      },
      ecScatterInit: function (canvas, width, height) {
        scatterChart = echarts.init(canvas, null, {
          width: width,
          height: height
        })
        canvas.setChart(scatterChart)
        scatterChart.setOption(getScatterOption())
        return scatterChart
      }
    }
  },
  components: {
    mpvueEcharts
  },
  onShareAppMessage () {}
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
  .hospital .comment-pic{
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
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      img{
        height: 50%;
        width: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      &:hover{
        background: rgba($color: rgb(151, 151, 151), $alpha: .5);
      }
    }

    .medical, .hospital,.weight{
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
  .mp-echarts {
    width: 100%;
    height: 5rem;
    &.twos{
      height: 8rem;
    }
  }
}
</style>
