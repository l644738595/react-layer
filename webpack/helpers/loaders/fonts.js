module.exports = [
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          name: 'font.[hash].[ext]',
          limit: '10000',
          mimetype: 'application/font-woff',
        },
      },
    ],
  },
  {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'font.[hash].[ext]',
        },
      },
    ],
  },
];
