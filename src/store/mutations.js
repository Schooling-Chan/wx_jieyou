/*
直接更新state的多个方法的对象
 */
import {RECEIVE_USER_INFO,RECEIVE_SENDLETTER,RECEIVE_COMMENT,RECEIVE_RECEIVELETTER,RECEIVE_REPLYDRAFT,RECEIVE_SENDDRAFT} from './mutation-type'
export default {
  [RECEIVE_USER_INFO](state,data){
    state.userInfo = data
  },
  [RECEIVE_SENDLETTER](state, data){
    state.sendLetter = data
    //console.log('444444444',state);
  },
  [RECEIVE_COMMENT](state, data){
    state.comment = data
    //console.log('444444444',state);
  },
  [RECEIVE_RECEIVELETTER](state, data){
    state.receiveLetter = data
    //console.log('444444444',state);
  },
  [RECEIVE_REPLYDRAFT](state, data){
    state.replyDraft = data
    //console.log('444444444',state);
  },
  [RECEIVE_SENDDRAFT](state, data){
    state.sendLetterDraft = data
    //console.log('444444444',state);
  },
}
