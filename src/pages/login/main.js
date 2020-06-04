import Vue from 'vue'
import Login from './login'

// add this to handle exception
Vue.config.errorHandler = function(err) {
  if (console && console.error) {
    console.error(err)
  }
}

const login = new Vue(Login)
login.$mount()
