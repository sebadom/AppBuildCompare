'use strict';

var noop = require('./helpers/utils').noop;
var nice = require('./helpers/utils').nice;
var ModA = require('./moduleA/index');

function app() {
  var mod = new ModA();

  return {
    modGreet: function () {
      return mod.greet();
    },
    noop: noop() + ' from index',
    nice: nice() + ' from index'
  };
}

module.exports = app;
