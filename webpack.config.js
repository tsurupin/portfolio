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
        {
          test: /\.(scss|css)$/,
          loader: ExtractTextPlugin.extract(
            'style-loader',
            'css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss-loader',
            'resolve-url',
            'sass'
          )
        },
        { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel' },
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
        { test: /\.(png|jpg|gif|ico)$/, loaders: ['file?name=[name].[ext]'] }
    ]
  },

  postcss: [autoprefixer({ browsers: ['> 1%'] })],

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx', '.css', '.scss']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [
    new ExtractTextPlugin('../../stylesheets/cms/style.scss', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};
