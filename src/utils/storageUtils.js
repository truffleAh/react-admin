/* 进行local数据存储管理的工具模块：
可以用原生localStorage实现，也可用第三方库store */
import store from "store";
/* export default {
  // 保存user
  saveUser(user) {
    localStorage.setItem("user_key", JSON.stringify(user));
  },
  // 读取user
  getUser() {
    //若没有user则返回一个空对象
    return JSON.parse(localStorage.getItem("user_key") || "{}");
  },
  // 删除user
  removeUser() {
    localStorage.removeItem("user_key");
  },
}; */
/* 使用第三方库store.js：语法简洁，自动解析用户对象为json格式 */
export default {
  // 保存user
  saveUser(user) {
    store.set("user_key", user);
  },
  // 读取user
  getUser() {
    //若没有user则返回一个空对象
    return store.get("user_key") || {};
  },
  // 删除user
  removeUser() {
    store.remove("user_key");
  },
};
