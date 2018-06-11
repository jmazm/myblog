---
layout: post
title: "css - radial-gradient - 下篇"
date: 2017-11-16 15:00:00 +0800 
categories: 原创
tag: CSS
---
* content
{:toc}

> * [css - radial-gradient - 上篇](http://www.jmazm.com/2017/11/14/css-radial-gradient/)，这一篇小作中主要讲了一些径向渐变的基础知识，下面就我们开始深入理解径向渐变。

<!-- more -->



## 一、理解色标

### 1.1 什么是色标？

> * 在创建渐变的过程中，可以指定多个中间颜色值，这个值成为色标。
> * 每个色标包含一种颜色和一个位置，浏览器从每个色标的颜色淡出到下一个，以创建平滑的渐变。

### 1.2 demo

> * 点击打开[demo](https://jmhello.github.io/effects/demo/css/gradient/demo6/index.html)

> * 先看第一幅图：

![gradient-21.png](/gradient/gradient-21.png)

> * 再看第二幅图：

![gradient-22.png](/gradient/gradient-22.png)

> * 再看第三幅图：

![gradient-23.png](/gradient/gradient-23.png)

> * 最后一幅图

![gradient-20.png](/gradient/gradient-20.png)

## 二、理解径向距离

### 2.1 demo 展示

> * 请看下图：

![gradient](/gradient/gradient-15.png)

> * 点击打开[demo](https://jmhello.github.io/effects/demo/css/gradient/demo5/index.html)，效果如下图：

![gradient-01.gif](/gradient/gradient-01.gif)

### 2.2 分析

> * 再次回顾以下这张图：
>   * 这是它的径向渐变代码：`background: radial-gradient(red 100px, yellow 200px, blue 300px);`

![gradient-20.png](/gradient/gradient-20.png)

> * 这张图展现的是等间距的椭圆形径向渐变！！
> * 当没有声明 `size` 的时候，`size` 默认为 `farthest-corner`。而径向距离指的就是从圆心到离圆心最远角的距离，即那条长长的黑线！！

## 三、总结

>  * 1、`color-shop` 中的位置（ `xx%` 或者 `xxpx`）指的是光晕的尺寸。
>     * 不过你会发现除了圆心不一样，其他都一样的情况下，其光晕的大小也会不同，那是**因为光晕的大小是相对于径向距离而言的**，径向距离大，那么你的光晕相对而言就会越大，径向距离小，那么你的光晕相对而言就会越小。

>  * 2、`<size>` 指的是整个渐变的尺寸（个人理解为渐变的范围）。
>     * `<size>` 就是用来决定径向距离的！！

>  * 3、等间距径向渐变：`radial-gradient(red, yellow, red, yellow, red)` 【其他径向渐变也一样】
>     * 对与 `xx-corner` 来说，其径向距离是圆心与角的距离。
>     * 对于 `xx-side` 来说，其径向距离是圆心与边的距离 。
