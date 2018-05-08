const config = require('./webpack.dev.config')
const OpenBrowserWebpackPlugin  = require("open-browser-webpack-plugin")
const port = require("../../config").server.indexServerPort

config.entry = {
  index: [
    `webpack-dev-server/client?http://127.0.0.1:${port}/`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './client/views/index.jsx'
  ],

  // lib: [
  //   'react',
  //   'react-dom',
  //   'react-router',
  //   'react-router-dom',
  //   'react-redux',
  //   'redux',
  //   'redux-saga'
  // ]
}

config.plugins.push(
  new OpenBrowserWebpackPlugin({
    url: `http://127.0.0.1:${port}/`
  })
)

module.exports = config