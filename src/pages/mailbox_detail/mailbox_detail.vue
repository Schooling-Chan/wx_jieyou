<template>
    <div class="mailbox_detailContainer">
      <Letter_paper mail_name='mail_name'  mail_time="2020.4.21" mail_content="Vant Weapp 是移动端 Vue 组件库 Vant 的小程序版本，两者基于相同的视觉规范，提供一致的 API 接口，助力开发者快速搭建小程序应用。Vant Weapp 是移动端Vant Weapp 是移动端Vant Weapp 是 是移动端Vant Weapp 是移动端Vant Weapp 是 是移动端Vant Weapp 是移动端Vant Weapp 是 是移动端Vant Weapp 是移t Weapp 是移动端Vant Weapp 是移动端Vant Weapp 是移动端 Vue">
      </Letter_paper>
<!--      <div class="receiving_img">-->
<!--        <div class="content_font">-->
<!--          <div class="right">-->
<!--            <p class="mail_name">{{mail_name}}</p>-->
<!--            <p class="mail_time">{{mail_time}}</p>-->
<!--            <p class="mail_content">{{mail_content}}-->
<!--            </p>-->
<!--            <p  class="none"></p>-->
<!--          </div>-->
<!--          <div class="left">-->
<!--            &lt;!&ndash;            邮票&ndash;&gt;-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="cover">-->
<!--          <div class="box1"></div>-->
<!--          <div class="box2"></div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
</template>

<script>
  import Letter_paper from '../../components/letter_paper'
    export default {
        data(){
            return{
               //  id:'',
               //  mail_name:'To:用户名',
               //  mail_time:'2020.4.21',
               //  mail_content:'2020.4.212020.4.212020.4.212020.4.21',
               // //mail_name:'To:用户名'
            }
        },
        method:{
            getLetter(){
            }
        },
        components:{
           Letter_paper
       }



    }
</script>

<style scoped lang="scss">
.mailbox_detailContainer{
  display:flex;
  flex-direction:column;
  background-color: #f0faff;
}
.receiving_img{
  .cover .box1{
    margin-top:.05rem;
    height:1rem;
    width:100%;
    /*border:1px solid darkslategray;*/
    position:relative;
    background:conic-gradient(transparent 23%,#fde5ca 0,#fde5ca 77%,transparent 0);
  }//底部
  .cover .box1::before{
    content:"";
    position:absolute;
    top:0px;
    border-top:.06rem solid transparent;
    border-bottom: .03rem solid transparent;
    border-right: .2rem solid #d29d65;
  }//右三角
  .cover .box1::after{//左三角
    content:"";
    position:absolute;
    top:0;
    right:0;
    border-top:.06rem solid transparent;
    border-bottom: .03rem solid transparent;
    border-left: .2rem solid #d29d65;
  }
  .content_font{
    overflow:hidden;
    width:91%;
    text-align:center;
    padding:20px 10px;
    height:auto;
    background:#fff;
    border-top:10px solid #eee;
    /*border-right:10px solid #eee;*/
    /*border-left:10px solid #eee;*/
    box-shadow: 0 0 10px rgba(0,0,0,0.10);
    margin:0 auto;
    margin-bottom:-60px;
    border-image:repeating-linear-gradient(-45deg,transparent 0,transparent 0.5rem,#ffc9c7 0,#ffc9c7 1rem,#dcedff 0,transparent 0,transparent 1.5rem,#dcedff 0,#dcedff 2rem) 20;
    .right{
      /*float:left;*/
      .mail_name{
        font-size:16px;
        font-weight:bold;
      }
      .mail_content {
        /*设置文本的行距及下划线*/
        display: inline;
        padding-bottom: 4px;
        border-bottom: 1px dashed #b5b8b8;
        position: relative;
        line-height: 38px;

        &:before {
          width: 493px;
          height: 1px;
          display: inline-block;
          position: absolute;
          bottom: -1px;
          content: "";
          // e3ddd1 f4efe8
          background: #f4efe8;
          border-bottom: none;
        }

        &:after {
          position: absolute;
          content: "";
          width: 493px;
          bottom: 0;
          left: 0;
          height: 1px;
          display: inline-block;
          border-bottom: 1px dashed #b5b8b8;
        }
      }
      .none{
        height:80px;
        width:100%;;
      }
    }
    .left{
      /*float:right;*/
    }
  }
}
</style>
