/*
路由器对象模块
 */
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

// 解决从当前组件跳转当前组件报错的问题
const originPush=VueRouter.prototype.push
// 给成功回调的参数指定一个默认的函数
VueRouter.prototype.push=function(location,onComplete=()=>{},onAbort){
  originPush.call(this,location,onComplete,onAbort)
}

// 通过失败的回调
const originReplace=VueRouter.prototype.replace;
VueRouter.prototype.replace=function(location,onComplete,onAbort=()=>{}){
  originReplace.call(this,location,onComplete,onAbort)
}


// 声明使用VueRouter插件
Vue.use(VueRouter);

// 向外暴露一个路由器对象
export default new VueRouter({
  mode:'hash', //路由路径带#号
  // 配置应用中的所有路由
  routes,
})
