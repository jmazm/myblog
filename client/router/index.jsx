/**
 * history api
 * // ===
 * 1. history.go()：跳转到 history 中指定的一个点【0：代表当前页；负整数：-1代表向后移动一个页面 ；正整数：1代表向前移动一个页面】
 * 2. history.back()：向后跳转，和用户点击浏览器回退按钮的效果相同
 * 3. history.forward()：向前跳转，如同用户点击了前进按钮
 * 4. history.length：确定的历史堆栈中页面的数量
 * 5. pushState(stateObj, title, URL-可选)：添加和修改历史记录中的条目
   5.1 能够在不加载新页面的情况下改变浏览器的 URL，
     执行 pushState()方法后，新的状态信息就会被加入历史状态栈，而浏览器地址栏也会变成新的相对 URL。
     但浏览器并不会真的向服务器发送请求，即使状态改变之后查询 location.href 也会返回与地址栏中相同的地址。
   5.2 应用场景
      5.2.a 使用 history.pushState() 可以改变referrer
         它在用户发送 XMLHttpRequest 请求时在HTTP头部使用，改变state后创建的 XMLHttpRequest 对象的referrer都会被改变。
         因为referrer是标识创建  XMLHttpRequest 对象时 this 所代表的window对象中document的URL。
   5.3 注意
   pushState() 绝对不会触发 hashchange 事件，即使新的URL与旧的URL仅哈希不同也是如此。
 * 6. history.replaceState(stateObj, title, URL-可选)：调用这个方法不会在历史状态栈中创建新状态，只会重写当前状态。
   6.1 使用场景：为了响应用户操作，你想要更新状态对象 state 或者当前历史记录的URL。
 * 7. history.state ：可以读取当前的历史状态
 * === //
 */

/**
 * hashchange 和 popstate - 这两种历史记录管理都受同源策略的限制
 * // ===
 * 1. onhashchange - 在浏览器URL中hash发生变化后触发的事件
   1.1 event.oldURL - 旧路由  event.newURL - 新路由
 * 2. onpopstate - 每当处于激活状态的历史记录条目发生变化时，popstate事件就会在对应window对象上触发.
   2.1 如果当前处于激活状态的历史记录条目是由history.pushState()方法创建，或者由history.replaceState()方法修改过的，
       则 popstate 事件对象的 state 属性包含了这个历史记录条目的 state 对象的一个拷贝.
   2.2 调用history.pushState()或者history.replaceState()不会触发popstate事件。
   2.3 popstate 事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮(或者在JavaScript中调用history.back()、history.forward()、history.go()方法).
   2.4 event.state：包含着当初以第一个参数传递给 pushState()的状态对象
       浏览器加载的第一个页面没有状态，因此单击“后退”按钮返回浏览器加载的第一个页面时，event.state 值为 null。
      state对象不存储不可序列化的对象如DOM。
 * === //
 */

/**
 * 客户端中常见的跳转策略
 * // ===
 * 1. 用户点击某个锚标签或者直接操作 history 对象的 replace/push 方法
 * 2. 用户点击前进/后退按钮
 * === //
 *
 * 路由系统如何能实时监听 URL 的变化，在 URL 发生变化的时候及时做出响应，渲染出正确的页面？
 * // ===
 * 1. React Router 使用 History 的 .listen 方法来监听当前 URL 的变化，
 * 2. 其本质上还是直接监听 HTML5 的 popstate 事件。
 * 3. popstate 事件会在用户点击某个前进/后退按钮的时候触发；
 * 4. 而在每次重渲染的时候，每个 Route 组件都会重现检测当前 URL 是否匹配其预设的路径参数。
 * === //
 */

/**
 * location
 * // ===
 * 1. location.hash
   1.1 含义：hash 属性是一个可读可写的字符串，该字符串是URL 的锚部分（从# 号开始的部分）
   1.2 HTTP请求不包括#：
      #是用来指导浏览器动作的，对服务器端完全无用。所以，HTTP请求中不包括#。
      比如：访问 http://www.example.com/index.html#print，
      但实际发出的请求确是：http://www.example.com/index.html
   1.3 #的转义：# ==》%23
 　1.4 改变#不触发网页重载
      单单改变#后的部分，浏览器只会滚动到相应位置，不会重新加载网页。
      比如，从 http://www.example.com/index.html#location1
      改成：　http://www.example.com/index.html#location2
      结果：浏览器不会重新向服务器请求index.html。
    1.5 改变#会改变浏览器的访问历史
      每一次改变#后的部分，都会在浏览器的访问历史中增加一个记录，使用"后退"按钮，就可以回到上一个位置。
      这对于ajax应用程序特别有用，可以用不同的#值，表示不同的访问状态，然后向用户给出可以访问某个状态的链接。
    1.6 Google抓取#的机制
      默认情况下，Google的网络蜘蛛忽视URL的#部分。
      如果你希望Ajax生成的内容被浏览引擎读取，那么URL中可以使用"#!"，Google会自动将其后面的内容转成查询字符串_escaped_fragment_的值。
      http://twitter.com/#!/username ==》 http://twitter.com/?_escaped_fragment_=/username
 * === //
 */

/**
 * BrowserRouter 和 HashRouter 的区别
 * // ===
 * 1. 路径表示不一样：BrowserRouter - http://localhost:8080/abc/def    HashRouter - http://localhost:8080/#/abc/def
 * 2. 实现原理不一样
   2.1 BrowserRouter: history.pushState() + onpopstate事件
   2.2 HashRouter: location.href.hash + onhashchange事件
 * 3. 刷新结果不一样：
   3.1 基于BrowserRouter配置的页面刷新后，这个路由必须有相应的内容返回才可以，不然会报错或者返回404页面
       在react搭建起来的路由系统中，在点击相应的链接并跳转到相应的页面，可以看到地址栏上的路由是改变了，
       但实际上，并没有向服务端发送请求，这是pushState的作用。
       然而，在刷新页面的时候，就会基于当前路由，向服务器发送请求，获取相应的资源。
   3.2 基于HashRouter配置的页面刷新后，之前展示的是什么页面，结果还是什么页面
       URL的hash改变，不会向服务器发送新的请求，但在刷新后，仍可以正常显示页面，是由于可以基于hash值找到对应的页面，并渲染出来。
 * === //
 */

import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import HOME from '../views/User/containers/Home'
import ArticleDetailPage from '../views/User/containers/ArticleDetailPage'
import CategoryPage from '../views/User/containers/CategoryPage'
import TagPage from '../views/User/containers/TagPage'
import Demo from '../views/User/containers/DemoPage'
import Message from '../views/User/containers/MessagePage'
import ArticleListByTagPage from '../views/User/containers/ArticleListByTagPage'
import ArticleListByCategoryPage from '../views/User/containers/ArticleListByCategoryPage'
import SearchPage from '../views/User/containers/SearchPage'

import NotFound from '../views/NotFound'

export const UserRouteMap = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact  path="/" component={HOME}/>
        <Route path="/article/:articleId" component={ArticleDetailPage}/>
        <Route exact  path="/category" component={CategoryPage}/>
        <Route exact path="/tag" component={TagPage}/>
        <Route path="/tag/:tag/article" component={ArticleListByTagPage}/>
        <Route path="/category/:category/article" component={ArticleListByCategoryPage}/>
        <Route path="/search/:title" component={SearchPage}/>
        <Route path="/demo" component={Demo}/>
        <Route path="/message" component={Message}/>
        <Route path="/404" component={NotFound}/>
      </Switch>
    </BrowserRouter>
  )
}


