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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _events = require('../utils/events');

var _events2 = _interopRequireDefault(_events);

var _propTypes = require('../utils/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Menu = require('../Menu/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Popover = require('../Popover/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IconMenu = function (_Component) {
  _inherits(IconMenu, _Component);

  function IconMenu() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, IconMenu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(IconMenu)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      menuInitiallyKeyboardFocused: false,
      open: false
    }, _this.handleItemTouchTap = function (event, child) {
      if (_this.props.touchTapCloseDelay !== 0 && !child.props.hasOwnProperty('menuItems')) {
        (function () {
          var isKeyboard = _events2.default.isKeyboard(event);
          _this.timerCloseId = setTimeout(function () {
            _this.close(isKeyboard ? 'enter' : 'itemTap', isKeyboard);
          }, _this.props.touchTapCloseDelay);
        })();
      }

      _this.props.onItemTouchTap(event, child);
    }, _this.handleRequestClose = function (reason) {
      _this.close(reason);
    }, _this.handleEscKeyDownMenu = function (event) {
      _this.close('escape', event);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(IconMenu, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.open != null) {
        this.setState({
          open: nextProps.open,
          anchorEl: this.refs.iconMenuContainer
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.timerCloseId);
    }
  }, {
    key: 'isOpen',
    value: function isOpen() {
      return this.state.open;
    }
  }, {
    key: 'close',
    value: function close(reason, isKeyboard) {
      var _this2 = this;

      if (!this.state.open) {
        return;
      }

      if (this.props.open !== null) {
        this.props.onRequestChange(false, reason);
      }

      this.setState({ open: false }, function () {
        // Set focus on the icon button when the menu close
        if (isKeyboard) {
          var iconButton = _this2.refs.iconButton;
          _reactDom2.default.findDOMNode(iconButton).focus();
          iconButton.setKeyboardFocus();
        }
      });
    }
  }, {
    key: 'open',
    value: function open(reason, event) {
      if (this.props.open !== null) {
        this.props.onRequestChange(true, reason);

        return this.setState({
          menuInitiallyKeyboardFocused: _events2.default.isKeyboard(event),
          anchorEl: event.currentTarget
        });
      }

      this.setState({
        open: true,
        menuInitiallyKeyboardFocused: _events2.default.isKeyboard(event),
        anchorEl: event.currentTarget
      });

      event.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props;
      var anchorOrigin = _props.anchorOrigin;
      var className = _props.className;
      var animated = _props.animated;
      var iconButtonElement = _props.iconButtonElement;
      var iconStyle = _props.iconStyle;
      var onItemTouchTap = _props.onItemTouchTap;
      var onKeyboardFocus = _props.onKeyboardFocus;
      var onMouseDown = _props.onMouseDown;
      var onMouseLeave = _props.onMouseLeave;
      var onMouseEnter = _props.onMouseEnter;
      var onMouseUp = _props.onMouseUp;
      var onRequestChange = _props.onRequestChange;
      var onTouchTap = _props.onTouchTap;
      var menuStyle = _props.menuStyle;
      var style = _props.style;
      var targetOrigin = _props.targetOrigin;
      var touchTapCloseDelay = _props.touchTapCloseDelay;
      var useLayerForClickAway = _props.useLayerForClickAway;

      var other = _objectWithoutProperties(_props, ['anchorOrigin', 'className', 'animated', 'iconButtonElement', 'iconStyle', 'onItemTouchTap', 'onKeyboardFocus', 'onMouseDown', 'onMouseLeave', 'onMouseEnter', 'onMouseUp', 'onRequestChange', 'onTouchTap', 'menuStyle', 'style', 'targetOrigin', 'touchTapCloseDelay', 'useLayerForClickAway']);

      var prepareStyles = this.context.muiTheme.prepareStyles;
      var _state = this.state;
      var open = _state.open;
      var anchorEl = _state.anchorEl;


      var styles = {
        root: {
          display: 'inline-block',
          position: 'relative'
        },
        menu: {
          position: 'relative'
        }
      };

      var mergedRootStyles = (0, _simpleAssign2.default)(styles.root, style);
      var mergedMenuStyles = (0, _simpleAssign2.default)(styles.menu, menuStyle);

      var iconButton = _react2.default.cloneElement(iconButtonElement, {
        onKeyboardFocus: onKeyboardFocus,
        iconStyle: (0, _simpleAssign2.default)({}, iconStyle, iconButtonElement.props.iconStyle),
        onTouchTap: function onTouchTap(event) {
          _this3.open(_events2.default.isKeyboard(event) ? 'keyboard' : 'iconTap', event);
          if (iconButtonElement.props.onTouchTap) iconButtonElement.props.onTouchTap(event);
        },
        ref: 'iconButton'
      });

      var menu = _react2.default.createElement(
        _Menu2.default,
        _extends({}, other, {
          initiallyKeyboardFocused: this.state.menuInitiallyKeyboardFocused,
          onEscKeyDown: this.handleEscKeyDownMenu,
          onItemTouchTap: this.handleItemTouchTap,
          style: mergedMenuStyles
        }),
        this.props.children
      );

      return _react2.default.createElement(
        'div',
        {
          ref: 'iconMenuContainer',
          className: className,
          onMouseDown: onMouseDown,
          onMouseLeave: onMouseLeave,
          onMouseEnter: onMouseEnter,
          onMouseUp: onMouseUp,
          onTouchTap: onTouchTap,
          style: prepareStyles(mergedRootStyles)
        },
        iconButton,
        _react2.default.createElement(
          _Popover2.default,
          {
            anchorOrigin: anchorOrigin,
            targetOrigin: targetOrigin,
            open: open,
            anchorEl: anchorEl,
            childContextTypes: this.constructor.childContextTypes,
            useLayerForClickAway: useLayerForClickAway,
            onRequestClose: this.handleRequestClose,
            animated: animated,
            context: this.context
          },
          menu
        )
      );
    }
  }]);

  return IconMenu;
}(_react.Component);

IconMenu.muiName = 'IconMenu';
IconMenu.propTypes = {
  /**
   * This is the point on the icon where the menu
   * `targetOrigin` will attach.
   * Options:
   * vertical: [top, middle, bottom]
   * horizontal: [left, center, right].
   */
  anchorOrigin: _propTypes2.default.origin,
  /**
   * If true, the popover will apply transitions when
   * it gets added to the DOM.
   */
  animated: _react.PropTypes.bool,
  /**
   * Should be used to pass `MenuItem` components.
   */
  children: _react.PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: _react.PropTypes.string,
  /**
   * This is the `IconButton` to render. This button will open the menu.
   */
  iconButtonElement: _react.PropTypes.element.isRequired,
  /**
   * Override the inline-styles of the underlying icon element.
   */
  iconStyle: _react.PropTypes.object,
  /**
   * Override the inline-styles of the menu element.
   */
  menuStyle: _react.PropTypes.object,
  /**
   * If true, the value can an be array and allow the menu to be a multi-select.
   */
  multiple: _react.PropTypes.bool,
  /**
   * Callback function fired when a menu item is selected with a touch-tap.
   *
   * @param {object} event TouchTap event targeting the selected menu item element.
   * @param {object} child The selected element.
   */
  onItemTouchTap: _react.PropTypes.func,
  /**
   * Callback function fired when the `IconButton` element is focused or blurred by the keyboard.
   *
   * @param {object} event `focus` or `blur` event targeting the `IconButton` element.
   * @param {boolean} keyboardFocused If true, the `IconButton` element is focused.
   */
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
   * Callback function fired when the `open` state of the menu is requested to be changed.
   *
   * @param {boolean} open If true, the menu was requested to be opened.
   * @param {string} reason The reason for the open or close request. Possible values are
   * 'keyboard' and 'iconTap' for open requests; 'enter', 'escape', 'itemTap', and 'clickAway'
   * for close requests.
   */
  onRequestChange: _react.PropTypes.func,
  /**
   * Callback function fired when the `IconButton` element is touch-tapped.
   *
   * @param {object} event TouchTap event targeting the `IconButton` element.
   */
  onTouchTap: _react.PropTypes.func,
  /**
   * If true, the `IconMenu` is opened.
   */
  open: _react.PropTypes.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: _react.PropTypes.object,
  /**
   * This is the point on the menu which will stick to the menu
   * origin.
   * Options:
   * vertical: [top, middle, bottom]
   * horizontal: [left, center, right].
   */
  targetOrigin: _propTypes2.default.origin,
  /**
   * Sets the delay in milliseconds before closing the
   * menu when an item is clicked.
   * If set to 0 then the auto close functionality
   * will be disabled.
   */
  touchTapCloseDelay: _react.PropTypes.number,
  /**
   * If true, the popover will render on top of an invisible
   * layer, which will prevent clicks to the underlying elements.
   */
  useLayerForClickAway: _react.PropTypes.bool
};
IconMenu.defaultProps = {
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'left'
  },
  animated: true,
  multiple: false,
  open: null,
  onItemTouchTap: function onItemTouchTap() {},
  onKeyboardFocus: function onKeyboardFocus() {},
  onMouseDown: function onMouseDown() {},
  onMouseLeave: function onMouseLeave() {},
  onMouseEnter: function onMouseEnter() {},
  onMouseUp: function onMouseUp() {},
  onRequestChange: function onRequestChange() {},
  onTouchTap: function onTouchTap() {},
  targetOrigin: {
    vertical: 'top',
    horizontal: 'left'
  },
  touchTapCloseDelay: 200,
  useLayerForClickAway: false
};
IconMenu.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = IconMenu;