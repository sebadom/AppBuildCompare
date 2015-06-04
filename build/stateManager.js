var chalk = require('chalk');

var print = function (str, withSep) {
  var st  = '  ' + str + '  ',
      sep = new Array(70).join('-');

  console.log(st);
  if (withSep) console.log(sep);
}


exports.fail = function (summary, error) {
  if (error) print(error);
  print(chalk.white.bgRed.bold(summary), true);
  process.exit(5);
  
}

exports.ok = function (summary) {
  print(chalk.white.bgGreen.bold(summary));
  process.exit();
}
