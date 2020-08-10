'use strict';
const path = require('path');
const Sassaby = require('sassaby');
const root = path.dirname(path.dirname(__dirname));
const config = require('../../config');


describe('_em.scss', function() {
  // give the file path to sassaby constructor
	let sassaby = new Sassaby(config.folders.src+'/scss/00-utils/functions/_em.scss');

  // tests
	describe('em function', function() {

		it('should convert pixels to em', function() {
			sassaby.func('em').calledWithArgs('32px','16px').equals('2em');
			sassaby.func('em').calledWithArgs('16px','10px').doesNotEqual('1em');
			sassaby.func('em').calledWithArgs('16em').equals('16em');
		});

	});
});

describe('_rem.scss', function() {

	let sassaby = new Sassaby(config.folders.src+'/scss/00-utils/functions/_rem.scss');

	describe('rem function', function() {

		it('should convert pixels to rem', function() {
			sassaby.func('rem').calledWithArgs('32px','16px').equals('2rem');
			sassaby.func('rem').calledWithArgs('16px','10px').doesNotEqual('1rem');
			sassaby.func('rem').calledWithArgs('16rem').equals('16rem');
		});

	});
});

describe('_strip-unit.scss', function() {

	let sassaby = new Sassaby(config.folders.src+'/scss/00-utils/functions/_strip-unit.scss');

	describe('strip-unit function', function() {

		it('should remove unites from any number', function() {
			sassaby.func('strip-unit').calledWithArgs('32px').equals('32');
			sassaby.func('strip-unit').calledWithArgs('32em').doesNotEqual('32em');
		});

	});
});


describe('_get-breakpoint.scss', function() {

  var sassaby = new Sassaby(config.folders.src+'/scss/00-utils/functions/_get-breakpoint.scss',{
    dependencies: [
      config.folders.src+'/scss/01-settings/_global.scss'
    ]
  });


	describe('_get-breakpoint function', function() {

		it('should get breakpoints from the $mq-breakpoints map', function() {
			sassaby.func('get-breakpoint').calledWithArgs('xsmall').equals('320');
			sassaby.func('get-breakpoint').calledWithArgs('small').equals('768');
			sassaby.func('get-breakpoint').calledWithArgs('medium').equals('992');
			sassaby.func('get-breakpoint').calledWithArgs('large').equals('1200');
			sassaby.func('get-breakpoint').calledWithArgs('xlarge').equals('1920');
		});

	});
});

describe('_map-deep-get.scss', function() {

  var sassaby = new Sassaby(config.folders.src+'/scss/00-utils/functions/_map-deep-get.scss',{
    dependencies: [
      config.folders.src+'/scss/01-settings/_global.scss'
    ]
  });

	describe('_map-deep-get function', function() {

		it('should get any value from multie-level map', function() {
			sassaby.func('map-deep-get').calledWithArgs('$font-config','size','h6').equals('1rem');
			sassaby.func('map-deep-get').calledWithArgs('$font-config','family','serif').equals('Georgia,Cambria,"Times New Roman",Times,serif');
		});

	});
});

