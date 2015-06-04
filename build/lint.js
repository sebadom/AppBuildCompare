var stateManager = require('./stateManager');

function lint() {
  var linter = require("eslint").CLIEngine;
  var cli = new linter({
    envs: ["browser", "node", "mocha" ],
    rules: {
      "brace-style": "1tbs",
      "quotes": "single"
    }
  });

  var report = cli.executeOnFiles(['./app']);
  var formatter = cli.getFormatter();

  if (report.errorCount > 0) {
    stateManager.fail('EsLint has found '+ report.errorCount +' errors', formatter(report.results));
  } else {
    stateManager.ok('No EsLint errors were found');
  }
}

module.exports = lint;

