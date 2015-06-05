var assert = require('chai').assert;
var loader = require('../../loader');

var Module = loader.load('app/moduleA/index');
var mod = new Module();

suite('Module A', function () {
  suite('Initialize', function () {
    test('is a function', function (){
      assert.isFunction(Module);
    });

    test('returns an object', function () {
      assert.isObject(mod);
    });

    test('has greet expected api', function () {
      var api = ['greet'];

      assert.equal(Object.getOwnPropertyNames(mod).length, api.length);
      assert.property(mod, api[0]);
    });
  });

  suite('#greet()', function () {
    test('it greets me', function () {
      assert.equal(mod.greet(), 'Hiasd, my name is module A');
    });
  });
});