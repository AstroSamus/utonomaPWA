const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    main: './Main/main.js',
    uploadContent: './UploadContent/main.js',
    myContent: './MyContent/main.js'
  }, 
  plugins: [
    new HtmlWebpackPlugin({
      template: './Main/index.html',
      chunks: ['main'],
      filename: './index.html',
    }),
    new HtmlWebpackPlugin({
      template: './UploadContent/index.html',
      chunks: ['uploadContent'],
      filename: './UploadContent/index.html',
    }),
    new HtmlWebpackPlugin({
      template: './MyContent/index.html',
      chunks: ['myContent'],
      filename: './MyContent/index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'assets/'),
          to: path.resolve(__dirname, 'dist/assets/'),
        }
      ],
    }),
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
}