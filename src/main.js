import Vue from 'vue'

// import Fly from 'flyio/dist/npm/wx'

import store from './store/stroe.js'

//import Fly from 'flyio/dist/npm/wx'

import App from './App'
// import WXrequest from './utils/wx-request'

// Vue.prototype.$httpWX = WXrequest
Vue.config.productionTip = false
App.mpType = 'app'

// 将store对象放置Vue的原型上，为的是每个实例都可以使用
//Vue.prototype.$store = store


//<<<<<<< Updated upstream
// let fly = new Fly
// Vue.prototype.$fly = fly
//=======
//let fly=new Fly
//Vue.prototype.$fly=fly
//>>>>>> Stashed changes


const app = new Vue(App)
app.$mount()
