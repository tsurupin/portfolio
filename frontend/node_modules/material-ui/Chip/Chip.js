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

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _colorManipulator = require('../utils/colorManipulator');

var _EnhancedButton = require('../internal/EnhancedButton');

var _EnhancedButton2 = _interopRequireDefault(_EnhancedButton);

var _cancel = require('../svg-icons/navigation/cancel');

var _cancel2 = _interopRequireDefault(_cancel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getStyles(props, context, state) {
  var chip = context.muiTheme.chip;


  var backgroundColor = props.backgroundColor || chip.backgroundColor;
  var focusColor = (0, _colorManipulator.emphasize)(backgroundColor, 0.08);
  var pressedColor = (0, _colorManipulator.emphasize)(backgroundColor, 0.12);

  return {
    avatar: {
      marginRight: -4
    },
    deleteIcon: {
      color: state.deleteHovered ? (0, _colorManipulator.fade)(chip.deleteIconColor, 0.4) : chip.deleteIconColor,
      cursor: 'pointer',
      margin: '4px 4px 0px -8px'
    },
    label: {
      color: props.labelColor || chip.textColor,
      fontSize: chip.fontSize,
      fontWeight: chip.fontWeight,
      lineHeight: '32px',
      paddingLeft: 12,
      paddingRight: 12,
      userSelect: 'none',
      whiteSpace: 'nowrap'
    },
    root: {
      backgroundColor: state.clicked ? pressedColor : state.focused || state.hovered ? focusColor : backgroundColor,
      borderRadius: 16,
      boxShadow: state.clicked ? chip.shadow : null,
      cursor: props.onTouchTap ? 'pointer' : 'default',
      display: 'flex',
      whiteSpace: 'nowrap',
      width: 'fit-content'
    }
  };
}

var Chip = function (_Component) {
  _inherits(Chip, _Component);

  function Chip() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Chip);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Chip)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      clicked: false,
      deleteHovered: false,
      focused: false,
      hovered: false
    }, _this.handleBlur = function (event) {
      _this.setState({ clicked: false, focused: false });
      _this.props.onBlur(event);
    }, _this.handleFocus = function (event) {
      if (_this.props.onTouchTap || _this.props.onRequestDelete) {
        _this.setState({ focused: true });
      }
      _this.props.onFocus(event);
    }, _this.handleKeyboardFocus = function (event, keyboardFocused) {
      if (keyboardFocused) {
        _this.handleFocus();
        _this.props.onFocus(event);
      } else {
        _this.handleBlur();
      }

      _this.props.onKeyboardFocus(event, keyboardFocused);
    }, _this.handleKeyDown = function (event) {
      if ((0, _keycode2.default)(event) === 'backspace') {
        event.preventDefault();
        if (_this.props.onRequestDelete) {
          _this.props.onRequestDelete(event);
        }
      }
      _this.props.onKeyDown(event);
    }, _this.handleMouseDown = function (event) {
      // Only listen to left clicks
      if (event.button === 0) {
        event.stopPropagation();
        if (_this.props.onTouchTap) {
          _this.setState({ clicked: true });
        }
      }
      _this.props.onMouseDown(event);
    }, _this.handleMouseEnter = function (event) {
      if (_this.props.onTouchTap) {
        _this.setState({ hovered: true });
      }
      _this.props.onMouseEnter(event);
    }, _this.handleMouseEnterDeleteIcon = function () {
      _this.setState({ deleteHovered: true });
    }, _this.handleMouseLeave = function (event) {
      _this.setState({
        clicked: false,
        hovered: false
      });
      _this.props.onMouseLeave(event);
    }, _this.handleMouseLeaveDeleteIcon = function () {
      _this.setState({ deleteHovered: false });
    }, _this.handleMouseUp = function (event) {
      _this.setState({ clicked: false });
      _this.props.onMouseUp(event);
    }, _this.handleTouchTapDeleteIcon = function (event) {
      // Stop the event from bubbling up to the `Chip`
      event.stopPropagation();
      _this.props.onRequestDelete(event);
    }, _this.handleTouchEnd = function (event) {
      _this.setState({ clicked: false });
      _this.props.onTouchEnd(event);
    }, _this.handleTouchStart = function (event) {
      event.stopPropagation();
      if (_this.props.onTouchTap) {
        _this.setState({ clicked: true });
      }
      _this.props.onTouchStart(event);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Chip, [{
    key: 'render',
    value: function render() {
      var buttonEventHandlers = {
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        onKeyDown: this.handleKeyDown,
        onMouseDown: this.handleMouseDown,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        onMouseUp: this.handleMouseUp,
        onTouchEnd: this.handleTouchEnd,
        onTouchStart: this.handleTouchStart,
        onKeyboardFocus: this.handleKeyboardFocus
      };

      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context, this.state);

      var _props = this.props;
      var children = _props.children;
      var style = _props.style;
      var className = _props.className;
      var labelStyle = _props.labelStyle;
      var backgroundColor = _props.backgroundColor;
      var onRequestDelete = _props.onRequestDelete;

      var other = _objectWithoutProperties(_props, ['children', 'style', 'className', 'labelStyle', 'backgroundColor', 'onRequestDelete']);

      var deletable = this.props.onRequestDelete;
      var avatar = null;

      style = (0, _simpleAssign2.default)(styles.root, style);
      labelStyle = prepareStyles((0, _simpleAssign2.default)(styles.label, labelStyle));

      var deleteIcon = deletable ? _react2.default.createElement(_cancel2.default, {
        color: styles.deleteIcon.color,
        style: styles.deleteIcon,
        onTouchTap: this.handleTouchTapDeleteIcon,
        onMouseEnter: this.handleMouseEnterDeleteIcon,
        onMouseLeave: this.handleMouseLeaveDeleteIcon
      }) : null;

      var childCount = _react2.default.Children.count(children);

      // If the first child is an avatar, extract it and style it
      if (childCount > 1) {
        children = _react2.default.Children.toArray(children);

        if (_react2.default.isValidElement(children[0]) && children[0].type.muiName === 'Avatar') {
          avatar = children.shift();

          avatar = _react2.default.cloneElement(avatar, {
            style: (0, _simpleAssign2.default)(styles.avatar, avatar.props.style),
            size: 32
          });
        }
      }

      return _react2.default.createElement(
        _EnhancedButton2.default,
        _extends({}, other, buttonEventHandlers, {
          className: className,
          containerElement: 'div' // Firefox doesn't support nested buttons
          , disableTouchRipple: true,
          disableFocusRipple: true,
          style: style
        }),
        avatar,
        _react2.default.createElement(
          'span',
          { style: labelStyle },
          children
        ),
        deleteIcon
      );
    }
  }]);

  return Chip;
}(_react.Component);

Chip.propTypes = {
  /**
   * Override the background color of the chip.
   */
  backgroundColor: _react.PropTypes.string,
  /**
   * Used to render elements inside the Chip.
   */
  children: _react.PropTypes.node,
  /**
   * CSS `className` of the root element.
   */
  className: _react.PropTypes.node,
  /**
   * Override the label color.
   */
  labelColor: _react.PropTypes.string,
  /**
   * Override the inline-styles of the label.
   */
  labelStyle: _react.PropTypes.object,
  /** @ignore */
  onBlur: _react.PropTypes.func,
  /** @ignore */
  onFocus: _react.PropTypes.func,
  /** @ignore */
  onKeyDown: _react.PropTypes.func,
  /** @ignore */
  onKeyboardFocus: _react.PropTypes.func,
  /** @ignore */
  onMouseDown: _react.PropTypes.func,
  /** @ignore */
  onMouseEnter: _react.PropTypes.func,
  /** @ignore */
  onMouseLeave: _react.PropTypes.func,
  /** @ignore */
  onMouseUp: _react.PropTypes.func,
  /**
   * Callback function fired when the delete icon is clicked. If set, the delete icon will be shown.
   * @param {object} event `touchTap` event targeting the element.
   */
  onRequestDelete: _react.PropTypes.func,
  /** @ignore */
  onTouchEnd: _react.PropTypes.func,
  /** @ignore */
  onTouchStart: _react.PropTypes.func,
  /**
   * Callback function fired when the `Chip` element is touch-tapped.
   *
   * @param {object} event TouchTap event targeting the element.
   */
  onTouchTap: _react.PropTypes.func,
  /**
   * Override the inline-styles of the root element.
   */
  style: _react.PropTypes.object
};
Chip.defaultProps = {
  onBlur: function onBlur() {},
  onFocus: function onFocus() {},
  onKeyDown: function onKeyDown() {},
  onKeyboardFocus: function onKeyboardFocus() {},
  onMouseDown: function onMouseDown() {},
  onMouseEnter: function onMouseEnter() {},
  onMouseLeave: function onMouseLeave() {},
  onMouseUp: function onMouseUp() {},
  onTouchEnd: function onTouchEnd() {},
  onTouchStart: function onTouchStart() {}
};
Chip.contextTypes = { muiTheme: _react.PropTypes.object.isRequired };
exports.default = Chip;