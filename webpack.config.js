
module.exports = {
  context: __dirname,
  entry: {
    'cms_bundle': './src/cms/index.js'
    //'client_bundle': './src/client/index.js'
  },
  output: {
    path: './app/assets/javascripts/share',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
