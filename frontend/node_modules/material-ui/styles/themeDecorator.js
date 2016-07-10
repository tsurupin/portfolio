'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/prefer-es6-class */

exports.default = function (customTheme) {
  process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'ThemeDecorator is deprecated, please use MuiThemeProvider instead.\n    It will be removed with v0.16.0.') : void 0;

  return function (Component) {
    return _react2.default.createClass({
      childContextTypes: {
        muiTheme: _react.PropTypes.object.isRequired
      },

      getChildContext: function getChildContext() {
        return {
          muiTheme: customTheme
        };
      },
      render: function render() {
        return _react2.default.createElement(Component, this.props);
      }
    });
  };
};