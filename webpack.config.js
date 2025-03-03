/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-03-01 17:52:47
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-03-03 15:45:13
 * @FilePath: /change-node-version/webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'main.js',
    environment: {
      arrowFunction: false
    },
    clean: true,
  },
  target: 'node',
  externalsPresets: { node: true }, // 排除 Node.js 内置模块
  externals: [
    {
      shelljs: 'commonjs shelljs',
      commander: 'commonjs commander',
      semver: 'commonjs semver',
      chalk: 'commonjs chalk',
    },
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env']
            ]
          }
        },
      },
    ],
  },
  optimization: {
    minimize: false,
  },
}