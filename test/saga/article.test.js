const config = require("../../config")

test('test add prefix to img src', () => {
  const prefix = config.dev.fileServerIP
  let content = `![progress-02](/progress/progress-02.png)看到我粘出来的代码，
                ### 1.5 demo
                ![progress-03](/progress/progress-02.png)
                ![progress-04](/progress/progress-02.png)
                * [demo](/effects/demo/css/progress/v1-1.html)`
  const matchResult = content.match(/\!\[(.*?)\]\((.*?)\)/g)

  content = content.replace(/\!\[(.*?)\]\((.*?)\)/g, `![$1](${prefix}$2)`)

  // 测试一个
  expect(matchResult[0].replace(/\!\[(.*?)\]\((.*?)\)/g, `![$1](${prefix}$2)`)).toBe('![progress-02](http://127.0.0.1:3002/progress/progress-02.png)')

  // 整段代码测试
  expect(content).toBe(
    `![progress-02](http://127.0.0.1:3002/progress/progress-02.png)看到我粘出来的代码，
                ### 1.5 demo
                ![progress-03](http://127.0.0.1:3002/progress/progress-02.png)
                ![progress-04](http://127.0.0.1:3002/progress/progress-02.png)
                * [demo](/effects/demo/css/progress/v1-1.html)`
  )
})