var Rule = require('../rule').Rule;

var readable = {
  htmlLang: new Rule({
    name:    'All pages should have lang attr in html tag',

    message: 'Please add the lang attribute to the html tag',

    ruleUrl: 'http://oaa-accessibility.org/rule/34/',

    callback: function(dom, reporter) {
      'use strict';

      var that = this;

      if (!dom.$('html').attr('lang')) {
        reporter.error(that.message, 0, that.name);

        throw dom.$('html').parent().html();
      }
    }
  })
};

module.exports = readable;