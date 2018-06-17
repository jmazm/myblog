const OpenBrowserWebpackPlugin  = require("open-browser-webpack-plugin")

const port = require("../../config").server.cmsServerPort
const merge = require("webpack-merge")
const dev = require('./webpack.dev.config')

module.exports = merge(dev, {
  entry : {
    index: [
      'webpack-dev-server/client?http://127.0.0.1:' + port,
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './client/views/index.jsx'
    ],
  },
  plugins: [
    new OpenBrowserWebpackPlugin({
      url: `http://127.0.0.1:${port}/`
    })
  ]
})
