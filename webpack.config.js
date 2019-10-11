const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  performance: { hints: false },
  optimization: {
    minimizer: [new TerserPlugin({ parallel: true })]
  },
  devServer: {
    stats: "minimal",
    writeToDisk: true,
    open: true
    // openPage: ["?window=0", "?window=1", "?window=2"]
  },
  entry: "./src/index.js",
  output: {
    filename: "index.js"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([{ from: "./videos/*.mp4", to: "./" }]),
    new HtmlWebPackPlugin({
      title: "Earl",
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
