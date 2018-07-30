/**
 * XSS - 跨脚本攻击
 * // ===
 * 1. 攻击原理：数据中携带恶意脚本
 * 2. 危害
   2.1 获取页面数据：偷取网站任意数据
   2.2 窃取cookie：获取登录态，从而进行 CSRF 攻击
   2.3 劫持前端逻辑：去到钓鱼网站
   2.4 发送请求：欺骗用户
 * 3. 攻击类型
   3.1 反射型：诱导用户 点击恶意链接 来造成一次性攻击，即：在uri上注入一些带有恶意脚本的参数
   3.2 存储型：储到DB后读取时注入
   3.3 DOM-base型：改版原有的HTML结构，如：转义掉字符或提前闭合标签，为跨站的脚本代码提供了执行环境
 * 4.攻击注入点
   4.1 HTML节点内容：节点动态生成，且包含用户输入信息
     <div>                        <div>
     {content}       ==》         <script > xxxx </script>
     </div>                       </div>
   4.2 HTML属性：某个属性值由用户输入组成
     <img src={item.src} />   ==》    <img src="1" onerror="alert(1);" />
   4.3 js代码：某段js代码包含由用户注入的信息，如从后端出来的变量
      var data = "#{data}"    ==》     var data = "hello";alert(1);"";
   4.4 富文本：既要保持格式，且HTML有XSS攻击风险
 * 5. 防御
   5.1 浏览器自带拦截: X-XSS-Protection, 防御 HTML节点内容 和 HTML属性
     0  - 不需要xss过滤
     1 - 启用XSS过滤
     1;mode=block - 使XSS过滤。浏览器不会对页面进行处理，而是在检测到攻击时阻止页面呈现。
     1; report=<reporting-URI>  (Chromium only)
   5.2 实体转义
       html环境:
       < : '&lt;'
       > : '&gt;'
       html属性环境:
       & : '&amp;'
       " : '&quto;'
      ' : '&#39;'
   5.3 js转义: `\`转义
   5.4 富文本过滤
      黑名单：给出不通过的代码, 如`<script>`, `javascript:;`, `onerror`，但太多要考虑
      白名单：给出通过的代码，其它一律不通过, 如`img: src, alt, title`, 用于输入检出 / 输出检查，可用插件xss
   5.5 CSP (Content Security Policy，内容安全策略) - 配置相应的值，控制用户代理（浏览器等）可以为该页面获取哪些资源
   5.6 设置httpOnly：防止窃取cookie
 * === //
 */

/**
 * html实体转义
 * @param {String} html - html文本
 * @return {*}
 */
export const replaceHtml = (html) => {
  if (html === '') {
    return ''
  }
  html.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/, '&#39;')
  return html
}
  /**
   * javascript转义
   * @param {String} html - html文本
   * @return {*}
   */
export const replaceJavaScript = (html) => {
  if (html === '') {
    return ''
  }

  html.replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/'/g, '\\')

  return html
}