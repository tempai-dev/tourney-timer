const path = require('path');

let HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [
    // './src/index.html',
    './src/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
        test: /sounds\/.*\.flac$/,
        use: [ 'file-loader' ]
      },
      {
        test: /\.css$/,
        use: [ 'css-loader' ]
      },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      hash: true,
      filename: './index.html',
      template: './src/index.html',
      title: 'A timer',
    })
  ]
};
