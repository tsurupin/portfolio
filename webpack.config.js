const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var path = require('path');

module.exports = {
  context: __dirname,
  entry: {
    'cms': './src/cms/index.js',
    'client': './src/client/index.js'
  },
  output: {
    path: './app/assets/javascripts',
    filename: '[name]/bundle.js'
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
        { test: /\.(jpg|png)$/, loader: 'url-loader', exclude: /node_modules/ }
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
  
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [
    new ExtractTextPlugin('../stylesheets/[name]/style.scss', { allChunks: true, ignoreOrder: true }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};
