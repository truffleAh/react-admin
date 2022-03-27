/* 要求：能根据接口文档定义接口请求函数
包含应用所有接口请求函数的模块
每个函数返回值都是promise */
import ajax from "./ajax";
//登录
export const reqLogin = (username, password) =>
  ajax("/base/login", { username, password }, "POST");
//添加用户
export const reqAddUser = (user) => ajax("/base/manage/user/add", user, "POST");
