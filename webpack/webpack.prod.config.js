const merge = require('lodash/merge');
const path = require('path');
const webpack = require('webpack');

module.exports = function (baseConfig) {
  return merge({}, baseConfig, {
    output: merge({}, baseConfig.output, {
      libraryTarget: 'umd',
      umdNamedDefine: true
    }),
    externals: {
      'react': true,
    },
    entry: {
      main: [
        path.normalize(__dirname + '/../src')
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    ]
      //.concat(require('./helpers/plugins/dedupe'))
      .concat(require('./helpers/plugins/css'))
      .concat(require('./helpers/plugins/uglify'))
  });
};
