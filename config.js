module.exports = {
  publicPath: '/',
  server: {
    indexServerPort: '3000',
    cmsServerPort: '8080'
  },
  dev: {
    serverPort: '3001',
    imageUploadApi: 'http://localhost:3001/upload',
    fileServerIP: 'http://localhost:3001',
  },
  prod: { // 生成环境中，因为是同构，所以只需分官网和cms
    fileServerIP: 'http://120.79.205.192',
    imageUploadApi: 'http://localhost:3001/upload',
  },
  demoRootPath: 'http://garvenzhang.github.io/',
  auth: {
    key: './server/auth/2_www.hellojm.cn.key',
    cert: './server/auth/1_www.hellojm.cn_bundle.crt',
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
