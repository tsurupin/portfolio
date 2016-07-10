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
   * Node that will be placed inside the `Subheader`.
   */
  children: _react.PropTypes.node,
  /**
   * If true, the `Subheader` will be indented by `72px`.
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

var Subheader = function Subheader(props, context) {
  var children = props.children;
  var inset = props.inset;
  var style = props.style;

  var other = _objectWithoutProperties(props, ['children', 'inset', 'style']);

  var _context$muiTheme = context.muiTheme;
  var prepareStyles = _context$muiTheme.prepareStyles;
  var subheader = _context$muiTheme.subheader;


  var styles = {
    root: {
      boxSizing: 'border-box',
      color: subheader.color,
      fontSize: 14,
      fontWeight: subheader.fontWeight,
      lineHeight: '48px',
      paddingLeft: inset ? 72 : 16,
      width: '100%'
    }
  };

  return _react2.default.createElement(
    'div',
    _extends({}, other, { style: prepareStyles((0, _simpleAssign2.default)({}, styles.root, style)) }),
    children
  );
};

Subheader.muiName = 'Subheader';
Subheader.propTypes = propTypes;
Subheader.defaultProps = defaultProps;
Subheader.contextTypes = contextTypes;

exports.default = Subheader;