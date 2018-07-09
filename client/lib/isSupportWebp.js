/**
 * 图片知识
 * // ===
 * 1. png系列
   1.1 png8、png24、png32区别
       png8 - 256色 + 支持透明
       png24 - 2^24色 + 不支持透明
       png32 - 2^24色 + 支持透明
   1.2 特点：支持透明，浏览器兼容好
   1.3 应用场景：大部分需要透明图片的业务场景
 * 2. jpeg
   2.1 特点：有损压缩，压缩率高，不支持透明
   2.2 应用场景：大部分不需要透明图片的业务场景
 * 3. webp
   3.1 特点：压缩程度更好，在 ios webview 有兼容性问题
   3.2 应用场景：安卓全部
 * 4. svg - 矢量图
   4.1 特点：代码内嵌，相对较小，图片样式相对简单的场景
   4.2 应用场景：图片样式相对简单的业务场景
 * === //
 */
/**
 * 图片优化
 * // ===
 * 1. css雪碧图
   1.1 含义：把网站上用到的一些图片整合到一张单独的图片中
   1.2 优点：减少网站的HTTP请求数量
   1.3 缺点：整合图片比较大时，一次加载比较慢
 * 2. Image inline
   2.1 含义：将图片的内容内嵌到html当中
   2.2 优点：减少网站的HTTP请求数量
   2.3 实现：url-loader
 * 3. 使用矢量图
   3.1 使用SVG进行矢量图的绘制
   3.2 使用iconfont解决icon问题
 * 4. webp
   4.1 优势：
       有更优的压缩算法，带来更小的图片体积，质量高；
       同时具备无损和有损的压缩模式、Alpha透明以及动画的特性，
       在 jpeg 和 png 上的转化效果都非常优秀稳定。
   4.2 缺点：兼容性问题
   4.3 实现：nodejs - imagemin-webp；网站 - 智图
 * === //
 */

import cookie from 'js-cookie'

/**
 * 检测浏览器是否支持 webp 格式的图片
 * // ===
 * 1. 兼容性：WebP目前支持桌面上的Chrome和Opera浏览器，手机支持仅限于原生的Android浏览器、Android系统上的Chrome浏览器、Opera Mini浏览器。
 * 2. 转化webp的工具（后端转化）：imagemin-webp
 * 3. webp优势：WebP图片相比于JPG：有更小的文件尺寸，更高的质量
 * 4. 劣势：WebP与JPG相比较，编码速度慢10倍，解码速度慢1.5倍
 * === //

 * // ===
 * 总体思路：
 * 1. 客户端：通过预加载一张webp格式的图片，如果预加载成功，则设置cookie - webp_show=available
 * 2. 服务器端：根据这个cookie判断浏览器是否支持webp格式的图片，不支持则返回png/jpg格式的图片
      最快捷的方法：直接在koa-static-cache中修改

     // 图片原本格式：https://file.jmazm.com/gradient/gradient-11.png.webp
     var filePath = file.path
     var fileType = file.type

     // 判断是否支持webp格式图片
     if (/\.(png|jpg)\.webp/g.test(filePath)) {
          var webpShow = ctx.cookies.get('webp_show')
          if (!webpShow) {
           //    不支持webp的话，则会转化：https://file.jmazm.com/gradient/gradient-11.png
            filePath = filePath.replace(/\.webp$/, '')

            var etc = path.extname(filePath)

            fileType = (
              etc == '.png' ? 'image/png': 'image/jpeg'
            )
          }
        }

     ctx.type = fileType
 * === //
 */
export function isSupportWebp () {

  if (!/webp_show=available/.test(document.cookie)) {
    const image = new Image()

    // 图片加载完的操作
    image.onload = function () {
      if (image.width == 1) {
        let domain = ''

        if (process.env.NODE_ENV == 'production') {
          domain = '.jmazm.com'
        }

        cookie.set('webp_show', 'available', {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          path: '/',
          domain: domain
        })
      } 
    }

    // 一张支持alpha透明度的webp的图片，使用base64编码
    image.src = 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==';
  }
}
