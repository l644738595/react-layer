const merge = require('lodash/merge');
const path = require('path');
const webpack = require('webpack');

module.exports = function (baseConfig) {
  return merge({}, baseConfig, {
    cache: true,

    //debug: true,

    watch: true,

    devtool: 'eval-source-map',

    entry: {
      main: [
        'webpack/hot/only-dev-server',
        'webpack-dev-server/client?http://localhost:8000',
        path.normalize(__dirname + '/../demo')
      ]
    },

    devServer: {
      host: '0.0.0.0',
      port: 8000,
      hot: true,
      inline: true
    },

    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: require('./helpers/postcss'),
        },
      }),
      require('./helpers/plugins/html'),
      require('./helpers/plugins/hot'),
    ]
  });
};
