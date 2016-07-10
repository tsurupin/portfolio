'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _checkCircle = require('../svg-icons/action/check-circle');

var _checkCircle2 = _interopRequireDefault(_checkCircle);

var _SvgIcon = require('../SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getStyles = function getStyles(_ref, _ref2) {
  var active = _ref.active;
  var completed = _ref.completed;
  var disabled = _ref.disabled;
  var muiTheme = _ref2.muiTheme;
  var stepper = _ref2.stepper;
  var _muiTheme$stepper = muiTheme.stepper;
  var textColor = _muiTheme$stepper.textColor;
  var disabledTextColor = _muiTheme$stepper.disabledTextColor;
  var iconColor = _muiTheme$stepper.iconColor;
  var inactiveIconColor = _muiTheme$stepper.inactiveIconColor;
  var orientation = stepper.orientation;


  var styles = {
    root: {
      height: orientation === 'horizontal' ? 72 : 64,
      color: textColor,
      display: 'flex',
      alignItems: 'center',
      fontSize: 14,
      paddingLeft: 14,
      paddingRight: 14
    },
    icon: {
      color: iconColor,
      display: 'block',
      fontSize: 24,
      width: 24,
      height: 24
    },
    iconContainer: {
      display: 'flex',
      alignItems: 'center',
      paddingRight: 8,
      width: 24
    }
  };

  if (active) {
    styles.root.fontWeight = 500;
  }

  if (!completed && !active) {
    styles.icon.color = inactiveIconColor;
  }

  if (disabled) {
    styles.icon.color = inactiveIconColor;
    styles.root.color = disabledTextColor;
    styles.root.cursor = 'not-allowed';
  }

  return styles;
};

var StepLabel = function (_Component) {
  _inherits(StepLabel, _Component);

  function StepLabel() {
    _classCallCheck(this, StepLabel);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(StepLabel).apply(this, arguments));
  }

  _createClass(StepLabel, [{
    key: 'renderIcon',
    value: function renderIcon(completed, icon, styles) {
      var iconType = typeof icon === 'undefined' ? 'undefined' : _typeof(icon);

      if (iconType === 'number' || iconType === 'string') {
        if (completed) {
          return _react2.default.createElement(_checkCircle2.default, {
            color: styles.icon.color,
            style: styles.icon
          });
        }

        return _react2.default.createElement(
          _SvgIcon2.default,
          { color: styles.icon.color, style: styles.icon },
          _react2.default.createElement('circle', { cx: '12', cy: '12', r: '10' }),
          _react2.default.createElement(
            'text',
            {
              x: '12',
              y: '16',
              textAnchor: 'middle',
              fontSize: '12',
              fill: '#fff'
            },
            icon
          )
        );
      }

      return icon;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var active = _props.active;
      var children = _props.children;
      var completed = _props.completed;
      var userIcon = _props.icon;
      var last = _props.last;
      var style = _props.style;

      var other = _objectWithoutProperties(_props, ['active', 'children', 'completed', 'icon', 'last', 'style']);

      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);
      var icon = this.renderIcon(completed, userIcon, styles);

      return _react2.default.createElement(
        'span',
        _extends({ style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)) }, other),
        icon && _react2.default.createElement(
          'span',
          { style: prepareStyles(styles.iconContainer) },
          icon
        ),
        children
      );
    }
  }]);

  return StepLabel;
}(_react.Component);

StepLabel.muiName = 'StepLabel';
StepLabel.propTypes = {
  /**
   * Sets active styling. Overrides disabled coloring.
   */
  active: _react.PropTypes.bool,
  /**
   * The label text node
   */
  children: _react.PropTypes.node,
  /**
   * Sets completed styling. Overrides disabled coloring.
   */
  completed: _react.PropTypes.bool,
  /**
   * Sets disabled styling.
   */
  disabled: _react.PropTypes.bool,
  /**
   * The icon displayed by the step label.
   */
  icon: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.string, _react.PropTypes.number]),
  /**
   * @ignore
   */
  last: _react.PropTypes.bool,
  /**
   * Override the inline-style of the root element.
   */
  style: _react.PropTypes.object
};
StepLabel.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired,
  stepper: _react.PropTypes.object
};
exports.default = StepLabel;