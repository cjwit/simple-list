const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { settings } = require('cluster');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  watch: true,
  watchOptions: {
    aggregateTimeout: 200,
    ignored: /node_modules/
  },
  plugins: [
    new Dotenv(),
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Simple Shopping List',
      template: "src/index.html",
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /.svg$/i,
        use: 'raw-loader'
      }
    ]
  }
};