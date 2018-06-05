const crypto = require("crypto")
const KEY = '&^dO021(5j>s!)_}{;@ASC%'

class Crypt {
  /**
   * 加密
   * @param val 未加密前的值
   */
  static encrypt (val) {
    if (!val) {
      return
    }

    // 创建密文
    const cipher = crypto.createCipher('aes192', KEY)
    // 根据数据更新密文
    let encrypted = cipher.update(`${val}`, 'utf8', 'hex')
    // 获取密文
    encrypted += cipher.final('hex')
    return encrypted
  }

  /**
   * 解密
   * @param encryptedVal 加密后的值
   */
  static decrypt (encryptedVal) {
    if (!encryptedVal) {
      return
    }
    // returns a Decipher object
    const decipher = crypto.createDecipher('aes192', KEY)
    let decrypted = decipher.update(encryptedVal, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  }
}

module.exports = Crypt