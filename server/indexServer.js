/**
 * 这里使用http，而不是用https，原因在于https默认端口为443，如果用https，那么其他服务就用不了
 * 而通过ngigx，可以将http转移到https请求
 */

/**
 * HTTP 和 HTTPS的异同
 * 不同点：
 1、https协议需要到ca申请证书，一般免费证书较少，因而需要一定费用。

 2、http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。

 3、http和https使用的是完全不同的连接方式，默认端口号不一样，前者是80，后者是443。

 4、http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。
 */



/**
 * http
 */
const app = require("./basicConfig")
// const https = require("https")
// const fs = require("fs")
const config = require("../config")
const port = config.server.indexServerPort


app.listen(port, () => {
  console.log(`${process.version} listening on port ${port} (${app.env}/${config.dbConfig.database})`)
})

/**
 * https
 * // ===
 * 组成：HTTP + SSL/TLS
 *
 * 对称密钥：
 * 1、本质 - 一种随机数或随机序列；加密密钥和解密密钥相同
 * 2、对称加密算法：AES，RC4，3DES
 * 非对称密钥：
 * 1、也称为公钥密码体制；密钥对 - 公共密钥和私有密钥
 * 2、非对称加密算法：RSA，DSA/DSS
 *
 * 验证过程：
 * 1、浏览器往服务器的 443 端口发起请求，请求携带了浏览器支持的加密算法和哈希算法。
 * 2、服务器收到请求，选择浏览器支持的加密算法和哈希算法。
 * 3、服务器下将数字证书返回给浏览器，这里的数字证书可以是向某个可靠机构申请的，也可以是自制的。
 * 4、浏览器进入数字证书认证环节，这一部分是浏览器内置的 TSL 完成的：【找证书机构 -- 公钥解密得证书内容和证书签名】
   4.1 首先浏览器会从内置的证书列表中索引，找到服务器下发证书对应的机构，如果没有找到，此时就会提示用户该证书是不是由权威机构颁发，是不可信任的。
      如果查到了对应的机构，则取出该机构颁发的公钥。
   4.2 用机构的证书公钥解密得到证书的内容和证书签名，内容包括网站的网址、网站的公钥、证书的有效期等。浏览器会先验证证书签名的合法性（验证过程类似上面 Bob 和 Susan 的通信）。
       签名通过后，浏览器验证证书记录的网址是否和当前网址是一致的，不一致会提示用户。
       如果网址一致会检查证书有效期，证书过期了也会提示用户。
       这些都通过认证时，浏览器就可以安全使用证书中的网站公钥了。
   4.3 浏览器生成一个随机数 R，并使用网站公钥对 R 进行加密。
 * 5、浏览器将加密的 R 传送给服务器。
 * 6、服务器用自己的私钥解密得到 R。
 * 7、服务器以 R 为密钥使用了对称加密算法加密网页内容并传输给浏览器。
 * 8、浏览器以 R 为密钥使用之前约定好的解密算法获取网页内容。
 * === //
 */



// const options = {
//   key: fs.readFileSync(config.auth.key),
//   cert: fs.readFileSync(config.auth.cert)
// }
//
// https.createServer(options, app.callback()).listen(port)
//
// console.log(`${process.version} listening on port ${port} (${app.env}/${config.dbConfig.database})`)