<template>
  <main class="mainBox">
    <section class="weightBox">
      <div class="dragBox_title">体重记录</div>
      <div class="weight">
        <view class="section_title">体重记录:</view>
        <input type="number" :value="weight" class="section_weight" @change="bindChange">
        <span>kg</span>
      </div>
    </section>
    <section class="dragBox">
      <div class="dragBox_title">吃药记录</div>
      <div class="dateBox">
        <picker class='date-picker' :value="date" mode="date" start="2019-09-01" end="2020-09-01" @change="bindDateChange">
          <view class="picker">
            日期选择：<span>{{date}}</span>
          </view>
        </picker>
      </div>
      <div class="timeBox">
        <picker class='time-picker' :value="time" mode="time" start="09:01" end="21:01" @change="bindTimeChange">
          <view class="picker">
            时间选择：<span>{{time}}</span>
          </view>
        </picker>
      </div>
    </section>
    <button class="postBtn">提交</button>
  </main>
</template>


<script>

export default {
  data:{
    date: '当前选择',
    time: '当前选择',
    weight: "60"
  },
  methods:{
    bindDateChange: function(e) {
      console.log('picker发送选择改变，携带值为', e.mp.detail.value)
      this.date = e.mp.detail.value;
    },
    bindTimeChange:function(e) {
      console.log('picker发送选择改变，携带值为', e.mp.detail.value)
      this.time = e.mp.detail.value;
    },
    bindChange(e){
      return this.weight = e.mp.detail.value;
    }
  }
}
</script>

<style scoped lang="scss">
$padding: .2rem;
$fz: .3rem;

.mainBox {
    font-size: 100rpx;
    padding: $padding;
    overflow-x: hidden;
    font-family: "微软雅黑";
}

.dragBox_title{
  font-size: .4rem;
  border-bottom: 2rpx solid #F5F5F5;
  padding: $padding;
}
.weightBox{
  font-size: $fz;
  color: #A9A9A9;
  .weight{
    line-height: .8rem;
    height: 0.8rem;
    border-bottom: 1rpx solid #F5F5F5;

    .section_title,span{
      display: inline-block;
      vertical-align:middle;
    }
    .section_weight{
      color: #000;
      display: inline-block;
      padding: $padding;
      vertical-align:middle;
      text-align: center;
    }
  }
}

.dragBox{
  font-size: $fz;
  margin: $padding auto;
  color: #A9A9A9;
  
  .dateBox,.timeBox{
    line-height: .8rem;
    height: 0.8rem;
    border-bottom: 1rpx solid #F5F5F5;
    .picker>span{
      color: #000;
    }
  }
}

.postBtn{
  margin: $padding auto;
  background: #69C8BB;
  color: #fff;
}
</style>
