<template>
  <div class="mainBox">
    <map-route :route-info="routeInfo"></map-route>
  </div>
</template>

<script>

let plugin = requirePlugin('routePlan');

export default {
  onShow(){
      let key = 'VFKBZ-HQWKD-QTA4G-PZ7TG-O66PS-7EBLY';  //使用在腾讯位置服务申请的key
      let referer = '化忧小栈';   //调用插件的小程序的名称
      let endPoint = JSON.stringify({  //终点
        'name': '北京西站',
        'latitude': 39.894806,
        'longitude': 116.321592
      });
      wx.navigateTo({
        url: 'plugin://routePlan/route-plan?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
      });
  }
}
</script>

<style scoped lang="scss">

.mainBox{
  height: 575px;
}
</style>