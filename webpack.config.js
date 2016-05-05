const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  context: __dirname,
  entry: {
    'cms_bundle': './src/cms/index.js'
    //'client_bundle': './src/client/index.js'
  },
  output: {
    path: './app/assets/javascripts/shared',
    filename: '[name].js'
  },
  module: {
    loaders: [
        { test: /plugin\.css$/, loaders: ['style', 'css'] },
        { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' },
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }

    ]
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};
