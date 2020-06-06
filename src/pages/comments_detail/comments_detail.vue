<template>
    <div class="comments_detailContainer">
      <div class="comments_detail" v-for="(item, index) in dataList" :key="index">
          <div class="header">
            <div class="nickname">{{item.replyUserName || '我'}}</div>
            <div class="time_role">{{item.gmtCreate}}</div>
          </div>
          <p class="content">{{item.content}}</p>
          <div class="deleteBtn" @click="deleteBtn" :id="item.id">删除</div>
      </div>
    </div>
</template>

<script>
import $http from '../../../static/plugins/ajax';

export default {
  data:{
    num: 1,//页数
    dataList: null//数据
  },
  methods:{
    deleteBtn(e){ 
      // console.log(e);
      let id = e.currentTarget.id,
          _this = this;

      $http.myAxios({//首次获取
        url:'/jieyou/api/comment/' + id,
        method: 'delete',
        header:{ 
          'Content-Type': 'application/x-www-form-urlencoded',
          'token': wx.getStorageSync('token')
        },
        data:{
          id: parseInt(id)
        }
      }).then(results=>{
        console.log('删除成功');
        _this.dataList = _this.dataList.filter(item => parseInt(item.id) !== parseInt(id))
      })
    }
  },
  onLoad(){
    let _this = this;
    wx.setNavigationBarTitle({
        title: '我的评论'
    });
    $http.myAxios({//首次获取
      url:'/jieyou/api/comment/mine',
      data:{
        'pageNum':_this.num,
        'pageSize':10
      }
    }).then(results=>{
      _this.dataList = results.object;
      console.log(_this.dataList);
    })
  },
  onReachBottom: function () {//下拉刷新
    var _this=this;
    if(this.dataList.length<10) return;
    $http.myAxios({
      url:'/jieyou/api/liveMessage/latest',
      data:{
        'pageNum':++_this.num,
        'pageSize':10
      }
    }).then(results=>{
      // _this.dataList = results.object;
      results.object.forEach(item=>{
        _this.dataList.push(item);
      })
      console.log(_this.dataList);
    })
  },
}
    
</script>

<style scoped lang="scss">
.comments_detailContainer{
  display: flex;
  flex-direction: column;
  padding: 0 .2rem;
}
  .comments_detail{
    margin: .2rem auto;
    width:100%;
    padding: 0 .2rem;
    box-sizing: border-box;
    border-radius: .15rem;
    border: 1rpx solid rgb(231, 231, 231);
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    min-height: 2rem;
      .header{
        border-bottom: 1px solid rgb(237,238,242);
        height: .8rem;
        line-height: .8rem;
        .nickname{
          margin-top:5px;
          font-size:16px;
          display: inline-block;
        }
        .time_role{
          color: #C8C8C8;
          font-size:13px;
          display: inline-block;
          line-height: 20px;
          margin: 0 .2rem;
        }
        
      }
      .content{
        font-size:18px;
        padding: .2rem;
      }
      .deleteBtn{
        text-align: right;
        font-size: 16px;
        color: rgb(102, 217, 239);
        margin: .15rem auto;
      }
    
  }

</style>

