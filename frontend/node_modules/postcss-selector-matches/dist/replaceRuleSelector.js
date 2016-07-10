"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = replaceRuleSelector;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _postcssLibList = require("postcss/lib/list");

var _postcssLibList2 = _interopRequireDefault(_postcssLibList);

var _balancedMatch = require("balanced-match");

var _balancedMatch2 = _interopRequireDefault(_balancedMatch);

var pseudoClass = ":matches";

function explodeSelector(selector, options) {
  if (selector && selector.indexOf(pseudoClass) > -1) {
    var _ret = (function () {
      var newSelectors = [];
      var preWhitespaceMatches = selector.match(/^\s+/);
      var preWhitespace = preWhitespaceMatches ? preWhitespaceMatches[0] : "";
      var selectorPart = _postcssLibList2["default"].comma(selector);
      selectorPart.forEach(function (part) {
        var position = part.indexOf(pseudoClass);
        var pre = part.slice(0, position);
        var body = part.slice(position);
        var matches = (0, _balancedMatch2["default"])("(", ")", body);

        var bodySelectors = matches && matches.body ? _postcssLibList2["default"].comma(matches.body).reduce(function (acc, s) {
          return [].concat(_toConsumableArray(acc), _toConsumableArray(explodeSelector(s, options)));
        }, []) : [body];

        var postSelectors = matches && matches.post ? explodeSelector(matches.post, options) : [];

        var newParts = undefined;
        if (postSelectors.length === 0) {
          newParts = bodySelectors.map(function (s) {
            return preWhitespace + pre + s;
          });
        } else {
          newParts = [];
          postSelectors.forEach(function (postS) {
            bodySelectors.forEach(function (s) {
              newParts.push(preWhitespace + pre + s + postS);
            });
          });
        }
        newSelectors = [].concat(_toConsumableArray(newSelectors), _toConsumableArray(newParts));
      });

      return {
        v: newSelectors
      };
    })();

    if (typeof _ret === "object") return _ret.v;
  }
  return [selector];
}

function replaceRuleSelector(rule, options) {
  var indentation = rule.raws && rule.raws.before ? rule.raws.before.split("\n").pop() : "";
  return explodeSelector(rule.selector, options).join("," + (options.lineBreak ? "\n" + indentation : " "));
}

module.exports = exports["default"];