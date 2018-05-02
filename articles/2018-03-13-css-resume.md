## 一、做简历前的思路以及准备

1. 先想好简历主要由哪些部分构成：个人信息、技能、项目经验、教育经历；每个部分又有哪些内容
2. 接下来画好草稿：想想每一部分内容的的样式是怎么样的，包括pc端、手机端（横屏以及竖屏），当然，这也涉及到`html`结构
3. 一定要一一对应想好再做，比如个人信息，在想好了pc端的布局样式后，一定也得把手机端的也想好！
4. 对了，简历的各部分的内容要先写好，因为文字的多少也是会影响布局的！
5. 写完pc端再写移动端，或者写完移动端再写pc端，不然会做得很乱


## 二、遇到的问题

### 2.1 居中问题

`flex` 的确是一个解决布局以及居中的好方法，但是，不要忘记了其他可以实现居中的方法，有些时候，或许这些方法要比`flex`好得多。不要只是使用`flex`！

其实我做的这个简历是整体都是居中的，一开始想的是用 `flex`，但其实 `margin: 0 auto` 要比 `flex` 更方便得多，因为我这里已经知道了整个简历的宽度是多少了！
而且，这里只是解决居中问题，不需要考虑其他的问题！

看下面代码：

```html
<article class="resume"></article>
<style>
    .resume {
        width: 96%;
        max-width: 1000px;
        margin: 80px auto;
    }
</style>
```

### 2.2 宽度的设置

一直在迷惑，这个简历的宽度应该是怎么设置的，究竟是为谁设置？

一开始我是直接为 `div.section`  设置`width` ，`min-width` 和 `max-width` ，如下：

```html
<article class="resume">
    <section class="section"></section>
    <section class="section"></section>
    <section class="section"></section>
    <section class="section"></section>
</article>
<style>
    /* wrong */
    .section {
        width: 96%;
        max-width: 1000px;
    }
    /* good */
    .resume {
        width: 96%;
        max-width: 1000px;
    }
</style>
```

但是，实际上，整个简历的宽度其实应该是由最顶层元素决定的 `div.resume`，这样就可以避免在写移动端的时候，对容器宽度由诸多修改！

### 2.3 断点的设置

断点设置的问题，我参考了结一老师的【[下手响应式及断点设置分析](http://imweb.io/topic/56dff5121a5f05dc506430da)】。

但是，在实践过程中发现，单纯是 `1200px`、`992px`、`768px`、`544px` 这些断点是不能满足简历的实现，还需要根据实际需求，额外添加了一些断点。

其实，我是在`Chrome`中做移动端的测试时，发现上面的这些断点不能完全保证我的简历能以最好的形式呈现出来，自己才额外添加了一些断点！

### 2.4 考虑css3兼容性的问题

简历做出来后，就拿了舍友的手机测试，突然发现她手机的浏览器居然不兼容“线性渐变（`linear-gradient`）”，由于一开始我只是顾着实现就好，就没有想那么多`css3` 属性兼容性问题，
因此，导致那个环形进度条外圈就只有灰色，而没有“七彩色”。如下图所示：

![resume-01](/styles/images/resume/resume-01.jpg)

因此，我的解决方法是：为环形进度条添加多一个背景颜色！

```css
/* 修改前 */
background: linear-gradient(to right, #40e0d0, #ff8c00, #ff0080);

/* 修改后 */
background-color: #ff0080;
background-image: linear-gradient(to right, #40e0d0, #ff8c00, #ff0080);
background-image: -webkit-linear-gradient(to right, #40e0d0, #ff8c00, #ff0080);
```

### 2.5 margin和padding的使用

`margin`：指的是两个盒子间的距离，而`padding`指的是盒子内部的边距。

如果要使两个盒子间的水平方向或者垂直方向有距离，那么使用的就应该是 `margin` 而不是 `padding`（不要被背景色迷惑了，感觉两个用上去的效果都一样！但其意义是不同的！）

如果要修饰盒子内部的边距，那么就应该使用 `padding` 而不是 `margin`

### 2.6 环形进度条的实现

这个问题我已经写了博客，可参考【[css - 环形进度条](http://www.jmazm.com/2018/03/12/css-circle-progress/)】

### 2.7 在iphone中日期的字体颜色被改变，并且赋予了tel捕捉功能

在`iphone`中日期的字体颜色被改变，并且赋予了 `tel` 捕捉功能

```html
<span class="project-time">2017/06-2017/09</span>
```

如下图所示：

![resume](/styles/images/resume/resume-02.jpg)

解决方案如下：

```html
<meta name="format-detection" content="telephone=no">
```

这里补充，常用的“格式检测”还有：

```html
<!-- 告诉设备不识别邮箱，点击之后不自动发送 -->
<meta name="format-detection" content="email=no">
<!-- 禁止跳转至地图 -->
<meta name="format-detection" content="address=no">
```

---

如果想让设备识别出电话号码、邮箱等，可以在 `a` 标签的 `href` 属性里设置！

```html
<a href="tel:15626168865;">这是电话号码</a>
<a href="mailto:471938302@qq.com;">这是邮箱地址</a>
```

## 三、我的简历

[查看我的简历](/effects/demo/resume/v5/index.html)

## 四、总结

响应式的意思就是适应各种屏幕尺寸，以最好的方式将页面呈现给用户看。

不过，我在一开始设计这个简历的时候，却忽略了这点！我忽略了“满屏设计”！

除此之外，我在写样式的时候，有时候会觉得自己写得比较凌乱！我想其中一个较重要的原因就是：还没写完`pc`端的页面样式，就马上去写移动端的样式！
简直是自己挖坑自己跳！

因此，在做响应式网站的时候，如果你是从`pc`端开始写页面，之后才写移动端的页面，那么就得知道一个规则：“由大到小”，从大像素开始写才到小像素（一般用`max-width`）；
如果你是从移动端开始写页面，之后才写`pc`端的页面，那么就得知道一个规则：“由小到大”，从小像素开始写才到大像素（一般用`min-width`）。


> * 参考资料
>   * [Meta标签中的format-detection属性及含义](https://www.2cto.com/kf/201611/567917.html)



