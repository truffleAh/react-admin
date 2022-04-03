## 项目经验总结

课程地址：https://www.bilibili.com/video/BV1i4411N7Qc

### 1.引入 antd 组件 Form 无样式：忘记在入口文件 index.js 中导入 antd 的样式

```js
import "antd/dist/antd.less";
```

### 2.报错 import in body of module;reorder to top.(import/first)：import 语句置顶，不能位于其他代码下面

### 3.react 脚手架配置代理：编写 setupProxy.js 配置具体代理规则,确保灵活性.而不是在 package.json 中写死"proxy":url

### 4.JS 正则表达式：快速入门(https://blog.csdn.net/void_fan/article/details/109769551)

### 5.路由链接(Link)与注册路由(Route)一一对应

### 6.在 LeftNav 组件，用 antd 的 menu 组件实现目录和二级目录以及刷新后选中目录依然保持选中功能的实现：(1).参考官方文档 (2).注意用 constructor(){} 钩子函数【componentWillMount 钩子函数 即将弃用】导入 munuList，若不导入将无法实现刷新后选中的二级目录不展开的问题

```js
/* 在第一次render()之前执行一次
  为第一个render()准备数据(必须同步的) */
  constructor(props) {
    super(props);
    this.menuNodes = this.getMenuNodes(menuList);
  }
```

### 7.注意组件类名别重复，否则样式会覆盖

### 8.在 header 组件中，使用高德地图 API(使用高德开放平台https://lbs.amap.com/api/webservice/guide/api/ipconfig)，申请key的时候注意 服务平台选 web 服务 而不要选 web 端，使用 ip 定位以及天气查询 API

### 9.在 header 组件中，得不到天气数据：跨域问题 -- 引入第三方库 jsonp

```js
以下代码位于src / api / index.js;
//ip定位
export const reqIP = () => {
  return new Promise((resolve, reject) => {
    const url = `https://restapi.amap.com/v3/ip?output=json&key=4739c89722d5f12caf2ce96d8d022978`;
    jsonp(url, {}, (err, data) => {
      console.log("IP jsonp():", err, data);
      if (!err && data.status === "1") {
        const { adcode } = data;
        resolve({ adcode });
      } else {
        message.error("获取天气信息失败");
      }
    });
  });
};

//根据IP地址获取天气信息
export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=4739c89722d5f12caf2ce96d8d022978&output=json&city=${city}&extentions=base`;
    //发送jsonp请求
    jsonp(url, {}, (err, data) => {
      console.log("Weather jsonp():", err, data);
      if (!err && data.status === "1") {
        //取出数据
        const { province, city, weather, temperature } = data.lives[0];
        resolve({ province, city, weather, temperature });
      } else {
        message.error("获取天气信息失败");
      }
    });
  });
};
```

### 10.在 category 组件中,引入 antd 的 Table 组件,修改鼠标移入移出表格行背景色的默认变化的方法：修改样式,【找到样式名】的方法见博客(https://blog.csdn.net/ling_kedu/article/details/108485015?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_aa&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_aa&utm_relevant_index=2)

```js
以下代码位于category的同级目录下 ./index.less

.ant-table-tbody > tr.ant-table-row:hover > td,
.ant-table-tbody > tr > td.ant-table-cell-row-hover {
  background: #d4f0e7;
}

```

### 11.实现 category 组件异步显示一级分类目录的过程中,接口拿不到数据,获取分类列表失败：通过加入 console.log()打印数据的方式定位到了问题,数据在 result.data.data 里,而不是 result.data 里,后者导致 undefined.此外 result.status 的验证方式是 result.status===200,而不是视频课中的 result.status===0.

```js
getCategories = async () => {
  //发请求前,显示loading转圈效果
  this.setState({ loading: true });

  //发异步ajax请求获取数据,由于返回promise对象,用async+await阻塞获取
  const result = await reqCategories("0");
  /* 下行是测试代码 */
  // console.log(result, result.data.status);
  //请求完成后,去掉loading转圈效果
  this.setState({ loading: false });

  if (result.status === 200) {
    const categories = result.data.data; //数据在result.data.data中
    this.setState({ categories });
  } else {
    message.error("获取分类列表失败");
  }
};
```

### 12.实现第 11 条中的功能后,第 10 条中的问题又出现了,自定义样式被默认样式覆盖：在自定义样式后加上!important 强制应用

```js
以下代码位于category的同级目录下 ./index.less

.ant-table-tbody > tr.ant-table-row:hover > td,
.ant-table-tbody > tr > td.ant-table-cell-row-hover {
  background: #d4f0e7 !important;
}

```

### 13.取不到二级分类列表的数据：经过分析定位,借助 Navicat 图形化操作给数据库 category 集合每个商品对象添加一个 id 键值对

### 14.category 组件添加和更新表单用到 antd v4 版本的 Form 组件,使用方法与视频课有出入,参照 login 组件中 Form 的用法,都需要实现默认值初始化与表单输入检查认证的功能

### 15.vscode 进行 git push 提交代码时,被 reject,报错如下：远程分支上存在本地分支中不存在的提交，往往是多人协作开发过程中遇到的问题，可以先 fetch 再 merge，也就是 pull，把远程分支上的提交合并到本地分支之后再 push。如果你确定远程分支上那些提交都不需要了，那么直接 git push origin master -f，强行让本地分支覆盖远程分支。

```shell
! [rejected] master -> master (fetch first)
error: failed to push some refs to 'git@github.com:qzmly100/repository-.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

### 16.category 组件更新分类功能中当前行修改分类操作 input 框默认输入未能实现动态显示：【待解决】
