var chalk = require('chalk');
var free = true;

function pad(summary) {
  return '  ' + summary + '  ';
}

function getSeparator() {
  return new Array(70).join('-');
}

function lnBreak(amount) {
  amount = amount || 1;
  for (var i = 0; i < amount; i++) {
    console.log('\n');
  }
}

function print(str) {
  console.log(str);
}

function fail(summary, error) {
  if (error) print(error);
  print(chalk.white.bgRed.bold(pad(summary)));
  process.exit(5);
}

function ok(summary) {
  print(chalk.white.bgGreen.bold(pad(summary)));
  next();
}

exports.info = function (str) {
  console.log(chalk.black.bgWhite(pad(str)));
}

var jobs = [];

exports.addJob = function (title, handler) {

  jobs.push(function () {
    lnBreak();
    console.log(getSeparator());
    console.log(chalk.white.bold(title));
    console.log(getSeparator());

    handler.on('failed', fail);
    handler.on('ok', ok);
    handler.run();
  });
};

function next() {
  var job = jobs.shift();
  return job ? job() : null;
}

exports.start = next;
