'use strict';

process.env.NODE_ENV = 'production';

const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');

const config = require('../config');
const webpackConfig = require('./webpack.config.prod');


rm(
  path.join(config.build.assetsRoot, config.build.assetsSubDirectory),
  function(err) {
    if (err) throw err;

    // run the webpack
    webpack(webpackConfig, function(err, stats) {
      if (err) throw err;
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n');

      if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'));
        process.exit(1);
      }

      console.log(chalk.green('  Build complete.\n'));
      console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      ));
    });
});
