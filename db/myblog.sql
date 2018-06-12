/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 60011
Source Host           : localhost:3306
Source Database       : myblog

Target Server Type    : MYSQL
Target Server Version : 60011
File Encoding         : 65001

Date: 2018-06-12 20:51:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `sault` varchar(32) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idAdmin_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', '3eac64acce6b8f2a4ffdf39e7a03d136', '14d68186ae4dee3a4f6c1561752401fa', null);

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `visitTotal` int(5) DEFAULT '0',
  `commentTotal` int(5) DEFAULT '0',
  `imgSrc` varchar(255) DEFAULT NULL,
  `content` mediumtext,
  `isPublished` int(11) DEFAULT '0',
  `foreword` varchar(255) DEFAULT NULL,
  `Category_id` int(11) DEFAULT NULL,
  `Admin_id` int(11) DEFAULT NULL,
  `Tag_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Article_Category_idx` (`Category_id`),
  KEY `fk_Article_Admin1_idx` (`Admin_id`),
  KEY `fk_Article_Tag1_idx` (`Tag_id`),
  CONSTRAINT `fk_Article_Admin1` FOREIGN KEY (`Admin_id`) REFERENCES `admin` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Article_Category` FOREIGN KEY (`Category_id`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Article_Tag1` FOREIGN KEY (`Tag_id`) REFERENCES `tag` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('1', '环形进度条', '2018-06-11 19:19:50', '0', '0', null, '## 一、从圆饼图出发\n\n### 1.1 整体思路\n\n1. 使用伪元素、`transform`、`css`渐变、`clip` 实现\n2. 主要控制右半圆的变化即可：\n    * 0 到 180 度：右半圆只改变旋转的角度（角度范围在0 到 180 度）【旋转角度 = 360deg * 百分比（百分比在50%以内）】\n    * 180 到 360度：右半圆改变旋转的角度（角度范围也是在0 到 180 度），并且改变右半圆的背景颜色为原始圆的颜色【旋转角度 = 360deg * 百分比 - 180deg（百分比超过50%）】\n\n`html`结构如下：\n\n```html\n<div class=\"circle-bar\"></div>\n```\n\n### 1.2 利用线性渐变实现原始圆\n\n利用线性渐变给右半部分着棕色：\n\n```css\nbackground-image: linear-gradient(to right, transparent 50%, #655 0);\n```\n\n![progress-01](/progress/progress-01.png)\n\n### 1.3 利用伪元素画新的右半圆\n\n```css\n .circle-bar::before {\n        content: \'\';\n        display: block;\n        position: absolute;\n        width: 200px;\n        height: 200px;\n        border-radius: 50%;\n        background-color: inherit;\n        clip: rect(0 auto auto 100px);\n    }\n```\n\n这里利用到了 `clip: rect(0 auto auto 100px)` 实现右半圆，如下图所示，蓝色半圆就是右半圆（这里为了好分辨，所以才将右半圆设置为蓝色）\n\n![progress-02](/progress/progress-02.png)\n\n### 1.4 利用transform实现占比\n\n比如，`A` 饼图比例为 20%，那么其实现如下：\n\n```css\n/* 旋转角度：360deg * 20% = 72deg */\ntransform: rotate(72deg);\n```\n\n![progress-03](/progress/progress-03.png)\n\n---\n\n比如，`B` 饼图比例为 60%，那么其实现如下：\n\n```css\n/* 旋转角度：360deg * 60% - 180deg = 36deg */\ntransform: rotate(36deg);\nbackground: #655;\n```\n\n![progress-04](/progress/progress-04.png)\n\n---\n\n看到我粘出来的代码，大家可能会发现，为什么 `B` 饼图要比 `A` 饼图多了一行代码：`background: #655;`？\n\n* `#655` 是原始圆的背景颜色\n* 对于占比在50%之内的饼图，只需要改变右半圆的旋转角度即可；超过50%的，除了改变右半圆的旋转角度外，还要修改右半圆的背景颜色，改为原始圆的颜色，即 `#655`\n\n### 1.5 demo\n\n* [demo](https://jmhello.github.io/effects/demo/css/progress/v1-1.html)\n\n### 1.6 动态进度条的遗憾\n\n对于占比在50%之内的饼图，其动态实现进度条是完全没有问题的！\n\n![p-01.gif](/progress/p-01.gif)\n\n但是，对于占比超过50%的饼图，却是有问题的：进度条是一步一步去实现的，但是这里除了改变角度为，还要改变背景颜色，\n然而，在改变背景颜色的时候，显得整个进度条十分突兀，一点都不连续！\n\n![p-02.gif](/progress/p-02.gif)\n\n---\n\n* [demo](https://jmhello.github.io/effects/demo/css/progress/v2.html)\n\n## 二、终极版环形进度条\n\n### 2.1 主要思路\n\n1. 一个半圆不行，那么我们就使用两个半圆实现，辅助`transform`、`css`渐变、`clip`等`css`属性 实现\n    * 0 到 180 度：只需要修改右半圆的旋转角度即可（角度范围也是在0 到 180 度）\n    * 180 到 360度：既需要修改右半圆旋转角度，也需要旋转左半圆的旋转角度（左右半圆旋转的角度范围是在0 到 180 度）\n2. 计算左右半圆的旋转角度：\n    * 左半圆旋转角度 = 360deg * 百分比 - 180deg（百分比超过50%）\n    * 右半圆旋转角度 = 360deg * 百分比（百分比在50%以内）\n    \n\n`html` 结构如下：    \n\n```html\n<div class=\"circle-bar\">\n    <!-- 左半圆 -->\n    <div class=\"circle-left\">\n        <div class=\"left\"></div>\n    </div>\n    <!-- 右半圆 -->\n    <div class=\"circle-right\">\n        <div class=\"right\"></div>\n    </div>\n    <!-- 占比 -->\n    <div class=\"circle-txt\">60%</div>\n</div>\n```\n\n补充：\n\n一开始我在想用左右半圆实现的时候，其`html`结构如下：【[demo](https://jmhello.github.io/effects/demo/css/progress/v3.html)】\n\n```html\n<div class=\"circle-bar\">\n    <div class=\"circle-left\"></div>\n    <div class=\"circle-right\"></div>\n    <div class=\"circle-txt\">60%</div>\n</div>\n```\n\n发现，占比在50%内进度条的动画是完全没问题，但是只要超过50%占比的进度条，其左半圆的背景总是会覆盖右半圆的背景！（因为动画是先从右半圆开始才到左半圆的）效果图如下：\n\n![p-03.gif](/progress/p-03.gif)\n\n所以才有了接下来的`html`结构，其解决了我上述的问题！\n\n### 2.2 先实现静态的进度条\n\n[demo](https://jmhello.github.io/effects/demo/css/progress/v4.html)\n\n```css\n.circle-bar {\n    position: relative;\n    width: 200px;\n    height: 200px;\n    border-radius: 50%;\n    background-color: #665555;\n    overflow: hidden;\n    text-align: center;\n    margin: 20px;\n}\n.circle-bar .circle-left,\n.circle-bar .circle-right,\n.circle-left .left,\n.circle-right .right {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 200px;\n    height: 200px;\n    border-radius: 50%;\n}\n.circle-bar .circle-left,\n.circle-left .left {\n    clip: rect(0, 100px,auto,auto);\n}\n.circle-bar .circle-right,\n.circle-right .right {\n    clip: rect(0, auto,auto,100px);\n}\n.circle-left .left,\n.circle-right .right {\n    background: yellowgreen;\n}\n\n.circle-bar .circle-txt {\n    position: absolute;\n    top: 10px;\n    left: 10px;\n    width: 180px;\n    height: 180px;\n    font: 30px/6 \'\';\n    border-radius: 50%;\n    background: white;\n}\n\n.p20 .left {\n    transform: rotate(0deg);\n}\n.p20 .right {\n    transform: rotate(72deg);\n}\n\n.p60 .left {\n    transform: rotate(36deg);\n}\n.p60 .right {\n    transform: rotate(180deg);\n}\n```\n\n![progress-04](/progress/progress-05.png)\n\n### 2.3 实现动态进度条\n\n关键代码如下：【[demo](https://jmhello.github.io/effects/demo/css/progress/v5.html)】\n\n```css\n.p20 .left {\n    animation: rotateLeft20 1s forwards 1s;\n}\n@keyframes rotateLeft20 {\n    to {\n        transform: rotate(0deg);\n    }\n}\n\n.p20 .right {\n    animation: rotateRight20 1s forwards;\n}\n@keyframes rotateRight20 {\n    to {\n        transform: rotate(72deg);\n    }\n}\n\n.p60 .left {\n    animation: rotateLeft60 1s forwards 1s;\n}\n@keyframes rotateLeft60 {\n    to {\n        transform: rotate(36deg);\n    }\n}\n.p60 .right {\n    animation: rotateRight60 1s forwards;\n}\n@keyframes rotateRight60 {\n    to {\n        transform: rotate(180deg);\n    }\n}\n```\n\n![p-04.gif](/progress/p-04.gif)\n', '1', 'css实现环形进度条', '1', '1', '1');
INSERT INTO `article` VALUES ('2', '上传图片插件', '2018-06-11 19:28:03', '0', '0', null, '## 一、思路\n\n### 1.1 展示压缩后的图片的流程\n\n> 1. 用`FileReader`读取文件,返回的是`fileReader.result`\n> 2. 再用 `new Image()` 获取图片数据\n> 3. 用 `canvas` 进行压缩图片\n> 4. 最终展现压缩后的图片\n\n> * 以下代码是对上述4步的实现：【其他详细代码请看`demo`】\n\n```js\n\nasync showUploadImgs () {\n    // 清空数组\n    this.compressedFiles = []\n    let str = \'\'\n\n    const len = this.uploadFiles.length\n\n    for (let i = 0; i < len; i++) {\n      const file = this.uploadFiles[i] // 原图片文件\n      const url = await this._readFileAsync(file) // 1. 原图片的URL\n      const img = await this._loadImg(url) // 2. 获取原图片\n      const compressedImgUrl = await this._compressImgs(file, img) // 3. 压缩原图片后的URL\n      str += this.createImgStruTpl(file.name, compressedImgUrl, i) // 图片模板\n      this.compressedFiles.push (compressedImgUrl)\n    }\n\n    // 4.展现压缩后的图片\n    this.imgArea.innerHTML = str\n }\n```\n\n### 1.2 控制上传图片的张数\n\n> * 第一次上传：如果超过限定张数，那么就以允许上传的最大张数为基准，截取对应的项数\n\n> * 第n（n > 1）次数上传：将允许上传的最大张数与存储图片的数组 `this.uploadFiles`的长度作比较，即：\n>   * `len` < `maxNum`，允许继续上传图片\n>   * `len` >= `maxNum`，不允许继续上传图片\n\n---\n> * 上面是个人的思路，但是发现自己想得过于复杂了，如果我允许上传的图片的最大张数是5，无论它是否超过5张，只需要`this.uploadFiles = this.uploadFiles.slice(0, maxNum)`就可以了！\n\n### 1.3 未上传前，删除需要上传的图片\n\n> * 删除图片必做的动作有以下：\n>   1. 删除 `this.uploadFiles` 里对应的项\n>   2. 删除 `this.compressedFiles` 里对应的项\n>   3. 删除展示在页面上对应的图片\n\n---\n\n> * 第一类：清空所有（这个比较简单）\n\n```js\nthis.uploadFiles = []\nthis.compressedFiles = []\nthis.imgArea.innerHTML = \'\'\n```\n\n---\n\n> * 第二类：删除某一图片\n\n> * **关键点**：为了知道我们删除的是哪一张图片，我们需要为每一个删除按钮添加一个标识 `data-index`\n\n```js\nconst len = this.uploadFiles.length\nfor (let i = 0; i < len; i++) {\n    // ...\n    str += this.createImgStruTpl(file.name, compressedImgUrl, i) \n    // 这里为每一个删除按钮设置了data-index\n    // 其值为this.uploadFiles数组中每一项对应的下标\n    // ...\n}\n```\n\n---\n\n> * 我们删除图片有三项行为必须做，而这三项行为我转化为对数组的操作，因此，即使有了 `data-index`，为了保证我们删除对了数据，我们必须确保这三个数组的每一项内容都是一一对应的。\n\n> * 除此之外，在删除了某一张图片后，其数组内部每一项的下标值都会更新，因此，我们也必须紧跟其后：及时更新每一项的`data-index`【这一步必须在完成“删除展示在页面上对应的图片”这一步后才实现】\n\n\n```js\ndelSomeImg (index) {\n    // 1. 删除 `this.uploadFiles` 里对应的项\n    this.uploadFiles.splice(index, 1)\n    // 2. 删除 `this.compressedFiles` 里对应的项\n    this.compressedFiles.splice(index, 1)\n    \n    // 3. 删除展示在页面上对应的图片\n    let imgItem = [...this.imgArea.querySelectorAll(\'.img-item\')]\n    imgItem.splice(index, 1)\n    \n    // 更新视图\n    this.imgArea.innerHTML = \'\'\n    for (let item of imgItem) {\n      this.imgArea.appendChild(item)\n    }\n    \n    // 更新data-index\n    const del = [...this.wrapper.querySelectorAll(\'.del\')]\n    del.forEach((item, i) => {\n      item.setAttribute(\'data-index\', i)\n    })\n\n}\n```\n\n### 1.4 如何处理多张图片上传\n\n> * 在看了qq空间的图片上传后，发现，其上传图片是一张张上传，即一张上传完再到另外一张，这个应该如何实现呢？\n\n> * 个人觉得：\n>   1. 如果图片是一张上传完再上传另外一张，那么说明图片的上传是有顺序而言的，这一点十分重要！\n>   2. 除此之外，为了保证所有图片上传完后，下一次上传图片，不会保留上一次上传图片的痕迹，我们需要及时清除相关的数据，这里我的想法是：基于上传图片是有顺序的，每次上传的图片都是`this.uploadFiles`数组里的第一项，因此，每次上传完一张图片，我们只需要将这张图片`this.uploadFiles.shift()`了，就`ok`了\n\n> * 这是发送 `Ajax` 请求的代码\n\n```js\n  /**\n   * ajax\n   * @param index\n   * @param uploadProgress\n   * @returns {Promise}\n   */\n  ajax (index, uploadProgress) {\n    const url = this.ajaxUrl\n\n    const del = () => {\n      // 每上传完一张图片【这张图片其实是this.uploadFiles数组里的第一项】，就将这张图片从数组里shift掉\n      this.uploadFiles.shift()\n    }\n\n    return new Promise((resolve, reject) => {\n      const xhr = new XMLHttpRequest()\n\n      xhr.open(\'post\', url, true)\n\n      xhr.onerror = (e) => {\n        reject({\n          status: false,\n          err: e\n        })\n      }\n\n      xhr.upload.onprogress = (e) => {\n        if (e.lengthComputable) {\n          // 处理进度\n          this.onProgress(e, uploadProgress)\n        }\n      }\n\n      xhr.onreadystatechange = async () => {\n        if (xhr.readyState === 4) {\n          if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {\n            // 上传成功后，删除照片数据\n            await del(index)\n            \n            // 返回标识 status: true\n            resolve({\n              status: true\n            })\n          }\n        }\n      }\n\n      let formData = new FormData()\n      // 关键，因为每上传一张图片完成后，都会shift掉这一张图片，这样也保证了，每次上传的图片肯定都是this.uploadFiles[0]的图片\n      formData.append(`file`, this.uploadFiles[0])\n      xhr.send(formData)\n    })\n  }\n```\n\n\n\n> * 这是处理 `Ajax` 请求的代码（这是关键代码，主要使用递归，控制其发送请求的顺序）\n> * 里面会有两个条件，控制递归是否继续进行：\n>   1. `this.uploadFiles.length === 0`，说明所有图片已上传完，此时可以终止递归\n>   2. `!result` 为真就终止递归，即：图片上传失败了\n\n```js\nconst doAjax = async (i) => {\n    let result = null\n    \n    if (this.uploadFiles.length === 0) {\n      console.log(\'last:\' + i)\n      \n      this.onSuccess()\n      \n      return\n    }\n    \n    result = (await this.ajax(i, uploadProgress[i])).status\n    \n    \n    if (!result) {\n      return\n    }\n    \n    doAjax(++i)\n\n}\n\n```\n\n## 二、难题及收获\n\n### 2.1 promise\n\n```js\n  let promise = () => new Promise((resolve, reject) => {\n      const a = 1\n      resolve(a)\n  })\n\n```\n\n> * 一般来说，我们想获取`a`值，会这样写：\n\n```js\npromise().then(resolved => {\n    console.log(resolved) // a ==> 1\n})\n```\n\n> * 其实我们还有另外一种写法获取 `a` 值，这个比上述的写法要简便得多【结合 `async` + `await`】\n\n```js\nlet getA = async () => {\n    console.log(await promise()) // a ==> 1\n}\n\n```\n\n### 2.2 跨域的问题\n\n> * 由于上传图片是需要展现进度条的，因此在实现这一效果的时候，我需要用到 `xhr.upload.onprogress` 这一个事件，但是请求始终发不出去，请看下图：\n\n![uI](/uploadImgs/uI-01.png)\n\n> * 如果我不用 `xhr.upload.onprogress` 这一个事件，请求是可以正常发出的，个人觉得应该不是跨域的问题，因为我已经设置了 `Access-Control-Allow-Origin: *` 这一个响应头了。\n> * 于是我输出了 `req.method`，发现本来我发送请求的方法是 `post`，这里输出的却是 `options`，记得自己曾经做过的一篇 [CORS](http://www.jmazm.com/2017/09/07/js-CORS/#%E4%BA%94-%E9%9D%9E%E7%AE%80%E5%8D%95%E8%AF%B7%E6%B1%82not-so-simple-request)，里面就曾经出现过 `options` 这一个请求方法，\n>   所以，或许这与里面的 **预检请求有关** ，结果，我猜对了\n> * 补充一下，后端处理 [上传图片的中间件](https://jmhello.github.io/effects/demo/plugins/uploadImgs/v1/multipart_parser.js) 是自己原生写出来的，大家可以参考参考\n\n```js\nconst http = require(\'http\')\nconst fs = require(\'fs\')\nconst path = require(\'path\')\nconst formidable = require(\'./multipart_parser.js\')\n\nconst server = http.createServer()\n\nserver.on(\'request\', (req, res) => {\n  const url = req.url\n  // 处理预检请求\n  if (req.method.toLowerCase() === \'options\') {\n    res.writeHead(200, {\n      \'Content-Type\': \'application/json\',\n      \'Access-Control-Allow-Origin\': \'*\'\n    })\n    res.end(JSON.stringify({\n      method: req.method\n    }))\n  }\n  \n  // 处理真正的上传照片的请求\n  if (url === \'/upload\') {\n    new formidable(req, (fields, files) => {\n      // 跨域\n      res.setHeader(\'Access-Control-Allow-Origin\', \'*\')\n      \n      res.write(JSON.stringify({\n        fields: fields,\n        files: files\n      }))\n\n      res.end()\n    }, path.join(__dirname, \'/uploads\'))\n  }\n})\n\nserver.listen(3000)\n```\n\n## 三、demo\n\n> * [demo](https://jmhello.github.io/effects/demo/plugins/uploadImgs/uploadImgs-v1.zip)\n\n\n', '1', '原生js实现上传图片插件', '1', '1', '3');
INSERT INTO `article` VALUES ('3', 'radial-gradient - 上篇', '2018-06-11 19:33:49', '0', '0', null, '## 一、径向渐变总结图\n\n![gradient](/gradient/gradient-10.png)\n\n## 二、浏览器兼容性\n\n> * 点击查看[兼容性](https://caniuse.com/#search=linear-gradient)\n\n![gradient](/gradient/gradient-04.png)\n\n## 三、demo\n\n### 3.1 语法\n\n![gradient](/gradient/gradient-14.png)\n\n### 3.2 理解 radial-gradient\n\n![gradient](/gradient/gradient-13.png)\n\n\n### 3.3 radial-gradient demo\n\n> * 点击打开[demo](https://jmhello.github.io/effects/demo/css/gradient/demo2/index.html)，结果如下图所示：\n\n![gradient](/gradient/gradient-11.png)\n\n![gradient](/gradient/gradient-12.png)\n\n![gradient](/gradient/gradient-16.png)\n', '1', 'css radial-gradient', '1', '1', '2');
INSERT INTO `article` VALUES ('4', 'radial-gradient - 下篇', '2018-06-11 19:44:52', '0', '0', null, '## 一、理解色标\n\n### 1.1 什么是色标？\n\n> * 在创建渐变的过程中，可以指定多个中间颜色值，这个值成为色标。\n> * 每个色标包含一种颜色和一个位置，浏览器从每个色标的颜色淡出到下一个，以创建平滑的渐变。\n\n### 1.2 demo\n\n> * 点击打开[demo](https://jmhello.github.io/effects/demo/css/gradient/demo6/index.html)\n\n> * 先看第一幅图：\n\n![gradient-21.png](/gradient/gradient-21.png)\n\n> * 再看第二幅图：\n\n![gradient-22.png](/gradient/gradient-22.png)\n\n> * 再看第三幅图：\n\n![gradient-23.png](/gradient/gradient-23.png)\n\n> * 最后一幅图\n\n![gradient-20.png](/gradient/gradient-20.png)\n\n## 二、理解径向距离\n\n### 2.1 demo 展示\n\n> * 请看下图：\n\n![gradient](/gradient/gradient-15.png)\n\n> * 点击打开[demo](https://jmhello.github.io/effects/demo/css/gradient/demo5/index.html)，效果如下图：\n\n![gradient-01.gif](/gradient/gradient-01.gif)\n\n### 2.2 分析\n\n> * 再次回顾以下这张图：\n>   * 这是它的径向渐变代码：`background: radial-gradient(red 100px, yellow 200px, blue 300px);`\n\n![gradient-20.png](/gradient/gradient-20.png)\n\n> * 这张图展现的是等间距的椭圆形径向渐变！！\n> * 当没有声明 `size` 的时候，`size` 默认为 `farthest-corner`。而径向距离指的就是从圆心到离圆心最远角的距离，即那条长长的黑线！！\n\n## 三、总结\n\n>  * 1、`color-shop` 中的位置（ `xx%` 或者 `xxpx`）指的是光晕的尺寸。\n>     * 不过你会发现除了圆心不一样，其他都一样的情况下，其光晕的大小也会不同，那是**因为光晕的大小是相对于径向距离而言的**，径向距离大，那么你的光晕相对而言就会越大，径向距离小，那么你的光晕相对而言就会越小。\n\n>  * 2、`<size>` 指的是整个渐变的尺寸（个人理解为渐变的范围）。\n>     * `<size>` 就是用来决定径向距离的！！\n\n>  * 3、等间距径向渐变：`radial-gradient(red, yellow, red, yellow, red)` 【其他径向渐变也一样】\n>     * 对与 `xx-corner` 来说，其径向距离是圆心与角的距离。\n>     * 对于 `xx-side` 来说，其径向距离是圆心与边的距离 。', '1', 'css radial-gradient', '1', '1', '2');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL COMMENT '博客分类名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '原创');
INSERT INTO `category` VALUES ('2', '学习笔记');
INSERT INTO `category` VALUES ('3', '项目经验');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL COMMENT '评论人的昵称',
  `email` varchar(120) DEFAULT NULL COMMENT '评论人的邮箱',
  `website` varchar(255) DEFAULT NULL COMMENT '评论人的网址',
  `content` varchar(255) DEFAULT NULL COMMENT '评论内容',
  `date` datetime DEFAULT NULL COMMENT '评论时间',
  `Article_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idComment_UNIQUE` (`id`),
  KEY `fk_Comment_Article1_idx` (`Article_id`),
  CONSTRAINT `fk_Comment_Article1` FOREIGN KEY (`Article_id`) REFERENCES `article` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------

-- ----------------------------
-- Table structure for replying
-- ----------------------------
DROP TABLE IF EXISTS `replying`;
CREATE TABLE `replying` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL COMMENT '回复人名称',
  `content` varchar(255) DEFAULT NULL COMMENT '回复的内容',
  `date` date DEFAULT NULL COMMENT '回复时间',
  `Comment_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idComment_UNIQUE` (`id`),
  KEY `fk_Replying_Comment1_idx` (`Comment_id`),
  CONSTRAINT `fk_Replying_Comment1` FOREIGN KEY (`Comment_id`) REFERENCES `comment` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of replying
-- ----------------------------

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL COMMENT '博客标签名\n',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idTag_UNIQUE` (`id`),
  KEY `idName_UNIQUE` (`id`,`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tag
-- ----------------------------
INSERT INTO `tag` VALUES ('1', 'html');
INSERT INTO `tag` VALUES ('2', 'css');
INSERT INTO `tag` VALUES ('3', 'javascript');
INSERT INTO `tag` VALUES ('4', 'git');
INSERT INTO `tag` VALUES ('5', 'nodeJS');
INSERT INTO `tag` VALUES ('6', 'webpack');
INSERT INTO `tag` VALUES ('7', 'react');
