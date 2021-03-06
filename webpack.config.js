const merge = require('webpack-merge')
const path = require('path')
const parts = require('./webpack.parts')

const PATHS = {
  app: path.join(__dirname, 'src'),
  target: path.join(__dirname, 'build'),
}

const CORE_CONFIG = merge([
  {
    devServer: {
      contentBase: PATHS.target,
      hot: true,
      overlay: true,
    },
    devtool: 'cheap-module-source-map',
    entry: PATHS.app,
    output: {
      path: PATHS.target,
      filename: 'bundle.js',
      publicPath: '/',
    },
  },
  parts.babelize({ include: PATHS.app }),
  parts.loadImages(),
])

const devConfig = () =>
  merge([
    CORE_CONFIG,
    parts.hmr(),
    parts.loadCSS(),
    parts.loadSASS(),
    parts.loadStylus(),
  ])

const prodConfig = () =>
  merge([
    CORE_CONFIG,
    parts.extractCSS(),
    parts.extractSASS(),
    parts.extractStylus(),
    parts.minifyAll(),
    {
      devtool: 'source-map',
    },
  ])

module.exports = (env = process.env.NODE_ENV) =>
  env === 'production' ? prodConfig() : devConfig()
