<template>
  <div class="mainBox">
    <input
           v-model='nickname'
           class="input"
           maxlength='16'
           placeholder="最多输入16个字哦">
    <div class="button">
      <button @click="modifyNickname()">完成</button>
    </div>
  </div>
</template>

<script>
    import {put} from '@/util'
    export default {
        data(){
            return{
                userinfo: wx.getStorageSync('userinfo') ? wx.getStorageSync('userinfo') : {},
                nickname:'',
            }
        },
        onLoad(){
            wx.setNavigationBarTitle({
                title: '修改昵称'
            })
        },
        beforeMount(){
            this.nickname=this.userinfo.nickname
        },
        methods:{
            async modifyNickname(){
                // 修改昵称的方法
                try {
                    let that=this
                    const params={
                        'nickname':that.nickname,
                    }
                    let header = {
                        'token': wx.getStorageSync('token'),
                        'Content-Type': 'application/json'
                    }
                    const res = await put('/jieyou/api/user/nickname',params,header)
                    if(res.data.success){
                        let userinfo=wx.getStorageSync('userinfo')
                        userinfo.nickname=that.nickname
                        wx.setStorageSync('userinfo', userinfo)//修改本地的存储数据
                        wx.showToast({//弹窗提示保存成功
                            title: '保存成功',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },
        }
    }
</script>

<style scoped lang="scss">
  .mainBox{
    background: #F0F0F0;
    overflow:hidden;
    .input {
      float:left;
      color:#333;
      width:60%;
      line-height:45px;
      height:45px;
      font-size:14px;
    }
    .button{
      float:right;
      height:40px;
      line-height:40px;
      padding-top:10px;
    }
    button {
      width:100%;
      border-radius:20px;
      background: #a6d7ff;
      font-size:12px;
      color:#FFFFFF;
      border-color:#a6d7ff;
      font-weight:bold;
    }
  }
</style>
