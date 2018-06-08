const password = {}

const md5 = (str) => {
  const crypto = require("crypto")
  const md5Hash = crypto.createHash('md5')
  md5Hash.update(str)
  return md5Hash.digest('hex')
}

class Password {
  static getPasswordFromTxt (username, password) {
    md5(`${username}a1&890AJN-=+O2,X${password}`)
  }
  static getSault () {
    return md5(Math.random() * 999999 + '' + new Date().getTime())
  }
  static encryptPassword (sault, password) {
    return md5(`${sault}*&1iop)92nbd-2ZJ^a${password}`)
  }
}

module.exports = Password