# day01-脚手架搭建

## 1.项目开发准备

(1).描述项目 (2).技术选型 (3).API 接口/接口文档/测试接口

## 2.启动项目开发

(1).使用 create-react-app 创建基于 react 脚手架应用(最好精简一下脚手架，删除一些无用文件)
(2).引入 antd,自定义主题
(3).开发环境运行：npm start/yarn
(4).生产环境打包运行：npm run build / serve build

## 3.git 管理项目

(1).创建远程仓库
(2).创建本地仓库：配置.gitignore，git init，git add，git commit -m 'init'
(3).将本地仓库推送到远程仓库：git remote add origin url，git push origin master
(4).新同事--克隆仓库：git clone url，git checkout -b dev origin/dev，git pull origin dev

## 4.创建项目基本结构

api：ajax 请求的模板
components：非路由组件
pages：路由组件
App.js：应用的根组件
index.js：入口 js
