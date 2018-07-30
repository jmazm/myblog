let UploadImgPlugin = {
  wrapper: null,
  ajaxUrl: null,
  fileInput: null,
  dropTarget: null,
  imgArea: null,
  uploadFiles: [], // 存储初始上传图片的数组
  compressedFiles: [], // 存储压缩后图片的数组
  maxSize: 1024 * 1024 * 2, // 上传图片的最大限制：2M
  maxNum: 10, // 上传图片的最大张数（用户设置的）
  _maxNum: 15, //上传图片的最大张数（内部最大限制）
  /**
   * 插件基本结构模板
   * @returns {string}
   */
  createBasicStruTpl () {
    const result = this.calcSize(this.maxSize)

    let str = `
      <div class="upload-img">
        <div class="upload-area">
            <!-- 点击上传文件 -->
            <div class="upload-file-area clicking-upload-area">
                <img src="imgs/upload.png" class="upload-logo">
                <input type="file" id="file" class="upload-file-input" multiple>
            </div>
            <!-- 将文件拖拽到此处 -->
            <div class="upload-file-area drop-target-area">
                将文件拖拽到此处
            </div>
        </div>
        <!-- 图片信息 -->
        <div class="text-area">
           <div class="text-wrap">
              上传<span class="img-num"> 0 </span>张图片，共<span class="img-size"> 0 B</span> （最多上传 ${this.getPicMaxNum()}张，每张图片不能超过 ${result.size} ${result.unit ? 'B' : 'MB'}）
          </div>
          <button type="button" class="btn js-upload">上传</button>
          <button type="button" class="btn js-clear">清空</button>
        </div>
        <!-- 展示图片区域 -->
        <div class="img-area"></div>
    </div>
    `
    return str
  },
  /**
   * 图片结构模板
   */
  createImgStruTpl (name, url, index) {
    let str = `
        <div class="img-item">
            <div class="img-item-text">
                <p class="img-item-title">${name}</p>
                <span class="del" data-index="${index}">x</span>
            </div>
            <div class="img-wrap">
                <img src="${url}">
            </div>
            <div class="upload-progress hide">
                <div class="progress-running active"></div>
                <span class="progress-txt">0%</span>
            </div>
        </div>
    `
    return str
  },
  /**
   * 获取图片的最大张数
   */
  getPicMaxNum () {
    return this.maxNum <= this._maxNum ? this.maxNum : this._maxNum
  },
  /**
   * 展示上传图片的相关信息
   */
  showInfo () {
    const imgNum = this.wrapper.querySelector('.img-num')
    const imgSize = this.wrapper.querySelector('.img-size')

    imgNum.innerHTML = ` ${this.uploadFiles.length} `

    let size = 0
    for (let item of this.uploadFiles) {
      size += item.size
    }

    const result = this.calcSize(size)
    size = result.size

    imgSize.innerHTML = `${size} ${result.unit ? 'B' : 'MB'}`
  },
  /**
   * 计算大小
   * @param size
   */
  calcSize (size) {
    let unit = 0

    // B
    if ((size / 1024 / 1024).toFixed(2) == 0.00) {
      size = (size / 1024 ).toFixed(2)
      unit = 1
    }
    // MB
    else {
      size = (size / 1024 / 1024).toFixed(2)
      unit = 0
    }
    return {
      size,
      unit
    }
  },
  /**
   * 展示要上传的图片
   */
  async showUploadImgs () {
    // 清空数组
    this.compressedFiles = []
    let str = ''

    const len = this.uploadFiles.length

    for (let i = 0; i < len; i++) {
      const file = this.uploadFiles[i] // 原图片文件
      const url = await this._readFileAsync(file) // 原图片的URL
      const img = await this._loadImg(url) // 获取原图片
      const compressedImgUrl = await this._compressImgs(file, img) // 压缩原图片后的URL
      str += this.createImgStruTpl(file.name, compressedImgUrl, i) // 图片模板
      this.compressedFiles.push (compressedImgUrl)
    }

    this.imgArea.innerHTML = str
 },
  /**
   * 过滤图片
   */
  filterImgs () {
    const maxSize = this.maxSize

    this.uploadFiles = this.uploadFiles.filter((file, index) => {
      return (file.size <= maxSize)
    })
  },
  /**
   * 清空要上传的图片
   */
  clearAllImg () {
    this.uploadFiles = []
    this.compressedFiles = []
    this.imgArea.innerHTML = ''
    this.showInfo()
  },
  /**
   * 删除一张图片
   */
  delAImg (index) {
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

    this.showInfo()
  },
  /**
   * 进度条
   * @param e
   * @param uploadProgress
   */
  onProgress (e, uploadProgress) {
    uploadProgress.classList.remove('hide')
    const span = uploadProgress.querySelector('.progress-txt')
    span.innerHTML = `${Math.floor(e.loaded / e.total * 100)}%`
  },
  /**
   * 上传成功的处理
   */
  onSuccess () {
    setTimeout(() => {
      this.imgArea.innerHTML = '<div style="width: 100%; line-height: 152px; text-align: center; color: red">照片全部上传完成</div>'
    }, 300)
    this.showInfo()
  },
  /**
   * ajax
   * @param index
   * @param uploadProgress
   * @returns {Promise}
   */
  ajax (index, uploadProgress) {
    const url = this.ajaxUrl

    const del = (index) => {
      // 每上传完一张图片【这张图片其实是this.uploadFiles数组里的第一项】，就将这张图片从数组里shift掉
      this.uploadFiles.shift()
      // let imgItem = [...this.imgArea.querySelectorAll('.img-item')]
      // imgItem[index].classList.add('hide')
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
  },
  async doAjax (i) {
    const uploadProgress = [...this.wrapper.querySelectorAll('.upload-progress ')]
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

    this.doAjax(++i)
  },
  /**
   * 异步读取文件
   * @param file
   * @returns {Promise}
   * @private
   *
   * // ===
   * 1. 表单控件 - file集合 - event.files
     1.1 name：本地文件系统中的文件名。
     1.2 size：文件的字节大小。
     1.3 type：字符串，文件的 MIME 类型
     1.4 lastModifiedDate：字符串，文件上一次被修改的时间
   * 2. FileReader类型 - 异步文件读取机制
     2.1 readAsText(file, encoding)
     2.2 readAsDataURL(file)
     2.3 readAsBinaryString(file)
     2.4 readAsArrayBuffer(file)
   * 3. 相关事件
     3.1 progress - lengthComputable、loaded、total
     3.2 error - err.code
     3.3 load - 通过fileReader.result拿到文件的数据
   * 4. 读取拖放事件
      file =  event.dataTransfer.files
   * 5. 使用XHR上传文件
      data = new FormData();
      data.appned()
   * === //
   */
  async _readFileAsync (file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()

      fileReader.onerror = (e) => {
        reject(e)
      }

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.readAsDataURL(file)
    })
  },
  /**
   * 读取图片
   * @param url
   * @returns {Promise}
   * @private
   */
  async _loadImg (url) {
    return new Promise((resolve, reject) => {
      const img = new Image()

      img.onerror = () => {
        reject()
      }

      img.onload = () => {
        resolve(img)
      }

      img.src = url
    })
  },
  /**
   * 压缩图片
   */
  _compressImgs (file, img) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    let scale = 1
    if (img.width > img.height) {
      scale = 120 / img.width
    } else {
      scale = 130 / img.height
    }

    canvas.width = scale * img.width
    canvas.height = scale * img.height

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL(file.type, 0.92)
  },
  /**
   * 处理表单控件
   * @param e
   */
  handleInputFile (e) {
    const ev = e || window.event
    let files = [...ev.target.files]
    const maxPicNum = this.getPicMaxNum()

    for (let file of files) {
      this.uploadFiles.push(file)
    }
    this.uploadFiles = this.uploadFiles.slice(0, maxPicNum)

    // 过滤图片
    this.filterImgs()
    // 展示要压缩的图片
    this.showUploadImgs()
    // 展示上传图片的相关信息
    this.showInfo()
  },

  handleDragFile (e) {
    let files = []
    const ev = e || window.event
    ev.preventDefault()

    if (ev.type === 'drop') {
      files = [...ev.dataTransfer.files]
      const maxPicNum = this.getPicMaxNum()

      for (let file of files) {
        this.uploadFiles.push(file)
      }

      this.uploadFiles = this.uploadFiles.slice(0, maxPicNum)

      // 过滤图片
      this.filterImgs()
      // 展示要压缩的图片
      this.showUploadImgs()
      // 展示上传图片的相关信息
      this.showInfo()
    }
  },
  /**
   * 处理点击事件
   * @param e
   */
  async handleClick (e) {
    e = e || window.event
    const target = e.target
    const cName = target.classList

    if (cName.contains('del')) {
      const index = target.getAttribute('data-index')
      this.delAImg(index)
    }
    else if (cName.contains('js-clear')) {
      this.clearAllImg()
    }
    else if (cName.contains('js-upload')) {
      this.doAjax(0)
    }
  },
  /**
   * 事件绑定
   */
  bindEvent () {
    const wrapper = this.wrapper
    const fileInput = this.fileInput
    const dropTarget = this.dropTarget

    wrapper.addEventListener('click', this.handleClick.bind(this), false)
    fileInput.addEventListener('change', this.handleInputFile.bind(this), false)

    /**
     * 处理拖放文件
     * @param e
     * 拖放事件
     * // ===
     * 1. 目标：被拖动的元素
     dragstart ---> drag ---> dragend
     * 2. 当一个元素被拖动到一个有效的放置目标上
     dragenter --> dragover --> dragleave/drop
     如果元素被拖出放置的目标，会触发dragleave
     如果元素被放到了放置目标，则会触发drop
     * 3. 自定义放置目标
     元素默认不被放置，可以把任何元素变成有效的放置目标，重写dragenter和dragover
     在这两个事件中，添加：event.preventDefault()

     FF中drop的默认行为就是打开被放到放置目标上的URL。==》添加：event.preventDefault()
     * ===//
     */
    dropTarget.addEventListener('dragenter', this.handleDragFile.bind(this), false)
    dropTarget.addEventListener('dragover', this.handleDragFile.bind(this), false)
    dropTarget.addEventListener('drop', this.handleDragFile.bind(this), false)
  },
  /**
   * 初始化
   * @param config
   */
  init (config) {
    const cfg = Object.assign({}, config)
    this.wrapper = cfg.wrapper || document.body
    this.ajaxUrl = cfg.url
    this.maxSize = cfg.maxSize || this.maxSize
    this.maxNum = cfg.maxNum || this.maxNum

    this.wrapper.innerHTML = this.createBasicStruTpl()
    this.fileInput = this.wrapper.querySelector('.upload-file-input')
    this.dropTarget = this.wrapper.querySelector('.drop-target-area')
    this.imgArea = this.wrapper.querySelector('.img-area')

    this.bindEvent()
  }
}

/**
 * 上传图片插件对外接口
 * @param config
 * @example {
 * wrapper: 必填，插件容器
 * url: 必填，发送ajax请求的url
 * maxSize: 选填，上传的图片的最大size，默认 2M，
 * maxNum：选填，上传图片的最大张数，默认是10，最大不能超过15
 * }
 */
function uploadImg (config) {
  UploadImgPlugin.init(config)
}