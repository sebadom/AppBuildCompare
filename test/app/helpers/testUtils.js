var assert = require('chai').assert;
var loader = require('../../loader');

var helpers = loader.load('app/helpers/utils.js');

suite('Helpers', function() {
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