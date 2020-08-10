'use strict';

const path = require('path');
const Sassaby = require('sassaby');
const config = require('../../config');

describe('main.scss', function() {

  var sassaby = new Sassaby(config.folders.src+'/scss/main.scss');

	describe('main.scss imports', function() {

	  it('should import functions', function() {
	    sassaby.imports('00-utils/functions');
    });

	  it('should import mixins', function() {
	    sassaby.imports('00-utils/mixins');
    });

    it('should import settings', function() {
	    sassaby.imports('01-settings/global');
    });

	});

});
