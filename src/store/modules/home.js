/**
 * 用于操作首页模块的数据的vuex模块
 * state对象中显示的状态数据baseCategoryList只是一个初始值,并且,开始并没有数据
 * 客户在前台每做一次操作都需要用dispatch去触发action调用,actions向后台发送请求,得到数据,调用
 * mutations方法去更新数据,最终数据发生了变化,界面就会跟着变化
 */

 import {reqBaseCategoryList,reqFloors,reqBanners} from "@/api";
const state={
  baseCategoryList:[], //所有3级分类的数组
  banners:[],
  floors:[],
};
const mutations={
  RECEIVE_CATEGORYS(state,categorys){
    // splice()方法代表从任意位置删除元素,第一个参数删除的起始位置,第二个参数删除的下标,
    // 返回值为删除的元素组成的新数组
    state.baseCategoryList=categorys.splice(0,categorys.length-2);
  },

  // 更新state中的banners的方法
  RECEIVE_BANNERS(state,banners){
    state.banners=banners;
  },
  // 更新state中的floors的方法
  RECEIVE_FLOORS(state,floors){
    state.floors=floors;
  }

};
const actions={
  // actions中去做一些异步操作,和后台交互
  async getBaseCategoryList({commit}){
    // 1.调用接口请求函数,发送ajax请求baseCategoryList数据
      const result=await reqBaseCategoryList(); //得到请求成功的数据
    // 2.得到成功的数据后交给mutations去更新数据
    if(result.code===200){
      const categorys=result.data;
      commit('RECEIVE_CATEGORYS',categorys);
    }
  },
  // 发送异步ajax请求banners数据
  async getBanners({commit}){
    // 1.调用接口请求函数,发送ajax请求Banners数据
      const result=await reqBanners(); //得到请求成功的数据
    // 2.得到成功的数据后交给mutations去更新数据
    if(result.code===200){
      const banners=result.data;
      commit('RECEIVE_BANNERS',banners);
    }
  },
  // 发送异步ajax请求floors数据
  async getFloors({commit}){
    // 1.调用接口请求函数,发送ajax请求Floors数据
      const result=await reqFloors(); //得到请求成功的数据
    // 2.得到成功的数据后交给mutations去更新数据
    if(result.code===200){
      const floors=result.data;
      commit('RECEIVE_FLOORS',floors);
    }
  },

};
const getters={};

 export default{
   state,
   mutations,
   actions,
   getters,
 }
