<template>
<div
class="modal_mask"
v-if="isShow"
  >
  <div class="modal_Box">
  <div class="modal_title">
  <button @tap="tapNoShow">取消</button>
  <p>选择信件的类型</p>
  <button @tap="tapComfirm">确定</button>
  </div>
  <div class="modal_content">
  <scroll-view
  :croll-y="isShow"
   style="height: 100%;"
  >
  <radio-group>
  <label
    :class="{checkbox: true, checked: item.checked, banColor: flag }"
    v-for="(item,index) in checkboxArr"
    @tap.stop="radio2"
    :id="index"
    :key="item.name"
  >
  <checkbox
    :value="item.name"
    :checked="item.checked"
    :disabled="(!item.checked) && flag"
  />{{item.name}}
</label>
</radio-group>
</scroll-view>
</div>
</div>
</div>
</template>

<script>
export default {
  props:["isShow","checkboxArr"],
  data() {
    return {
      checkedInsurance: [],
      flag: false,
    }
  },
  methods: {
    radio2(e) {
      // 最多选择三个
      if (this.checkedInsurance.length == 3) {
        let index = e.mp.target.id; //获取当前点击的下标
        if (this.checkboxArr[index].checked) {
          this.checkboxArr[index].checked = false;
          this.checkedInsurance = [];
          this.checkboxArr.forEach(item => {
            if (item.checked) {
              this.checkedInsurance.push(item);
            }
          });
          this.flag = false;
        } else {
          this.flag = true;
        }
        return;
      }
      let index = e.mp.target.id; //获取当前点击的下标
      this.checkboxArr[index].checked = !this.checkboxArr[index].checked; //改变当前选中的checked值
      this.checkedInsurance = [];
      this.checkboxArr.forEach(item => {
        if (item.checked) {
          this.checkedInsurance.push(item);
        }
      });
      if (this.checkedInsurance.length == 3) {
        this.flag = true;
      }
    },
    // 取消之后传给父组件的值
    tapNoShow() {
      this.isShow = false;
      this.checkboxArr.forEach(item => {
        item.checked = false
      });
      this.checkedInsurance = [];
      this.flag = false;
      this.$emit('getInsurance',this.checkedInsurance, this.isShow);
    },
    // 确定之后传给父组件的值
    tapComfirm() {
      this.isShow = false;
      this.$emit('getInsurance',this.checkedInsurance, this.isShow);
    },
  },

  onLoad() {
    console.log(this.isShow);
  }
};
</script>

<style scoped lang="scss">
.modal_mask {
  width: 100%;
  height: 65%;
  background-color: rgba(0, 0, 0, .5);
  position: fixed;
  top: 0;
  z-index: 10;
}

.modal_Box {
  height: 35%;
  width: 100%;
  position: fixed;
  z-index: 999999;
  bottom: 0;
  background-color: #fff;
}

.modal_title {
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 32rpx;
}

.modal_title button {
  font-family: PingFangSC-Regular;
  font-size: 28rpx;
  color: #508CEE;
  margin: 0px 0px;
  vertical-align: middle;
  line-height: 50px;
}

.modal_title p {
  font-family: PingFangSC-Regular;
  font-size: 28rpx;
  color: #333333;
}

.modal_content {
  height: 600px;
  padding: 0 10rpx 0 30rpx;
}

.color {
  color: red;
}

.wrap {
  width: 550px;
  margin: 50rpx auto;
}

.checkbox-con {
  margin-top: 40rpx;
  text-align: center
}

.checkbox {
  width: 216rpx;
  height: 48rpx;
  line-height: 48rpx;
  font-family: PingFangSC-Regular;
  font-size: 26rpx;
  color: #666666;
  text-align: center;
  display: inline-block;
  position: relative;
  z-index: 9999;
  background-color: #f9f9f9;
  margin-right: 20rpx;
  margin-bottom: 26rpx;
}

.checkbox:first-of-type {
  margin-top: 40rpx;
}

.checkbox:last-of-type {
  margin-bottom: 40rpx;
}

.checked {
  color: #508CEE !important;
  background: #F2F7FF;
}

.banColor {
  color: #b4b4b4;
}

.checkbox checkbox {
  display: none
}
</style>
