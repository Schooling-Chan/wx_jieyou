import {RECEIVE_USER_INFO,RECEIVE_SENDLETTER,RECEIVE_COMMENT,RECEIVE_RECEIVELETTER,RECEIVE_REPLYDRAFT,RECEIVE_SENDDRAFT} from './mutation-type'

export default {
  getUserInfo({commit},data){
    // 触发对应的mutation
    commit(RECEIVE_USER_INFO, data)
  },
  getSendLetter({commit},data){
    // 触发对应的mutation
    commit(RECEIVE_SENDLETTER, data)
    //console.log('2222',sendLetter)
  },
  getComment({commit},data){
    commit(RECEIVE_COMMENT, data)
  },
  getReceiveLetter({commit},data){
    commit(RECEIVE_RECEIVELETTER, data)
  },
  getReplyLetterDraft({commit},data){
    commit(RECEIVE_REPLYDRAFT, data)
  },
  getReplySendLetterDraft({commit},data){
    commit(RECEIVE_SENDDRAFT, data)
  },
}
