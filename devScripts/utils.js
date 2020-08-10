'use strict';

const path = require('path');
const config = require('../config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.cssLoaders = function(options) {
  options = options || {};

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };

  // generate loader string to be used with extract text plugin
  /* eslint require-jsdoc:off */
  /* eslint guard-for-in:off */
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS
    ? [cssLoader, postcssLoader]
    : [cssLoader];

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      });
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'style-loader'
      });
    } else {
      return ['style-loader'].concat(loaders);
    }
  };

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    sass: generateLoaders('sass', {indentedSyntax: true}),
    scss: generateLoaders('sass')
  };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  const output = [];
  const loaders = exports.cssLoaders(options);
  /* eslint guard-for-in:off */
  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    });
  }
  return output;
};

exports.assetsPath = function(_path) {
  const assetsSubDirectory = config.devBuild
    ? config.dev.assetsSubDirectory
    : config.build.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};
