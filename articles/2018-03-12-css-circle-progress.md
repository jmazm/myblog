## 一、从圆饼图出发

### 1.1 整体思路

1. 使用伪元素、`transform`、`css`渐变、`clip` 实现
2. 主要控制右半圆的变化即可：
    * 0 到 180 度：右半圆只改变旋转的角度（角度范围在0 到 180 度）【旋转角度 = 360deg * 百分比（百分比在50%以内）】
    * 180 到 360度：右半圆改变旋转的角度（角度范围也是在0 到 180 度），并且改变右半圆的背景颜色为原始圆的颜色【旋转角度 = 360deg * 百分比 - 180deg（百分比超过50%）】

`html`结构如下：

```html
<div class="circle-bar"></div>
```

### 1.2 利用线性渐变实现原始圆

利用线性渐变给右半部分着棕色：

```css
background-image: linear-gradient(to right, transparent 50%, #655 0);
```

![progress-01](/progress/progress-01.png.webp)

### 1.3 利用伪元素画新的右半圆

```css
 .circle-bar::before {
        content: '';
        display: block;
        position: absolute;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background-color: inherit;
        clip: rect(0 auto auto 100px);
    }
```

这里利用到了 `clip: rect(0 auto auto 100px)` 实现右半圆，如下图所示，蓝色半圆就是右半圆（这里为了好分辨，所以才将右半圆设置为蓝色）

![progress-02](/progress/progress-02.png.webp)

### 1.4 利用transform实现占比

比如，`A` 饼图比例为 20%，那么其实现如下：

```css
/* 旋转角度：360deg * 20% = 72deg */
transform: rotate(72deg);
```

![progress-03](/progress/progress-03.png.webp)

---

比如，`B` 饼图比例为 60%，那么其实现如下：

```css
/* 旋转角度：360deg * 60% - 180deg = 36deg */
transform: rotate(36deg);
background: #655;
```

![progress-04](/progress/progress-04.png.webp)

---

看到我粘出来的代码，大家可能会发现，为什么 `B` 饼图要比 `A` 饼图多了一行代码：`background: #655;`？

* `#655` 是原始圆的背景颜色
* 对于占比在50%之内的饼图，只需要改变右半圆的旋转角度即可；超过50%的，除了改变右半圆的旋转角度外，还要修改右半圆的背景颜色，改为原始圆的颜色，即 `#655`

### 1.5 demo

* [demo](https://jmhello.github.io/effects/demo/css/progress/v1-1.html)

### 1.6 动态进度条的遗憾

对于占比在50%之内的饼图，其动态实现进度条是完全没有问题的！

![p-01.gif](/progress/p-01.gif)

但是，对于占比超过50%的饼图，却是有问题的：进度条是一步一步去实现的，但是这里除了改变角度为，还要改变背景颜色，
然而，在改变背景颜色的时候，显得整个进度条十分突兀，一点都不连续！

![p-02.gif](/progress/p-02.gif)

---

* [demo](https://jmhello.github.io/effects/demo/css/progress/v2.html)

## 二、终极版环形进度条

### 2.1 主要思路

1. 一个半圆不行，那么我们就使用两个半圆实现，辅助`transform`、`css`渐变、`clip`等`css`属性 实现
    * 0 到 180 度：只需要修改右半圆的旋转角度即可（角度范围也是在0 到 180 度）
    * 180 到 360度：既需要修改右半圆旋转角度，也需要旋转左半圆的旋转角度（左右半圆旋转的角度范围是在0 到 180 度）
2. 计算左右半圆的旋转角度：
    * 左半圆旋转角度 = 360deg * 百分比 - 180deg（百分比超过50%）
    * 右半圆旋转角度 = 360deg * 百分比（百分比在50%以内）
    

`html` 结构如下：    

```html
<div class="circle-bar">
    <!-- 左半圆 -->
    <div class="circle-left">
        <div class="left"></div>
    </div>
    <!-- 右半圆 -->
    <div class="circle-right">
        <div class="right"></div>
    </div>
    <!-- 占比 -->
    <div class="circle-txt">60%</div>
</div>
```

补充：

一开始我在想用左右半圆实现的时候，其`html`结构如下：【[demo](https://jmhello.github.io/effects/demo/css/progress/v3.html)】

```html
<div class="circle-bar">
    <div class="circle-left"></div>
    <div class="circle-right"></div>
    <div class="circle-txt">60%</div>
</div>
```

发现，占比在50%内进度条的动画是完全没问题，但是只要超过50%占比的进度条，其左半圆的背景总是会覆盖右半圆的背景！（因为动画是先从右半圆开始才到左半圆的）效果图如下：

![p-03.gif](/progress/p-03.gif)

所以才有了接下来的`html`结构，其解决了我上述的问题！

### 2.2 先实现静态的进度条

[demo](https://jmhello.github.io/effects/demo/css/progress/v4.html)

```css
.circle-bar {
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #665555;
    overflow: hidden;
    text-align: center;
    margin: 20px;
}
.circle-bar .circle-left,
.circle-bar .circle-right,
.circle-left .left,
.circle-right .right {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 200px;
    border-radius: 50%;
}
.circle-bar .circle-left,
.circle-left .left {
    clip: rect(0, 100px,auto,auto);
}
.circle-bar .circle-right,
.circle-right .right {
    clip: rect(0, auto,auto,100px);
}
.circle-left .left,
.circle-right .right {
    background: yellowgreen;
}

.circle-bar .circle-txt {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 180px;
    height: 180px;
    font: 30px/6 '';
    border-radius: 50%;
    background: white;
}

.p20 .left {
    transform: rotate(0deg);
}
.p20 .right {
    transform: rotate(72deg);
}

.p60 .left {
    transform: rotate(36deg);
}
.p60 .right {
    transform: rotate(180deg);
}
```

![progress-04](/progress/progress-05.png.webp)

### 2.3 实现动态进度条

关键代码如下：【[demo](https://jmhello.github.io/effects/demo/css/progress/v5.html)】

```css
.p20 .left {
    animation: rotateLeft20 1s forwards 1s;
}
@keyframes rotateLeft20 {
    to {
        transform: rotate(0deg);
    }
}

.p20 .right {
    animation: rotateRight20 1s forwards;
}
@keyframes rotateRight20 {
    to {
        transform: rotate(72deg);
    }
}

.p60 .left {
    animation: rotateLeft60 1s forwards 1s;
}
@keyframes rotateLeft60 {
    to {
        transform: rotate(36deg);
    }
}
.p60 .right {
    animation: rotateRight60 1s forwards;
}
@keyframes rotateRight60 {
    to {
        transform: rotate(180deg);
    }
}
```

![p-04.gif](/progress/p-04.gif)



