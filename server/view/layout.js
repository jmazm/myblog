/**
 * 同构
 * // ===
 * 1. 为什么要同构
   现在大多数单页应用的视图都是通过 JavaScript 代码在浏览器端渲染出来的，但在浏览器端渲染的坏处有：
   a、无法爬虫：搜索引擎无法收录你的网页，因为展示出的数据都是在浏览器端异步渲染出来的，大部分爬虫无法获取到这些数据。
   b、首屏渲染慢：客户端渲染的一个缺点是，当用户第一次进入站点时，因为此时浏览器中没有缓存，需要下载代码后在本地渲染，时间较长。
 * 2. 解决方法 - 在服务器端渲染出带内容的 HTML 后再返回
 * === //
 * React实现同构
 * // ===
 * 1. 同构应用运行原理的核心：虚拟 DOM
     a、render 方法：指定具体渲染到DOM上的节点
     b、renderToString 和 renderToStaticMarup - 返回HTML字符串
 * 2. 同构优点：
   2.1 利于SEO
   2.2 加速首屏渲染 -  服务端渲染则是，用户在下载时已经是渲染好的页面了，其打开速度比本地渲染快。
   2.3 服务端和客户端共享某些代码，避免重复定义
 * 3. react + redux 实现同构的
   3.1 在服务端和客户端需要保持store一致
     store的初始状态在服务端生成，并使用在页面插入脚本的方式，写入store初始值到window中
     window.__INITIAL_STATE__ = ${JSON.stringify(initialState)} // 此处输出initialState到页面中，是十分危险的，要注意XSS的防范。
   3.2 服务端ES6/7支持
       引入babel-register
   3.3 具体同构过程：
     3.3.a 生成一个layout模板函数 - layout(content, data)
     3.3.b 生成store - const store = configureStore();
     3.3.c 从store中获取state -  const finalState = store.getState();
     3.3.d 使用renderToString生成html字符串：
       const html = renderToString(
         <Provider store={store}>
          <App />
         </Provider>
       )
     3.3.e 将生成的html结构插入模版中
        layout(html, finalState)
 * === //
 */


/**
 * 虚拟DOM
 * // ===
 * 1. 是什么
 虚拟 DOM 的意思是不直接操作 DOM 而是通过 JavaScript Object 去描述原本的 DOM 结构。
 在需要更新 DOM 时不直接操作 DOM 树，而是通过更新 JavaScript Object 后再映射成 DOM 操作。
 * 2. 优点
 2.1 因为操作 DOM 树是高耗时的操作，尽量减少 DOM 树操作能优化网页性能。而 DOM Diff 算法能找出2个不同 Object 的最小差异，得出最小 DOM 操作
 2.2 虚拟 DOM 的在渲染的时候不仅仅可以通过操作 DOM 树来表示出结果，也能有其它的表示方式，例如把虚拟 DOM 渲染成字符串(服务器端渲染)，或者渲染成手机 App 原生的 UI 组件( React Native)。
 * === //
 */

import common from '../../config';

function layout (content, data) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charSet='utf-8'/>
    <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
    <meta name='renderer' content='webkit'/>
    <meta name="author" content="张静宜">
    <meta name="description" content="张静宜个人前端博客">
    <meta name="keywords" content="张静宜个人前端博客, 前端博客, 张静宜">
    <meta name='viewport' content='width=device-width, initial-scale=1'/>
    <link rel="stylesheet" href="/index.css">
    <script>
      window.__REDUX_DATA__ = ${JSON.stringify(data)};
    </script>
  </head>
  <body>
    <div id="root"><div>${content}</div></div>
 
    <script type="text/javascript" src="${common.publicPath}react.js"></script>
    <script type="text/javascript" src="${common.publicPath}redux.js"></script>
    <script type="text/javascript" src="${common.publicPath}axios.js"></script>
    <script type="text/javascript" src="${common.publicPath}remark.js"></script>
    <script type="text/javascript" src="${common.publicPath}other.js"></script>
    <script type="text/javascript" src="${common.publicPath}index.js"></script>
  </body>
  </html>
`;
};

module.exports = layout