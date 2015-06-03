'use strict';

var noop = require('./helpers/utils').noop;
var nice = require('./helpers/utils').nice;

function app() {

  return {
    noop: noop() + ' from index',
    nice: nice() + ' from index'
  };
}

module.exports = app;
