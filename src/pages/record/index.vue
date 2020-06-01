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
        <div class="timeBox" v-for="(item, index) in date" :key="index">
          <view class="section_title">{{item.des}}</view>
          <input type="number" value="0" :data-date='item.id' class="section_weight timeDrag" @change="bindDateChange">
        </div>
      </div>
      <div class="dragTypeBox">
        <picker class='drag-picker' :value="index" :range="dataList" mode="selector"  @change="bindPickerChange" :range-key="'medicineName'">
          <view class="picker">
            药品选择：<span>{{dataList[index].medicineName}}</span>
          </view>
          <view class="an-picker">
            药品不良反应：<span>{{dataList[index].untowardEffect}}</span>
          </view>
        </picker>
      </div>
    </section>
    <button class="postBtn" @click="postAll">提交</button>
  </main>
</template>


<script>
import $http from '../../../static/plugins/ajax';


export default {
  data:{
    drag:{
      morningDosage: 0,
      noonDosage: 0,
      eveningDosage: 0,
    },
    weight: "60",
    dataList:null,
    index: 0,
    date:[
      {
        des:'早上用量:',
        id:'morning',
      },
      {
        des:'中午用量:',
        id:'noon',
      },
      {
        des:'晚上用量:',
        id:'evening',
      }
    ]
  },
  methods:{
    bindDateChange: function(e) {
      // console.log('picker发送选择改变，携带值为', e.mp.detail.value)
      let date = e.mp.currentTarget.dataset.date,
      value = parseFloat(e.mp.detail.value);
      switch(date){
        case 'morning':
          this.drag.morningDosage = value;
          break;
        case 'noon':
          this.drag.noonDosage = value;
          break;
        case 'evening':
          this.drag.eveningDosage = value;
          break;
      }
      // console.log(this.drag);
      
    },
    bindChange(e){
      return this.weight = e.mp.detail.value;
    },
    bindPickerChange: function (e) {
      // console.log('picker发送选择改变，携带值为', e.mp)
      return this.index = e.mp.detail.value;
    },
    postAll(e){
      console.log(this.drag);
      
      let _this = this;
      Promise.all([$http.myAxios({
          url:`/jieyou/api/weight/${_this.weight}`,
          method:'post',
          data:{
            'num':parseFloat(_this.weight)
          },
          header:{
            'Content-Type': 'application/x-www-form-urlencoded',
            "token": "a4a3e938-59e0-39e0-ad6f-601f29c2e2d9"
          }                    
        }),$http.myAxios({
          url:'/jieyou/api/medicineRecord',
          method:'post',
          data:{
            'medicineRecords':[{
              'medicineIndex' : parseInt(_this.index),
              'noonDosage': _this.drag.noonDosage,
              'eveningDosage': _this.drag.eveningDosage,
              'morningDosage': _this.drag.morningDosage,
            }]
          },
          method:'post'
    })]).then(res => {
      let bool = res.filter(item => {
        return item.success === false;
      });
      // console.log(bool);
      
      if(bool.length === 0){
        mpvue.showToast({
          title: '提交成功', // 标题
          icon: 'success',  // 图标类型，默认success
          duration: 1500 , // 提示窗停留时间，默认1500ms
          success:function(){
            console.log(res, _this);
          }
        });
        return;
      }
      throw new Error("连接有问题！")
    }).catch(err=>{
      console.log(err);
      mpvue.showToast({
        title: err, // 标题
        icon: 'success',  // 图标类型，默认success
        duration: 1500 , // 提示窗停留时间，默认1500ms
      });
    })
    }
  },
  mounted(e){
    let _this = this;
    $http.myAxios({
      url:'/jieyou/api/medicineRecord/category'
    }).then(res =>{
      // console.log(res);
      _this.dataList = res.object;
      console.log(_this.dataList);
      
    }).catch(err=>{
      console.log(err);
      
    })
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
  
  .dateBox,.timeBox, .dragTypeBox{
    line-height: .8rem;
    min-height: 0.8rem;
    border-bottom: 1rpx solid #F5F5F5;
    .timeDrag,.picker>span{
      color: #000;
    }
    .an-picker{
      border-top: 1rpx solid #F5F5F5;
    }
  }
}

.postBtn{
  margin: $padding auto;
  background: #69C8BB;
  color: #fff;
}
</style>
