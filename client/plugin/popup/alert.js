import {inheritProto} from '../../lib/inheritProto'
import {on} from '../../lib/event'
import Popup from './popup'


function Alert () {
  // 继承父类的属性
  Popup.call(this)
}

inheritProto(Popup, Alert)

Alert.prototype.setFooter = function () {
  const doc = document
  const frag = doc.createDocumentFragment()

  const $sureBtn = doc.createElement('button')
  $sureBtn.type = 'button'
  $sureBtn.className = `sure-btn`
  $sureBtn.textContent = '确认'

  console.log(this.close)
  on($sureBtn, 'click', this.close.bind(this))

  frag.appendChild($sureBtn)
  this.$footer.appendChild(frag)

  return this
}


export function alert (content) {
  let alert = new Alert()

  alert
    .setStyle()
    .createBaseHtml()
    .setHeader('alert')
    .setFooter()
    .move()
    .setContent(content)
  alert.open = alert.open.bind(alert)

  return alert
}


