'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  /**
   * The css class name of the root element.
   */
  className: _react.PropTypes.string,
  /**
   * If true, the `Divider` will be indented `72px`.
   */
  inset: _react.PropTypes.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: _react.PropTypes.object
};

var defaultProps = {
  inset: false
};

var contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};

var Divider = function Divider(props, context) {
  var inset = props.inset;
  var style = props.style;

  var other = _objectWithoutProperties(props, ['inset', 'style']);

  var muiTheme = context.muiTheme;
  var prepareStyles = muiTheme.prepareStyles;


  var styles = {
    root: {
      margin: 0,
      marginTop: -1,
      marginLeft: inset ? 72 : 0,
      height: 1,
      border: 'none',
      backgroundColor: muiTheme.baseTheme.palette.borderColor
    }
  };

  return _react2.default.createElement('hr', _extends({}, other, { style: prepareStyles((0, _simpleAssign2.default)({}, styles.root, style)) }));
};

Divider.muiName = 'Divider';
Divider.propTypes = propTypes;
Divider.defaultProps = defaultProps;
Divider.contextTypes = contextTypes;

exports.default = Divider;