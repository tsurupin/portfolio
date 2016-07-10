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

var _transitions = require('../styles/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

var _EnhancedButton = require('../internal/EnhancedButton');

var _EnhancedButton2 = _interopRequireDefault(_EnhancedButton);

var _StepLabel = require('./StepLabel');

var _StepLabel2 = _interopRequireDefault(_StepLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isLabel = function isLabel(child) {
  return child && child.type && child.type.muiName === 'StepLabel';
};

var getStyles = function getStyles(props, context, state) {
  var hovered = state.hovered;
  var _context$muiTheme$ste = context.muiTheme.stepper;
  var backgroundColor = _context$muiTheme$ste.backgroundColor;
  var hoverBackgroundColor = _context$muiTheme$ste.hoverBackgroundColor;


  var styles = {
    root: {
      padding: 0,
      backgroundColor: hovered ? hoverBackgroundColor : backgroundColor,
      transition: _transitions2.default.easeOut()
    }
  };

  if (context.stepper.orientation === 'vertical') {
    styles.root.width = '100%';
  }

  return styles;
};

var StepButton = function (_Component) {
  _inherits(StepButton, _Component);

  function StepButton() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, StepButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(StepButton)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      hovered: false,
      touched: false
    }, _this.handleMouseEnter = function (event) {
      var onMouseEnter = _this.props.onMouseEnter;
      // Cancel hover styles for touch devices

      if (!_this.state.touched) {
        _this.setState({ hovered: true });
      }
      if (typeof onMouseEnter === 'function') {
        onMouseEnter(event);
      }
    }, _this.handleMouseLeave = function (event) {
      var onMouseLeave = _this.props.onMouseLeave;

      _this.setState({ hovered: false });
      if (typeof onMouseLeave === 'function') {
        onMouseLeave(event);
      }
    }, _this.handleTouchStart = function (event) {
      var onTouchStart = _this.props.onTouchStart;

      if (!_this.state.touched) {
        _this.setState({ touched: true });
      }
      if (typeof onTouchStart === 'function') {
        onTouchStart(event);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(StepButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var active = _props.active;
      var children = _props.children;
      var completed = _props.completed;
      var disabled = _props.disabled;
      var icon = _props.icon;
      var last = _props.last;
      var onMouseEnter = _props.onMouseEnter;
      var onMouseLeave = _props.onMouseLeave;
      var onTouchStart = _props.onTouchStart;
      var style = _props.style;

      var other = _objectWithoutProperties(_props, ['active', 'children', 'completed', 'disabled', 'icon', 'last', 'onMouseEnter', 'onMouseLeave', 'onTouchStart', 'style']);

      var styles = getStyles(this.props, this.context, this.state);

      var child = isLabel(children) ? children : _react2.default.createElement(
        _StepLabel2.default,
        null,
        children
      );

      return _react2.default.createElement(
        _EnhancedButton2.default,
        _extends({
          disabled: disabled,
          style: (0, _simpleAssign2.default)(styles.root, style),
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
          onTouchStart: this.handleTouchStart
        }, other),
        _react2.default.cloneElement(child, { active: active, completed: completed, disabled: disabled, icon: icon })
      );
    }
  }]);

  return StepButton;
}(_react.Component);

StepButton.propTypes = {
  /**
   * Passed from `Step` Is passed to StepLabel.
   */
  active: _react.PropTypes.bool,
  /**
   * Can be a `StepLabel` or a node to place inside `StepLabel` as children.
   */
  children: _react.PropTypes.node,
  /**
   * Sets completed styling. Is passed to StepLabel.
   */
  completed: _react.PropTypes.bool,
  /**
   * Disables the button and sets disabled styling. Is passed to StepLabel.
   */
  disabled: _react.PropTypes.bool,
  /**
   * The icon displayed by the step label.
   */
  icon: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.string, _react.PropTypes.number]),
  /** @ignore */
  last: _react.PropTypes.bool,
  /** @ignore */
  onMouseEnter: _react.PropTypes.func,
  /** @ignore */
  onMouseLeave: _react.PropTypes.func,
  /** @ignore */
  onTouchStart: _react.PropTypes.func,
  /**
   * Override the inline-style of the root element.
   */
  style: _react.PropTypes.object
};
StepButton.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired,
  stepper: _react.PropTypes.object
};
exports.default = StepButton;