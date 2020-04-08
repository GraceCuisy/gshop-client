/**
//  * 使用axios去发送ajax请求,对axios进行一些配置
 * 对axios进行二次封装
 * 1.配置通用的基础路径和超时
 * 2.显示请求进度条
 * 3.成功返回的数据不再是response,而直接是响应体数据response.data
 * 4.统一处理请求错误,具体请求也可以选择处理或不处理
 */

import axios from 'axios';
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 配置不显示右上角的旋转进度条
// NProgress.configure({ showSpinner: false });

const ajax = axios.create({
  baseURL: '/mock', //统一配置前缀路径
  timeout: 20000, //统一配置请求连接超时时间
})

// 添加请求拦截器
ajax.interceptors.request.use((config) => {
  // 显示请求进度条
  NProgress.start();
  return config;
})

// 添加响应拦截器
ajax.interceptors.response.use(
  response => {
    // 请求成功
    // 隐藏请求进度条
    NProgress.done();
    return response.data
  },
  error => {
    // 请求失败
    // 隐藏请求进度条
    NProgress.done();
    // 错误统一处理
    alert('请求出错:'+error.message||'未知错误');
   // return new Promise(()=>{}) //中断promise链,==>每个单独的请求就不能再处理自己的错误了,因为在响应拦截器统一处理了
    return Promise.reject(error); //返回失败的promise==> 响应拦截器对错误进行处理之后,每个单独的请求还可以对错误进行处理
  })

  // 向外暴露ajax
  export default ajax;