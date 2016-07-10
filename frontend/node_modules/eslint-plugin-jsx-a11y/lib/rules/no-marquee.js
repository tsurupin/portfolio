'use strict';

var _jsxAstUtils = require('jsx-ast-utils');

var errorMessage = 'Do not use <marquee> elements as they create accessibility issues and are deprecated.'; /**
                                                                                                             * @fileoverview Enforce <marquee> elements are not used.
                                                                                                             * @author Ethan Cohen
                                                                                                             */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

module.exports = function (context) {
  return {
    JSXOpeningElement: function JSXOpeningElement(node) {
      var isMarquee = (0, _jsxAstUtils.elementType)(node) === 'marquee';

      if (isMarquee) {
        context.report({
          node: node,
          message: errorMessage
        });
      }
    }
  };
};

module.exports.schema = [{ type: 'object' }];