const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.cjs')
const TerserPlugin = require('terser-webpack-plugin');
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new HtmlCriticalWebpackPlugin({
      base: path.resolve(__dirname, 'dist'),
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      extract: true,
      width: 430, //iphone 14 pro max size
      height: 935,
      penthouse: {
        blockJSRequests: false,
      },
      ignore: {
        atrule: ['@font-face'],
      },
    })
  ],
  resolve: {
    alias: {
      'config.env': path.resolve(__dirname, 'config.prod.js'),
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // eliminate all console logs.*
          },
        },
      }),
    ],
  },
})