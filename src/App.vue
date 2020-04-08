<template>
  <div class="app">
    <Header/>
    <!-- 一级路由在此显示 -->
    <router-view></router-view>
    <Footer v-if="!$route.meta.isHideFooter"/>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import {reqBaseCategoryList} from "@/api";
export default {
  name: 'App',
  async mounted(){
    // 触发vuex管理中的actions中的getBaseCategoryList方法调用,发送请求,得到三级列表的数据
    this.$store.dispatch('getBaseCategoryList');

    // const result=await reqBaseCategoryList();
    // console.log(result);
  },
  
  components:{
    Header,
    Footer,
  }
}
</script>

<style lang="less" scoped>
</style>
