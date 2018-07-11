/**
 * 传输安全
 * // ===
 * 1. HTTP传输窃听 - 传输链路窃听篡改 - 本质：HTTP是明文传输
   1.1 过程：浏览器 <---> 代理服务器 <---> 链路 <---> 服务器
   1.2 可以通过命令 traceroute/tracert 查看经过哪些节点；AnyProxy - 监听请求 - 可篡改数据
   1.3 危害：
     1.3.a 窃听危害：窃听用户密码、窃听传输敏感信息、非法获取个人资料
     1.3.b 篡改危害：插入广告、重定向网站、无法防御的XSS和CSRF攻击
           案例：运营商劫持、局域网劫持、公共wifi获取密码
 * 解决方法：HTTPS
 * === //
 */

/**
 * HTTPS - TLS（SSL）加密
 * // ===
 * 1. 中间人攻击 - 引出证书机制，防御中间人攻击
   浏览器 <------> 中间人 <------> 服务器
            加密            加密

 * 2. 如何确定服务器身份
   2.0 浏览器内置证书信任列表
   2.1 服务器向CA申请证书；
   2.2 CA验证域名，颁发证书
   2.3 浏览器向服务器发送请求
   2.4 服务器向浏览器出示证书
   2.5 浏览器验证证书

   证书无法伪造、证书私钥不被泄露、域名管理权不屑露、CA坚守原则
 * 3. HTTPS验证过程
   3.1 浏览器向服务器发起请求，请求携带浏览器支持的的加密算法和哈希算法
   3.2 服务器收到请求后，选择浏览器支持的加密算法和哈希算法，并将数字证书返回给浏览器
   3.3 浏览器收到数字证书后，进入数字证书认证环节，这一部分是浏览器内置的 TSL 完成
     3.3.a 浏览器从内置的证书列表中索引，查找服务器下发证书对应的机构。如果找不到，就会提示用户该证书
           不是由权威机构颁发的，不可信任。如果查到，则取出该机构颁发的公钥。
     3.3.b 用公钥解密得到证书的内容和证书签名。
           证书内容包括网站的网址、网站的公钥、证书的有效期等。
           浏览器会先验证证书签名的合法性。
           签名通过后，浏览器验证证书记录的网址是否和当前网址是一致的，不一致会提示用户。
           如果网址一致会检查证书有效期，证书过期了也会提示用户。
           这些都通过认证时，浏览器就可以安全使用证书中的网站公钥了。
     3.3.c 浏览器生成一个随机数 R，并使用网站公钥对 R 进行加密。
   3.4 浏览器将加密的R传送给服务器
   3.5 服务器用自己的私钥解密得到R
   3.6 服务器以 R 为对称密钥使用对称加密算法加密网页内容并传输给浏览器。
   3.7 浏览器以R为密钥使用之前约定好的解密算法获取网页内容
 * 4. 算法
   4.1 哈希算法
      将任意长度的信息转换为较短的固定长度的值，通常其长度要比信息小得多，且算法不可逆。
      例如：MD5 SHA-1 SHA-256
   4.2 非对称加密
      加密使用的密钥和解密使用的密钥是不相同的，分为公钥、私钥，公钥和算法都是公开的，私钥是保密的。
      例如：RSA、DSA、ECDSA、 DH、ECDHE
   4.3 对称加密
     加密和解密都是使用的同一个密钥。
     例如：DES、AES-GCM、ChaCha20-Poly1305 等
 * === //
 */


const baseServer = require("./sever.base")
const Koa = require("koa")
const KoaStaticCache = require("koa-static-cache")
const path = require("path")
const distDir = path.resolve(process.cwd(), './dist')
const config = require("../config")

module.exports = function (port) {
  const app = new Koa()
  baseServer(app)

  const routerMap = port == config.indexPort ? require("./router/index") : require("./router/cms")

  app.use(routerMap.routes())
    .use(routerMap.allowedMethods())

  // koa-static-cache ： 可以设置Http缓存

  app.use(KoaStaticCache(path.resolve(distDir, 'lib'), {
    maxAge: 60 * 60 * 24 * 30
  }))

  app.use(KoaStaticCache(path.resolve(distDir, 'imgs'), {
    maxAge: 60 * 60 * 24 * 30
  }))


  app.use(KoaStaticCache(path.resolve(distDir, `${port == config.indexPort ? 'index' : 'cms'}`), {
    maxAge: 60 * 60 * 24 * 30
  }))

  app.listen(port, () => {
    console.log(`${process.version} listening on port ${port} (${app.env})`)
  })
}


/**
 * http2.0 特点
 * // ===
 * 1. 二进制分帧层：
   1.1 应用层与传输层间
   1.2 分为 HEADRS frame 和 DATA frame
   1.3 较于HTTP/1.x而言，http2.0在传输期间的编码方式变化。由以换行符作为纯文本的分隔符变为将所有传输的信息分割为更小的消息和帧，并采用二进制格式对它们编码
 * 2. 首部压缩：server与client各存首部表
 * 3. 多路复用：所有的HTTP2.0的请求都在一个TCP链接上， 这个连接可以承载任意双向字节流, 无需合并css,js,sprite, 无需多域名并行下载
 * 4. 请求优先级：优先值确定着客户端和服务器处理不同的流采取不同的优先级策略
 * 5. 服务器推送：无需base64 http://www.ruanyifeng.com/blog/2018/03/http2_server_push.html
 * 6. 兼容性：https连接时先握手，发Client Hello包说明是否支持h2, 否则用http/1.1
 * === //
 */

// http2.createSecureServer(httpsOptions, app.callback()).listen(port, function (err) {
//   err && console.log(err)
//   console.log(`http2: listening at localhost: ${port}`)
// })