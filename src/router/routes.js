/**
 * 所有路由配置的数组模块
 */
  import Home from "@/pages/Home";
  import Login from "@/pages/Login";
  import Search from "@/pages/Search";
  import Register from "@/pages/Register";

 export default [
  {
    path:'/',
    component:Home
  },
  {
    name:'search',
    path:'/search/:keyword?', //使用params参数传递数据时,在注册路由时,就要使用:做指定 ?可以指定params参数可传可不传
    component:Search,
    // 在跳转路由时将传递的query/params参数映射成props传递给路由组件,函数的方式最好用
    // route代表当前路由信息对象
    props:(route)=>({keyword1:route.query.keyword,keyword2:route.params.keyword})
  },
  {
    path:'/login',
    component:Login,
    meta:{
      isHideFooter:true,
    }
  },
  {
    path:'/register',
    component:Register,
    meta:{
      isHideFooter:true,
    }
  }
 ]