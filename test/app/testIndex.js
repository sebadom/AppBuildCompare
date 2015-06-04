var assert = require('chai').assert;
var loader = require('../loader');
var sinon = require('sinon');

var spies = {
  noop: sinon.spy(function () { return 'spied noop' }),
  nice: sinon.spy(function () { return 'spied nice' }),
  ModA: sinon.spy(function () { return { greet: spies.modAgreet} }),
  modAgreet: sinon.spy()
}
var stubs = {
  './helpers/utils': {
    noop: sinon.spy(spies.noop),
    nice: sinon.spy(spies.nice)
  },
  './moduleA/index': spies.ModA
};

var App = loader.load('app/index', stubs);

var app = new App();

suite('App', function () {
  suite('Initialize', function () {
    test('is a function', function (){
      assert.isFunction(App);
    });

    test('returns an object with noop and nice', function () {
      var api = ['noop', 'nice', 'modGreet'];

      assert.isObject(app);
      assert.equal(Object.getOwnPropertyNames(app).length, api.length);
      assert.property(app, api[0]);
      assert.property(app, api[1]);
    });

    test('inits a new ModuleA', function (){
      assert.isTrue(spies.ModA.calledOnce);
    });

  });

  suite('#noop()', function () {
    test('returns a proxy from utils noop', function () {
      assert.isTrue(stubs['./helpers/utils'].noop.calledOnce);
      assert.equal(app.noop, 'spied noop from index');
    });
  });

  suite('#nice()', function () {
    test('returns a proxy from utils nice', function () {
      assert.equal(app.nice, 'spied nice from index');
    });
  });

  suite('#modGreet()', function () {
    test('delegates the greeting on the module', function () {
      assert.isTrue(spies.modAgreet.notCalled);
      app.modGreet();
      assert.isTrue(spies.modAgreet.calledOnce);
    });
  });
});