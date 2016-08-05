require('babel-polyfill');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  context: __dirname,
  entry: {
    'cms': './src/cms/index.js',
    'client': './src/client/index.js'
  },
  output: {
    path: '../app/assets/javascripts',
    filename: '[name]/bundle.js'
  },
  
  module: {
    loaders: [
        {
          test: /^((?!\.global).)*(scss|css)$/,
          loader: ExtractTextPlugin.extract(
            'style-loader',
            'css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss-loader',
            'resolve-url',
            'sass'
          )
        },
        {
          test: /\.global.(scss|css)$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'resolve-url', 'sass')
        },
        { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' },
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
        { test: /\.(jpg|png|gif)$/, loader: 'url-loader', exclude: /node_modules/ }
    ]
  },

  postcss: [autoprefixer({ browsers: ['> 1%'] })],

  resolve: {
    root: path.resolve(__dirname),
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
    alias: {
      client:  path.resolve(__dirname, 'src', 'client'),
      clientActions: path.resolve(__dirname, 'src', 'client', 'actions'),
      clientComponents: path.resolve(__dirname, 'src', 'client', 'components'),
      
      cms: path.resolve(__dirname, 'src', 'cms'),
      cmsActions: path.resolve(__dirname, 'src', 'cms', 'actions'),
      cmsComponents: path.resolve(__dirname, 'src', 'cms', 'components'),
      cmsCss:  path.resolve(__dirname, 'src', 'cms', 'css'),
      
      shared: path.resolve(__dirname, 'src', 'shared'),
      sharedActions: path.resolve(__dirname, 'src', 'shared', 'actions'),
      sharedComponents: path.resolve(__dirname, 'src', 'shared', 'component'),
      sharedCss: path.resolve(__dirname, 'src', 'shared', 'css')
    }
  },
  plugins: [
    new ExtractTextPlugin('../stylesheets/[name]/bundle.scss', { ignoreOrder: true } )
  ]
};
