const
  webpack = require('webpack'),
  path = require('path'),
  config = require('/etc/project-config.d/config'),
  minify = process.argv.find(el => el === '-p'),
  clientVersion = config.VERSIONS.CLIENT_VERSION || 1,
  old = process.argv.find(el => el === '--env.old') ? '-old' : '',
  plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'API_URL': JSON.stringify(config.URLS.API_URL),
        'VERSION': JSON.stringify(clientVersion),
        'OLD': !!old,
      }
    })
  ],
  bundleName = 'bundle' + (old ? '-old' : ''),
  targets = {
    targets: old ?
        {
            ie: '9'
        } :
        {
            'chrome': 58
        }
    }
  ;

if (minify) {
  plugins.push(new BabiliPlugin());
}

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
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', targets]
            ]
          },
        }]
      }, {
        test: /\.tsx?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', targets]
              ]
            }
          }, {
            loader: 'ts-loader'
          }
        ]
      }, {
        test: /\.png/,
        use: [
          { loader: 'url-loader' },
          { loader: 'img-loader' },
        ]
      }, {
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
      path.resolve(__dirname, 'src')
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

  plugins,

  externals: {
    'socket.io-client': 'io',
    'leaflet': 'L'
  },

}
