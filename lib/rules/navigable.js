var Rule = require('../rule').Rule;

var navigable = {
  frameTitleAttr: new Rule({
    name:    'Frame must have title attr',

    message: 'Please add title attribute to this frame',

    ruleurl: 'http://oaa-accessibility.org/rule/10/',

    level: 'A',

    template: true,

    callback: function(dom, reporter) {
      'use strict';

      var that = this;
      var el;

      dom.$('frame').each(function(index, item) {
        if (!dom.$(this).attr('title')) {
          el = dom.$(item).parent().html();
          reporter.error(that.message, el, that.name);

          throw el;
        }
      });

      dom.$('iframe').each(function(index, item) {
        if (!dom.$(this).attr('title')) {
          el = dom.$(item).parent().html();
          reporter.error(that.message, el, that.name);

          throw el;
        }
      });
    }
  }),

  frameUniqueTitle: new Rule({
    name:    'Title attributes for frames must be unique',

    message: 'The title attribute must be unique for all the frames',

    ruleurl: 'http://oaa-accessibility.org/rule/11/',

    level: 'A',

    template: true,

    callback: function(dom, reporter) {
      'use strict';

      var that = this;

      var verifyTitleAttr = function(element, dom, reporter, that) {
        var s = [];
        var el;

        dom.$(element).each(function(index, item) {
          var e = dom.$(this).attr('title');

          if (s.indexOf(e) > -1) {
            s.push(e);
          } else {
            el = dom.$(item).parent().html();
            reporter.error(that.message, el, that.name);

            throw el;
          }
        });
      };

      verifyTitleAttr('frame', dom, reporter, that);
      verifyTitleAttr('iframe', dom, reporter, that);
    }
  }),

  framesNotHiddenOrEmpty: new Rule({
    name:    'Frames should not be hidden or empty',

    message: 'Frame must always be visible and contain something',

    ruleUrl: 'http://oaa-accessibility.org/rule/12/',

    level: 'AA',

    template: true,

    callback: function(dom, reporter) {
      'use strict';

      var that = this;
      var el;

      var frameNotHidden = function(element, dom, reporter, that) {
        dom.$(element).each(function() {
          var e = dom.$(this).css('display');
          if (e === 'none') {
            el = dom.$(this).parent().html();
            reporter.error(that.message, el, that.name);
            throw el;
          }
        });
      };

      frameNotHidden('frame', dom, reporter, that);
      frameNotHidden('iframe', dom, reporter, that);
    }
  })
};

module.exports = navigable;