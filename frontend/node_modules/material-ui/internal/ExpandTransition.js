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

var _ExpandTransitionChild = require('./ExpandTransitionChild');

var _ExpandTransitionChild2 = _interopRequireDefault(_ExpandTransitionChild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExpandTransition = function (_Component) {
  _inherits(ExpandTransition, _Component);

  function ExpandTransition() {
    _classCallCheck(this, ExpandTransition);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ExpandTransition).apply(this, arguments));
  }

  _createClass(ExpandTransition, [{
    key: 'renderChildren',
    value: function renderChildren(children) {
      var _props = this.props;
      var enterDelay = _props.enterDelay;
      var transitionDelay = _props.transitionDelay;
      var transitionDuration = _props.transitionDuration;

      return _react2.default.Children.map(children, function (child) {
        return _react2.default.createElement(
          _ExpandTransitionChild2.default,
          {
            enterDelay: enterDelay,
            transitionDelay: transitionDelay,
            transitionDuration: transitionDuration,
            key: child.key
          },
          child
        );
      }, this);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var children = _props2.children;
      var enterDelay = _props2.enterDelay;
      var loading = _props2.loading;
      var open = _props2.open;
      var style = _props2.style;
      var transitionDelay = _props2.transitionDelay;
      var transitionDuration = _props2.transitionDuration;

      var other = _objectWithoutProperties(_props2, ['children', 'enterDelay', 'loading', 'open', 'style', 'transitionDelay', 'transitionDuration']);

      var prepareStyles = this.context.muiTheme.prepareStyles;


      var mergedRootStyles = (0, _simpleAssign2.default)({}, {
        position: 'relative',
        overflow: 'hidden',
        height: '100%'
      }, style);

      var newChildren = loading ? [] : this.renderChildren(children);

      return _react2.default.createElement(
        _reactAddonsTransitionGroup2.default,
        _extends({
          style: prepareStyles(mergedRootStyles),
          component: 'div'
        }, other),
        open && newChildren
      );
    }
  }]);

  return ExpandTransition;
}(_react.Component);

ExpandTransition.propTypes = {
  children: _react.PropTypes.node,
  enterDelay: _react.PropTypes.number,
  loading: _react.PropTypes.bool,
  open: _react.PropTypes.bool,
  style: _react.PropTypes.object,
  transitionDelay: _react.PropTypes.number,
  transitionDuration: _react.PropTypes.number
};
ExpandTransition.defaultProps = {
  enterDelay: 0,
  transitionDelay: 0,
  transitionDuration: 450,
  loading: false,
  open: false
};
ExpandTransition.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = ExpandTransition;