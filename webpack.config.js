const webpack = require('webpack');
const path = require('path');

const common = {
  context: __dirname + '/src/client',
};

const client = {
  entry: './app/productionView.js',
  output: {
    path: __dirname + '/public',
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
      test: /\.css$/,
      loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
    },
    ],
  },
};

const server = {
  entry: './app/index.jsx',
  target: 'node',
  output: {
    path: __dirname + '/public',
    filename: 'app-server.js',
    libraryTarget: 'commonjs-module'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
      test: /\.css$/,
      loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
    },
    ],
  },
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server)
];
