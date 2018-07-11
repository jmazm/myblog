// === 域名： === //
// === 1 根域名： . === //
// === 2 顶级域名：com gov edu cn com net等 === //
// === 3 二级域名: hellojm === //
// === 4 三级域名：www blog file === //
// === 完整域名：www.hellojm.cn. [通常省略根域名] === //

module.exports = {
  publicPath: '/',
  dev: {
    indexServerPort: '3001',
    cmsServerPort: '8080',
    fileServerIP: 'http://localhost:3002',
  },
  indexPort: '3000',
  cmsPort: '3003',
  prod: {
    fileServerIP: 'https://file.jmazm.com'
  },
  demoRootPath: 'http://jmhello.github.io/',
  auth: {
    key: './server/auth/2_www.jmazm.com.key',
    cert: './server/auth/1_www.jmazm.com_bundle.crt',
    subToken01: '#$%^%Gdsc#%&e@',
    subToken02: 'd24g&&3ad##w',
    CMS_ACCESS_TOKEN: '*2J)js*k>1+*'
  },
  dbConfig: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'sz1997',
    database: 'myblog'
  },
  corsHeader: {
    ACCESS_CONTROL_ALLOW_ORIGIN: '*',
    ACCESS_CONTROL_ALLOW_METHOD: 'GET, POST, OPTIONS',
    ACCESS_CONTROL_ALLOW_HEADERS: '*'
  }
}
