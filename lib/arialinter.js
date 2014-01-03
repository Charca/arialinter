/*
 * arialinter
 * https://github.com/globant-ui/arialinter
 *
 * Copyright (c) 2013 Globait UI Developers
 * Licensed under the MIT license.
 */

var jsdom = require('jsdom');
var RuleFactory = require('./rulefactory');
var Reporter = require('./reporter');
var _ = require('lodash');


var AriaLinter = function() {};

AriaLinter.prototype = (function() {
  'use strict';

  return {
    // uri can also be a string containing html
    initialize: function(uri, callback) {
      var that   = this;
      this.dom   = null;
      this.Reporter = Reporter;
      this.formatters = {};

      // Add rules
      this.initRules();

      // Add formatters
      this.addFormatter(require('./formatters/text'));
      this.addFormatter(require('./formatters/json'));

      jsdom.env(uri, ['http://code.jquery.com/jquery.js'], function (err, window) {
        if (!err) {
          that.dom = window;
          callback();
        } else {
          console.log('Error on jsdom.env: ' + err);
          throw 'Error: ' + uri + ' cant be accessed.';
        }
      });
    },

    initRules: function() {
      this.rules = [];

      var getRulesFromGuideline = function(rules) {
        var r = [];

        for (var key in rules) {
          if (rules.hasOwnProperty(key)) {
            r.push(rules[key]);
          }
        }

        return r;
      };

      this.rules.push.apply(this.rules, getRulesFromGuideline(RuleFactory.makeRule('adaptable')));
      this.rules.push.apply(this.rules, getRulesFromGuideline(RuleFactory.makeRule('distinguishable')));
      this.rules.push.apply(this.rules, getRulesFromGuideline(RuleFactory.makeRule('headingsAndLabels')));
      this.rules.push.apply(this.rules, getRulesFromGuideline(RuleFactory.makeRule('inputAssistance')));
      this.rules.push.apply(this.rules, getRulesFromGuideline(RuleFactory.makeRule('linkPurpose')));
      this.rules.push.apply(this.rules, getRulesFromGuideline(RuleFactory.makeRule('navigable')));
      this.rules.push.apply(this.rules, getRulesFromGuideline(RuleFactory.makeRule('pageTitled')));
      this.rules.push.apply(this.rules, getRulesFromGuideline(RuleFactory.makeRule('readable')));
      this.rules.push.apply(this.rules, getRulesFromGuideline(RuleFactory.makeRule('textAlternatives')));

      this.rules.push(RuleFactory.makeRule('belement'));
      this.rules.push(RuleFactory.makeRule('blinkelement'));
      this.rules.push(RuleFactory.makeRule('marqueeelement'));
      this.rules.push(RuleFactory.makeRule('fontelement'));
      this.rules.push(RuleFactory.makeRule('ielement'));
      this.rules.push(RuleFactory.makeRule('uelement'));
    },

    getRules: function() {
      var len = this.rules.length;
      var r = [];

      for (var x = 0; x < len; x++) {
        r.push(this.rules[x].name + '. Level: ' + this.rules[x].level + '. Template: ' + this.rules[x].template);
      }

      return r;
    },

    addFormatter: function(formatter) {
      this.formatters[formatter.id] = formatter;
    },

    getFormatter: function(formatId) {
      return this.formatters[formatId];
    },

    format: function(results, filename, formatId, options) {
      var formatter = this.getFormatter(formatId),
        result = null;

      if (formatter){
        result = formatter.startFormat();
        result += formatter.formatResults(results, filename, options || {});
        result += formatter.endFormat();
      }

      return result;
    },

    getDom: function() {
      return this.dom;
    },

    getReport: function(format, filename) {
      return this.format(this.Reporter.getMessages(), filename, format);
    },

    getErrorsFound: function(format) {
      return this.Reporter.getMessages().length;
    },

    evaluate: function(options) {
      this.Reporter.initialize();

      var rulesToApply = _.where(this.rules, options);

      for (var i = 0; i < rulesToApply.length; i++) {
        rulesToApply[i].applyRule(this.getDom(), this.Reporter);
      }

      return !this.Reporter.hasMessages();
    }
  };
})();


exports.AriaLinter = AriaLinter;
