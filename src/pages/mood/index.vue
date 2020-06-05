<template>
  <div class="mainBox">
    <div class="editorBox">
      <div class="title">动态/心情记录</div>
      <editor
        id="editor"
        class="ql-container"
        placeholder="请记录下今天的心情(插入图片为发表动态).."
        @ready="onEditorReady"
        @input="onEditorInput"
        showImgSize
        showImgToolbar
        showImgResize>
      </editor>
    </div>
    <div class="expressionBox" @click="showExpression">
      <div v-for="(item, key) in expressions" :key="key" :class="key+'Box'" :data-ex="key">
        <div>{{item}}</div>
      </div>
    </div>
    <div class="imageBox">
      <span class="imgplus" @click="insertImage">+</span>
      <div v-for="(item, index) in images" :key="index"  class="imgOutput" @click="deletePic" :data-index="index">
        <img :src="item" :alt="'图片'+index" :name="imagesName[index]">
        <span class="iconfont1 icondelete deleteBtn"></span>
      </div>
    </div>
    <button @click="postContext" class="postBtn">提交</button>
  </div>
</template>

<script>
import $http from '../../../static/plugins/ajax';



export default {
  onLoad(e){
    let id = e.id;
    console.log(e);
    wx.setNavigationBarTitle({
        title: '心情打卡'
    })
  },
  
  data(){
    return {
      expression:null,//选中的表情
      images:[],//上传图片盒子
      expressions:{
        excite:'兴奋',
        happy:'开心',
        sad:'伤心',
        angry:'生气',
        calm:'平静'
      },
      imagesName:[],
      imagesLabel:[],
    }
  },
  methods:{
    onEditorReady() {
      const that = this;
      wx.createSelectorQuery().select('#editor').context(function (res) {
        that.editorCtx = res.context
      }).exec()
    },
    onEditorInput(){//判断富文本输入的内容
      const that = this;
      
      this.editorCtx.getContents({
        success: res => {
          if(/^(\n)+$/g.test(res.text)) that.images = [];
          // console.log(that.images, res);
          return;
        }
      });
    },
    insertImage () {//点击插入图片
      const that = this;
      if(that.images.length >= 3) return;
      wx.chooseImage({
        count: 3,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          // console.log(res.tempFilePaths);
          if(res.tempFilePaths.length > 1) {
            if(that.images.length >= 1){
              res.tempFilePaths.forEach(item=>{
                if(that.images.length >= 3) return;
                that.images.push(item);
              });
            }else{
              that.images = res.tempFilePaths;
            }
          }else{
            that.images.push(res.tempFilePaths[0])
          };
          
          that.imagesName = that.images.map(item => item.slice(-20));
        }
      });
    },
    deletePic(e){
      // console.log(e);
      let target = e.currentTarget.dataset.index;
      this.images = this.images.filter((item, index)=> target !== index);
      this.imagesName = this.imagesName.length > 0&&this.imagesName.filter((item,index) => index !== target);
      this.imagesLabel = this.imagesLabel.length > 0&&this.imagesLabel.filter((item,index) => index !== target);

      console.log(this.imagesLabel, this.imagesName);
    },
    showExpression(e){//事件委托，选中表情
      let that = this;
      // console.log(e.mp.target.dataset.ex);
      wx.showToast({
        title: '已选中', // 标题
        icon: 'success',  // 图标类型，默认success
        duration: 1500 , // 提示窗停留时间，默认1500ms
        success:function(){
          that.expression = e.mp.target.dataset.ex;
          // console.log(that.expression);
        }
      });
    },
    postContext(e){//提交方法
      const that = this;
      let contents = null;
      
      this.editorCtx.getContents({
        success: res => {
          // console.log(res);
          if(res.text !== "\n"){
            contents = res.text; 
            // console.log(contents);
            that.imagesName.forEach(async item => {
              let res = await $http.myAxios({
                url:'/jieyou/api/upload/signature/liveMessage/picture',
                data:{
                  fileName: item
                }
              }).then(res=>{
                that.imagesLabel.push(res.object);
              })
            });
            // console.log(that.imagesLabel);
            
              // that.imagesName = [];
            that.postAjax(contents, that.expression, that.images);
            return;
          }
          
          mpvue.showToast({
            title: '内容不能为空', // 标题
            duration: 1000 , // 提示窗停留时间，默认1500ms,
            icon:'none',
            success:function(){
              return;
            }
          });
          
        }
      });

    },
    postAjax(...arg){//提交api
      let that = this;
      // console.log(this.images);
      let heart = {
        'angry':{
          index:20,
          num:1
        },
        'sad':{
          index:40,
          num:2
        },
        'calm':{
          index:60,
          num:3
        },
        'happy':{
          index:80,
          num:4
        },
        'excite':{
          index:100,
          num:5
        },
      }
      mpvue.showActionSheet({//
        itemList: [ '提交到心情记录', '提交到动态'],
        success (res) {
          console.log(res.tapIndex);
          let index = res.tapIndex;
          switch(index){
            case 0:
              $http.myAxios({
                url: '/jieyou/api/moodRecord',
                method: 'post',
                data:{
                  'moodType': heart[arg[1]].num,
                  'content':arg[0]
                }
              }).then(res =>{
                console.log(res);
                
                mpvue.showToast({
                  title: '提交完成', // 标题
                  icon: 'success',  // 图标类型，默认success
                  duration: 1500 , // 提示窗停留时间，默认1500ms
                });
                that.editorCtx.clear({
                  success:()=>{
                    console.log('清空');
                  }
                })
              }).catch(err=>{
                console.log(err);
              });
              break;
            default:
              
              that.imagesLabel.forEach(async (item,index)=>{
                await mpvue.uploadFile({
                    url: 'https://jieyouxiaozhan.oss-cn-shenzhen.aliyuncs.com',
                    filePath: that.images[index],
                    name:  'file',
                    header: {
                      "Content-Type": "multipart/form-data",
                      "token": wx.getStorageSync('token')
                    },
                    formData: {
                      'name': that.imagesName[index],
                      'key': item.filePath.slice(1),
                      'policy': item.policy,
                      'OSSAccessKeyId': 'LTAI4FoeEXnUpZAZDiLgYDXr',
                      'signature': item.signature,
                      'success_action_status': "200"
                    },
                    success: (res)=>{
                      console.log(res);
                      that.imagesName = [];
                      that.imagesLabel = [];
                      that.editorCtx.clear({
                        success:()=>{
                          that.images = [];
                          console.log('清空');
                        }
                      })
                    },
                    fail:(err)=>{
                      console.log(err);
                      mpvue.showToast({
                        title: "上传失败",
                        duration: 1000
                      })
                    }
                })
              });
              
              $http.myAxios({
                url: '/jieyou/api/liveMessage',
                method: 'post',
                data:{
                  'content':arg[0]
                }
              }).then(res =>{
                mpvue.showToast({
                  title: '提交完成', // 标题
                  icon: 'success',  // 图标类型，默认success
                  duration: 1500 , // 提示窗停留时间，默认1500ms
                });
              }).catch(err=>{
                console.log(err);
              });
              
              break;
          }
          
        },
        fail (res) {
          console.log(res.errMsg)
        }
      })
    }
  },
  mounted () {
    // console.log('mounted')
    const that = this;
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
      // console.log(that.editorCtx);
    }).exec();
  }
}
</script>

<style scoped lang="scss">
@import url('../../../static/fonts/invitation/index.css');

$padding: .2rem;

.mainBox {
    font-size: 100rpx;
    padding: $padding;
    overflow-x: hidden;
    font-family: "微软雅黑";
}




.editorBox{
  font-size: .3rem;
  position: relative;
  padding: $padding;
  box-sizing: border-box;
  .title{
    font-size: .36rem;
    margin: $padding auto;
  }
  #editorTitle{
    font-size: .34rem;
  }

  #editor,#editorTitle{
    background: #efefef;
    border-radius: .1rem;
    padding: $padding;
  }
}


.expressionBox{
  display: flex;
  flex-wrap: nowrap;
  box-sizing: border-box;
  align-items: center;
  margin: .2rem;
  &>div{
    flex:1;
    display: inline-block;
    font-size: .3rem;
    width: .82rem;
    height: 1rem;
    line-height: .82rem;
    text-align: center;
    position: relative;
    &>div{
      margin: 0 auto;
      position: absolute;
      width: 100%;
      top: 84%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .exciteBox{
    
    background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg4NDgyMTcwNjYxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjYxMjMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTk5NS4xODY4NzMgNDgxLjU0NTE1N2MwIDY1LjI1NDE5Ni01Ljg2ODE4MyAxMzAuMDk3NjE5LTI5LjM0MDkxNiAxODYuNzg0MjY3LTI0LjM1Mjk2IDU4LjY4MTgzMS02OS4yNDQ1NiAxMDYuMzMxNDc3LTExMy42MDgwMjQgMTUwLjYzNjI1OWE0NzEuMDk3NzM3IDQ3MS4wOTc3MzcgMCAwIDEtMTU1LjgwMDI2IDEwMC45MzI3NDljLTU2LjY4NjY0OCAyMy40NzI3MzItMTE2LjMwNzM4OCA1MC44NzcxNDctMTgxLjU2MTU4NSA1MC44NzcxNDhzLTEyNy40NTY5MzYtMjEuMDA4MDk1LTE4NC4yMDIyNjYtNDQuNTM5NTFjLTU4LjY4MTgzMS0yNC4zNTI5Ni0xMDguMjA5Mjk2LTYzLjYxMTEwNS0xNTIuNTcyNzYtMTA3LjkxNTg4N2E0NzQuMzgzOTIgNDc0LjM4MzkyIDAgMCAxLTEwNS42MjcyOTUtMTUzLjYyOTAzM0M0OS4wNTk3MTYgNjA3Ljk0NTgyIDI4Ljc1NTgwMyA1NDYuNzk5MzUzIDI4Ljc1NTgwMyA0ODEuNTQ1MTU3YTQ4OC44MTk2NSA0ODguODE5NjUgMCAwIDEgMzYuODUyMTg5LTE4NS45NjI3MjJjMjQuNDExNjQyLTU4LjY4MTgzMSA2Ni4zNjkxNTEtMTA4LjA5MTkzMiAxMTAuNjczOTMzLTE1Mi41NzI3NnM5NS4xMjMyNDgtODIuNDQ3OTcyIDE1My45MjI0NDItMTA2LjgwMDkzMkE0ODAuNzIxNTU3IDQ4MC43MjE1NTcgMCAwIDEgNTE0LjY0MTM2MSAwLjAwMjA1NGM2NS4yNTQxOTYgMCAxMjUuNjM3OCAxNy42MDQ1NDkgMTgyLjMyNDQ0OCA0MS4zNzA2OTEgNTguNjgxODMxIDI0LjM1Mjk2IDExOC4xODUyMDcgNTEuMTExODc1IDE2Mi40ODk5ODkgOTUuNDE2NjU2czY4LjQyMzAxNSAxMDQuNzQ3MDY4IDkyLjc3NTk3NSAxNjMuNDg3NTgxYzIzLjUzMTQxNCA1Ni43NDUzMyA0Mi45NTUxIDExNi4zNjYwNyA0Mi45NTUxIDE4MS4yNjgxNzV6IiBmaWxsPSIjRkZENjM1IiBwLWlkPSI2MTI0Ij48L3BhdGg+PHBhdGggZD0iTTYxOC4zMzIxNTYgOTA4LjEwMzM4NGMtNjEuNDk4NTU5IDAtMTIwLjIzOTA3MS0xOS44MzQ0NTktMTczLjY5ODIxOS00Mi4wMTYxOS01NS40NTQzMy0yMy4wMDMyNzgtMTAyLjEwNjM4NS01OS45NzI4MzEtMTQzLjg4Nzg0OS0xMDEuODEyOTc3YTQ0Ny4zOTAyNzcgNDQ3LjM5MDI3NyAwIDAgMS05OS4zNDgzMzktMTQ0Ljg4NTQ0Yy0yMi4xODE3MzItNTMuNDU5MTQ4LTQxLjA3NzI4Mi0xMTEuMTQzMzg3LTQxLjA3NzI4Mi0xNzIuNzAwNjI4YTQ2MS40NzM5MTcgNDYxLjQ3MzkxNyAwIDAgMSAzNC41MDQ5MTctMTc1LjM5OTk5MmMyMy4wMDMyNzgtNTUuNDU0MzMgNjIuNzg5NTU5LTEwMS45MzAzNCAxMDQuMzk0OTc2LTE0My43MTE4MDNTMzg4Ljk0NDg4IDQ5LjcwNTU2NCA0NDQuMzQwNTI4IDI2LjcwMjI4N0E0NDQuNzQ5NTk1IDQ0NC43NDk1OTUgMCAwIDEgNTMyLjk1MDA5MiAwLjUzMDE5QzUyNi45MDU4NjQgMC4wMDIwNTQgNTIwLjgwMjk1MyAwLjAwMjA1NCA1MTQuNjQxMzYxIDAuMDAyMDU0YTQ4MC43MjE1NTcgNDgwLjcyMTU1NyAwIDAgMC0xODQuNDM2OTk0IDM2LjIwNjY4OWMtNTguNjgxODMxIDI0LjQxMTY0Mi0xMDkuNjE3NjYgNjIuNjcyMTk1LTE1My45MjI0NDIgMTA2Ljk3Njk3OHMtODYuMjYyMjkxIDkzLjg5MDkyOS0xMTAuNjczOTMzIDE1Mi41NzI3NkE0ODguODE5NjUgNDg4LjgxOTY1IDAgMCAwIDI4Ljc1NTgwMyA0ODEuNTQ1MTU3YzAgNjUuMjU0MTk2IDIwLjMwMzkxMyAxMjYuNDAwNjYzIDQzLjgzNTMyNyAxODMuMTQ1OTkzYTQ3My43OTcxMDEgNDczLjc5NzEwMSAwIDAgMCAxMDUuNjI3Mjk1IDE1My42MjkwMzNjNDQuMzA0NzgyIDQ0LjMwNDc4MiA5My44OTA5MjkgODMuNTYyOTI3IDE1Mi41NzI3NiAxMDcuOTE1ODg3IDU2Ljc0NTMzIDIzLjQ3MjczMiAxMTkuMDA2NzUzIDQ0LjUzOTUxIDE4NC4yMDIyNjcgNDQuNTM5NTFzMTI0Ljg3NDkzNi0yNy4zNDU3MzMgMTgxLjU2MTU4NC01MC44NzcxNDhhNDkwLjkzMjE5NiA0OTAuOTMyMTk2IDAgMCAwIDEyNy41NzQzLTc1LjQwNjE1MmMtMTEuMTQ5NTQ4IDUuNTE2MDkyLTIyLjUzMzgyMyAxMC43OTc0NTctMzQuMjExNTA3IDE1LjY2ODA0OS01My44MTEyMzkgMjIuMTIzMDUtMTA5Ljc5MzcwNSA0Ny45NDMwNTYtMTcxLjU4NTY3MyA0Ny45NDMwNTV6IiBmaWxsPSIjRjdCNTIzIiBwLWlkPSI2MTI1Ij48L3BhdGg+PHBhdGggZD0iTTQzNy4zNTczOSAxMDAuNDA2NjY2czMuNDYyMjI4LTIuNjk5MzY0IDkuNzQxMTg0LTYuOTI0NDU2YTIzNS45NTk2NDEgMjM1Ljk1OTY0MSAwIDAgMSA2OS4xODU4NzgtMzEuODA1NTUyQTIwOC44NDg2MzYgMjA4Ljg0ODYzNiAwIDAgMSA1NjguNjI4NjQ1IDU0LjQ1ODc5M2gxMy4zMjA3NzZjNC4xNjY0MSAwIDguOTE5NjM4IDAuMjkzNDA5IDEzLjIwMzQxMiAwLjU4NjgxOHM4LjYyNjIyOSAwLjkzODkwOSAxMi44NTEzMjEgMS41MjU3MjggOC4zMzI4MiAxLjQ2NzA0NiAxMi4zODE4NjYgMi4yODg1OTFhMTU5LjkwNzk4OSAxNTkuOTA3OTg5IDAgMCAxIDIyLjgyNzIzMiA3LjE1OTE4MyAxMzIuODU1NjY1IDEzMi44NTU2NjUgMCAwIDEgMTkuNDIzNjg2IDkuMzg5MDkzIDExNy4zNjM2NjEgMTE3LjM2MzY2MSAwIDAgMSAyNi4wNTQ3MzMgMjAuMTg2NTUgNzAuNDE4MTk3IDcwLjQxODE5NyAwIDAgMSA2LjI3ODk1NiA3LjMzNTIyOSAzMC44MDc5NjEgMzAuODA3OTYxIDAgMCAxIDIuMDUzODY0IDIuODE2NzI4IDEyNS40MDMwNzIgMTI1LjQwMzA3MiAwIDAgMS0xMi45MTAwMDMgMS41MjU3MjdjLTMuOTMxNjgzIDAtOC42MjYyMjkgMC40MTA3NzMtMTMuOTA3NTk0IDAuNjQ1NTAxcy0xMS4wMzIxODQgMC0xNy4xOTM3NzYgMC0xMi43MzM5NTctMC41ODY4MTgtMTkuNTk5NzMyLTEuMDU2MjczLTEzLjk2NjI3Ni0xLjM0OTY4Mi0yMS4zMDE1MDQtMi4yMjk5MWwtMTEuMDkwODY2LTEuNTI1NzI4Yy0zLjc1NTYzNy0wLjcwNDE4Mi03LjU2OTk1Ni0xLjIzMjMxOC0xMS4zODQyNzUtMS44MTkxMzZzLTcuMzM1MjI5LTEuMzQ5NjgyLTExLjczNjM2Ni0xLjkzNjUwMWwtNS44NjgxODQtMS4xNzM2MzZhNTIuMzQ0MTkzIDUyLjM0NDE5MyAwIDAgMC01LjUxNjA5Mi0wLjcwNDE4MiA0MTIuMTgxMTc5IDQxMi4xODExNzkgMCAwIDAtODYuNzkwNDI3IDBsLTMwLjQ1NTg3IDIuMjg4NTkxLTguNzQzNTkzIDAuNjQ1NXoiIGZpbGw9IiNGRkVGNTciIHAtaWQ9IjYxMjYiPjwvcGF0aD48cGF0aCBkPSJNNDk1LjkyMTg1NyAzMDYuNDM4NTc0YTE0Ny42NDM0ODYgMTQ3LjY0MzQ4NiAwIDAgMS0zLjIyNzUwMSAzNC41MDQ5MTYgMTAyLjEwNjM4NSAxMDIuMTA2Mzg1IDAgMCAxLTEyLjU1NzkxMSAyNy44NzM4N0E1OC42ODE4MzEgNTguNjgxODMxIDAgMCAxIDQ2My4wMDEzNSAzODcuMzAyMTM3Yy02LjIyMDI3NCA0LjQwMTEzNy0xMi44NTEzMjEgOS40NDc3NzUtMjAuMDEwNTA0IDkuNDQ3Nzc0YTM3LjYxNTA1MyAzNy42MTUwNTMgMCAwIDEtMjAuMzYyNTk2LTguMjc0MTM4IDYyLjMyMDEwNCA2Mi4zMjAxMDQgMCAwIDEtMTYuODQxNjg1LTE5Ljk1MTgyMiAxMDEuODEyOTc2IDEwMS44MTI5NzYgMCAwIDEtMTEuNzM2MzY2LTI4LjM0MzMyNCAxNDAuODM2Mzk0IDE0MC44MzYzOTQgMCAwIDEtNC44MTE5MS0zMy44NTk0MTcgMTQ2LjExNzc1OSAxNDYuMTE3NzU5IDAgMCAxIDQuMDQ5MDQ2LTM0LjM4NzU1MyAxMDAuODE1Mzg1IDEwMC44MTUzODUgMCAwIDEgMTIuMjY0NTAzLTI4LjEwODU5NiA2My4yMDAzMzIgNjMuMjAwMzMyIDAgMCAxIDE2Ljk1OTA0OS0xOS43NzU3NzcgMzUuNjc4NTUzIDM1LjY3ODU1MyAwIDAgMSAyMC40MjEyNzctNi42ODk3MjlBMzYuMTQ4MDA4IDM2LjE0ODAwOCAwIDAgMSA0NjMuMDAxMzUgMjI1LjEwNTU1N2E1Ny40NDk1MTIgNTcuNDQ5NTEyIDAgMCAxIDE3Ljk1NjY0IDE3LjYwNDU0OSAxMTUuMDE2Mzg4IDExNS4wMTYzODggMCAwIDEgMTAuMjEwNjM5IDMwLjIyMTE0MyAxMzUuMzc4OTgzIDEzNS4zNzg5ODMgMCAwIDEgNC43NTMyMjggMzMuNTA3MzI1ek03OTMuOTY2ODc1IDMwNi40Mzg1NzRhMTQ0LjUzMzM0OSAxNDQuNTMzMzQ5IDAgMCAxLTMuMjg2MTgyIDM0LjUwNDkxNiAxMDAuNDA0NjEyIDEwMC40MDQ2MTIgMCAwIDEtMTIuNTU3OTEyIDI3Ljg3Mzg3IDU4LjE1MzY5NCA1OC4xNTM2OTQgMCAwIDEtMTcuMTkzNzc2IDE4LjQ4NDc3N2MtNi4yNzg5NTYgNC40MDExMzctMTIuODUxMzIxIDkuNDQ3Nzc1LTIwLjA2OTE4NyA5LjQ0Nzc3NGEzNy40MzkwMDggMzcuNDM5MDA4IDAgMCAxLTIwLjMwMzkxMy04LjI3NDEzOCA2My4yMDAzMzIgNjMuMjAwMzMyIDAgMCAxLTE2LjkwMDM2Ny0xOS45NTE4MjJBMTAzLjUxNDc0OSAxMDMuNTE0NzQ5IDAgMCAxIDY5MS44NjA0OSAzNDAuMzU2NjcyYTE0MC44MzYzOTQgMTQwLjgzNjM5NCAwIDAgMS00LjgxMTkxLTMzLjg1OTQxNiAxNDYuMTE3NzU5IDE0Ni4xMTc3NTkgMCAwIDEgNC4wNDkwNDYtMzQuMzg3NTUzIDEwMi41MTcxNTggMTAyLjUxNzE1OCAwIDAgMSAxMi40OTkyMy0yOC4xNjcyNzkgNjMuMzE3Njk1IDYzLjMxNzY5NSAwIDAgMSAxNy4wMTc3MzEtMTkuNzc1Nzc3IDM1LjYxOTg3MSAzNS42MTk4NzEgMCAwIDEgMjAuMzYyNTk1LTYuNjg5NzI4IDM2LjE0ODAwOCAzNi4xNDgwMDggMCAwIDEgMjAuMTg2NTUgNy42Mjg2MzggNTcuMjczNDY3IDU3LjI3MzQ2NyAwIDAgMSAxNy42MDQ1NDkgMTcuNjA0NTQ5IDExNS4wNzUwNyAxMTUuMDc1MDcgMCAwIDEgMTAuMjY5MzIgMzAuMjIxMTQzIDEzOC4xOTU3MTEgMTM4LjE5NTcxMSAwIDAgMSA0LjkyOTI3NCAzMy41MDczMjV6TTI5NC4yOTEwODcgNTA5LjE4NDI5OWMtMTEuMDkwODY2IDIuNDY0NjM3LTMuNjk2OTU1IDI4Ljc1NDA5NyAwIDQxLjc4MTQ2NGEzNDUuODcwNzEgMzQ1Ljg3MDcxIDAgMCAwIDQzLjAxMzc4MiA5Mi41NDEyNDdjMzAuMzk3MTg4IDQ1LjQ3ODQxOSA3MS43Njc4NzkgODkuNDg5NzkyIDEyMC45NDMyNTMgMTEzLjc4NDA2OSA1MS4xNzA1NTYgMjUuMjMzMTg3IDExMy4xMzg1NyAzMC4xNjI0NjEgMTY5LjY0OTE3MiAzNC45MTU2OXMxMjAuMDA0MzQ0LTI3LjY5NzgyNCAxNjEuMjU3NjcxLTY0LjU1MDAxNGMyMS4yNDI4MjMtMTguODk1NTQ5IDQyLjMwOTYtMzguMDg0NTA4IDU3LjQ0OTUxMi02Mi4yNjE0MjNhMzUwLjYyMzkzOSAzNTAuNjIzOTM5IDAgMCAwIDM2LjMyNDA1NC03NS42NDA4NzljNy40NTI1OTMtMjIuMTgxNzMyIDEwLjM4NjY4NC00Ni45NDU0NjUgMTguMDE1MzIyLTY4LjM2NDMzMyA0LjA0OTA0Ni0xMS43MzYzNjYgMS40NjcwNDYtMTguMDc0MDA0LTkuODU4NTQ4LTE4Ljc3ODE4Ni0xMi4zMjMxODQtMC43NjI4NjQtMjEuMTg0MTQxLTAuNzYyODY0LTMxLjUxMjE0My0xLjY0MzA5MS00NS4zNjEwNTUtMy44MTQzMTktOTQuNzEyNDc1LTAuNDY5NDU1LTE0MC4xMzIyMTIgMHMtOTIuMTMwNDc0IDMuNjk2OTU1LTEzNy44NDM2MiAyLjExMjU0NmMtMjQuOTk4NDYtMC44ODAyMjctNDkuODIwODc0LTQuOTg3OTU2LTc0Ljg3ODAxNi0yLjc1ODA0Ni0yMy40NzI3MzIgMi4xMTI1NDYtNDIuOTU1MSA1LjM0MDA0Ny02Ny4yNDkzNzggNC4yMjUwOTEtMjEuOTQ3MDA1LTAuOTM4OTA5LTQ4LjQxMjUxIDIuMTEyNTQ2LTczLjgyMTc0MyAzLjc1NTYzOC0yMi44ODU5MTQgMS43MDE3NzMtNDQuNDgwODI4LTQuOTg3OTU2LTcxLjM1NzEwNiAwLjg4MDIyN3oiIGZpbGw9IiM5NDM0MzYiIHAtaWQ9IjYxMjciPjwvcGF0aD48cGF0aCBkPSJNNjk2Ljg0ODQ0NSA4MzAuNDY3MzIyQTE3NS40NTg2NzQgMTc1LjQ1ODY3NCAwIDAgMSA2ODAuMTI0MTI0IDkxNS40Mzg2MTNhMTk4LjU3OTMxNSAxOTguNTc5MzE1IDAgMCAxLTIxLjk0NzAwNSAzOC4yNjA1NTRjLTkuMDM3MDAyIDExLjMyNTU5My0yMi40NzUxNDEgMTkuMDcxNTk1LTMzLjgwMDczNSAyOC4xMDg1OTdhMTk0Ljk0MTA0MiAxOTQuOTQxMDQyIDAgMCAxLTM3LjMyMTY0NCAyMS43MTIyNzcgMTg4LjYwMzQwNCAxODguNjAzNDA0IDAgMCAxLTQwLjQzMTc4MSAxNC45NjM4NjcgMTkxLjcxMzU0MSAxOTEuNzEzNTQxIDAgMCAxLTQyLjg5NjQxOCA1LjUxNjA5MmMtMTQuODQ2NTAzIDAtMjguNTE5MzctNC44MTE5MS00Mi4zNjgyODItNy45ODA3MjlhMTg2LjY2NjkwNCAxODYuNjY2OTA0IDAgMCAxLTQxLjQ4ODA1NS0xMS4zODQyNzVjLTEzLjE0NDczLTYuMzM3NjM4LTIzLjQ3MjczMi0xNi42MDY5NTgtMzQuNTYzNTk4LTI1LjU4NTI3OHMtMjQuNTg3Njg3LTE1Ljk2MTQ1OC0zMy42MjQ2ODktMjcuMjg3MDUyLTE0LjAyNDk1OC0yNS4xMTU4MjQtMjAuMzYyNTk1LTM4LjI2MDU1M2ExODcuMzEyNDA0IDE4Ny4zMTI0MDQgMCAwIDEtMTUuNTUwNjg1LTQwLjA3OTY5MSAxOTIuNzY5ODE0IDE5Mi43Njk4MTQgMCAwIDEtNy4xMDA1MDItNDIuODk2NDE4YzAtMTQuODQ2NTAzIDUuODY4MTgzLTI4LjU3ODA1MiA5LjA5NTY4NC00Mi40ODU2NDVzMi4yODg1OTEtMzAuMTAzNzc5IDguNTA4ODY1LTQzLjAxMzc4MiAxNy42MDQ1NDktMjMuNDcyNzMyIDI2LjU4Mjg3LTM0Ljc5ODMyNmExOTQuNDEyOTA1IDE5NC40MTI5MDUgMCAwIDEgMjguOTg4ODI0LTMyLjU2ODQxNiAxOTcuMzQ2OTk3IDE5Ny4zNDY5OTcgMCAwIDEgMzYuMTQ4MDA4LTI1LjE3NDUwNWMxMi45MTAwMDMtNi4yMjAyNzQgMjguOTg4ODI0LTQuNTE4NTAxIDQzLjMwNzE5MS03Ljc0NjAwMnMyNy41ODA0Ni0xMC4wOTMyNzUgNDIuNDI2OTY0LTEwLjA5MzI3NWExOTQuNjQ3NjMzIDE5NC42NDc2MzMgMCAwIDEgNDMuMTMxMTQ1IDYuOTI0NDU2YzE0LjMxODM2NyAzLjIyNzUwMSAyOS42MzQzMjUgNC44MTE5MSA0Mi41NDQzMjcgMTEuMDMyMTg0czIzLjQ3MjczMiAxOC4xOTEzNjggMzQuNTA0OTE3IDI3LjIyODM3YTE5MS43MTM1NDEgMTkxLjcxMzU0MSAwIDAgMSAyOS4zNDA5MTUgMzEuMzk0Nzc5IDE5My42NTAwNDEgMTkzLjY1MDA0MSAwIDAgMSAyNC43NjM3MzMgMzUuMjA5MDk5IDE5MS40Nzg4MTQgMTkxLjQ3ODgxNCAwIDAgMSAxMS43MzYzNjYgNDEuNDI5MzcyIDE4OS43MTgzNTkgMTg5LjcxODM1OSAwIDAgMSA3LjEwMDUwMSA0Mi42MDMwMDl6IiBmaWxsPSIjRjc0RjVDIiBwLWlkPSI2MTI4Ij48L3BhdGg+PC9zdmc+') no-repeat;
    background-size: 100% 100%;
    
  }
  .angryBox{
    background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg4NDk0MjMxODUyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijk4MjIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUxMi4wMDIgNTEyLjAwMm0tNDkxLjk4OCAwYTQ5MS45ODggNDkxLjk4OCAwIDEgMCA5ODMuOTc2IDAgNDkxLjk4OCA0OTEuOTg4IDAgMSAwLTk4My45NzYgMFoiIGZpbGw9IiNGQzRDNTkiIHAtaWQ9Ijk4MjMiPjwvcGF0aD48cGF0aCBkPSJNNjE3LjQzMiA5MzEuMzU2Yy0yNzEuNzE2IDAtNDkxLjk4Ni0yMjAuMjY4LTQ5MS45ODYtNDkxLjk4NiAwLTE0NS4xNjggNjIuODg2LTI3NS42MzIgMTYyLjg4OC0zNjUuNjg0QzEyOS4wNTQgMTU1LjEyNCAyMC4wMTQgMzIwLjgyOCAyMC4wMTQgNTEyYzAgMjcxLjcxNiAyMjAuMjY4IDQ5MS45ODYgNDkxLjk4NiA0OTEuOTg2IDEyNi41NDggMCAyNDEuOTI0LTQ3Ljc5NiAzMjkuMDk4LTEyNi4yOTgtNjcuMTAyIDM0LjMxLTE0My4xMjQgNTMuNjY4LTIyMy42NjYgNTMuNjY4eiIgZmlsbD0iI0JDM0I0QSIgcC1pZD0iOTgyNCI+PC9wYXRoPjxwYXRoIGQ9Ik04MDMuMTE4IDgxMi4yMjhhMjAgMjAgMCAwIDEtMTcuNTA0LTEwLjI4Yy0yNC40Ni00My45MDYtNzAuODQyLTcxLjE4Ni0xMjEuMDQtNzEuMTg2LTQ4LjkwMiAwLTk1Ljc2NCAyNy40OS0xMjIuMjkyIDcxLjczOC01LjY4NiA5LjQ3OC0xNy45ODQgMTIuNTUtMjcuNDU4IDYuODc0LTkuNDgyLTUuNjg0LTEyLjU1OC0xNy45NzYtNi44NzQtMjcuNDU4IDMzLjcyNC01Ni4yNDQgOTMuNzM4LTkxLjE4NCAxNTYuNjI0LTkxLjE4NCA2NC43MTIgMCAxMjQuNDkyIDM1LjE1MiAxNTYuMDEgOTEuNzM2IDUuMzggOS42NTYgMS45MTQgMjEuODQ2LTcuNzQ0IDI3LjIyMmExOS45MDIgMTkuOTAyIDAgMCAxLTkuNzIyIDIuNTM4eiIgZmlsbD0iIzdDMTUyRSIgcC1pZD0iOTgyNSI+PC9wYXRoPjxwYXRoIGQ9Ik01MTAuOTYyIDUwMS4xNDJtLTU0LjU5MiAwYTU0LjU5MiA1NC41OTIgMCAxIDAgMTA5LjE4NCAwIDU0LjU5MiA1NC41OTIgMCAxIDAtMTA5LjE4NCAwWiIgZmlsbD0iI0ZGRkZGRiIgcC1pZD0iOTgyNiI+PC9wYXRoPjxwYXRoIGQ9Ik04MDMuMDk2IDQ4Ni4zODRtLTU0LjU5MiAwYTU0LjU5MiA1NC41OTIgMCAxIDAgMTA5LjE4NCAwIDU0LjU5MiA1NC41OTIgMCAxIDAtMTA5LjE4NCAwWiIgZmlsbD0iI0ZGRkZGRiIgcC1pZD0iOTgyNyI+PC9wYXRoPjxwYXRoIGQ9Ik01MTEuOTMgNTc1Ljc4OGMtOS4wOTggMC0xOC4yMTgtMS42MjgtMjcuMDAyLTQuOS0xOS4zMzYtNy4yMDItMzQuNzEtMjEuNTA0LTQzLjI5LTQwLjI2Ni04LjY1NC0xOC45MjYtOC44MTQtNDEuNTc4LTAuNDQyLTYyLjE1YTgzLjU3NCA4My41NzQgMCAwIDEgMTkuOTctMjkuMjE0IDI1MjEuNjIgMjUyMS42MiAwIDAgMS0xMC44OTgtNS42MjZjLTEzLjY2OC03LjA5Ni0yNC42NTYtMTMuNTg0LTM1LjI4LTE5Ljg1NC0xMi41NjItNy40MTQtMjUuNTUyLTE1LjA4LTQ0LjAxLTI0LjQzMi05Ljg2LTQuOTk0LTEzLjgwOC0xNy4wMzYtOC44MTItMjYuODk4IDQuOTk2LTkuODY0IDE3LjAzNi0xMy44MSAyNi45LTguODEyIDE5LjYxIDkuOTMgMzMuMTY0IDE3LjkzNCA0Ni4yNzIgMjUuNjcgMTAuNjMyIDYuMjc2IDIwLjY3NiAxMi4yMDQgMzMuMzggMTguOGE0MDM2LjA2IDQwMzYuMDYgMCAwIDAgMjQuNzg2IDEyLjczMmMzNC4wNiAxNy40IDYzLjQ3NiAzMi40MjYgODMuMDU2IDQ4LjMxMmEyMC4wNDQgMjAuMDQ0IDAgMCAxIDUuNTkgNy4yMThjOC41ODIgMTguNzY2IDkuMzQgMzkuNzUyIDIuMTQgNTkuMDg4LTcuMjAyIDE5LjMzNC0yMS41MDYgMzQuNzEtNDAuMjcgNDMuMjktMTAuMjUgNC42ODgtMjEuMTU0IDcuMDQyLTMyLjA5IDcuMDQyeiBtLTEwLjMyMi0xMTUuNzRjLTEwLjU3OCA0LjE3Mi0xOC44NiAxMi41MS0yMy4zMzggMjMuNTE2LTQuMjMgMTAuMzk2LTQuMzE2IDIxLjQ4Mi0wLjIzIDMwLjQxMmEzNi45ODYgMzYuOTg2IDAgMCAwIDIwLjg1OCAxOS40MDQgMzcgMzcgMCAwIDAgMjguNDY2LTEuMDMgMzYuOTgyIDM2Ljk4MiAwIDAgMCAxOS40MDQtMjAuODYgMzYuOTQ2IDM2Ljk0NiAwIDAgMCAwLjU3NC0yNC4zMzhjLTExLjQ2NC04LjUxNi0yNy4zMDYtMTcuNDM2LTQ1LjczNC0yNy4xMDR6TTgwNS43MTggNTYyLjE2NGMtMTAuOTM4IDAtMjEuODQyLTIuMzU0LTMyLjA4NC03LjA0LTE4Ljc2NC04LjU4LTMzLjA2Ni0yMy45NTYtNDAuMjctNDMuMjktNy4yLTE5LjMzNi02LjQ0Mi00MC4zMiAyLjE0LTU5LjA4OGEyMC4wNDQgMjAuMDQ0IDAgMCAxIDYuMzA4LTcuNzc0YzIxLjAzNi0xNS41NCA0OC44Mi0zMS42OTYgODIuNTcyLTQ4LjAxNCA1MC42NTYtMjQuNDkyIDU0LjAyNC0yNi40NjggOTUuMjE2LTUwLjYzMmw2LjI1OC0zLjY3YzkuNTM0LTUuNTk0IDIxLjc5OC0yLjM5NCAyNy4zOSA3LjE0MiA1LjU5NCA5LjUzNCAyLjM5NCAyMS44LTcuMTQyIDI3LjM5bC02LjI1MiAzLjY2NmMtMzYuNTMgMjEuNDMtNDQuMzM0IDI2LjAwNi04MC45OTYgNDMuODdhNzcuNDI4IDc3LjQyOCAwIDAgMSAxNy4zOCAyNC42OWM5LjQ2OCAyMS4yOTIgOS4zOCA0Ni41NTYtMC4yMzIgNjcuNTc4LTguNTggMTguNzY0LTIzLjk1NiAzMy4wNjgtNDMuMjkgNDAuMjdhNzcuMTU0IDc3LjE1NCAwIDAgMS0yNi45OTggNC45MDJ6TTc3MC4yIDQ3My44NDZhMzYuOTE4IDM2LjkxOCAwIDAgMCAwLjY3NiAyNC4wMTggMzYuOTkgMzYuOTkgMCAwIDAgMTkuNDA0IDIwLjg2IDM3LjAwOCAzNy4wMDggMCAwIDAgMjguNDY2IDEuMDMgMzYuOTkgMzYuOTkgMCAwIDAgMjAuODYtMTkuNDA0YzQuODM4LTEwLjU4MiA0Ljg2LTIzLjg2NiAwLjA1Ni0zNC42Ny0yLjk3OC02LjY5OC05LjE3Mi0xNS40MjQtMjEuOTMtMjAuNTEyLTE4LjUwMiA5LjgwOC0zNC40MTIgMTkuNDA2LTQ3LjUzMiAyOC42Nzh6IiBmaWxsPSIjN0MxNTJFIiBwLWlkPSI5ODI4Ij48L3BhdGg+PHBhdGggZD0iTTk0MC45MTIgMjMyLjI5Qzg4Ny45NTYgMTUxLjI1IDgxMy42IDg3LjA2NiA3MjUuODggNDYuNjgyYy0xMC4wNDgtNC42Mi0yMS45MjgtMC4yMy0yNi41NSA5LjgxLTQuNjIyIDEwLjA0Mi0wLjIzIDIxLjkzIDkuODEgMjYuNTUgODAuODc2IDM3LjIzIDE0OS40MzIgOTYuNDEyIDE5OC4yNjYgMTcxLjE0NEM5NTcuNDk4IDMzMC44NSA5ODMuOTc0IDQyMCA5ODMuOTc0IDUxMmMwIDI2MC4yNDgtMjExLjcyNiA0NzEuOTY4LTQ3MS45NyA0NzEuOTY4UzQwLjAzIDc3Mi4yNDggNDAuMDMgNTEyLjAwMiAyNTEuNzUyIDQwLjAzIDUxMiA0MC4wM2MxMS4wNTYgMCAyMC4wMTQtOC45NTggMjAuMDE0LTIwLjAxNFM1MjMuMDU2IDAgNTEyIDBDMjI5LjY4IDAgMCAyMjkuNjg0IDAgNTEyLjAwMlMyMjkuNjggMTAyNCA1MTIgMTAyNHM1MTItMjI5LjY4IDUxMi01MTEuOTk4YzAtOTkuOC0yOC43My0xOTYuNTIyLTgzLjA4OC0yNzkuNzEyeiIgZmlsbD0iIiBwLWlkPSI5ODI5Ij48L3BhdGg+PHBhdGggZD0iTTUwNy45NDYgNzgxLjkyYy01LjY4NCA5LjQ4Mi0yLjYwOCAyMS43NzQgNi44NzQgMjcuNDU4IDkuNDc0IDUuNjc4IDIxLjc3IDIuNjA0IDI3LjQ1OC02Ljg3NCAyNi41MjgtNDQuMjQ4IDczLjM5LTcxLjczOCAxMjIuMjkyLTcxLjczOCA1MC4yMDIgMCA5Ni41OCAyNy4yNzggMTIxLjA0IDcxLjE4NmEyMCAyMCAwIDAgMCAyNy4yMjYgNy43NDhjOS42NTgtNS4zOCAxMy4xMjQtMTcuNTY4IDcuNzQ0LTI3LjIyMi0zMS41Mi01Ni41ODYtOTEuMy05MS43MzYtMTU2LjAxLTkxLjczNi02Mi44ODYtMC4wMDYtMTIyLjkgMzQuOTM0LTE1Ni42MjQgOTEuMTc4ek00NjguNzE0IDM5OC4xMDZjLTEyLjcwMi02LjU5Ni0yMi43NDQtMTIuNTI0LTMzLjM4LTE4LjgtMTMuMTA4LTcuNzM2LTI2LjY2Mi0xNS43NC00Ni4yNzItMjUuNjctOS44Ni00Ljk5OC0yMS45MDQtMS4wNTQtMjYuOSA4LjgxMi00Ljk5NiA5Ljg2LTEuMDQ4IDIxLjkwNCA4LjgxMiAyNi44OTggMTguNDU4IDkuMzUgMzEuNDUgMTcuMDE4IDQ0LjAxMiAyNC40MzIgMTAuNjI0IDYuMjc0IDIxLjYxNCAxMi43NTggMzUuMjggMTkuODU0IDMuNjgyIDEuOTE0IDcuMzE4IDMuNzg2IDEwLjg5OCA1LjYyNmE4My41NDYgODMuNTQ2IDAgMCAwLTE5Ljk3IDI5LjIxNGMtOC4zNzIgMjAuNTcyLTguMjEyIDQzLjIyNCAwLjQ0MiA2Mi4xNSA4LjU4IDE4Ljc2NCAyMy45NTQgMzMuMDY0IDQzLjI5IDQwLjI2NmE3Ny4yMzYgNzcuMjM2IDAgMCAwIDI3LjAwMiA0LjljMTAuOTM4IDAgMjEuODQyLTIuMzU0IDMyLjA4NC03LjA0IDE4Ljc2NC04LjU4IDMzLjA2OC0yMy45NTYgNDAuMjctNDMuMjkgNy4yLTE5LjMzNiA2LjQ0Mi00MC4zMi0yLjE0LTU5LjA4OGExOS45NjYgMTkuOTY2IDAgMCAwLTUuNTktNy4yMThjLTE5LjU4LTE1Ljg4Ni00OC45OTYtMzAuOTE2LTgzLjA1Ni00OC4zMTItNy45NTgtNC4wNy0xNi4yMzgtOC4zLTI0Ljc4Mi0xMi43MzR6IG03OC42MzIgODkuMDQyYTM2LjkyIDM2LjkyIDAgMCAxLTAuNTc0IDI0LjMzOCAzNi45OSAzNi45OSAwIDAgMS0xOS40MDQgMjAuODYgMzcgMzcgMCAwIDEtMjguNDY2IDEuMDMgMzYuOTggMzYuOTggMCAwIDEtMjAuODU4LTE5LjQwNGMtNC4wODYtOC45MzItNC4wMDItMjAuMDE4IDAuMjMtMzAuNDEyIDQuNDc4LTExLjAwMiAxMi43NTgtMTkuMzQ0IDIzLjMzOC0yMy41MTYgMTguNDI0IDkuNjcyIDM0LjI2NiAxOC41OTIgNDUuNzM0IDI3LjEwNHpNOTQ2LjEwOCAzNzcuMTkyYzkuNTM0LTUuNTkgMTIuNzMyLTE3Ljg1NCA3LjE0Mi0yNy4zOS01LjU5LTkuNTM4LTE3Ljg1NC0xMi43MzItMjcuMzktNy4xNDJsLTYuMjU4IDMuNjdjLTQxLjE5MiAyNC4xNjQtNDQuNTU4IDI2LjE0LTk1LjIxNiA1MC42MzItMzMuNzUyIDE2LjMxOC02MS41MzggMzIuNDc0LTgyLjU3MiA0OC4wMTRhMTkuOTk0IDE5Ljk5NCAwIDAgMC02LjMwOCA3Ljc3NGMtOC41ODIgMTguNzY2LTkuMzQgMzkuNzUyLTIuMTQgNTkuMDg4IDcuMjAyIDE5LjMzNCAyMS41MDYgMzQuNzEgNDAuMjcgNDMuMjkgMTAuMjQ0IDQuNjg2IDIxLjE0OCA3LjA0IDMyLjA4NCA3LjA0IDkuMDk4IDAgMTguMjE4LTEuNjI4IDI3LjAwMi00LjkgMTkuMzM0LTcuMjAyIDM0LjcxLTIxLjUwNiA0My4yOS00MC4yNyA5LjYxMi0yMS4wMiA5LjctNDYuMjg0IDAuMjMyLTY3LjU3OGE3Ny4zNjYgNzcuMzY2IDAgMCAwLTE3LjM4LTI0LjY5YzM2LjY1OC0xNy44NjQgNDQuNDYyLTIyLjQ0IDgwLjk5Ni00My44N2w2LjI0OC0zLjY2OHogbS0xMDYuNSAxMjMuMTU2YTM2Ljk4MiAzNi45ODIgMCAwIDEtMjAuODYgMTkuNDA0IDM3LjAxOCAzNy4wMTggMCAwIDEtMjguNDY2LTEuMDMgMzYuOTgyIDM2Ljk4MiAwIDAgMS0xOS40MDQtMjAuODYgMzYuOTMgMzYuOTMgMCAwIDEtMC42NzYtMjQuMDE4YzEzLjExOC05LjI3NCAyOS4wMy0xOC44NjggNDcuNTM2LTI4LjY3OCAxMi43NTggNS4wODQgMTguOTUyIDEzLjgxMiAyMS45MyAyMC41MTIgNC44IDEwLjgwNiA0Ljc3NiAyNC4wOTItMC4wNiAzNC42N3oiIGZpbGw9IiIgcC1pZD0iOTgzMCI+PC9wYXRoPjxwYXRoIGQ9Ik02NDYuMjYyIDQwLjAzbS0yMC4wMTQgMGEyMC4wMTQgMjAuMDE0IDAgMSAwIDQwLjAyOCAwIDIwLjAxNCAyMC4wMTQgMCAxIDAtNDAuMDI4IDBaIiBmaWxsPSIiIHAtaWQ9Ijk4MzEiPjwvcGF0aD48L3N2Zz4=') no-repeat;
    background-size: 100% 100%;
    
  }
  .sadBox{
    background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg4NDk0MzQzMTIxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijk5NjciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTc1Ni4zNjM2MzYgNDY1LjQ1NDU0NWE1OC4xODE4MTggNTguMTgxODE4IDAgMSAxIDAtMTE2LjM2MzYzNiA1OC4xODE4MTggNTguMTgxODE4IDAgMCAxIDAgMTE2LjM2MzYzNk02MjguMzYzNjM2IDc5MS4yNzI3MjdhMzQuOTA5MDkxIDM0LjkwOTA5MSAwIDAgMS0zNC45MDkwOTEtMzQuOTA5MDkxYzAtNDQuOTE2MzY0LTM2LjUzODE4Mi04MS40NTQ1NDUtODEuNDU0NTQ1LTgxLjQ1NDU0NXMtODEuNDU0NTQ1IDM2LjUzODE4Mi04MS40NTQ1NDUgODEuNDU0NTQ1YTM0LjkwOTA5MSAzNC45MDkwOTEgMCAwIDEtNjkuODE4MTgyIDBjMC04My40MDk0NTUgNjcuODYzMjczLTE1MS4yNzI3MjcgMTUxLjI3MjcyNy0xNTEuMjcyNzI3czE1MS4yNzI3MjcgNjcuODYzMjczIDE1MS4yNzI3MjcgMTUxLjI3MjcyN0EzNC45MDkwOTEgMzQuOTA5MDkxIDAgMCAxIDYyOC4zNjM2MzYgNzkxLjI3MjcyN00yNzkuMjcyNzI3IDQ2NS40NTQ1NDVhNTguMTgxODE4IDU4LjE4MTgxOCAwIDEgMSAwLTExNi4zNjM2MzYgNTguMTgxODE4IDU4LjE4MTgxOCAwIDAgMSAwIDExNi4zNjM2MzZNNTEyIDIzLjI3MjcyN0MyNDIuMDgyOTA5IDIzLjI3MjcyNyAyMy4yNzI3MjcgMjQyLjA4MjkwOSAyMy4yNzI3MjcgNTEyczIxOC44MTAxODIgNDg4LjcyNzI3MyA0ODguNzI3MjczIDQ4OC43MjcyNzMgNDg4LjcyNzI3My0yMTguODEwMTgyIDQ4OC43MjcyNzMtNDg4LjcyNzI3M1M3ODEuOTE3MDkxIDIzLjI3MjcyNyA1MTIgMjMuMjcyNzI3IiBmaWxsPSIjNzk3OTc5IiBwLWlkPSI5OTY4Ij48L3BhdGg+PC9zdmc+') no-repeat;
    background-size: 100% 100%;
    
  }
  .calmBox{
    background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg4ODIyNjc5NjgwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjYyMzEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTg3Mi44MDI5MjggNzU1Ljk5NDA2IDg3Mi44NjQzMjYgNzU1Ljk5NDA2IDg3Mi44NjQzMjYgNzU1LjYyNDY0NloiIHAtaWQ9IjYyMzIiPjwvcGF0aD48cGF0aCBkPSJNODA3LjI3MzQ2OSAyMTYuNzI3MDQzYy0xNjIuODA4MDE2LTE2Mi44MzY2NjktNDI3LjczNjg3NC0xNjIuODM2NjY5LTU5MC41NDQ4OTEgMC0xNjIuODM2NjY5IDE2Mi44MDY5OTMtMTYyLjgzNjY2OSA0MjcuNzM2ODc0IDAgNTkwLjU0Mzg2NyAxNjIuODA4MDE2IDE2Mi44Mzc2OTIgNDI3LjczNzg5OCAxNjIuODM3NjkyIDU5MC41NDQ4OTEgMEM5NzAuMTEwMTM3IDY0NC40NjI4OTQgOTcwLjExMDEzNyAzNzkuNTM0MDM2IDgwNy4yNzM0NjkgMjE2LjcyNzA0M003NjQuODkzMjQyIDc2NC45MjAzNmMtMTM5LjQ0NDkxMiAxMzkuNDQzODg5LTM2Ni4zNzAyMjUgMTM5LjQxNDIxMy01MDUuNzk4NzY0IDAtMTM5LjQ1OTIzOS0xMzkuNDczNTY1LTEzOS40NTkyMzktMzY2LjM1NDg3NSAwLTUwNS44Mjc0MTcgMTM5LjQyODUzOS0xMzkuNDI5NTYzIDM2Ni4zNTQ4NzUtMTM5LjQ2MDI2MiA1MDUuNzk4NzY0IDBDOTA0LjMzNjEwOCAzOTguNTIxNDgyIDkwNC4zMzYxMDggNjI1LjQ3NjQ3MSA3NjQuODkzMjQyIDc2NC45MjAzNiIgcC1pZD0iNjIzMyI+PC9wYXRoPjxwYXRoIGQ9Ik0zODEuNzI0NDIzIDQ2OC4wMjEzN2MyNC43ODM0NTMgMCA0NC45NTM4NDEtMjAuMTY5MzY1IDQ0Ljk1Mzg0MS00NC45NjcxNDQgMC0yNC44Mjg0NzgtMjAuMTcwMzg4LTQ1LjAyNzUxOS00NC45NTM4NDEtNDUuMDI3NTE5LTI0Ljg0MjgwNSAwLTQ1LjAxMzE5MyAyMC4xOTkwNDEtNDUuMDEzMTkzIDQ1LjAyNzUxOUMzMzYuNzExMjMgNDQ3Ljg1MjAwNCAzNTYuODgxNjE4IDQ2OC4wMjEzNyAzODEuNzI0NDIzIDQ2OC4wMjEzNyIgcC1pZD0iNjIzNCI+PC9wYXRoPjxwYXRoIGQ9Ik02NDAuNjgwMjQzIDQ2OC4wOTUwNDhjMjQuODEyMTA1IDAgNDUuMDEwMTIzLTIwLjIxMzM2NyA0NS4wMTAxMjMtNDUuMDEyMTcgMC0yNC44Mjc0NTUtMjAuMTk4MDE4LTQ0Ljk5NjgyLTQ1LjAxMDEyMy00NC45OTY4Mi0yNC43ODU0OTkgMC00NC45NTM4NDEgMjAuMTY5MzY1LTQ0Ljk1Mzg0MSA0NC45OTY4MkM1OTUuNzI2NDAxIDQ0Ny44ODE2OCA2MTUuODk0NzQzIDQ2OC4wOTUwNDggNjQwLjY4MDI0MyA0NjguMDk1MDQ4IiBwLWlkPSI2MjM1Ij48L3BhdGg+PHBhdGggZD0iTTY0Mi4yNDU5MDEgNjE5LjA1ODI5NGwtMi40NTM4ODggMC43OTgxNzljLTQwLjMxMDA3OCAxOC4yNDg2MTktODMuNTQ4ODU4IDI3LjUzNDEtMTI4LjQxMTYyNSAyNy41MzQxLTQ2LjM0MzQ5MSAwLTkwLjE3Mzc0Mi05LjM3NTUzMS0xMzAuMzA1NzY1LTI3Ljc5OTEzNmwtMi40MjUyMzYtMC43NDE4OTdjLTEuNTA4MzUzLTAuNDEzNDE2LTMuNTQ4ODI2LTEuMDAzODYzLTYuMDkyNzY1LTEuMDAzODYzLTE0Ljc1NzA5OSAwLTI2LjczNDg5OCAxMS45Nzc3OTktMjYuNzM0ODk4IDI2LjY3NTU0NiAwIDYuOTc4OTQ4IDMuMjgyNzY2IDEzLjk4ODU5NiA4LjY5NTAzMyAxOS4yNTM1MDZsLTAuMzI1NDExIDEuNjI1MDEgNi44MzE1OTIgMy4wNzYwNThjNDcuOTExMTk2IDIxLjY3OTc2NSAxMDAuMDIxMDE4IDMzLjA5NTc2OSAxNTAuNjgxODM4IDMzLjA5NTc2OSA1MS42MDg0MDIgMCAxMDIuMTgwMTk0LTExLjEyMDI2OCAxNTAuOTc4NTk3LTMzLjM2MTgyOSA4LjU3NTMwNi00LjcwMzExNSAxMy45MjgyMjEtMTMuNzIxNTEzIDEzLjkyODIyMS0yMy41MTE0ODNDNjc2LjYxMTU5MyA2MjcuNDU4NjE1IDY2MS4wMjc2NjMgNjEzLjI5MDk0MSA2NDIuMjQ1OTAxIDYxOS4wNTgyOTQiIHAtaWQ9IjYyMzYiPjwvcGF0aD48L3N2Zz4=') no-repeat;
    background-size: 100% 100%;
  }
  .happyBox{
    background:url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg4ODQyNjg4OTY0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI3NjAiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUxMi4wMDIgNTEyLjAwMm0tNDkxLjk4OCAwYTQ5MS45ODggNDkxLjk4OCAwIDEgMCA5ODMuOTc2IDAgNDkxLjk4OCA0OTEuOTg4IDAgMSAwLTk4My45NzYgMFoiIGZpbGw9IiNGRERGNkQiIHAtaWQ9IjI3NjEiPjwvcGF0aD48cGF0aCBkPSJNNjE3LjQzIDkzMS4zNTZjLTI3MS43MTYgMC00OTEuOTg2LTIyMC4yNjgtNDkxLjk4Ni00OTEuOTg2IDAtMTQ1LjE2OCA2Mi44ODYtMjc1LjYzMiAxNjIuODg4LTM2NS42ODRDMTI5LjA1NCAxNTUuMTI0IDIwLjAxNCAzMjAuODI4IDIwLjAxNCA1MTJjMCAyNzEuNzE2IDIyMC4yNjggNDkxLjk4NiA0OTEuOTg2IDQ5MS45ODYgMTI2LjU0OCAwIDI0MS45MjQtNDcuNzk2IDMyOS4wOTgtMTI2LjI5OC02Ny4xMDYgMzQuMzEtMTQzLjEyNCA1My42NjgtMjIzLjY2OCA1My42Njh6IiBmaWxsPSIjRkNDNTZCIiBwLWlkPSIyNzYyIj48L3BhdGg+PHBhdGggZD0iTTU4My41ODQgODQyLjM1Yy0xMDkuOTg0IDAtMTk5LjE0Ni04OS4xNjItMTk5LjE0Ni0xOTkuMTQ2aDM5OC4yOTJjMCAxMDkuOTg0LTg5LjE2MiAxOTkuMTQ2LTE5OS4xNDYgMTk5LjE0NnoiIGZpbGw9IiM3RjE4NEMiIHAtaWQ9IjI3NjMiPjwvcGF0aD48cGF0aCBkPSJNNDI2LjMxNCAzNTkuNzA0bS02MC4wNDQgMGE2MC4wNDQgNjAuMDQ0IDAgMSAwIDEyMC4wODggMCA2MC4wNDQgNjAuMDQ0IDAgMSAwLTEyMC4wODggMFoiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjI3NjQiPjwvcGF0aD48cGF0aCBkPSJNNzY0LjM3NCAzNTkuNzA0bS02MC4wNDQgMGE2MC4wNDQgNjAuMDQ0IDAgMSAwIDEyMC4wODggMCA2MC4wNDQgNjAuMDQ0IDAgMSAwLTEyMC4wODggMFoiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjI3NjUiPjwvcGF0aD48cGF0aCBkPSJNNTg3LjUzIDc1OS43MzJjLTUzLjgzMi0yNS4wMS0xMTMuNTY4LTIxLjM3Ni0xNjIuMDEgNC41NjQgMzYuNCA0Ny40NDIgOTMuNjQyIDc4LjA1OCAxNTguMDYgNzguMDU4YTE5OC40MTIgMTk4LjQxMiAwIDAgMCA3OS44MDYtMTYuNjg0Yy0xNy45MjgtMjcuNzQ4LTQzLjYzOC01MC45Ny03NS44NTYtNjUuOTM4eiIgZmlsbD0iI0ZDNEM1OSIgcC1pZD0iMjc2NiI+PC9wYXRoPjxwYXRoIGQ9Ik0zMDAuNTcyIDQ4MS41NDJjLTM2LjUzNiAwLTY2LjE1NiAyOS42Mi02Ni4xNTYgNjYuMTU2aDEzMi4zMTRjMC0zNi41MzYtMjkuNjE4LTY2LjE1Ni02Ni4xNTgtNjYuMTU2ek04NzcuNjI4IDQ3Mi42NzhjLTM2LjUzNiAwLTY2LjE1NiAyOS42Mi02Ni4xNTYgNjYuMTU2aDEzMi4zMTRjLTAuMDAyLTM2LjUzOC0yOS42MjItNjYuMTU2LTY2LjE1OC02Ni4xNTZ6IiBmaWxsPSIjRjlBODgwIiBwLWlkPSIyNzY3Ij48L3BhdGg+PHBhdGggZD0iTTQzNi43ODIgNjQzLjIwNHYzMS4wODZjMCAxMy4xMDggMTAuNjI2IDIzLjczMiAyMy43MzIgMjMuNzMySDcxNC4xNmMxMy4xMDggMCAyMy43MzItMTAuNjI2IDIzLjczMi0yMy43MzJ2LTMxLjA4Nkg0MzYuNzgyeiIgZmlsbD0iI0YyRjJGMiIgcC1pZD0iMjc2OCI+PC9wYXRoPjxwYXRoIGQ9Ik01OTguNjcwOTEyIDIxMi4wMTAzMTNhMTAyLjc0IDU3LjM3NCAxNS44MDEgMSAwIDMxLjI0NTU0MS0xMTAuNDEyMDQ1IDEwMi43NCA1Ny4zNzQgMTUuODAxIDEgMC0zMS4yNDU1NDEgMTEwLjQxMjA0NVoiIGZpbGw9IiNGQ0VCODgiIHAtaWQ9IjI3NjkiPjwvcGF0aD48cGF0aCBkPSJNOTM1LjQ0MiAyMjQuMDk2Yy01Ni41NDYtODMuMDEtMTM1LjMyNC0xNDcuMTE2LTIyNy44MTYtMTg1LjM4Ni0xMC4yMTItNC4yMjQtMjEuOTIyIDAuNjMtMjYuMTQ4IDEwLjg0Mi00LjIyNCAxMC4yMTYgMC42MjggMjEuOTIgMTAuODQyIDI2LjE0OCA4NS4yNjYgMzUuMjggMTU3Ljg5NCA5NC4zOSAyMTAuMDQgMTcwLjkzNCA1My4zODggNzguMzggODEuNjEyIDE3MC4xNCA4MS42MTIgMjY1LjM2OCAwIDI2MC4yNDgtMjExLjcyNCA0NzEuOTctNDcxLjk3IDQ3MS45N1M0MC4wMyA3NzIuMjQ0IDQwLjAzIDUxMiAyNTEuNzUyIDQwLjAzIDUxMiA0MC4wM2MxMS4wNTQgMCAyMC4wMTQtOC45NjIgMjAuMDE0LTIwLjAxNFM1MjMuMDU0IDAgNTEyIDBDMjI5LjY4IDAgMCAyMjkuNjggMCA1MTJzMjI5LjY4IDUxMiA1MTIgNTEyIDUxMi0yMjkuNjggNTEyLTUxMmMwLTEwMy4zLTMwLjYyMi0yMDIuODU2LTg4LjU1OC0yODcuOTA0eiIgZmlsbD0iIiBwLWlkPSIyNzcwIj48L3BhdGg+PHBhdGggZD0iTTUwNi4zODYgMzU5LjcxMmMwLTQ0LjE0NC0zNS45MTQtODAuMDU4LTgwLjA1OC04MC4wNThzLTgwLjA1OCAzNS45MTQtODAuMDU4IDgwLjA1OGMwIDQ0LjE0NCAzNS45MTQgODAuMDU4IDgwLjA1OCA4MC4wNThzODAuMDU4LTM1LjkxNCA4MC4wNTgtODAuMDU4eiBtLTEyMC4wODggMGMwLTIyLjA3MiAxNy45NTgtNDAuMDMgNDAuMDMtNDAuMDNzNDAuMDMgMTcuOTU4IDQwLjAzIDQwLjAzYzAgMjIuMDcyLTE3Ljk1OCA0MC4wMy00MC4wMyA0MC4wM3MtNDAuMDMtMTcuOTU4LTQwLjAzLTQwLjAzek04NDQuNDMgMzU5LjcxMmMwLTQ0LjE0NC0zNS45MTQtODAuMDU4LTgwLjA1OC04MC4wNThzLTgwLjA1OCAzNS45MTQtODAuMDU4IDgwLjA1OGMwIDQ0LjE0NCAzNS45MTQgODAuMDU4IDgwLjA1OCA4MC4wNThzODAuMDU4LTM1LjkxNCA4MC4wNTgtODAuMDU4eiBtLTEyMC4wODggMGMwLTIyLjA3MiAxNy45NTgtNDAuMDMgNDAuMDMtNDAuMDNzNDAuMDMgMTcuOTU4IDQwLjAzIDQwLjAzYzAgMjIuMDcyLTE3Ljk1OCA0MC4wMy00MC4wMyA0MC4wM3MtNDAuMDMtMTcuOTU4LTQwLjAzLTQwLjAzek0zNjQuNDIyIDY0My4yMDRjMCAxMjAuODQ2IDk4LjMxNCAyMTkuMTYgMjE5LjE2IDIxOS4xNnMyMTkuMTYtOTguMzE0IDIxOS4xNi0yMTkuMTZjMC0xMS4wNTQtOC45NjItMjAuMDE0LTIwLjAxNC0yMC4wMTRIMzg0LjQzNmMtMTEuMDUyLTAuMDAyLTIwLjAxNCA4Ljk2LTIwLjAxNCAyMC4wMTR6IG0zOTcuMTgyIDIwLjAxNGMtOS45ODQgODkuMzktODYuMDEyIDE1OS4xMTYtMTc4LjAyMiAxNTkuMTE2LTkyLjAwOCAwLTE2OC4wMzgtNjkuNzI2LTE3OC4wMjItMTU5LjExNmgzNTYuMDQ0eiIgZmlsbD0iIiBwLWlkPSIyNzcxIj48L3BhdGg+PHBhdGggZD0iTTYyOC44NjIgMzMuNzM0bS0yMC4wMTQgMGEyMC4wMTQgMjAuMDE0IDAgMSAwIDQwLjAyOCAwIDIwLjAxNCAyMC4wMTQgMCAxIDAtNDAuMDI4IDBaIiBmaWxsPSIiIHAtaWQ9IjI3NzIiPjwvcGF0aD48L3N2Zz4=') no-repeat;
    background-size: 100% 100%;
  }
}

.imageBox{
  height: 1.85rem;
  margin: .8rem auto;
  border-radius: .1rem;
  border: 2px dashed #efefef;
  position: relative;
  padding: $padding;
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  .imgplus{
    display: inline-block;
    height: 100%;
    width: 20%;
    text-align: center;
    border-radius: .35rem;
    border: 2px solid #efefef;
    color: #D2D2D2;
  }
  .imgOutput{
    width: 25%;
    margin-left: $padding;
    position: relative;
    img{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
    }
    .deleteBtn{
      height: 1.85rem;
      line-height: 1.42rem;
      display: none;
    }
    &:hover .deleteBtn{
      display: inline-block;
    }
  }
}

.postBtn{
  background: #00B26A;
  color: #fff;
  margin: .8rem auto;
}

</style>