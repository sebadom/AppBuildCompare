var EventEmitter = require('events').EventEmitter;
var util = require('util');

var istanbul = require('istanbul'),
    Instrumenter = istanbul.Instrumenter,
    instrumenter = new Instrumenter(),
    instrumentedCode = instrumenter.instrumentSync('function meaningOfLife() { return 42; }', 'filename.js');

var Cover = require('istanbul/lib/command/cover');
var Mocha = require('mocha');
var glob = require("glob");


function test() {
  var emmiter = new EventEmitter();
  var cover = new Cover();

  function mocha() {
    var runner;
    var mocha = new Mocha({
      ui: 'tdd',
      reporter: 'spec'
    });
    mocha.files = glob.sync("./test/**/*.js", { ignore: './test/coverage/**'})
    runner = mocha.run();

    runner.on('end', function() {
      console.log('end')
      if (this.stats.failures) {
        console.log('failure')
        emmiter.emit('failed', 'There are ' + this.stats.failures +' failing');
      }
      console.log('success')
    });
  }

  function coverage() {
    console.log(cover.run.toString())
    cover.run(mocha);
  }

  function run() {
    coverage();
  }

  function broadcast(success) {
    if (success) {

    } else {
      emmiter.emit.apply(emmiter, 'failed', [].slice.call(arguments, 1));
    }
  }
  return  {
    run: run,
    on: emmiter.on.bind(emmiter)
  };

  //console.log((new istanbulCover()).usage());
}

module.exports = test();
