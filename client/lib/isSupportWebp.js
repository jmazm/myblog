import cookie from 'js-cookie'
// import { addClass } from './className'

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
   如果支持，则设置cookie - webp_showjoy=available以及为html元素设置类名webp，
   以便后端根据这个cookie或者类名webp判断返回的图片格式为webp还是png/jpg。
   后端则会自动转化src

   图片原本格式：https://file.jmazm.com/gradient/gradient-11.png
   支持webp的话，则会转化：https://file.jmazm.com/gradient/gradient-11.png.webp
 *
 * 为什么要设置类名webp？
 * - 以防cookie - webp_show被删除。对于非同构页面来说，js文件只会加载一起，
 * 如果cookie - webp_show被删除了，那么就无法再次判断浏览器是否支持webp格式的图片
 * === //

 * // ===
 * 分类思路：
 * 1. 非同构页面：如果cookie中没有webp_showjoy，那么就调用下面的 isSupportWebp 方法
 * 2. 同构页面：如果是第一次访问页面，尽管会设置cookie设置类名，但是页面会直接渲染出来，
      而后端也不能在渲染页面内容之前就检测到cookie - webp_showjoy的存在。

      解决方法：由于目前只在文章详情页使用webp格式的图片，所以，在发送文章详情的请求时，
      在判断 类名webp 或者cookie - webp_showjoy不存在的情况下，就调用多一次isSupportWebp这个方法，
      如果返回 {support: true}，那么就在请求头上添加一个字段 is-support-webp: true；
      后端检测到这个请求头 或者 cookie，则转化 src格式。

      【发现，上面这个方法不可行，同构是后端实现，上述方法是在前端实现】
       因此，只能在文件cms后端检测，如果 Accept 中包含 image/webp，则证明支持webp格式，
       那么就返回webp格式的图片，否则返回png/jpg格式的图片
 * === //

 1 客户端判断是否支持webp -> js -> cokie
 2 img -> get url [xxxx.jpg.webp] 带着 cookie [.jamam.com]
 3 后端 get cookie, 判断 isSupportWebp ? 不变 : 截取 字符 -> str.substring() -> xxxx.jpg ->  koa-static
         处理.webp
      后端 -> 前端  x


 */
export function isSupportWebp () {

  if (!/webp_show=available/.test(document.cookie)) {
    const image = new Image()

    // 图片加载完的操作
    image.onload = function () {
      if (image.width == 1) {
        // addRootTag()

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

// function addRootTag() {
//   addClass(document.documentElement, 'webp')
// }

