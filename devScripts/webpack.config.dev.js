'use strict';

/* eslint no-multi-spaces: "off" */
/* eslint max-len: "off" */
const webpack           = require('webpack');
const config            = require('../config');
const merge             = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils             = require('./utils');


module.exports = merge(baseWebpackConfig, {
  entry: { // string | object | array
    main: ['./devScripts/hotMiddleware.js']
  },
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: false})
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: config.folders.src + '/index.html',
      inject: true
    }),
  ]
});
