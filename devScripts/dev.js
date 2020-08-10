'use strict';

process.env.NODE_ENV = 'development';


const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../config');
const fileWatcher = require('./fileWatcher');
const webpackConfig = require('./webpack.config.dev.js');

/**
 * Create an express Server instance
 * @return {object} Object
 */
function createServer() {
  // Step 1: create the express instance
  const app = express();


  // Step 2: Create & Configure the webpack compiler
  const webpackCompiller = webpack(webpackConfig, function(err, stats) {
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
  });
  // Webpack hot reloading middleware attached to express server
  // documentation : https://github.com/glenjamin/webpack-hot-middleware
  const hotMiddleware = webpackHotMiddleware(webpackCompiller);

  // webpackDevMiddleware serves the files emitted from webpack
  // documentation : https://github.com/webpack/webpack-dev-middleware
  const devMiddleWare = webpackDevMiddleware(webpackCompiller, {
      // publicPath is required, whereas all other options are optional
      publicPath: webpackConfig.output.publicPath,
      // public path to bind the middleware to
      // use the same as in webpack
      stats: {
        colors: true,
      },
      // options for formating the statistics
   });

  // Step 3: Attach the webpack middlewares to the express server instance
  app.use(devMiddleWare);
  app.use(hotMiddleware);
  app.use(express.static(config.folders.dist));

  /**
   * start the server and listen on port 3000
   */
  function startServer() {
    app.listen(3000, function(err) {
      if (err) {
        console.error(chalk.red(err));
        return;
      }
      // log server running
      console.log(chalk.green('  Listening on http://localhost:3000.\n'));
    });
  }// end function start server

  /**
   * publish a custom event from the hot-middleware
   * for other clients subscribed to it to triggger
   * a manual reload
   */
  function reloadClient() {
    hotMiddleware.publish({action: 'reload'});
  }// end function RelaodClient

  return {
    start: startServer,
    reloadClient: reloadClient,
  };
}


const server = createServer();

// Activate the costum fileWatcher
fileWatcher.activate(server);
// start the server
server.start();
