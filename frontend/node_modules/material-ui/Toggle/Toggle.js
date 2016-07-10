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

var _Paper = require('../Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _EnhancedSwitch = require('../internal/EnhancedSwitch');

var _EnhancedSwitch2 = _interopRequireDefault(_EnhancedSwitch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getStyles(props, context, state) {
  var disabled = props.disabled;
  var _context$muiTheme = context.muiTheme;
  var baseTheme = _context$muiTheme.baseTheme;
  var toggle = _context$muiTheme.toggle;


  var toggleSize = 20;
  var toggleTrackWidth = 36;
  var styles = {
    icon: {
      width: 36,
      padding: '4px 0px 6px 2px'
    },
    ripple: {
      top: -10,
      left: -10,
      color: state.switched ? toggle.thumbOnColor : baseTheme.palette.textColor
    },
    toggleElement: {
      width: toggleTrackWidth
    },
    track: {
      transition: _transitions2.default.easeOut(),
      width: '100%',
      height: 14,
      borderRadius: 30,
      backgroundColor: toggle.trackOffColor
    },
    thumb: {
      transition: _transitions2.default.easeOut(),
      position: 'absolute',
      top: 1,
      left: 0,
      width: toggleSize,
      height: toggleSize,
      lineHeight: '24px',
      borderRadius: '50%',
      backgroundColor: toggle.thumbOffColor
    },
    trackWhenSwitched: {
      backgroundColor: toggle.trackOnColor
    },
    thumbWhenSwitched: {
      backgroundColor: toggle.thumbOnColor,
      left: '100%'
    },
    trackWhenDisabled: {
      backgroundColor: toggle.trackDisabledColor,
      cursor: 'not-allowed'
    },
    thumbWhenDisabled: {
      backgroundColor: toggle.thumbDisabledColor,
      cursor: 'not-allowed'
    },
    label: {
      color: disabled ? toggle.labelDisabledColor : toggle.labelColor,
      width: 'calc(100% - ' + (toggleTrackWidth + 10) + 'px)',
      cursor: disabled ? 'not-allowed' : 'initial'
    }
  };

  return styles;
}

var Toggle = function (_Component) {
  _inherits(Toggle, _Component);

  function Toggle() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Toggle);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Toggle)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { switched: false }, _this.handleToggle = function (event, isInputChecked) {
      if (_this.props.onToggle) _this.props.onToggle(event, isInputChecked);
    }, _this.handleStateChange = function (newSwitched) {
      _this.setState({ switched: newSwitched });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Toggle, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var toggled = _props.toggled;
      var defaultToggled = _props.defaultToggled;
      var valueLink = _props.valueLink;


      if (toggled || defaultToggled || valueLink && valueLink.value) {
        this.setState({ switched: true });
      }
    }
  }, {
    key: 'isToggled',
    value: function isToggled() {
      return this.refs.enhancedSwitch.isSwitched();
    }
  }, {
    key: 'setToggled',
    value: function setToggled(newToggledValue) {
      this.refs.enhancedSwitch.setSwitched(newToggledValue);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var defaultToggled = _props2.defaultToggled;
      var onToggle = _props2.onToggle;
      var toggled = _props2.toggled;

      var other = _objectWithoutProperties(_props2, ['defaultToggled', 'onToggle', 'toggled']);

      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context, this.state);

      var trackStyles = (0, _simpleAssign2.default)({}, styles.track, this.props.trackStyle, this.state.switched && styles.trackWhenSwitched, this.props.disabled && styles.trackWhenDisabled);

      var thumbStyles = (0, _simpleAssign2.default)({}, styles.thumb, this.props.thumbStyle, this.state.switched && styles.thumbWhenSwitched, this.props.disabled && styles.thumbWhenDisabled);

      if (this.state.switched) {
        thumbStyles.marginLeft = 0 - thumbStyles.width;
      }

      var toggleElementStyles = (0, _simpleAssign2.default)({}, styles.toggleElement, this.props.elementStyle);

      var toggleElement = _react2.default.createElement(
        'div',
        { style: prepareStyles((0, _simpleAssign2.default)({}, toggleElementStyles)) },
        _react2.default.createElement('div', { style: prepareStyles((0, _simpleAssign2.default)({}, trackStyles)) }),
        _react2.default.createElement(_Paper2.default, { style: thumbStyles, circle: true, zDepth: 1 })
      );

      var rippleStyle = (0, _simpleAssign2.default)({}, styles.ripple, this.props.rippleStyle);

      var iconStyle = (0, _simpleAssign2.default)({}, styles.icon, this.props.iconStyle);

      var labelStyle = (0, _simpleAssign2.default)({}, styles.label, this.props.labelStyle);

      var enhancedSwitchProps = {
        ref: 'enhancedSwitch',
        inputType: 'checkbox',
        switchElement: toggleElement,
        rippleStyle: rippleStyle,
        rippleColor: rippleStyle.color,
        iconStyle: iconStyle,
        trackStyle: trackStyles,
        thumbStyle: thumbStyles,
        labelStyle: labelStyle,
        switched: this.state.switched,
        onSwitch: this.handleToggle,
        onParentShouldUpdate: this.handleStateChange,
        labelPosition: this.props.labelPosition
      };

      if (this.props.hasOwnProperty('toggled')) {
        enhancedSwitchProps.checked = toggled;
      } else if (this.props.hasOwnProperty('defaultToggled')) {
        enhancedSwitchProps.defaultChecked = defaultToggled;
      }

      return _react2.default.createElement(_EnhancedSwitch2.default, _extends({}, other, enhancedSwitchProps));
    }
  }]);

  return Toggle;
}(_react.Component);

Toggle.propTypes = {
  /**
   * Determines whether the Toggle is initially turned on.
   * **Warning:** This cannot be used in conjunction with `toggled`.
   * Decide between using a controlled or uncontrolled input element and remove one of these props.
   * More info: https://fb.me/react-controlled-components
   */
  defaultToggled: _react.PropTypes.bool,
  /**
   * Will disable the toggle if true.
   */
  disabled: _react.PropTypes.bool,
  /**
   * Overrides the inline-styles of the Toggle element.
   */
  elementStyle: _react.PropTypes.object,
  /**
   * Overrides the inline-styles of the Icon element.
   */
  iconStyle: _react.PropTypes.object,
  /**
   * Overrides the inline-styles of the input element.
   */
  inputStyle: _react.PropTypes.object,
  /**
   * Label for toggle.
   */
  label: _react.PropTypes.string,
  /**
   * Where the label will be placed next to the toggle.
   */
  labelPosition: _react.PropTypes.oneOf(['left', 'right']),
  /**
   * Overrides the inline-styles of the Toggle element label.
   */
  labelStyle: _react.PropTypes.object,
  /**
   * Callback function that is fired when the toggle switch is toggled.
   */
  onToggle: _react.PropTypes.func,
  /**
   * Override style of ripple.
   */
  rippleStyle: _react.PropTypes.object,
  /**
   * Override the inline-styles of the root element.
   */
  style: _react.PropTypes.object,
  /**
   * Override style for thumb.
   */
  thumbStyle: _react.PropTypes.object,
  /**
   * Toggled if set to true.
   */
  toggled: _react.PropTypes.bool,
  /**
   * Override style for track.
   */
  trackStyle: _react.PropTypes.object,
  /**
   * ValueLink prop for when using controlled toggle.
   */
  valueLink: _react.PropTypes.object
};
Toggle.defaultProps = {
  defaultToggled: false,
  disabled: false,
  labelPosition: 'left'
};
Toggle.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = Toggle;