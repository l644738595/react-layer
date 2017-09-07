const merge = require('lodash/merge');
const path = require('path');

module.exports = function (baseConfig) {
  return merge({}, baseConfig, {
    cache: true,

    debug: true,

    watch: true,

    devtool: 'eval-source-map',

    devServer: {
      host: '0.0.0.0',
      port: 8000,
      hot: true,
      progress: true,
      inline: true
    },

    entry: {
      main: [
        'webpack/hot/only-dev-server',
        'webpack-dev-server/client?http://localhost:8000',
        path.normalize(__dirname + '/../demo')
      ]
    },

    plugins: [require('./helpers/plugins/html'), require('./helpers/plugins/hot')]
  });
};