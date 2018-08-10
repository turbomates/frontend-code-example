const webpack = require('webpack')
const config = require('./webpack.config.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = Object.assign({}, config, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  entry: {
    app: './src/index.tsx',
  },
  plugins: config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ]),
})
