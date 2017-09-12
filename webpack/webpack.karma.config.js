const extend = require('lodash/extend');
const path = require('path');

module.exports = function (baseConfig) {
  return extend({}, baseConfig, {
    cache: undefined,

    //debug: undefined,

    watch: undefined,

    devtool: 'inline-source-map',

    entry: {},

    resolve: {
      modules: [
        'node_modules',
        'src',
      ],
    },

    output: {},

    externals: {
      'cheerio': 'window',
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    },

    module: {
      loaders: []
        .concat(baseConfig.module.loaders)
        .concat(require('./helpers/loaders/json'))
    },

    plugins: []
      .concat(baseConfig.plugins)
      .concat(require('./helpers/plugins/noErrors'))
  });
};
