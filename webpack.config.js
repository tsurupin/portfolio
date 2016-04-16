
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
  }
};
