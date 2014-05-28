(function() {
  'use strict';

  var Rule = require('../rule');

  /**
   * Given an element, generates a function that checks that that element is not in the dom.
   */
  var createGenericCallback = function(element) {
    return function(dom, reporter) {
      console.log('Elements failing: ' + dom.$(element).length);
      var elements = dom.$('*');
      for (var i = 0; i < elements.length; i++) {
        console.log('Element failing: ' + dom.$('*')[i]);
      };
      dom.$(element).each(function(index, item){
        throw {
          reportType: 'error',
          el: dom.$(item).parent().html()
        };
      });
    };
  };

  /**
   * Creates an options json that stores the options for a generic rule.
   */
  var createElementRule = function(options) {
    return {
      element: options.element,
      name:    'Do not use ' + options.element + ' element',
      message: 'Please remove the ' + options.element + ' element',
      ruleUrl:  options.ruleUrl,
      level:    options.level,
      template: true,
      callback: createGenericCallback(options.element)
    };
  };


  module.exports = {
    doNotUseElementU: new Rule(createElementRule({
      element: 'u',
      ruleUrl: 'http://oaa-accessibility.org/rule/71/',
      level: 'AA'
    })),

    doNotUseElementI: new Rule(createElementRule({
      element: 'i',
      ruleUrl: 'http://oaa-accessibility.org/rule/70/',
      level: 'AA'
    })),

    doNotUseElementFont: new Rule(createElementRule({
      element: 'font',
      ruleUrl: 'http://oaa-accessibility.org/rule/67/',
      level: 'AA'
    })),


    doNotUseElementBlink: new Rule(createElementRule({
      element: 'blink',
      ruleUrl: 'http://oaa-accessibility.org/rule/68/',
      level: 'AA'
    })),

    doNotUseElementMarquee: new Rule(createElementRule({
      element: 'marquee',
      ruleUrl: 'http://oaa-accessibility.org/rule/68/',
      level: 'A'
    })),

    doNotUseElementB: new Rule(createElementRule({
      element: 'b',
      ruleUrl: 'http://oaa-accessibility.org/rule/69/',
      level: 'AA'
    }))
  };

}());