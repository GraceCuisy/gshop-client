<template>
  <div class="home">
    <!-- 商品分类导航 -->
    <TypeNav/>
    <!--列表-->
    <ListContainer/>

    <!--今日推荐-->
   <TodayRecommend/>

    <!-- 商品排行 -->
    <Rank/>

    <!-- 猜你喜欢 -->
    <Like/>

    <!--楼层-->
    <Floor/>

    <!--楼层-->
    <Floor/>

    <!--商标-->
    <Brand/>
  </div>
</template>

<script>
  import TodayRecommend from "./TodayRecommend/TodayRecommend";
  import ListContainer from "./ListContainer/ListContainer";
  import Rank from "./Rank/Rank";
  import Like from "./Like/Like";
  import Floor from "./Floor/Floor";
  import Brand from "./Brand/Brand";
  export default {
    name: 'Home',
    mounted(){
      // 在home中需要用到banners和floors数据,所以触发相对应的actions方法
      this.$store.dispatch('getBanners');
      this.$store.dispatch('getFloors');
    },
    components:{//TodayRecommend等只在home组件中用到,所以只需要局部注册
      TodayRecommend,
      ListContainer,
      Rank,
      Like,
      Floor,
      Brand,
    }
  }
</script>

<style lang="less" scoped>
</style>