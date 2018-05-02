const config = require('./webpack.dev.config')
const OpenBrowserWebpackPlugin  = require("open-browser-webpack-plugin")


config.entry = {
  index: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://127.0.0.1:3000/',
    'webpack/hot/only-dev-server',
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
    url: 'http://127.0.0.1:3000'
  })
)

module.exports = config