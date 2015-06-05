var EventEmitter = require('events').EventEmitter;
var util = require('util');

function lint() {
  var linter = require("eslint").CLIEngine,
      cli = new linter({
        envs: ["browser", "node", "mocha" ],
        rules: {
          "brace-style": "1tbs",
          "quotes": "single"
        }
      }),

      report,
      formatter,
      emmiter = new EventEmitter();

  function run() {
    report = cli.executeOnFiles(['./app']);
    formatter = cli.getFormatter();
    if (report.errorCount > 0) {
      emmiter.emit('failed', 'Lint has found '+ report.errorCount +' errors', formatter(report.results))
    } else {
      emmiter.emit('ok', 'No Lint errors were found')
    }
  }

  return  {
    run: run,
    on: emmiter.on.bind(emmiter)
  };
}

module.exports = lint();

