const
  webpack = require('webpack'),
  path = require('path'),
  targets = {
    targets: {
        'ie': 9,
    }
  },
  include = [
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'tests'),
  ],
  babelLoader = {
    loader: 'babel-loader',
    options: {
      presets: [
        ['env', targets]
      ]
    },
  }
  ;

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'tests', 'index.ts'),
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: `test.bundle.js`,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        use: [babelLoader]
      },
      {
        test: /\.tsx?$/,
        include,
        use: [
          babelLoader,
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.png/,
        use: [
          { loader: 'url-loader' },
          { loader: 'img-loader' },
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader'}
        ]
      }
    ]
  },

  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname),
    ],

    extensions: ['.js', '.ts', '.tsx'],
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
    modules: false,
    reasons: false,
    children: false,
    source: true,
    errors: true,
    errorDetails: true,
    warnings: true,
    publicPath: true
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'API_URL': JSON.stringify('config.URLS.API_URL'),
        'VERSION': JSON.stringify(1),
        'OLD': false,
      }
    })
  ],

}
