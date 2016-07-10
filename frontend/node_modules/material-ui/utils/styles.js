'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeStyles = undefined;
exports.prepareStyles = prepareStyles;

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasWarned = void 0;
var warn = function warn() {
  process.env.NODE_ENV !== "production" ? (0, _warning2.default)(hasWarned, 'The \'material-ui/lib/utils/styles.js\' utility module has been deprecated.\n    It will be removed with v0.16.0.') : void 0;
  hasWarned = true;
};

var mergeStyles = exports.mergeStyles = function mergeStyles() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  warn();
  return _simpleAssign2.default.apply(undefined, [{}].concat(args));
};

function prepareStyles(muiTheme) {
  warn();

  for (var _len2 = arguments.length, styles = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    styles[_key2 - 1] = arguments[_key2];
  }

  return muiTheme.prepareStyles.apply(muiTheme, styles);
}

exports.default = {
  mergeStyles: mergeStyles,
  prepareStyles: prepareStyles
};