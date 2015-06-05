var lint = require('./lint');
var style = require('./style');
var test = require('./test');
var stateManager = require('./stateManager');

stateManager.addJob('Linting code', lint);
stateManager.addJob('Check style code', style);
stateManager.addJob('Test', test);

stateManager.start();

/*
stateManager.info('Linting code');
lint();
stateManager.info('Check style code');
style();
*/