/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-03-01 17:52:47
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-03-03 16:07:52
 * @FilePath: /change-node-version/webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path');
const webpack = require('webpack');
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
  plugins: [
    // Webpack 默认不会给打包后的文件加 #!/usr/bin/env node，如果你想让打包后的 main.js 作为 CLI 工具运行，必须手动加上这行 shebang（#! 开头的行），否则 shell 会认为它是普通文本文件，而不是可执行文件。
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true, // 让 Webpack 不对 banner 进行包装，确保是纯文本
    }),
  ],
  optimization: {
    minimize: false,
  },
}