/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-03-01 17:52:47
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-03-02 16:18:46
 * @FilePath: /change-node-version/webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path');
module.exports = [
  {
    entry: {
      cjs: './src/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'lib'),
      filename: 'main.[name].js',
      library: {
        type: 'commonjs2',
      },
      clean: true,
    },
    target: 'node',
    externals: {
      shelljs: 'commonjs shelljs',
      commander: 'commonjs commander',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    optimization: {
      minimize: false,
    },
  },
  {
    entry: {
      esm: './src/index.js',
    },
    experiments: {
      outputModule: true,
    },
    output: {
      path: path.resolve(__dirname, 'lib'),
      filename: 'main.[name].js',
      library: {
        type: 'module',
      },
      clean: true,
    },
    target: 'node',
    externals: {
      shelljs: 'commonjs shelljs',
      commander: 'commonjs commander',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    optimization: {
      minimize: false,
    },
  }
]