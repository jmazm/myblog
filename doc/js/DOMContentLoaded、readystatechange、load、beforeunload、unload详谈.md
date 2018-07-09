## 5大加载相关事件

### DOMContentLoaded

当初始 html 文档完全加载并解析之后触发，无需等待样式、图片、子iframe结束。

### load

当一个资源及其依赖的资源结束加载时触发。即：load事件只有一个页面完全被加载时才触发

### readystatechange

document.readyState：描述document的加载情况
* loading：文档仍在加载
* interactive：文档结束加载并且被解析，但是像图片，样式，frame之类的子资源仍在加载
* complete：文档和子资源已经结束加载，该状态表明将要触发load事件。

readyState的改变会触发readystatechange事件。

### beforeunload

当浏览器窗口，文档或其资源将要卸载时，会触发beforeunload事件。
这个文档是依然可见的，并且这个事件在这一刻是可以取消的。

如果处理函数为Event对象的returnValue属性赋值非空字符串，浏览器会弹出一个对话框，来询问用户是否确定要离开当前页面

```js
  window.addEventListener("beforeunload", function (event) {
    console.log('即将关闭')
    event.returnValue = "\o/";
});
```

### unload

当文档或者一个子资源将要被卸载时，在beforeunload 、pagehide两个事件之后触发。

文档会处于一个特定状态。
* 所有资源仍存在 (图片, iframe 等.)
* 对于终端用户所有资源均不可见
* 界面交互无效 (window.open, alert, confirm 等.)
* 错误不会停止卸载文档的过程

## 页面加载中的执行顺序

* 1.页面加载开始，首先肯定是先发出加载资源的请求，加载未完成之前，不触发任何事件。
* 2.document加载结束并解析，此时css等其他资源未加载完成。
  
  readyState=interactive - 表明document以及加载并解析完成，触发readystatechange，
  触发DOMContentLoaded。【加载完成且带有defer标记的脚本，会按顺序开始执行。】
* 3.css、img等子资源加载完成之后，触发window.load事件
* 4.点击关闭标签或者刷新时，会依次触发beforeunload、unload事件。

```
                    0.readystatechange
                            ||
(1.readyState=interactive =====> 3.readyState=complete)
    ||                                        ||      
2.DOMContentLoaded =====================》 4.load =====》 5.beforeunload ====》 6.unload
                                 

```