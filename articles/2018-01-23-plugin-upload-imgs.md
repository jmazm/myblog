## 一、思路

### 1.1 展示压缩后的图片的流程

> 1. 用`FileReader`读取文件,返回的是`fileReader.result`
> 2. 再用 `new Image()` 获取图片数据
> 3. 用 `canvas` 进行压缩图片
> 4. 最终展现压缩后的图片

> * 以下代码是对上述4步的实现：【其他详细代码请看`demo`】

```js

async showUploadImgs () {
    // 清空数组
    this.compressedFiles = []
    let str = ''

    const len = this.uploadFiles.length

    for (let i = 0; i < len; i++) {
      const file = this.uploadFiles[i] // 原图片文件
      const url = await this._readFileAsync(file) // 1. 原图片的URL
      const img = await this._loadImg(url) // 2. 获取原图片
      const compressedImgUrl = await this._compressImgs(file, img) // 3. 压缩原图片后的URL
      str += this.createImgStruTpl(file.name, compressedImgUrl, i) // 图片模板
      this.compressedFiles.push (compressedImgUrl)
    }

    // 4.展现压缩后的图片
    this.imgArea.innerHTML = str
 }
```

### 1.2 控制上传图片的张数

> * 第一次上传：如果超过限定张数，那么就以允许上传的最大张数为基准，截取对应的项数

> * 第n（n > 1）次数上传：将允许上传的最大张数与存储图片的数组 `this.uploadFiles`的长度作比较，即：
>   * `len` < `maxNum`，允许继续上传图片
>   * `len` >= `maxNum`，不允许继续上传图片

---
> * 上面是个人的思路，但是发现自己想得过于复杂了，如果我允许上传的图片的最大张数是5，无论它是否超过5张，只需要`this.uploadFiles = this.uploadFiles.slice(0, maxNum)`就可以了！

### 1.3 未上传前，删除需要上传的图片

> * 删除图片必做的动作有以下：
>   1. 删除 `this.uploadFiles` 里对应的项
>   2. 删除 `this.compressedFiles` 里对应的项
>   3. 删除展示在页面上对应的图片

---

> * 第一类：清空所有（这个比较简单）

```js
this.uploadFiles = []
this.compressedFiles = []
this.imgArea.innerHTML = ''
```

---

> * 第二类：删除某一图片

> * **关键点**：为了知道我们删除的是哪一张图片，我们需要为每一个删除按钮添加一个标识 `data-index`

```js
const len = this.uploadFiles.length
for (let i = 0; i < len; i++) {
    // ...
    str += this.createImgStruTpl(file.name, compressedImgUrl, i) 
    // 这里为每一个删除按钮设置了data-index
    // 其值为this.uploadFiles数组中每一项对应的下标
    // ...
}
```

---

> * 我们删除图片有三项行为必须做，而这三项行为我转化为对数组的操作，因此，即使有了 `data-index`，为了保证我们删除对了数据，我们必须确保这三个数组的每一项内容都是一一对应的。

> * 除此之外，在删除了某一张图片后，其数组内部每一项的下标值都会更新，因此，我们也必须紧跟其后：及时更新每一项的`data-index`【这一步必须在完成“删除展示在页面上对应的图片”这一步后才实现】


```js
delSomeImg (index) {
    // 1. 删除 `this.uploadFiles` 里对应的项
    this.uploadFiles.splice(index, 1)
    // 2. 删除 `this.compressedFiles` 里对应的项
    this.compressedFiles.splice(index, 1)
    
    // 3. 删除展示在页面上对应的图片
    let imgItem = [...this.imgArea.querySelectorAll('.img-item')]
    imgItem.splice(index, 1)
    
    // 更新视图
    this.imgArea.innerHTML = ''
    for (let item of imgItem) {
      this.imgArea.appendChild(item)
    }
    
    // 更新data-index
    const del = [...this.wrapper.querySelectorAll('.del')]
    del.forEach((item, i) => {
      item.setAttribute('data-index', i)
    })

}
```

### 1.4 如何处理多张图片上传

> * 在看了qq空间的图片上传后，发现，其上传图片是一张张上传，即一张上传完再到另外一张，这个应该如何实现呢？

> * 个人觉得：
>   1. 如果图片是一张上传完再上传另外一张，那么说明图片的上传是有顺序而言的，这一点十分重要！
>   2. 除此之外，为了保证所有图片上传完后，下一次上传图片，不会保留上一次上传图片的痕迹，我们需要及时清除相关的数据，这里我的想法是：基于上传图片是有顺序的，每次上传的图片都是`this.uploadFiles`数组里的第一项，因此，每次上传完一张图片，我们只需要将这张图片`this.uploadFiles.shift()`了，就`ok`了

> * 这是发送 `Ajax` 请求的代码

```js
  /**
   * ajax
   * @param index
   * @param uploadProgress
   * @returns {Promise}
   */
  ajax (index, uploadProgress) {
    const url = this.ajaxUrl

    const del = () => {
      // 每上传完一张图片【这张图片其实是this.uploadFiles数组里的第一项】，就将这张图片从数组里shift掉
      this.uploadFiles.shift()
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.open('post', url, true)

      xhr.onerror = (e) => {
        reject({
          status: false,
          err: e
        })
      }

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          // 处理进度
          this.onProgress(e, uploadProgress)
        }
      }

      xhr.onreadystatechange = async () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
            // 上传成功后，删除照片数据
            await del(index)
            
            // 返回标识 status: true
            resolve({
              status: true
            })
          }
        }
      }

      let formData = new FormData()
      // 关键，因为每上传一张图片完成后，都会shift掉这一张图片，这样也保证了，每次上传的图片肯定都是this.uploadFiles[0]的图片
      formData.append(`file`, this.uploadFiles[0])
      xhr.send(formData)
    })
  }
```



> * 这是处理 `Ajax` 请求的代码（这是关键代码，主要使用递归，控制其发送请求的顺序）
> * 里面会有两个条件，控制递归是否继续进行：
>   1. `this.uploadFiles.length === 0`，说明所有图片已上传完，此时可以终止递归
>   2. `!result` 为真就终止递归，即：图片上传失败了

```js
const doAjax = async (i) => {
    let result = null
    
    if (this.uploadFiles.length === 0) {
      console.log('last:' + i)
      
      this.onSuccess()
      
      return
    }
    
    result = (await this.ajax(i, uploadProgress[i])).status
    
    
    if (!result) {
      return
    }
    
    doAjax(++i)

}

```

## 二、难题及收获

### 2.1 promise

```js
  let promise = () => new Promise((resolve, reject) => {
      const a = 1
      resolve(a)
  })

```

> * 一般来说，我们想获取`a`值，会这样写：

```js
promise().then(resolved => {
    console.log(resolved) // a ==> 1
})
```

> * 其实我们还有另外一种写法获取 `a` 值，这个比上述的写法要简便得多【结合 `async` + `await`】

```js
let getA = async () => {
    console.log(await promise()) // a ==> 1
}

```

### 2.2 跨域的问题

> * 由于上传图片是需要展现进度条的，因此在实现这一效果的时候，我需要用到 `xhr.upload.onprogress` 这一个事件，但是请求始终发不出去，请看下图：

![uI](/uploadImgs/uI-01.png)

> * 如果我不用 `xhr.upload.onprogress` 这一个事件，请求是可以正常发出的，个人觉得应该不是跨域的问题，因为我已经设置了 `Access-Control-Allow-Origin: *` 这一个响应头了。
> * 于是我输出了 `req.method`，发现本来我发送请求的方法是 `post`，这里输出的却是 `options`，记得自己曾经做过的一篇 [CORS](http://www.jmazm.com/2017/09/07/js-CORS/#%E4%BA%94-%E9%9D%9E%E7%AE%80%E5%8D%95%E8%AF%B7%E6%B1%82not-so-simple-request)，里面就曾经出现过 `options` 这一个请求方法，
>   所以，或许这与里面的 **预检请求有关** ，结果，我猜对了
> * 补充一下，后端处理 [上传图片的中间件](https://jmhello.github.io/effects/demo/plugins/uploadImgs/v1/multipart_parser.js) 是自己原生写出来的，大家可以参考参考

```js
const http = require('http')
const fs = require('fs')
const path = require('path')
const formidable = require('./multipart_parser.js')

const server = http.createServer()

server.on('request', (req, res) => {
  const url = req.url
  // 处理预检请求
  if (req.method.toLowerCase() === 'options') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
    res.end(JSON.stringify({
      method: req.method
    }))
  }
  
  // 处理真正的上传照片的请求
  if (url === '/upload') {
    new formidable(req, (fields, files) => {
      // 跨域
      res.setHeader('Access-Control-Allow-Origin', '*')
      
      res.write(JSON.stringify({
        fields: fields,
        files: files
      }))

      res.end()
    }, path.join(__dirname, '/uploads'))
  }
})

server.listen(3000)
```

## 三、demo

> * [demo](https://jmhello.github.io/effects/demo/plugins/uploadImgs/uploadImgs-v1.zip)


