'use strict';

const utils = require('./utils');
const config = require('../config');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, '../'), // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  // is resolved relative to this directory
  entry: { // string | object | array
    main: ['./src/js/main']
  },

  // Here the application starts executing
  // and webpack starts bundling
  output: {
    // options related to how webpack emits results
    path: config.folders.dist, // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)

    filename: '[name].js', // string
    // the filename template for entry chunks

    publicPath: config.devBuild
      ? config.dev.assetsPublicPath
      : config.build.assetsPublicPath
    // the url to the output directory resolved relative to the HTML page
  },

  // list of additional plugins
  resolve: {
    extensions: [' ', '.js', '.es6']
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('media/[name].[hash:7].[ext]')
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }]
  }
};
