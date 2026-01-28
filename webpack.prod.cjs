const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.cjs')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
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