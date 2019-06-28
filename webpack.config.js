/* eslint-disable */
// TODO: Remove previous line and work through linting issues at next edit

const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const commonJSConfig = {
  entry: ['./index.js'],
  module: {
    rules: [
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ],
  },
  target: 'web'
};

const rawConfig = Object.assign({}, commonJSConfig, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'orecore-lib.js',
    library: 'orecore-lib',
    libraryTarget: 'umd',
  }
});
const uglifiedConfig = Object.assign({}, commonJSConfig, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'orecore-lib.min.js',
    library: 'orecore-lib',
    libraryTarget: 'umd',
  },
  plugins: [
    new UglifyJsPlugin()
  ]
});

module.exports = [rawConfig, uglifiedConfig];
