module.exports = {
  test: /\.(jsx?)$/,
  exclude: /(node_modules)/,
  use: [
    'babel-loader',
    {
      loader: 'eslint-loader',
      options: {
        quiet: true,
        fix: true,
      },
    },
  ]
};
