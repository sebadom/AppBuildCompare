var assert = require('chai').assert;
//var helpers = require('../../app/helpers.js');
var loader = require('../loader');

var helpers = loader.load('app/helpers.js')
console.log(helpers);
suite('Helpers', function(){
  setup(function(){
    // ...
  });

  suite('#noop()', function(){
    test('it returns nooped', function(){
      assert.equal(helpers.noop(), 'nooped');
    });
  });

  suite('#nice()', function(){
    test('it returns false', function(){
      assert.equal(helpers.nice(), false);
    });
  });
});