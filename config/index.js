const path = require('path');

module.exports = {
  devBuild : (process.env.NODE_ENV !== 'production'),

  folders : {
    /* eslint key-spacing: "off" */
    root  : path.resolve(__dirname, '../'),
    src   : path.resolve(__dirname, '../src'),
    dist  : path.resolve(__dirname, '../dist'),
    test  : path.resolve(__dirname, '../test'),
    assets  : path.resolve(__dirname, '../src/static'),
    devScripts : path.resolve(__dirname, 'devScripts'),
  },

  dev: {
    // Paths
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    // https://webpack.js.org/configuration/devtool/#production
    devtool: 'eval-source-map',

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },
  build: {
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    // Paths
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    /**
     * Source Maps
     */
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',
  },
};
