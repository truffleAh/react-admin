# 项目踩坑经验

## 1.引入 antd 组件 Form 无样式：忘记在入口文件 index.js 中导入 antd 的样式

```js
import "antd/dist/antd.less";
```
