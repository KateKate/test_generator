import webpack from 'webpack';
import pkg from '../../package.json';

const karma = {
  basePath: '',
  files: [
    {
      pattern: '../../spec/unit/**/*.spec.js',
      watched: false,
      included: true,
      served: true,
    }
  ],
  frameworks: ['mocha', 'chai-sinon'],
  preprocessors: {
    '../../spec/unit/*.spec.js': ['webpack'],
    '../../spec/unit/**/*.spec.js': ['webpack']
  },
  webpack: {
    cache: true,
    resolve: {
      modulesDirectories: ['node_modules', 'src', 'spec'],
      extensions: ['', '.js', '.jsx']
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel?optional=runtime',
        }, {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel?optional=runtime',
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(pkg.version)
      })
    ],
    externals: {
      'offside-gaming': 'OffsideGaming',
      'web-client-message': 'WebClientMessage',
    }
  },
  webpackMiddleware: {
    stats: {
      colors: true,
    },
    noInfo: true,
  },
  client: {
    captureConsole: true,
    mocha: {
      bail: true,
    }
  },
  reporters: ['spec'],
  port: 9876,
  colors: true,
  autoWatch: true,
  plugins: [require('karma-mocha'), require('karma-chai-sinon'), require('karma-spec-reporter'), require('karma-webpack')],
};

export default karma;
