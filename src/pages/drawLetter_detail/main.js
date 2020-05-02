import Vue from 'vue'
import DrawLetter_detail from './drawLetter_detail'

// add this to handle exception
Vue.config.errorHandler = function(err) {
    if (console && console.error) {
        console.error(err)
    }
}

const drawLetter_detail = new Vue(DrawLetter_detail)
drawLetter_detail.$mount()