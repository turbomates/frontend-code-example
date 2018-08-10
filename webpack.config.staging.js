const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')
const config = require('./webpack.config.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (stage) => Object.assign({}, config, {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    app: './src/index.tsx',
    vendor: Object.keys(pkg.dependencies),
  },
  optimization: {
    minimize: true
  },
  plugins: config.plugins.concat([
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        STAGE: JSON.stringify(stage),
      },
    })
  ]),
})
