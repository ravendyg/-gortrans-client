const
  webpack = require('webpack'),
  path = require('path'),
  config = require('/etc/project-config.d/config'),
  clientVersion = config.VERSIONS.CLIENT_VERSION || 1,
  old = process.argv.find(el => el === '--env.old') ? '-old' : '',
  bundleName = 'bundle' + (old ? '-old' : ''),
  targets = {
    targets: old ?
      {
        // css will fail on ie < 11 - no point to support them
        ie: '11'
      } :
      {
        chrome: 62,
        firefox: 56,
        edge: 16,
        safari: 11,
        opera: 48,
      }
  },
  include = [
    path.resolve(__dirname, 'src')
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
    app: path.resolve(__dirname, 'src', 'app.tsx'),
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: `[name]-${clientVersion}${old}.bundle.js`,
    chunkFilename: `[name]-${clientVersion}${old}.bundle.js`,
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
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      'react-redux': 'preact-redux',
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
        'API_URL': JSON.stringify(config.URLS.API_URL),
        'VERSION': JSON.stringify(clientVersion),
        'OLD': !!old,
      }
    })
  ],

  externals: {
    'socket.io-client': 'io',
    'leaflet': 'L'
  },

}
