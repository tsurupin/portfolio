'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTransitionGroup = require('react-addons-transition-group');

var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);

var _SlideInChild = require('./SlideInChild');

var _SlideInChild2 = _interopRequireDefault(_SlideInChild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SlideIn = function (_Component) {
  _inherits(SlideIn, _Component);

  function SlideIn() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, SlideIn);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SlideIn)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.getLeaveDirection = function () {
      return _this.props.direction;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SlideIn, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var enterDelay = _props.enterDelay;
      var children = _props.children;
      var childStyle = _props.childStyle;
      var direction = _props.direction;
      var style = _props.style;

      var other = _objectWithoutProperties(_props, ['enterDelay', 'children', 'childStyle', 'direction', 'style']);

      var prepareStyles = this.context.muiTheme.prepareStyles;


      var mergedRootStyles = (0, _simpleAssign2.default)({}, {
        position: 'relative',
        overflow: 'hidden',
        height: '100%'
      }, style);

      var newChildren = _react2.default.Children.map(children, function (child) {
        return _react2.default.createElement(
          _SlideInChild2.default,
          {
            key: child.key,
            direction: direction,
            enterDelay: enterDelay,
            getLeaveDirection: _this2.getLeaveDirection,
            style: childStyle
          },
          child
        );
      }, this);

      return _react2.default.createElement(
        _reactAddonsTransitionGroup2.default,
        _extends({}, other, {
          style: prepareStyles(mergedRootStyles),
          component: 'div'
        }),
        newChildren
      );
    }
  }]);

  return SlideIn;
}(_react.Component);

SlideIn.propTypes = {
  childStyle: _react.PropTypes.object,
  children: _react.PropTypes.node,
  direction: _react.PropTypes.oneOf(['left', 'right', 'up', 'down']),
  enterDelay: _react.PropTypes.number,
  style: _react.PropTypes.object
};
SlideIn.defaultProps = {
  enterDelay: 0,
  direction: 'left'
};
SlideIn.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = SlideIn;