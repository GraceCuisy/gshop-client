// 入口js
import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import TypeNav from "@/components/TypeNav/TypeNav";
import Carousel from "./components/Carousel";
import "swiper/css/swiper.min.css"; //引入swiper的css样式
import "./mock/mockServer";// 加载mock接口的主模块

// 因为TypeNav好多个组件都需要用到,所以使用全局注册
Vue.component('TypeNav',TypeNav);
Vue.component('Carousel',Carousel); //全局注册轮播图组件 <Carousel/>

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router, //配置路由器(内部的路由才生效访问)
  store, //配置vuex的核心管理对象store ===>组件中可以通过$store得到store对象
}).$mount('#app')
