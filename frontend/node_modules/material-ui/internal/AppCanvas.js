'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppCanvas = function (_Component) {
  _inherits(AppCanvas, _Component);

  function AppCanvas() {
    _classCallCheck(this, AppCanvas);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AppCanvas).apply(this, arguments));
  }

  _createClass(AppCanvas, [{
    key: 'render',
    value: function render() {
      var _context$muiTheme = this.context.muiTheme;
      var baseTheme = _context$muiTheme.baseTheme;
      var prepareStyles = _context$muiTheme.prepareStyles;


      var styles = {
        height: '100%',
        color: baseTheme.palette.textColor,
        backgroundColor: baseTheme.palette.canvasColor,
        direction: 'ltr'
      };

      var newChildren = _react2.default.Children.map(this.props.children, function (currentChild) {
        if (!currentChild) {
          // If undefined, skip it
          return null;
        }

        switch (currentChild.type.muiName) {
          case 'AppBar':
            return _react2.default.cloneElement(currentChild, {
              style: (0, _simpleAssign2.default)({}, currentChild.props.style, {
                position: 'fixed'
              })
            });
          default:
            return currentChild;
        }
      }, this);

      return _react2.default.createElement(
        'div',
        { style: prepareStyles(styles) },
        newChildren
      );
    }
  }]);

  return AppCanvas;
}(_react.Component);

AppCanvas.propTypes = {
  children: _react.PropTypes.node
};
AppCanvas.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = AppCanvas;