{
  module.exports = {
    entry: "./src/index.js",
    output: {
      path: __dirname,
      filename: "./dist/index.js",
      libraryTarget: "commonjs2",
      library: "react-attr"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    }
  }
};
