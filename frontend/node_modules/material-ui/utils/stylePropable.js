'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeStyles = undefined;

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasWarned = void 0;
var warn = function warn() {
  process.env.NODE_ENV !== "production" ? (0, _warning2.default)(hasWarned, 'The \'material-ui/lib/mixins/style-propable.js\' mixin has been deprecated.\n    It will be removed with v0.16.0.') : void 0;
  hasWarned = true;
};

var mergeStyles = exports.mergeStyles = function mergeStyles() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  warn();
  return _simpleAssign2.default.apply(undefined, [{}].concat(args));
};

exports.default = {

  propTypes: {
    style: _react.PropTypes.object
  },

  mergeStyles: mergeStyles,

  prepareStyles: function prepareStyles() {
    warn();

    var _ref = this.state && this.state.muiTheme || this.context && this.context.muiTheme || this.props && this.props.muiTheme || {};

    var _ref$prepareStyles = _ref.prepareStyles;
    var prepareStyles = _ref$prepareStyles === undefined ? function (style) {
      return style;
    } : _ref$prepareStyles;


    return prepareStyles(mergeStyles.apply(undefined, arguments));
  },
  componentWillMount: function componentWillMount() {
    warn();
  }
};