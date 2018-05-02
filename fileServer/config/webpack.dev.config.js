const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const config = require('./webpack.base.config')
const serverConfig = require('./server.dev.config')

config.devtool = 'eval-source-map'

config.mode = 'development'

// 添加 webpack-dev-server 相关的配置项
config.devServer = {
  compress: true,
  historyApiFallback: true,
  hot: true,
}
// 添加 Sourcemap 支持
config.plugins.push(
  new webpack.SourceMapDevToolPlugin({
    filename: '[file].map',
    exclude: ['vendor.js'] // vendor 通常不需要 sourcemap
  })
)

config.plugins.push(
  // 定义环境
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  })
)

// Hot module replacement
Object.keys(config.entry).forEach((key) => {
  // 这里有一个私有的约定，如果 entry 是一个数组，则证明它需要被 hot module replace
  if (Array.isArray(config.entry[key])) {
    config.entry[key].unshift(
      'webpack-dev-server/client?http://0.0.0.0:8080',
      // 'webpack-hot-middleware/client?path=http://localhost:8000/__webpack_hmr',
      'webpack/hot/only-dev-server'
    );
  }
});

config.plugins.push(
  new webpack.HotModuleReplacementPlugin()
)

config.plugins.push(
  new webpack.NoEmitOnErrorsPlugin() //保证出错时页面不阻塞，且会在编译结束后报错
)

config.plugins.push(
  new webpack.optimize.AggressiveMergingPlugin()
)
config.plugins.push(
  new ProgressBarPlugin()
)

config.plugins.push(
  new OpenBrowserPlugin({
    url: `http://${serverConfig.server.host}:${serverConfig.server.port}`
    // url: `http://${serverConfig.server.host}:${8080}`
  })
)


module.exports = config