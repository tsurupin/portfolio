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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getStyles = function getStyles(_ref, _ref2) {
  var index = _ref.index;
  var stepper = _ref2.stepper;
  var orientation = stepper.orientation;

  var styles = {
    root: {
      flex: '0 0 auto'
    }
  };

  if (index > 0) {
    if (orientation === 'horizontal') {
      styles.root.marginLeft = -6;
    } else if (orientation === 'vertical') {
      styles.root.marginTop = -14;
    }
  }

  return styles;
};

var Step = function (_Component) {
  _inherits(Step, _Component);

  function Step() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Step);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Step)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.renderChild = function (child) {
      var _this$props = _this.props;
      var active = _this$props.active;
      var completed = _this$props.completed;
      var disabled = _this$props.disabled;
      var index = _this$props.index;
      var last = _this$props.last;


      var icon = index + 1;

      return _react2.default.cloneElement(child, (0, _simpleAssign2.default)({ active: active, completed: completed, disabled: disabled, icon: icon, last: last }, child.props));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Step, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var active = _props.active;
      var completed = _props.completed;
      var disabled = _props.disabled;
      var index = _props.index;
      var last = _props.last;
      var children = _props.children;
      var style = _props.style;

      var other = _objectWithoutProperties(_props, ['active', 'completed', 'disabled', 'index', 'last', 'children', 'style']);

      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);

      return _react2.default.createElement(
        'div',
        _extends({ style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)) }, other),
        _react2.default.Children.map(children, this.renderChild)
      );
    }
  }]);

  return Step;
}(_react.Component);

Step.propTypes = {
  /**
   * Sets the step as active. Is passed to child components.
   */
  active: _react.PropTypes.bool,
  /**
   * Should be `Step` sub-components such as `StepLabel`.
   */
  children: _react.PropTypes.node,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: _react.PropTypes.bool,
  /**
   * Mark the step as disabled, will also disable the button if
   * `StepButton` is a child of `Step`. Is passed to child components.
   */
  disabled: _react.PropTypes.bool,
  /**
   * @ignore
   * Used internally for numbering.
   */
  index: _react.PropTypes.number,
  /**
   * @ignore
   */
  last: _react.PropTypes.bool,
  /**
   * Override the inline-style of the root element.
   */
  style: _react.PropTypes.object
};
Step.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired,
  stepper: _react.PropTypes.object
};
exports.default = Step;