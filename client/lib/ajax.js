/**
 * ajax
 * @param config
 * @example {
 * method: 请求的方法,
 * url: 请求的路径,
 * isAsync：是否异步（默认异步）,
 * data: 传输的数据,
 * fn: 回调函数,
 * headers: 请求头
 * }
 */
export const ajax = (config) => {

  // 1. 新建连接
  const xhr = new XMLHttpRequest()
  const headers = config.headers || []

  // 不允许浏览器发送cookie
  // xhr.withCredentials = false

  // 在调用 open()之前指定 onreadystatechange事件处理程序才能确保跨浏览器兼容性。即：须在调用onreadystatechange事件后才能调用xhr.open()。

  // 4. 接收数据
  xhr.onreadystatechange = () => {
    /**
     * readyState属性
     * // ===
       0：未初始化。尚未调用 open()方法。
       1：启动。已经调用 open()方法，但尚未调用 send()方法。
       2：发送。已经调用 send()方法，但尚未接收到响应。
       3：接收。已经接收到部分响应数据。
       4：完成。已经接收到全部响应数据，而且已经可以在客户端使用了。
     * === //
     */
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
        /**
         * xhr响应数据的相关属性
         * // ===
           responseText：作为响应主体被返回的文本。
           responseXML：如果响应的内容类型是”text/xml“或”application/xml“，这个属性中将保存包含着响应数据的 XML DOM 文档。
           status：响应的 HTTP 状态。
           statusText：HTTP 状态的说明。
         * === //
         */
        const data = JSON.parse(xhr.responseText)
        config.fn && config.fn(data)
      }
    }
  }

  // 2. 打开连接
  xhr.open(config.method, config.url, config.isAsync || true)

  // 自定义请求头
  headers.forEach(function(item) {
    xhr.setRequestHeader(item.name, item.value)
  })

  // 3. 发送数据
  xhr.send(config.data || null)

  // 取消异步请求
  // xhr.abort()
}