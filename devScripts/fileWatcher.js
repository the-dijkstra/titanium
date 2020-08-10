(function() {
  'use strict';
  /* eslint no-multi-spaces: "off" */
  const path     = require('path');
  const chalk    = require('chalk');
  const chokidar = require('chokidar');
  const config   = require('../config');

  /**
   * actovate the custom hot reloading
   * @param {server} server
   */
  function activate(server) {
    /**
     * Here, we use Chokidar to force page reloading for some other file types
     * like html changes or php if you want
     */
    const watcher = chokidar.watch([
        path.resolve(config.folders.src, 'index.html'),
    ]);

    watcher.on('ready', function() {
        console.log(chalk.green('Initial scan complete. Ready for changes'));
    });

    watcher.on('change', function(path) {
        console.log(chalk.green('File [' + path + '] changed !'));
        // reload the client
        server.reloadClient();
    });
  }
  module.exports = {
    activate: activate,
  };
}());

