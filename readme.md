# 张静宜的前端博客

## 一、项目

### 新版博客主页

* 链接：[https://blog.jmazm.com](https://blog.jmazm.com)
* github：[https://github.com/JMHello/myblog](https://github.com/JMHello/myblog)

### 新版博客

* 链接：[https://blog.jmazm.com](https://blog.jmazm.com)
* github：[https://github.com/JMHello/myblog](https://github.com/JMHello/myblog)

### 新版博客cms

* 链接：[https://admin.jmazm.com](https://admin.jmazm.com)
* github：[https://github.com/JMHello/myblog](https://github.com/JMHello/myblog)

### 文件管理系统

* 链接：[https://file.jmazm.com](https://file.jmazm.com)
* github：[https://github.com/JMHello/myblog-file-server](https://github.com/JMHello/myblog-file-server)

### 旧版博客

* 链接：[https://jmhello.github.io](https://jmhello.github.io)

### 飞机打怪兽

* 链接：[https://jmhello.github.io/effects/demo/project/shooting-game/index.html](https://jmhello.github.io/effects/demo/project/shooting-game/index.html)

## 二、知识点笔记

### 数据结构

* [栈]
* [队列]
* [字典]
* [BST]
* [Trie Tree]
* [图]

### 算法

* [冒泡排序]
* [选择排序]
* [插入排序]
* [快速排序]
* [希尔排序]
* [归并排序]

### 计算机网络原理

**物理层**

* [物理层解基本概念](/doc/计算机网络原理/物理层/物理层基本概念.md)
* [数据通信的基础知识](/doc/计算机网络原理/物理层/数据通信的基础知识.md)
* [物理层下面的传输媒体 - 导引型传输媒体、非导引型传输媒体](/doc/计算机网络原理/物理层/物理层下面的传输媒体.md)
* [信道复用技术 - 频分复用、时分复用、统计时分复用、波分复用、码分复用](/doc/计算机网络原理/物理层/信道复用技术.md)
* [数字传输系统](/doc/计算机网络原理/物理层/数字传输系统.md)
* [宽带接入技术]

**数据链路层**

* [数据链路层基本概念 - 信道类型、帧、三个基本问题](/doc/计算机网络原理/数据链路层/数据链路层基本概念.md)
* [两种情况下的数据链路层 - PPP协议、CSMD/CD协议](/doc/计算机网络原理/数据链路层/两种情况下的数据链路层.md)
* [以太网 - 拓扑、集线器、信道利用率、MAC](/doc/计算机网络原理/数据链路层/以太网.md)
* [扩展以太网、优化以太网](/doc/计算机网络原理/数据链路层/扩展以太网.md)

**网络层**



**传输层**

* [tcp三次握手和四次挥手]
* [UDP]


**应用层**

* [http缓存](/server/basicConfig.js)
* [http2.0](/server/indexServer.js)
* [https](/server/indexServer.js)
* [http常用状态码]
* [get, post]

### HTML5

* [语义化]
* [浏览器渲染]
* [Websocket]

### CSS
* [选择器]

* [重排/重绘]


布局

* [居中 - position + transform](/client/plugin/modal/index.css)
* [float布局]
* [flex布局]

### Javascript

* [深拷贝]
* [new 本质]
* [防抖]
* [ajax实现]
* [预加载]
* [闭包]
* [this]
* [执行上下文]
* [异步]
* [递归]
* [回文]
* [类名处理 - 增加/查询/删除/修改](/client/lib/className.js)
* [attribute和property](/client/static/plugin/popup/drag-drop.js)

**es6**
* [promise]
* [箭头函数]


**继承**
* [原型链继承]
* [借用构造函数继承]
* [组合继承]
* [寄生组合继承](/client/static/plugin/popup/alert.js)

**DOM操作**

* [dom - 创建/添加/删除/插入/克隆节点](/client/static/plugin/popup/popup.js)
* [innerText 和 textContent](/client/static/plugin/popup/popup.js)


**事件**

* [事件循环机制]
* [事件处理程序](/client/lib/event.js)
* [事件委托]
* [原生键盘类事件触发顺序]


**存储**

* [cookie]
* [localStorage](/client/views/Admin/containers/LoginPage/index.jsx)
* [seessionStorage]

**跨域**
* [cors](/server/controllers/article.js)
* [jsonp]
* [iframe + window.name]

**BOM**
* [URL的井号 - location.hash](/client/router/index.jsx)
* [history的相关api](/client/router/index.jsx)
* [onhashchange事件，onpopstate事件](/client/router/index.jsx)



### nodejs
* [fs模块]
* [path模块]


### koa 
* [koa-static-cache源码解读]


### mysql

### React
* [React直出开发环境热更新优化方案](/build/server/devServer.js)
* [React 同构 - ssr](/server/view/layout.js)
* [BrowserRouter 和 HashRouter的区别](/client/router/index.js)
* [生命周期](/client/views/User/containers/Home/index.jsx) / [生命周期 - componentDidUpdate](/client/views/User/containers/SearchPage/index.jsx)
* [defaultProps + propTypes](/client/views/User/containers/TagPage/index.jsx)
* [组件间通信](/client/views/User/containers/CategoryPage/index.jsx)
* [jsx语法]
* [虚拟DOM]
* [Diff算法]


### Redux
* [基础](/client/redux/store/configureStore.js)
* [工作流程](/client/redux/store/configureStore.js)
* [中间件 - middleware](/client/redux/store/configureStore.js)


### Redux-saga

* [基础](/client/sagas/index.js)

### Webpack
* [工作原理 - 包括核心概念和工作流程](/build/webpack.base.config.js)
* [webpack-dev-server](/build/server/devServer.js)
* [url-loader 与 file-loader的区别 （以及image inline的实现）](/build/webpack.base.config.js)
* [提取第三方库 - DLL](/build/webpack.dll.config.js)
* [开启gzip压缩](/build/webpack.prod.config.js)
* [压缩js - ParallelUglifyPlugin](/build/webpack.prod.config.js)
* [Scope Hoisting](/build/webpack.prod.config.js)
* [开启热模块替换](/build/webpack.dev.config.js)
* [css模块化](/build/webpack.dev.config.js)
* [css前缀兼容处理](/build/webpack.prod.config.js)

* [按需加载]
* [cdn]


### 设计模式
* [单例模式](/client/static/plugin/popup/drag-drop.js)
* [策略模式](/client/lib/form.js)
* [迭代器模式](/client/lib/array.js)
* [装饰器模式]
* [观察者模式]
* [MVC]
* [MVVM]


### 安全
* [XSS](/client/lib/xss.js)
* [CSRF](/server/tools/auth.js)
* [密码安全](/server/controllers/user.js)
* [点击劫持](/server/basicConfig.js)
* [DDOS]
* [SQL注入]
* [上传漏洞]
* [传输安全]
* [重放攻击]


### 测试
* [TTD]

### 常用功能（原生实现）
* [上传图片插件]
* [分页插件]
* [拖放插件]
* [模态弹框插件]



### 常见命令
* [git](/doc/git.md)
* [linux]()
* [npm](/doc/npm.md)
* [nginx](/doc/nginx.md)

