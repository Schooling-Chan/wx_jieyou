import Vue from 'vue'
// import Fly from 'flyio/dist/npm/wx'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'


// let fly = new Fly
// Vue.prototype.$fly = fly


const app = new Vue(App)
app.$mount()