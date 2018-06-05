const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")

// module.exports = {
//   mode: 'production',
//   entry: {
//     remark: [
//       'remark',
//     ],
//     reactRenderer: [
//       'remark-react'
//     ]
//   },
//   output: {
//     filename: '[name].dll.js',
//     path: path.resolve(process.cwd(), '../dist/js'),
//     library: '[name]'
//   },
//   plugins: [
//     new DllPlugin({
//       name: '[name]',
//       path: path.resolve(process.cwd(), '../dist/js', '[name].manifest.json')
//     }),
//     new CompressionPlugin({
//       asset: '[path].gz[query]',
//       algorithm: 'gzip',
//       test: /\.js$|\.css$|\.html$/,
//       threshold: 10240,
//       minRatio: 0.8
//     })
//   ]
// }

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    lib: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'react-redux',
      'redux',
      'redux-saga',
      'antd',
      'axios'
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
      path: path.resolve(process.cwd(), './dist/lib/manifest.json'), // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
      name: '[name]'
    })
    // new HtmlWebpackPlugin({
    //   template: './client/views/index.html',
    //   inject: 'body',
    //   hash: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true
    //   },
    //   filename: 'index.html'
    // })
  ]
};
