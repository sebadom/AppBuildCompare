var assert = require('chai').assert;
var loader = require('../loader');

var App = loader.load('app/index');
var app = new App();

suite('App', function () {
  suite('Initialize', function () {
    test('is a function', function (){
      assert.isFunction(App);
    });

    test('returns an object with noop and nice', function () {
      var api = ['noop', 'nice'];

      assert.isObject(app);
      assert.equal(Object.getOwnPropertyNames(app).length, api.length);
      assert.property(app, api[0]);
      assert.property(app, api[1]);
    });
  });

  suite('#noop()', function () {
    test('returns a proxy from utils noop', function () {
      assert.equal(app.noop, 'nooped from index');
    });
  });

  suite('#nice()', function () {
    test('returns a proxy from utils nice', function () {
      assert.equal(app.nice, 'false from index');
    });
  });
});