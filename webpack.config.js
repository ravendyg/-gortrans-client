const
  webpack = require('webpack'),
  path = require('path'),
  config = require('/etc/project-config.d/config')
  ;

module.exports = {
  entry: './src/app.tsx',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
    library: 'app',
    libraryTarget: 'umd',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          },
        }]
      }, {
        test: /\.tsx?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          },
        }, {
          loader: 'ts-loader'
        }]
      }, {
        test: path.join(__dirname, 'src', 'html'),
        use: [
          'htmllint-loader',
          {
            loader: 'html-loader',
            options: {}
          }
        ]
      },
    ]
  },

  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      'react-redux': 'preact-redux'
    },

    extensions: ['.js', '.ts', '.tsx', '.css'],
  },

  performance: {
    hints: 'warning',
    maxAssetSize: 200000,
    maxEntrypointSize: 400000,
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },

  devtool: false,

  context: __dirname,

  target: 'web',

  externals: [],

  stats: {
    colors: true,
    hash: true,
    version: true,
    timings: true,
    assets: true,
    chunks: true,
    modules: true,
    reasons: true,
    children: true,
    source: true,
    errors: true,
    errorDetails: true,
    warnings: true,
    publicPath: true
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'API_URL': JSON.stringify(config.API_URL)
      }
    }),
  ],
}
