const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const webpack = require('webpack')

// HMR
// ---

exports.hmr = () => ({
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
})

// JS (Babel)
// ----------

exports.babelize = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', { modules: false }]],
          },
        },
      },
    ],
  },
})

// CSS, SASS & Stylus
// ------------------

exports.extractCSS = () => extractStyling({ ext: 'css' })
exports.extractSASS = () => extractStyling({ ext: 'scss', name: 'sass' })
exports.extractStylus = () => extractStyling({ ext: 'styl', name: 'stylus' })

exports.loadCSS = () => loadStyling({ ext: 'css' })
exports.loadSASS = () => loadStyling({ ext: 'scss', name: 'sass' })
exports.loadStylus = () => loadStyling({ ext: 'styl', name: 'stylus' })

// Images
// ------

exports.loadImages = () => ({
  module: {
    rules: [
      {
        test: /\.(?:jpe?g|png|gif)$/i,
        use: { loader: 'url-loader', options: { limit: 10000 } },
      },
    ],
  },
})

// Minification
// ------------

exports.minifyAll = () =>
  merge([
    {
      plugins: [
        new webpack.DefinePlugin({
          'process.env': { NODE_ENV: '"production"' },
        }),
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false,
        }),
      ],
    },
    exports.minifyJS(),
  ])

exports.minifyJS = () => ({
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
})

// Fonctions d’assistance internes
// -------------------------------

function buildCSSLoaders({ ext, name = null, useStyle = false }) {
  const result = {
    test: new RegExp(`\\.${ext}$`),
    use: [
      { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
      {
        loader: 'postcss-loader',
        options: {
          plugins: loader => [require('autoprefixer')()],
          sourceMap: true,
        },
      },
    ],
  }

  if (name && name !== 'css') {
    result.use.push({
      loader: `${name}-loader`,
      options: { sourceMap: true },
    })
  }

  if (useStyle) {
    result.use.unshift('style-loader')
  }

  return result
}

let cssPlugin

function extractStyling({ ext, name }) {
  cssPlugin =
    cssPlugin ||
    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true,
    })

  const { test, use } = buildCSSLoaders({ ext, name })

  return {
    plugins: [cssPlugin],
    module: {
      rules: [
        {
          test,
          use: cssPlugin.extract({
            fallback: 'style-loader',
            use,
          }),
        },
      ],
    },
  }
}

function loadStyling({ ext, name }) {
  return {
    module: {
      rules: [buildCSSLoaders({ ext, name, useStyle: true })],
    },
  }
}
