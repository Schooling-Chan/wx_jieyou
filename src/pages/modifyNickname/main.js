import Vue from 'vue'
import ModifyNickname from './modifyNickname'

// add this to handle exception
Vue.config.errorHandler = function(err) {
  if (console && console.error) {
    console.error(err)
  }
}

const modifyNickname = new Vue(ModifyNickname)
modifyNickname.$mount()
