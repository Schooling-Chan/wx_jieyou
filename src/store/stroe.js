import Vue from 'vue'
import Vuex from 'vuex'
import store from './stroe'
import state from './state'
import actions from './actions'
import mutations from './mutations'


// 声明使用vuex
Vue.use(Vuex)

export default new Vuex.Store({
    state,
    actions,
    // getters,
    mutations
})
