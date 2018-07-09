/**
 * DLL
 * // ===
 * 1. 动态链接库：.dll文件 - 在一个动态链接库中可以包含给其他模块调用的函数和数据。
 * 2. 动态链接库的思想
   2.1 把网页依赖的基础模块抽离出来，打包到一个个单独的动态链接库中去。一个动态链接库中可以包含多个模块。
   2.2 当需要导入的模块存在于某个动态链接库中时，这个模块不能被再次被打包，而是去动态链接库中获取。
   2.3 页面依赖的所有动态链接库需要被加载。
 * 3. 为什么给 Web 项目构建接入动态链接库的思想后，会大大提升构建速度呢？
   包含大量复用模块的动态链接库只需要编译一次，在之后的构建过程中被动态链接库包含的模块将不会在重新编译，而是直接使用动态链接库中的代码。
   由于动态链接库中大多数包含的是常用的第三方模块，例如 react、react-dom，只要不升级这些模块的版本，动态链接库就不用重新编译。
 * 4. 接入 Webpack
   4.1 DllPlugin 插件：用于打包出一个个单独的动态链接库文件。
   4.2 DllReferencePlugin 插件：用于在主要配置文件中去引入 DllPlugin 插件打包好的动态链接库文件。【这里是一个json文件】
 * === //
 */
const webpack = require('webpack');
const path = require('path')
const CompressionWebpackPlugin = require("compression-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")

module.exports = {
  mode: 'production',
  entry: {
    react: [
      'react', 'react-dom', 'react-router', 'react-router-dom'
    ],
    redux: [
      'redux', 'react-redux', 'redux-saga'
    ],
    remark: [
      'remark', 'remark-react'
    ],
    axios: [
      'axios'
    ],
    other: [
      'dateformat', 'js-cookie'
    ]
  },
  output: {
    publicPath: '/',
    path: path.resolve(process.cwd(), './dist'),
    filename: 'lib/' + '[name].js',
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [  
    new webpack.DllPlugin({
      context: process.cwd(), // 'E:\\projectAndNote\\blog\\myblog'
      path: path.resolve(process.cwd(), './dist/lib/[name].manifest.json'), // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
      name: '[name]'
    }),
    new CompressionWebpackPlugin({
      test: /\.js$|\.css$|\.html$/,
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      // 只处理大于这个字节的文件
      threshold: 10240,
      minRatio: 0.8
    }),
    // 清除
    new CleanWebpackPlugin(['dist'],  {
      root: path.resolve(process.cwd(), './'),
      verbose: true,
      dry: false
    })
  ]
};
