/**
 * 包含所有接口请求函数
 * 函数的返回值是promise对象
 */

 import ajax from './ajax';
import mockAjax from "./mockAjax";

//  获取三级分类列表 /api/product/getBaseCategoryList
export const reqBaseCategoryList=()=> ajax('/product/getBaseCategoryList')
// 登陆 /api/user/passport/login
export const reqLogin=(mobile,password)=>ajax.post('/user/passport/login',{mobile,password})
// 两种不同的传参方式
// export const reqLogin=({mobile,password})=>ajax.post('/user/passport/login',{mobile,password})

// 获取home页面的广告轮播的数组
export const reqBanners=()=>mockAjax('/banners');

// 获取floor相关的数据
export const reqFloors=()=>mockAjax('/floors');