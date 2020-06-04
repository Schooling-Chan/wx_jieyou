<template>
    <div class="writeLetterContainer">
        <button @click="isSubmit">完成</button>
        <button @click="isSubmitDraft">草稿</button>
        <div class="contain">
          <div class="row tip">
            <lable>这是一封想写给她的信</lable>
            <div  class="selectBox" @tap="insuranceDialog">
              <div class="input">{{divisionStr}}</div>
              <div class="rightIcon iconfont"></div>
            </div>
            <customCheckBox :isShow="isShow" :checkboxArr="checkboxArr" @getInsurance = "getInsurance"></customCheckBox>
          </div>
          <div class="row to">
            <lable>这是一封想写给她的信</lable>
            <div  class="selectBox" >
              <div class="input">
                <picker :value="array[nxs_index].userId" :range="array" :range-key="'nickname'"
                        :data-selecthx="array[nxs_index].nickname" @change="pickerChange" >
                  <view class="picker">
                    To:{{array[nxs_index].nickname}}-->暖心师
                  </view>
                </picker>
              </div>
              <div class="rightIcon iconfont"></div>
            </div>
          </div>
          <div class="row">
            <!-- word_count用来保存实时输入字数的长度 -->
            <label class="word-count">{{word_count}}/字数</label>
          </div>
          <div class="text_letter">
            <div>
              <textarea :class="[word_count? 'input' : 'not_input']" v-model='content'
                        :maxlength='number'
                        placeholder="请输入你想对他说的话"
               ></textarea>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    import {showSuccess, showModal, get,post,put} from '@/util'
    import customCheckBox  from '../../components/select'
    import {mapState} from 'vuex'
    export default {
        data(){
            return{
                userinfo: wx.getStorageSync('userinfo') ? wx.getStorageSync('userinfo') : {},//用户信息
                test:{},
                toUserId:'',//收信人id
                content: '',//内容
                tags: [], // 存储保存的数组
                tag:[],//提交给后台的标签数据
                array:[],//暖心师的列表
                nxs_index: 0,//指定暖心师选中时下标
                number:1200,//信的字数
                word_count: 0,//字数
                divisionStr: "请选择信的类型", // 存储保存的字符串
                divisionInsurance: [], // 存储保存标签的数组
                isShow: false,
                checkboxArr: [],//信的标签选择列表
                success:false,//提交成功与否
                nxs:{},
                nxs_id:'',//暖心师的id
                send_draft:{},
            }
        },
        computed: {
            ...mapState(['sendLetterDraft'])
        },
        components: {
            customCheckBox,
        },
        watch:{
            content () {
                this.word_count = this.content.length//监听以写的字数
            },
        },
        beforeMount(){
            if(this.$mp.query.draft_id){
                this.getSendDraft()
            }
            if(this.$mp.query.id){
                this.getWarmerUser()
            }
        },
        onShow(){
            this.getWarmer()//获得推荐的暖心师
        },
        mounted(){
              this. getLetterTag()//获得信的所有标签
        },
        methods: {
            getInsurance(divisionsurance, isShow) {
                //存储divisionInsurance，并复制给tag,使tag中每一项只有index和name，没有checked
                if (divisionsurance.length != 0) {
                    this.divisionInsurance = divisionsurance;
                    this.divisionStr = '';
                    this.divisionInsurance.forEach(item => {
                        this.divisionStr += item.name + ' ';
                        this.tag.push(item.index);
                    })
                } else {
                    this.divisionStr = '请选择';
                }
                this.isShow = isShow;
            },
            insuranceDialog() {//是否选择select框
                this.isShow = true;
                // console.log(this.isShow)
            },
            pickerChange(e) {
                console.log(e.mp.detail.value)
                console.log('picker发送选择改变，携带下标为', e.mp.detail.value)
                console.log('picker发送选择改变，携带值为', this.array[e.mp.detail.value])
                this.nxs_index = e.mp.detail.value
            },
            async getLetterTag() {
                // 获取所有信的标签
                try {
                    const res = await get('/jieyou/api/letter/tag')
                    console.log('从后端返回的执行正确的信息是：', res)
                    let that = this
                    that.checkboxArr = res.data.object
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },
            async getWarmer() {
                // 获取模糊暖心师的列表
                try {
                    let header = {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                    const res = await get('/jieyou/api/user/warmer','',header)
                    let that = this
                    that.array = res.data.object
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },
            async submit(){//寄信
                let that = this
                that.toUserId=that.array[that.nxs_index].userId
                const params = {
                    'toUserId': that.toUserId,
                    'content': that.content,
                    'tags': that.tag
                }
                let header = {
                    'token': wx.getStorageSync('token'),
                    'Content-Type': 'application/json'
                }
                const res = await post('/jieyou/api/letter',params, header)
                console.log('letter从后端返回的执行正确的信息是：', res)
                that.success=res.data.success
                console.log('letter从后端返回的执行正确的信息是：', that.success)
            },
            async submitDraft(){
                let that = this
                that.toUserId=that.array[that.nxs_index].userId
                const params = {
                    'toUserId': that.toUserId,
                    'content': that.content,
                    'tags': that.tag
                }
                let header = {
                    'token': wx.getStorageSync('token'),
                    'Content-Type': 'application/json'
                }
                const res = await post('/jieyou/api/letter/draft',params, header)
                console.log('letter从后端返回的执行正确的信息是：', res)
                that.success=res.data.success
                console.log('letter从后端返回的执行正确的信息是：', that.success)
            },
            isSubmitDraft(){//判断能否寄出
                if(this.word_count&&this.tag){
                    this.submitDraft()
                    showSuccess('已存为草稿')
                    this.content=''
                    this.divisionInsurance=[]
                    this.divisionStr='请选择'
                    this.tag=''
                }else{
                    showModal('','请至少选择一个信的类型哦或编辑内容哦')
                }
            },
            isSubmit(){//判断能否寄出
                if(this.word_count&&this.tag){
                    this.submit()
                    showSuccess('发送成功')
                    this.content=''
                    this.divisionInsurance=[]
                    this.divisionStr='请选择'
                    this.tag=[]
                    this.tags=[]
                }else{
                    showModal('','请至少选择一个信的类型哦或编辑内容哦')
                }
            },
            async getSendDraft(){
                //寄信箱详情通知
                try {
                    let header = {
                        'token': wx.getStorageSync('token'),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                    let that = this
                    that.indexId =that.sendLetterDraft[this.$mp.query.draft_id].sourceId
                    const url='/jieyou/api/letter/'+that.indexId
                    const res = await get(url,'',header)
                    that.send_draft=res.data.object
                    console.log( '222s',that.send_draft)
                    that.tags=that.send_draft.tags
                    this.divisionStr='';
                    that.tags.forEach(item => {
                        this.divisionStr += item.name + ' ';
                        this.tag.push(item.index);//添加标签
                    })
                    that.content=that.send_draft.sendContent
                    that.nxs_id=that.send_draft.toUser.userId
                    this.getWarmerUser()
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },
            async getWarmerUser(){
                //寄信箱详情通知
                try {
                    let that = this
                    const url='/jieyou/api/user/'+that.nxs_id
                    const res = await get(url)
                    that.nxs=res.data.object
                    that.array.unshift(that.nxs)//让传过来的暖心师资料添加到暖心师列表中，使默认为选中的第一项
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },
        }
    }
</script>

<style scoped lang="scss">
  .writeLetterContainer{
    overflow: hidden;
  }
  .tip ,.to{
    font-size:14px;
    .input{
      margin:10px 0 20px 0;
      width:80%;
      height:35px;
      background:#FFFFFF;
      border:1px solid #D3D3D1;
      border-radius: 20px;
    }
  }
  .tip{
    margin-top:30px;
    margin-right:20px;
    .selectBox{
      .input {
        width:80%;
        height:35px;
        font-size:14px;
        /*padding-top:2px;*/
        padding-left: 15px;
        line-height:30px;
        color: #808080;
      }
    }
  }
  .to{
    margin-right:20px;
    .selectBox{
      .input {
        width:80%;
        height:35px;
        font-size:14px;
        /*padding-top:2px;*/
        padding-left: 15px;
        line-height:30px;
        color: #808080;
      }
    }
  }
  .contain{
    background:#FFFFFF;
    font-size:15px;
    .text {
      height: 110px;
    }
    .row{
      /*border-bottom: 1px #E8E8E8 solid;*/
      padding: 5px 15px;
      .name {
        width:80%;
        height: 40px;
        line-height: 40px;
      }
      .input {
        width:100%;
        height:35px;
        font-size:14px;
        padding-top:5px;
      }
      .word-count {
        float:right;
        color: #808080;
      }
      .img-count {
        float:right;
        line-height: 40px;
        color: #808080;
      }
      .add-img {
        width:80px;
        height:80px;
      }
      .img {
        width:66px;
        height:66px;
        margin-bottom:7px;
        margin-right: 10px;
      }
    }
    .text_letter{
      /*border-bottom: 1px #E8E8E8 solid;*/
      padding: 5px 15px;
      .input {
        width:100%;
        height:calc(100vh - 100px);
        font-size:14px;
        padding-top:5px;
        overflow-y:visible;
      }
      .not_input{
        width:100%;
        height:40px;
        font-size:14px;
        padding-top:5px;
        line-height:25px;
      }
    }
  }
   button {
     margin-right:15px;
    float:right;
    width:15%;
    border-radius:20px;
    background: #a6d7ff;
    font-size:12px;
    color:#FFFFFF;
    font-weight:bold;
  }
</style>
