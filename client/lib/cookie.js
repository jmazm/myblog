export const cookie = {
  /**
   * 获取cookie
   * // ===
   * cookie 格式：name=1; blue=2; age=年后; _ga=GA1.1.1188942298.1513950747; age=dddddddddd
   * === //
   * @param name
   * @return {Array|{index: number, input: string}|*}
   */
  get: function (name) {
    const result = document.cookie.match(new RegExp(`(?:^|\\s)${encodeURIComponent(name)}=(.*?)(?:;|$)`))

    return result && result[1]
  },
  /**
   * 设置cookie
   * @param cfg
   * @example {
   *  name: 名称,
   *  value: 值,
   *  expires: 失效时间 - GMT格式 - Wdy, DD-Mon-YYYY HH:MM:SS GMT,
   *  path: 路径;
   *  domain: 域;
   *  secure: 安全标识
   * }
   */
  set: function (cfg) {
    const { name, value, expires, path, domain, secure } = cfg
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

    if(expires) {
      cookieText += `; expires=${new Date(expires).toGMTString()}`
    }

    if (path) {
      cookieText += `; path=${path}`
    }

    if (domain) {
      cookieText += `; domain=${domain}`
    }

    if (secure) {
      cookieText += `; secure`
    }

    document.cookie = cookieText
  },
  /**
   * 删除cookie
   * @param name
   */
  remove: function (name) {
    this.set({
      name: encodeURIComponent(name),
      value: '',
      expires: new Date(0)
    })
  }
}