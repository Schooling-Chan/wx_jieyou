<template>
    <div class="profile_container">
      <div class="tip">
        点击可修改个人头信息哦
      </div>
      <div class="top">
        <div class="row">
          <lebal class="font">
            头像
          </lebal>
          <lebal class="right_content" @click="uploadPicture">
            <img class="img left" :src="imgaeSrc">
            <span class="right" > > </span>
          </lebal>
        </div>
      </div>
      <div class="contain">
        <div class="row">
          <lebal class="font">
         昵称
          </lebal>
          <lebal class="right_content">
            <span></span>
            <span class="right" @tap="toModifyNickName">{{userinfo.nickname}}  > </span>
          </lebal>
        </div>
      </div>
      <div class="contain">
        <div class="row">
          <label class="left">
          </label>
          <label class="name">性别</label>
          <label class="right">
            <picker :value="index" :range="array"
                    @change="pickerChange" >
              <view class="picker">
                {{sex}}  >
              </view>
            </picker>
          </label>
        </div>
        <div class="row">
          <label class="left">
          </label>
          <label class="name">角色</label>
          <label class="right">
            {{role}}   >
          </label>
        </div>
      </div>
      <footer class="footer">
        <button class="outlogin" @click="loginout">
          退出登录->
        </button>
      </footer>
    </div>
</template>

<script>
    import {put, del,get} from '@/util'
    export default {
        data(){
            return{
                addimage:'',
                src:[],
                userinfo: wx.getStorageSync('userinfo') ? wx.getStorageSync('userinfo') : {},
                array:['男','女'],
                gender:'',
                sex:'',
                role:'',
                filePath:'',
                signature:'',
                policy:'',
                imgaeSrc:'',
            }
        },
        beforeMount(){
            this.imgaeSrc= this.userinfo.avatarUrl//addimage的初始值，使图像与本地存储显示同步
            this.sex=(this.userinfo.gender ? '男' : '女')//sex的初始值，使gender值与本地存储显示同步
            this.role=(this.userinfo.role ? '暖心师' : '用户')//sex的初始值，使gender值与本地存储显示同步
        },
        watch:{
        },
        methods:{
            toModifyNickName(){
                //跳转到修改昵称的页面
                wx.navigateTo({
                    url:'/pages/modifyNickname/main'
                })
            },
            uploadPicture () {//上传本地头像的方法
                let that = this
                wx.chooseImage({
                    count: 1,
                    sizeType: ['original', 'compressed'],
                    sourceType: ['album', 'camera'],
                    success (res) {
                        const tempFilePaths = res.tempFilePaths
                        that.addimage=tempFilePaths
                        that.imgaeSrc=res.tempFilePaths[0]
                        console.log(tempFilePaths,'(tempFilePaths')
                        console.log( that.imgaeSrc,'(that.imgaeSrc')
                        //选择图片成功回调
                        wx.showLoading({
                            title: '上传中',
                            mask: true
                        })
                        if(res){
                            that.getSignature()
                        }
                    },
                })
            },
            async getSignature(){//从后台中获得上传到阿里云的policy和signature，以及filePath
                let that=this
                try {
                    let header = {
                        'token': wx.getStorageSync('token'),
                        'Content-Type': 'application/json'
                    }
                    const params={
                        fileName:'https://jieyouxiaozhan.oss-cn-shenzhen.aliyuncs.com/'+that.imgaeSrc,
                    }
                    const res = await get('/jieyou/api/upload/signature/user/avatar',params,header)
                    console.log('从后端返回的执行正确的信息是：', res)
                    if(res.data.msg){
                        that.filePath=res.data.object.filePath
                        that.signature=res.data.object.signature
                        that.policy=res.data.object.policy
                        //若成功拿到则上传图片到阿里云上
                        that.upload_picture()
                    }
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },
            upload_picture(){//上传图片到阿里云上
                let that = this
                let reg=new RegExp("/");
                let file_Path=that.filePath.replace(reg,"");
               // const file_Path =that.filePath.split("/").join("");
                console.log('file_Path',file_Path)
                wx.uploadFile
                ({
                    url: 'https://jieyouxiaozhan.oss-cn-shenzhen.aliyuncs.com',
                    filePath:that.imgaeSrc,
                    name: 'file',
                    header: {
                        "Content-Type": "multipart/form-data",
                    },
                    formData:
                        {
                            name:that.imgaeSrc,
                            key:file_Path,
                            policy:that.policy,
                            OSSAccessKeyId:'LTAI4FoeEXnUpZAZDiLgYDXr',
                            success_action_status:'200',
                            signature:that.signature,
                        },
                    success:(res)=>
                    {
                        console.log('成功上传')
                        console.log(res)
                        wx.hideLoading()
                        //若上传成功，则调用修改头像的方法
                        that.modifyAvatar()
                    },
                    fail:(res)=>{
                        console.log('失败')
                        console.log(res)
                    }
                })
            },
            async modifyAvatar(){
                // 修改头像方法
                try {
                    let that=this
                    const params={
                        'avatarUrl':'https://jieyouxiaozhan.oss-cn-shenzhen.aliyuncs.com'+that.filePath,
                    }
                    let header = {
                        'token': wx.getStorageSync('token'),
                        'Content-Type': 'application/json'
                    }
                    console.log('avatarUrl', params)
                    const res = await put('/jieyou/api/user/avatar',params,header)
                    console.log('从后端返回的执行正确的信息是：', res)
                    if(res.data.success){
                        let userinfo=wx.getStorageSync('userinfo')
                        userinfo.avatarUrl='https://jieyouxiaozhan.oss-cn-shenzhen.aliyuncs.com'+that.filePath
                        wx.setStorageSync('userinfo', userinfo)//修改本地的存储数据
                        wx.showToast({//弹窗提示保存成功
                            title: '保存成功',
                            icon: 'none',
                            duration: 2000
                        })
                        console.log(wx.getStorageSync('userinfo'))
                    }
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },

            async modifyGender(){
                //修改性别的接口
                try {
                    let that=this
                    const url='/jieyou/api/user/gender/'+that.gender
                    let header = {
                        'token': wx.getStorageSync('token'),
                        'Content-Type': 'application/json'
                    }
                    const res = await put(url,'',header)
                    console.log('从后端返回的执行正确的信息是：', res)
                    if(res.data.success){
                        let userinfo=wx.getStorageSync('userinfo')
                        userinfo.gender=that.gender
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
            pickerChange(e){
                //性别picker变化
                console.log(e.mp.detail.value)
                console.log('picker发送选择改变，携带下标为', e.mp.detail.value)
                console.log('picker发送选择改变，携带值为', this.array[e.mp.detail.value])
                this.sex=this.array[e.mp.detail.value]
                this.index = e.mp.detail.value
                this.gender=this.index
                console.log( this.gender)
                this.modifyGender()
            },
            async loginout() {//退出登录
                try {
                    let that = this
                    that.token = wx.getStorageSync('token')
                    const params= {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'token': that.token,
                    }
                    let header = {
                        'token': wx.getStorageSync('token'),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                    const res = await del('/jieyou/api/logout', params,header)
                    console.log('从后端返回的执行正确的信息是：', res)
                    if(res.data.success){
                        wx.setStorageSync('token', '')
                        wx.setStorageSync('userinfo', '')
                        wx.showToast({
                            title: '退出成功',//提示文字
                            duration:2000,//显示时长
                        })
                        wx.reLaunch({
                            url: '/pages/login/main'
                        })
                    }else{
                        wx.showToast({
                            title: '加载中',//提示文字
                            icon:'none',
                            duration:2000,//显示时长
                        })
                    }
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },
        },
    }
</script>

<style scoped lang="scss">
  .profile_container{
    background-color: #f5f5f5;
  }
  .tip{
    background-color: #f5f5f5;
    height:30px;
    width:100%;
    font-size:12px;
    color: #C8C8C8;
    line-height: 30px;
    padding-left:10px ;
  }
  .top{
    margin-bottom:8px;
    background-color:white;
    overflow:hidden;
    height: 80px;
    width: 100%;
    line-height: 80px;
    .row{
      .font{
        padding-left: 20px;
        height:20px;
        float:left;
        font-size: 18px;
      }
      .right_content{
        float:right;
        overflow: hidden;
        .img{
          float:left;
          width: 90rpx;
          height:90rpx;
          margin: 10rpx;
          padding: 20rpx;
          padding-top: 20rpx;
          border-radius: 50%;
          border: 1px white solid;
        };
        .right{
          padding-left: 15px;
          padding-right: 15px;
          float:right;
          color: #C8C8C8;
        }
      }
    }

  }
  .contain{
    margin-top: 10px;
    background:#FFFFFF;
    font-size:15px;
    .row{
      padding: 0px 18px;
      border-bottom: 1px #E8E8E8 solid;
      height: 55px;
      line-height: 55px;
      .img {
        float:left;
        width: 20px;
        height: 20px;
        padding-top:16px;
      }
      .name {
        float:left;
      }
    }
    .right {
      float: right;
      color: #C8C8C8;
      line-height:55px;
    }
    .left {
      width:80%;
    }
  }
  .outlogin{
    color: #abbcc8;
    background:transparent;
    border-radius: 5px;
    font-size: 13px;
    line-height: 40px;
    height: 40px;
  }
  .outlogin::after{
    border-color: transparent;
  }
  .footer {
    position:absolute;
    bottom:0;
    width:100%;
    height:40px;
    text-align: center;
    line-height: 40px;
    background:#f5f5f5;
  }
</style>
