/**
 * 利用mockjs来模拟数据接口
 */
import Mock from "mockjs";

//引入之后,webpack内部就自动把json格式的数据转化为数组或对象了
import banners from './banners.json'; //转化为了数组
import floors from "./floors.json";//转化为了数组

/**定义返回banners数据的接口 
 * 尽量和后台请求的接口的数据格式保持一致 {code:200, data:[]}
 */
Mock.mock('/mock/banners',{code:200,data:banners});

// 定义返回floors数据的接口
Mock.mock('/mock/floors',{code:200,data:floors});

// 注意:mock的接口都是只能发送ajax请求
// 当前文件不需要通过export向外暴露,但是当前文件必须被执行一次,2个mock的接口才可以访问
// 做法 在main.js中import 引入当前文件就可以了