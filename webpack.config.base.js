const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')

const root = process.cwd()
const dist = path.join(root, 'dist')
const src = path.join(root, 'src')

module.exports = {
  output: {
    path: dist,
    filename: '[name]-[hash].bundle.js',
    chunkFilename: '[name]-[hash].chunk.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css', '.less'],
    modules: [src, path.join(root, 'node_modules')],
  },
  plugins: [
    CopyWebpackPlugin([
      {
        from: path.join(src, 'assets', 'images'),
        to: path.join(dist, 'images'),
      },
      {
        from: path.join(src, 'assets', 'styles'),
        to: path.join(dist, 'styles'),
      },
    ]),
    new CheckerPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['awesome-typescript-loader', 'source-map-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: { mimetype: 'application/font-woff' },
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: { mimetype: 'application/font-woff' },
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: { mimetype: 'application/octet-stream' },
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: { mimetype: 'image/svg+xml' },
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        loader: 'url-loader',
        options: { limit: 1 },
      },
    ],
  },
}
