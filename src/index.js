import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "antd/dist/antd.less"; //引入antd样式,注意自定义主题要将后缀改为less
import storageUtils from "./utils/storageUtils";
import memoryUtils from "./utils/memoryUtils";
/* 应用的入口文件 */
//读取local中的user,保存到内存中
const user = storageUtils.getUser();
memoryUtils.user = user;

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
