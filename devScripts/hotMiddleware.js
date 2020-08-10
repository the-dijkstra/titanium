// client.js
(function() {
    'use strict';
    /* eslint max-len: "off" */
    const webpackHotMiddlewareClient = require('webpack-hot-middleware/client?reload=true');

    webpackHotMiddlewareClient.subscribe(function(payload) {
        if (payload.action === 'reload' || payload.reload === true) {
            window.location.reload();
        }
    });

    module.exports = webpackHotMiddlewareClient;
}());
