const webpack = require('webpack');
const path = require('path');

module.exports = {
  cache: false,

  debug: false,

  watch: false,

  devtool: null,

  target: 'web',

  resolve: {
    root: path.normalize(__dirname + '/../src'),
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.css', '.scss', '.saas'],
    modulesDirectories: ['node_modules', 'src']
  },

  entry: {},

  output: {
    path: path.normalize(__dirname + '/../lib'),
    publicPath: '',
    filename: 'index.js',
    library: '[name]',
    chunkFilename: '[name].[chunkhash].js'
  },

  plugins: [
    require('./helpers/plugins/vars'),
    require('./helpers/plugins/moment')
  ],

  module: {
    loaders: [
      require('./helpers/loaders/css'),
      require('./helpers/loaders/scss'),
      require('./helpers/loaders/babel')
      // require('./helpers/loaders/images'),
    ].concat(require('./helpers/loaders/fonts'))
  },

  postcss: require('./helpers/postcss')
};