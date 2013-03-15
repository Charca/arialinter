'use strict';

var arialinter = require('../lib/arialinter.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['General Rules'] = {

  setUp: function(done) {
    done();
  },

  'HaveAltAttr': function(test) {
    var linter = new arialinter.ALinter();
    var uri = '<!doctype html><html lang="en"><head><title>test1</title></head><body><img src="http://dummyimage.com/600x400.gif/292929/e3e3e3" alt="dd" /><img src="http://dummyimage.com/600x400.gif/292929/e3e3e3" alt="asd" /></body> </html>';


    linter.initialize(uri, function(){
      test.ok(linter.evaluate(), 'All the images should have the alt attr');
      test.done();
    });
  },

  'DoesntHaveAltAttr': function(test) {
    var linter = new arialinter.ALinter();
    var uri = '<!doctype html><html lang="en"><head><title>test1</title></head><body> <blink>asdf</blink> </body> </html>';


    linter.initialize(uri, function(){
      test.equal(linter.evaluate(), false, 'Should fail because images doesnt have alt');
      test.done();
    });
  },

  'HaveIElement': function(test) {
    var linter = new arialinter.ALinter();
    var uri = '<!doctype html><html lang="en"><head><title>test1</title></head><body> <i>asdf</i> </body> </html>';


    linter.initialize(uri, function(){
      test.equal(linter.evaluate(), false, 'Should fail because it has i element');
      test.done();
    });
  },

  'DoesntHaveLangAttr': function(test) {
    var linter = new arialinter.ALinter();
    var uri = '<!doctype html><html><head><title>test1</title></head><body> <i>asdf</i> </body> </html>';


    linter.initialize(uri, function(){
      test.equal(linter.evaluate(), false, 'Should fail because html tag doesnt have lang attribute');
      test.done();
    });
  }

};






