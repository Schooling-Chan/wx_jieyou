import {RECEIVE_USER_INFO} from './mutation-type'

export default {
  getUuserInfo({commit},{userInfo}){
    // 触发对应的mutation
    commit(RECEIVE_USER_INFO, userInfo)
  }
}
