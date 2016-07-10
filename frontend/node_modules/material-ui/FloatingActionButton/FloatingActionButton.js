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

var _colorManipulator = require('../utils/colorManipulator');

var _EnhancedButton = require('../internal/EnhancedButton');

var _EnhancedButton2 = _interopRequireDefault(_EnhancedButton);

var _FontIcon = require('../FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _Paper = require('../Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _childUtils = require('../utils/childUtils');

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _propTypes = require('../utils/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getStyles(props, context) {
  var floatingActionButton = context.muiTheme.floatingActionButton;


  var backgroundColor = props.backgroundColor || floatingActionButton.color;
  var iconColor = floatingActionButton.iconColor;

  if (props.disabled) {
    backgroundColor = props.disabledColor || floatingActionButton.disabledColor;
    iconColor = floatingActionButton.disabledTextColor;
  } else if (props.secondary) {
    backgroundColor = floatingActionButton.secondaryColor;
    iconColor = floatingActionButton.secondaryIconColor;
  }

  return {
    root: {
      transition: _transitions2.default.easeOut(),
      display: 'inline-block'
    },
    container: {
      backgroundColor: backgroundColor,
      transition: _transitions2.default.easeOut(),
      position: 'relative',
      height: floatingActionButton.buttonSize,
      width: floatingActionButton.buttonSize,
      padding: 0,
      overflow: 'hidden',
      borderRadius: '50%',
      textAlign: 'center',
      verticalAlign: 'bottom'
    },
    containerWhenMini: {
      height: floatingActionButton.miniSize,
      width: floatingActionButton.miniSize
    },
    overlay: {
      transition: _transitions2.default.easeOut(),
      top: 0
    },
    overlayWhenHovered: {
      backgroundColor: (0, _colorManipulator.fade)(iconColor, 0.4)
    },
    icon: {
      height: floatingActionButton.buttonSize,
      lineHeight: floatingActionButton.buttonSize + 'px',
      fill: iconColor,
      color: iconColor
    },
    iconWhenMini: {
      height: floatingActionButton.miniSize,
      lineHeight: floatingActionButton.miniSize + 'px'
    }
  };
}

var FloatingActionButton = function (_Component) {
  _inherits(FloatingActionButton, _Component);

  function FloatingActionButton() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, FloatingActionButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(FloatingActionButton)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      hovered: false,
      touch: false,
      zDepth: undefined
    }, _this.handleMouseDown = function (event) {
      // only listen to left clicks
      if (event.button === 0) {
        _this.setState({ zDepth: _this.props.zDepth + 1 });
      }
      if (_this.props.onMouseDown) _this.props.onMouseDown(event);
    }, _this.handleMouseUp = function (event) {
      _this.setState({ zDepth: _this.props.zDepth });
      if (_this.props.onMouseUp) {
        _this.props.onMouseUp(event);
      }
    }, _this.handleMouseLeave = function (event) {
      if (!_this.refs.container.isKeyboardFocused()) {
        _this.setState({ zDepth: _this.props.zDepth, hovered: false });
      }
      if (_this.props.onMouseLeave) {
        _this.props.onMouseLeave(event);
      }
    }, _this.handleMouseEnter = function (event) {
      if (!_this.refs.container.isKeyboardFocused() && !_this.state.touch) {
        _this.setState({ hovered: true });
      }
      if (_this.props.onMouseEnter) {
        _this.props.onMouseEnter(event);
      }
    }, _this.handleTouchStart = function (event) {
      _this.setState({
        touch: true,
        zDepth: _this.props.zDepth + 1
      });
      if (_this.props.onTouchStart) {
        _this.props.onTouchStart(event);
      }
    }, _this.handleTouchEnd = function (event) {
      _this.setState({ zDepth: _this.props.zDepth });
      if (_this.props.onTouchEnd) {
        _this.props.onTouchEnd(event);
      }
    }, _this.handleKeyboardFocus = function (event, keyboardFocused) {
      if (keyboardFocused && !_this.props.disabled) {
        _this.setState({ zDepth: _this.props.zDepth + 1 });
        _this.refs.overlay.style.backgroundColor = (0, _colorManipulator.fade)(getStyles(_this.props, _this.context).icon.color, 0.4);
      } else if (!_this.state.hovered) {
        _this.setState({ zDepth: _this.props.zDepth });
        _this.refs.overlay.style.backgroundColor = 'transparent';
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FloatingActionButton, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        zDepth: this.props.disabled ? 0 : this.props.zDepth
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(!this.props.iconClassName || !this.props.children, 'You have set both an iconClassName and a child icon. ' + 'It is recommended you use only one method when adding ' + 'icons to FloatingActionButtons.') : void 0;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.disabled !== this.props.disabled) {
        this.setState({
          zDepth: nextProps.disabled ? 0 : this.props.zDepth
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var disabled = _props.disabled;
      var mini = _props.mini;
      var secondary = _props.secondary;
      var iconStyle = _props.iconStyle;
      var iconClassName = _props.iconClassName;
      var zDepth = _props.zDepth;

      var other = _objectWithoutProperties(_props, ['className', 'disabled', 'mini', 'secondary', 'iconStyle', 'iconClassName', 'zDepth']);

      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);

      var iconElement = void 0;
      if (iconClassName) {
        iconElement = _react2.default.createElement(_FontIcon2.default, {
          className: iconClassName,
          style: (0, _simpleAssign2.default)({}, styles.icon, mini && styles.iconWhenMini, iconStyle)
        });
      }

      var children = (0, _childUtils.extendChildren)(this.props.children, {
        style: (0, _simpleAssign2.default)({}, styles.icon, mini && styles.iconWhenMini, iconStyle)
      });

      var buttonEventHandlers = disabled ? null : {
        onMouseDown: this.handleMouseDown,
        onMouseUp: this.handleMouseUp,
        onMouseLeave: this.handleMouseLeave,
        onMouseEnter: this.handleMouseEnter,
        onTouchStart: this.handleTouchStart,
        onTouchEnd: this.handleTouchEnd,
        onKeyboardFocus: this.handleKeyboardFocus
      };

      return _react2.default.createElement(
        _Paper2.default,
        {
          className: className,
          style: (0, _simpleAssign2.default)(styles.root, this.props.style),
          zDepth: this.state.zDepth,
          circle: true
        },
        _react2.default.createElement(
          _EnhancedButton2.default,
          _extends({}, other, buttonEventHandlers, {
            ref: 'container',
            disabled: disabled,
            style: (0, _simpleAssign2.default)(styles.container, this.props.mini && styles.containerWhenMini, iconStyle),
            focusRippleColor: styles.icon.color,
            touchRippleColor: styles.icon.color
          }),
          _react2.default.createElement(
            'div',
            {
              ref: 'overlay',
              style: prepareStyles((0, _simpleAssign2.default)(styles.overlay, this.state.hovered && !this.props.disabled && styles.overlayWhenHovered))
            },
            iconElement,
            children
          )
        )
      );
    }
  }]);

  return FloatingActionButton;
}(_react.Component);

FloatingActionButton.propTypes = {
  /**
   * This value will override the default background color for the button.
   * However it will not override the default disabled background color.
   * This has to be set separately using the disabledColor attribute.
   */
  backgroundColor: _react.PropTypes.string,
  /**
   * This is what displayed inside the floating action button; for example, a SVG Icon.
   */
  children: _react.PropTypes.node,
  /**
   * The css class name of the root element.
   */
  className: _react.PropTypes.string,
  /**
   * Disables the button if set to true.
   */
  disabled: _react.PropTypes.bool,
  /**
   * This value will override the default background color for the button when it is disabled.
   */
  disabledColor: _react.PropTypes.string,
  /**
   * The URL to link to when the button is clicked.
   */
  href: _react.PropTypes.string,
  /**
   * The icon within the FloatingActionButton is a FontIcon component.
   * This property is the classname of the icon to be displayed inside the button.
   * An alternative to adding an iconClassName would be to manually insert a
   * FontIcon component or custom SvgIcon component or as a child of FloatingActionButton.
   */
  iconClassName: _react.PropTypes.string,
  /**
   * This is the equivalent to iconClassName except that it is used for
   * overriding the inline-styles of the FontIcon component.
   */
  iconStyle: _react.PropTypes.object,
  /**
   * If true, the button will be a small floating action button.
   */
  mini: _react.PropTypes.bool,
  /** @ignore */
  onMouseDown: _react.PropTypes.func,
  /** @ignore */
  onMouseEnter: _react.PropTypes.func,
  /** @ignore */
  onMouseLeave: _react.PropTypes.func,
  /** @ignore */
  onMouseUp: _react.PropTypes.func,
  /** @ignore */
  onTouchEnd: _react.PropTypes.func,
  /** @ignore */
  onTouchStart: _react.PropTypes.func,
  /**
   * If true, the button will use the secondary button colors.
   */
  secondary: _react.PropTypes.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: _react.PropTypes.object,
  /**
   * The zDepth of the underlying `Paper` component.
   */
  zDepth: _propTypes2.default.zDepth
};
FloatingActionButton.defaultProps = {
  disabled: false,
  mini: false,
  secondary: false,
  zDepth: 2
};
FloatingActionButton.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = FloatingActionButton;