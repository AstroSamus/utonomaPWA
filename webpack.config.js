const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
  entry: {
    index: "./main.js",
    createContent: "./pages/CreateContent/CreateContent.js"
  }, 
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    static: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpeg|jpg|gif|svg)$/,
        type: "asset/resource",
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              ["@babel/plugin-transform-react-jsx", {
                "pragma": "h",
                "pragmaFrag": "Fragment",
              }]
            ],
          },
        },
      },
    ],
  },
  "resolve": {
    "alias": {
      "react": "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",     // Must be below test-utils
      "react/jsx-runtime": "preact/jsx-runtime"
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Utonoma",
      template: "./index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      title: "Utonoma - Create Content",
      template: "./pages/CreateContent/CreateContent.html",
      chunks: ["createContent"],
      filename: './pages/CreateContent/CreateContent.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "assets/"),
          to: path.resolve(__dirname, "dist/assets/"),
        },
        {
          from: path.resolve(__dirname, "manifest.json"),
          to: path.resolve(__dirname, "dist"),
        },
        {
          from: path.resolve(__dirname, "sw.js"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};