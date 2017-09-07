const ExtractTextPlugin = require("extract-text-webpack-plugin");
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'production') {
  return module.exports = {
    test: /\.(scss|sass)$/,
    loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'sass'])
  }
}

module.exports = {
  test: /\.(scss|sass)$/,
  loaders: ['style', 'css', 'postcss', 'sass']
};
