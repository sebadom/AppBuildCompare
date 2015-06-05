var JSCS = require('jscs');
var vow = require('vow');
var stateManager = require('./stateManager');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

function Style() {
  var styler = new JSCS(),
      emmiter = new EventEmitter();

  function report(errorsCollection) {
    var errorCount = 0;
    var errorStr = '';
    /**
     * Formatting every error set.
     */
    errorsCollection.forEach(function(errors) {
        if (!errors.isEmpty()) {
            /**
             * Formatting every single error.
             */
            errors.getErrorList().forEach(function(error) {
                errorCount++;
                errorStr += errors.explainError(error, true) + '\n';
            });
        }
    });

    if (errorCount > 0) {
      emmiter.emit('failed', errorCount + ' code style ' + (errorCount === 1 ? 'error' : 'errors') + ' found.', errorStr);
    } else {
      emmiter.emit('ok', 'No code style errors found');
    }
  }

  styler.registerDefaultRules();
  styler.configure({
    "requireCurlyBraces": [
      "if",
      "else",
      "for",
      "while",
      "do",
      "try",
      "catch"
    ],
    "requireOperatorBeforeLineBreak": true,
    "requireCamelCaseOrUpperCaseIdentifiers": true,
    "maximumLineLength": {
      "value": 80,
      "allowComments": true,
      "allowRegex": true
    },
    "validateIndentation": 2,
    "validateQuoteMarks": "'",

    "disallowMultipleLineStrings": true,
    "disallowMixedSpacesAndTabs": true,
    "disallowTrailingWhitespace": true,
    "disallowSpaceAfterPrefixUnaryOperators": true,
    "disallowMultipleVarDecl": true,
    "disallowKeywordsOnNewLine": ["else"],

    "requireSpaceAfterKeywords": [
      "if",
      "else",
      "for",
      "while",
      "do",
      "switch",
      "return",
      "try",
      "catch"
    ],
    "requireSpaceBeforeBinaryOperators": [
      "=", "+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=",
      "&=", "|=", "^=", "+=",

      "+", "-", "*", "/", "%", "<<", ">>", ">>>", "&",
      "|", "^", "&&", "||", "===", "==", ">=",
      "<=", "<", ">", "!=", "!=="
    ],
    "requireSpaceAfterBinaryOperators": true,
    "requireSpacesInConditionalExpression": true,
    "requireSpaceBeforeBlockStatements": true,
    "requireSpacesInForStatement": true,
    "requireLineFeedAtFileEnd": true,

    "disallowSpacesInsideObjectBrackets": "all",
    "disallowSpacesInsideArrayBrackets": "all",
    "disallowSpacesInsideParentheses": true,

    "disallowMultipleLineBreaks": true,
    "disallowNewlineBeforeBlockStatements": true,
    "disallowKeywords": ["with"],

    "disallowSpacesInCallExpression": true,
    "disallowSpaceAfterObjectKeys": true,
    "requireSpaceBeforeObjectValues": true,
    "requireCapitalizedConstructors": true,
    "requireDotNotation": true,
    "validateParameterSeparator": ", ",

    "disallowSpacesInNamedFunctionExpression": {
      "beforeOpeningRoundBrace": true
    },

    "requireSpacesInAnonymousFunctionExpression": {
      "beforeOpeningRoundBrace": true,
      "beforeOpeningCurlyBrace": true
    }
  });

  function run() {
    vow.resolve(styler.checkPath( './app' )).then(function (result) {
      report(result);
    });
  }

  return {
    run: run,
    on: emmiter.on.bind(emmiter)
  };
}

module.exports = Style();
