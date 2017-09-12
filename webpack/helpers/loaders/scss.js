const ExtractTextPlugin = require("extract-text-webpack-plugin");
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'production') {
  return module.exports = {
    test: /\.(scss|sass)$/,
    use: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      use: [
        'css-loader',
        'postcss-loader',
        'sass-loader',
      ],
    }),
  };
}

module.exports = {
  test: /\.(scss|sass)$/,
  use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
};
