'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = muiThemeable;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getMuiTheme = require('./getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_THEME = void 0;

function getDefaultTheme() {
  if (!DEFAULT_THEME) {
    DEFAULT_THEME = (0, _getMuiTheme2.default)();
  }
  return DEFAULT_THEME;
}

function muiThemeable() {
  return function (Component) {
    var MuiComponent = function MuiComponent(props, context) {
      var _context$muiTheme = context.muiTheme;
      var muiTheme = _context$muiTheme === undefined ? getDefaultTheme() : _context$muiTheme;


      return _react2.default.createElement(Component, _extends({ muiTheme: muiTheme }, props));
    };

    MuiComponent.contextTypes = {
      muiTheme: _react.PropTypes.object.isRequired
    };

    return MuiComponent;
  };
}