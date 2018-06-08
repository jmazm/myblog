const webpack = require("webpack")
// const WebpackDevServer = require("webpack-dev-server")


// export const createServer = (app) => {
//   const WebpackDevMiddleware = require("koa-webpack-dev-middleware")
//   const WebpackHotMiddleware = require("koa-webpack-hot-middleware")
//   const config = require("./webpack.dev.config")
//   const compile = webpack(config)
//
//   app.use(WebpackDevMiddleware(compile, {
//     publicPath: common.publicPath,
//     historyApiFallback: true,
//     stats: {
//       colors: true
//     },
//     lazy: false,
//     watchOptions: {
//       aggregateTimeout: 300,
//       poll: true
//     }
//   }))
//   app.use(WebpackHotMiddleware(compile))
// }

module.exports = function (config, port) {
  const WebpackDevServer = require("webpack-dev-server")
  let app = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api/*': 'http://127.0.0.1:3001'
    },
    stats: {
      colors: true
    }
  })

  app.listen(port, function (err) {
    if (err) {
      console.log(err)
    }
    console.log(`Listening at localhost:${port}`)
  })
}