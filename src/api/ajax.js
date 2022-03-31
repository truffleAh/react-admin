/* 发送异步ajax请求的函数模块
封装axios库
函数返回值是promise对象 */
import { message } from "antd";
import axios from "axios";

//type形参默认值为"GET"
export default function ajax(url, data = {}, type = "GET") {
  /* 优化：统一处理请求异常(在外层包一个Promise对象,请求出错时不reject而是显示错误提示) */
  return new Promise((resolve, reject) => {
    let promise;
    if (type === "GET") {
      promise = axios.get(url, {
        params: data,
      });
    } else {
      promise = axios.post(url, data);
    }
    promise
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        message.error("请求出错了：" + error.message);
      });
  });
}
