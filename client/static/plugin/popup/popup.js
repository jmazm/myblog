import DragDrop from './drag-drop'
import { replaceClass } from '../../../lib/className'

/**
 * // === 创建节点：document.createElement(tagName) === //
 * // === 添加节点：parent.appendChild(newNode) === //
 * // === 插入节点：parent.insertBefore(newNode,referenceNode) === //
 * // === 删除节点：parent.removeChild(tagName) === //
 * // === 替换节点：parent.replaceChild(newChild, oldChild) === //
 * // === 克隆节点：node.cloneNode([true:深复制 | false:浅复制]) === //
 */

/**
 * innerText 、textContent、nodeValue
 * // ===
 * textContent:
 * 1、如果是document、document type、notation，就会返回null
 * 2、可读：其内容包含每一个子节点，包括注释节点、processing instruction节点
 * 3、可写：为其赋值后，相当于用一个文本节点替代了这个元素的所有子节点（相当于这个元素的所有子节点被移除了）
 * === //
 *
 * // ===
 * innerText:
 * a property that represents the "rendered" text content of a node and its descendants
 * === //
 *
 * // ===
 * nodeValue:
 * 1、返回null值的类型：Document DocumentFragment Element NamedNodeMap EntityReference Notation
 * 2、or text, comment, and CDATA nodes, nodeValue returns the content of the node
 * 3、For attribute nodes, the value of the attribute is returned.
 * 4、当nodeValue被定义为Null时，对其设置值无效
 * === //
 *
 * // ===
 * innerText 和 textContentd的区别
 * 1、textContent可以获取所有元素，包括<script>、<style>，innerText不能
 * 2、textContent 包含隐藏元素，innerText不包含
 * 3、textContent不会引起重排，innerText会
 * 4、到ie11为止，innerText不仅移除所有子节点，而且会永久破坏所有子文本节点【对文本中存在的 HTML 语法字符（小于号、大于号、引号及和号）进行了编码】
 * (so it is impossible to insert the nodes again into any other element or into the same element anymore) 而textContent不会
 * === //
 */

/**
 * return this
 * 优点：链式调用
 * 缺点：如果有其他返回值，就不能使用
 */

/**
 * 弹窗
 * @param config
 * @constructor
 */
function Popup () {
  this.$wrapper = null
  this.$headerTitle = null
  this.$body = null
  this.$sureBtn = null
  this.$cancelBtn = null
}

Popup.prototype = {
  // === 字面量的形式，会重写原型，因此这里需要修正 === //
  constructor: Popup,
  /**
   * 创建基本的html
   */
  createBaseHtml: function () {
    // === 由于多个地方要用到document，所以将document用一个变量存起来，避免每次使用document都要往上找 === //
    const doc = document
    // === DocumentFragment 是DOM节点，但并不属于DOM树，使用它可以不影响页面的重排；因此我们可以往其身上添加其他节点，最后再将DocumentFragment节点添加到页面上。  === //
    const frag = doc.createDocumentFragment()

    const $wrapper = doc.createElement('div')
    $wrapper.className = `popup popup-open`
    $wrapper.setAttribute('jm-drag', 'true')

    // 头部
    const $header = doc.createElement('header')
    $header.className = `popup-header`
    const $headerTitle = doc.createElement('h2')
    $headerTitle.className = `header-title`
    $header.appendChild($headerTitle)

    // body
    const $body = doc.createElement('div')
    $body.className = `popup-content`

    // footer
    const $footer = doc.createElement('footer')
    $footer.className = `popup-footer`
    // const $sureBtn = doc.createElement('button')
    // $sureBtn.type = 'button'
    // $sureBtn.className = `sure-btn`
    // $sureBtn.textContent = '确认'
    // const $cancelBtn = doc.createElement('button')
    // $cancelBtn.type = 'button'
    // $cancelBtn.className = `cancel-btn`
    // $cancelBtn.textContent = '取消'
    // $footer.appendChild($sureBtn)
    // $footer.appendChild($cancelBtn)

    // 添加节点
    $wrapper.appendChild($header)
    $wrapper.appendChild($body)
    $wrapper.appendChild($footer)
    frag.appendChild($wrapper)
    doc.body.appendChild(frag)

    // 获取元素
    this.$wrapper = $wrapper
    this.$headerTitle = $headerTitle
    this.$body = $body
    this.$footer = $footer
    // this.$sureBtn = $sureBtn
    // this.$cancelBtn = $cancelBtn

    return this
  },
  setFooter: function () {},
  /**
   * 设置内容
   */
  setContent: function (content) {
    this.$body.innerHTML = content
    return this
  },
  /**
   * 设置头部内容
   */
  setHeader: function (title) {
    this.$headerTitle.textContent = title
    return this
  },
  /**
   * 设置样式
   */
  setStyle: function () {
    const style = document.createElement('style')
    style.innerHTML = `
      .popup {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        padding: 10px 20px;
        border: 1px solid #999999;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 4px;
        background: white;
        }
        .popup-header {
            padding-bottom: 5px;
            border-bottom: 1px solid #999999;
        }
        .popup-header .header-title{
            font: 18px/24px '';
            margin: 0;
        }
        .popup-content {
            margin: 10px 0;
            word-break: break-all;
        }
        .popup-footer {
            text-align: right;
        }
        .popup-footer button {
            font: 14px/1.5 '';
            padding: 0 12px;
            color: white;
            border-radius: 5px;
            border: 1px solid #999999;
            background: dodgerblue;
            cursor: pointer;
        }
         .popup-footer button:first-of-type {
            margin-right: 10px;
        }
        .popup-footer .cancel-btn {
            color: #999999;
            background: white;
        }
        .popup-footer .cancel-btn:hover {
            background: #eeeeee;
        }
        .popup-open {
            animation: zoomIn 0.3s linear;
        }
        .popup-close {
            animation: zoomOut 0.3s linear forwards;
        }
        .popup-input {
            display: block;
            width: 80%;
            margin: 10px 0;
            border: 1px solid #eee;
            background: white;
        }
        @keyframes zoomIn {
            from {
                transform: translate(-50%, -50%) scale(0, 0);
            }
            to {
                transform: translate(-50%, -50%) scale(1, 1);
            }
        }
        @keyframes zoomOut {
            from {
                transform: translate(-50%, -50%) scale(1, 1);
            }
            to {
                transform: translate(-50%, -50%) scale(0, 1);
            }
        }
    `
    // 获取head元素：document.head
    document.head.appendChild(style)

    return this
  },
  /**
   * 打开弹窗
   */
  open: function () {
    replaceClass(this.$wrapper, 'popup-close', 'popup-open')
  },
  /**
   * 关闭弹窗
   */
  close: function () {
    replaceClass(this.$wrapper, 'popup-open', 'popup-close')
  },
  move: DragDrop.enable,
  init: function (config) {}
}



export default Popup