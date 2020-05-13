<template>
  <div>
    <div class="insuranceDivision padding0_30">
      <div class="titleBox displayFlex">
        <div class="title_left">网关</div>
        <div class="title_right displayFlex" @tap="insuranceDialog">
          <div class="rightInsurance">{{divisionStr}}</div>
          <div class="rightIcon iconfont"></div>
        </div>
      </div>
    </div>
    <customCheckBox :isShow="isShow" :checkboxArr="checkboxArr" @getInsurance = "getInsurance"></customCheckBox>
    <button @click="getLetterTag">点我，后端的数据</button>
    <button @click="login()">点我，登录</button>
    <button open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="bindGetUserInfo">授权登录</button>
  </div>
</template>

<script>
    import {showSuccess, showModal, post, get} from '@/util'
    import customCheckBox  from '../../components/select'
    export default {
        data() {
            return {
                userInfo:{
                },
                userId:'',
                nickName:'',
                avatarUrl:'',
                wxNickname:'',
                wxAvatarUrl:'',
                gender:'',
                code:'',
                showLogin: false,
                name: '',
                divisionStr: "请选择", // 存储保存的字符串
                divisionInsurance: [], // 存储保存的数组
                isShow: false,
                checkboxArr: [{
                    index: '3',
                    name: '抑郁答疑',
                    checked: false
                }, {
                    index: '3',
                    name: '家庭矛盾',
                    checked: false
                }, {
                    index: '4',
                    name: '学校生活',
                    checked: false
                }, {
                    index: '5',
                    name: '恋爱关系',
                    checked: false
                }, {
                    index: '6',
                    name: '工作烦恼',
                    checked: false
                }, {
                    index: '7',
                    name: '社交人生',
                    checked: false
                }],
            }
        },

        components: {
            customCheckBox
        },
        onLoad (options) {
            wx.setNavigationBarTitle({
                title: '微信授權'
            })
        },
        methods: {
            // 处理子组件传过来的值
            getInsurance(divisionsurance, isShow) {
                if (divisionsurance.length != 0) {
                    this.divisionInsurance = divisionsurance;
                    this.divisionStr = '';
                    this.divisionInsurance.forEach(item => {
                        this.divisionStr += item.name + ' ';
                    })
                } else {
                    this.divisionStr = '请选择';
                }
                this.isShow = isShow;
            },
            insuranceDialog() {
                this.isShow = true;
                // console.log(this.isShow)
            },
            async getLetterTag() {
                try {
                    let params = {
                        'code': '033xsQJr1qkC5k0HSCHr10lNJr1xsQJ3',
                        'gender':'2',
                        'wxAvatarUrl':'https://wx.qlogo.cn/mmopen/vi_32/WcmHEYUmR9MDvicl3a52NJ8939ysaPEJYeXicicPpSW0w1UL6t33Wl6uHg31mmXrkrrK0pGOO3icZ51vkLvmG49MeQ/132',
                        'wxNickname':'忘忧草',
                    }
                    console.log(params)
                    const res = await post('/jieyou/api/login',params)
                    console.log('从后端返回的执行正确的信息是：', res)
                } catch (e) {
                    console.log('从后端返回的执行错误的信息是：', e)
                }
            },
            bindGetUserInfo () {
                let that = this
                // 查看是否授权
                wx.getSetting({
                    success (res) {
                        if (res.authSetting['scope.userInfo']) {
                            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                            wx.login({
                                success (res) {
                                    if (res.code) {
                                        that.code = res.code
                                        console.log('测试',res)
                                        wx.getUserInfo({
                                            success :res=> {
                                                that.userInfo=res.userInfo;
                                                that.wxAvatarUrl=that.userInfo.avatarUrl;
                                                that.wxAvatarUrl=that.userInfo.avatarUrl;
                                                that.gender=that.userInfo.gender;
                                                that.wxNickname=that.userInfo.nickName;
                                                that.login()
                                            }
                                        })
                                        //that.in()
                                        // 发起网络请求

                                    } else {
                                        wx.showToast({
                                            title: '登录失敗',
                                            icon: 'none',
                                            duration: 10000
                                        })
                                        setTimeout(function () {
                                            wx.hideToast()
                                        }, 2000)
                                    }
                                }
                            })
                        }
                    },
                    fail(res) {
                        wx.showToast({
                            title: res,
                            icon: 'none',
                            duration: 10000
                        })
                    }
                })
            },
            async login () {
                let that = this
                let params = {
                    'code': that.code,
                    'gender':that.gender,
                    'wxAvatarUrl':that.wxAvatarUrl,
                    'wxNickname':that.wxNickname,
                }
                console.log(params)
                const res = await post('/jieyou/api/login', params)
            },



        }
    }
</script>

<style ></style>
