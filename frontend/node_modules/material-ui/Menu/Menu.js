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

var _shallowEqual = require('recompose/shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _ClickAwayListener = require('../internal/ClickAwayListener');

var _ClickAwayListener2 = _interopRequireDefault(_ClickAwayListener);

var _autoPrefix = require('../utils/autoPrefix');

var _autoPrefix2 = _interopRequireDefault(_autoPrefix);

var _transitions = require('../styles/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _propTypes = require('../utils/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _List = require('../List/List');

var _List2 = _interopRequireDefault(_List);

var _deprecatedPropType = require('../utils/deprecatedPropType');

var _deprecatedPropType2 = _interopRequireDefault(_deprecatedPropType);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _menuUtils = require('./menuUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getStyles(props, context) {
  var animated = props.animated;
  var desktop = props.desktop;
  var maxHeight = props.maxHeight;
  var _props$openDirection = props.openDirection;
  var openDirection = _props$openDirection === undefined ? 'bottom-left' : _props$openDirection;
  var width = props.width;


  var openDown = openDirection.split('-')[0] === 'bottom';
  var openLeft = openDirection.split('-')[1] === 'left';

  var muiTheme = context.muiTheme;


  var styles = {
    root: {
      // Nested div bacause the List scales x faster than it scales y
      transition: animated ? _transitions2.default.easeOut('250ms', 'transform') : null,
      zIndex: muiTheme.zIndex.menu,
      top: openDown ? 0 : null,
      bottom: !openDown ? 0 : null,
      left: !openLeft ? 0 : null,
      right: openLeft ? 0 : null,
      transform: animated ? 'scaleX(0)' : null,
      transformOrigin: openLeft ? 'right' : 'left',
      opacity: 0,
      maxHeight: maxHeight,
      overflowY: maxHeight ? 'auto' : null
    },
    divider: {
      marginTop: 7,
      marginBottom: 8
    },
    list: {
      display: 'table-cell',
      paddingBottom: desktop ? 16 : 8,
      paddingTop: desktop ? 16 : 8,
      userSelect: 'none',
      width: width
    },
    menuItemContainer: {
      transition: animated ? _transitions2.default.easeOut(null, 'opacity') : null,
      opacity: 0
    },
    selectedMenuItem: {
      color: muiTheme.baseTheme.palette.accent1Color
    }
  };

  return styles;
}

var Menu = function (_Component) {
  _inherits(Menu, _Component);

  function Menu(props, context) {
    _classCallCheck(this, Menu);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Menu).call(this, props, context));

    _initialiseProps.call(_this);

    var filteredChildren = _this.getFilteredChildren(props.children);
    var selectedIndex = _this.getSelectedIndex(props, filteredChildren);

    _this.state = {
      focusIndex: props.disableAutoFocus ? -1 : selectedIndex >= 0 ? selectedIndex : 0,
      isKeyboardFocused: props.initiallyKeyboardFocused,
      keyWidth: props.desktop ? 64 : 56
    };

    _this.hotKeyHolder = new _menuUtils.HotKeyHolder();
    return _this;
  }

  _createClass(Menu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.autoWidth) {
        this.setWidth();
      }
      if (!this.props.animated) {
        this.animateOpen();
      }
      this.setScollPosition();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var filteredChildren = this.getFilteredChildren(nextProps.children);
      var selectedIndex = this.getSelectedIndex(nextProps, filteredChildren);

      this.setState({
        focusIndex: nextProps.disableAutoFocus ? -1 : selectedIndex >= 0 ? selectedIndex : 0,
        keyWidth: nextProps.desktop ? 64 : 56
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
      return !(0, _shallowEqual2.default)(this.props, nextProps) || !(0, _shallowEqual2.default)(this.state, nextState) || !(0, _shallowEqual2.default)(this.context, nextContext);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.autoWidth) this.setWidth();
    }
  }, {
    key: 'getValueLink',


    // Do not use outside of this component, it will be removed once valueLink is deprecated
    value: function getValueLink(props) {
      return props.valueLink || {
        value: props.value,
        requestChange: props.onChange
      };
    }
  }, {
    key: 'setKeyboardFocused',
    value: function setKeyboardFocused(keyboardFocused) {
      this.setState({
        isKeyboardFocused: keyboardFocused
      });
    }
  }, {
    key: 'getFilteredChildren',
    value: function getFilteredChildren(children) {
      var filteredChildren = [];
      _react2.default.Children.forEach(children, function (child) {
        if (child) {
          filteredChildren.push(child);
        }
      });
      return filteredChildren;
    }
  }, {
    key: 'animateOpen',
    value: function animateOpen() {
      var rootStyle = _reactDom2.default.findDOMNode(this).style;
      var scrollContainerStyle = _reactDom2.default.findDOMNode(this.refs.scrollContainer).style;
      var menuContainers = _reactDom2.default.findDOMNode(this.refs.list).childNodes;

      _autoPrefix2.default.set(rootStyle, 'transform', 'scaleX(1)');
      _autoPrefix2.default.set(scrollContainerStyle, 'transform', 'scaleY(1)');
      scrollContainerStyle.opacity = 1;

      for (var i = 0; i < menuContainers.length; ++i) {
        menuContainers[i].style.opacity = 1;
      }
    }
  }, {
    key: 'cloneMenuItem',
    value: function cloneMenuItem(child, childIndex, styles, index) {
      var _this2 = this;

      var _props = this.props;
      var desktop = _props.desktop;
      var selectedMenuItemStyle = _props.selectedMenuItemStyle;


      var selected = this.isChildSelected(child, this.props);
      var selectedChildrenStyles = {};

      if (selected) {
        selectedChildrenStyles = (0, _simpleAssign2.default)(styles.selectedMenuItem, selectedMenuItemStyle);
      }

      var mergedChildrenStyles = (0, _simpleAssign2.default)({}, child.props.style, selectedChildrenStyles);

      var isFocused = childIndex === this.state.focusIndex;
      var focusState = 'none';
      if (isFocused) {
        focusState = this.state.isKeyboardFocused ? 'keyboard-focused' : 'focused';
      }

      return _react2.default.cloneElement(child, {
        desktop: desktop,
        focusState: focusState,
        onTouchTap: function onTouchTap(event) {
          _this2.handleMenuItemTouchTap(event, child, index);
          if (child.props.onTouchTap) child.props.onTouchTap(event);
        },
        ref: isFocused ? 'focusedMenuItem' : null,
        style: mergedChildrenStyles
      });
    }
  }, {
    key: 'decrementKeyboardFocusIndex',
    value: function decrementKeyboardFocusIndex() {
      var index = this.state.focusIndex;

      index--;
      if (index < 0) index = 0;

      this.setFocusIndex(index, true);
    }
  }, {
    key: 'getCascadeChildrenCount',
    value: function getCascadeChildrenCount(filteredChildren) {
      var _props2 = this.props;
      var desktop = _props2.desktop;
      var maxHeight = _props2.maxHeight;

      var count = 1;
      var currentHeight = desktop ? 16 : 8;
      var menuItemHeight = desktop ? 32 : 48;

      // MaxHeight isn't set - cascade all of the children
      if (!maxHeight) return filteredChildren.length;

      // Count all the children that will fit inside the max menu height
      filteredChildren.forEach(function (child) {
        if (currentHeight < maxHeight) {
          var childIsADivider = child.type && child.type.muiName === 'Divider';

          currentHeight += childIsADivider ? 16 : menuItemHeight;
          count++;
        }
      });

      return count;
    }
  }, {
    key: 'getMenuItemCount',
    value: function getMenuItemCount(filteredChildren) {
      var menuItemCount = 0;
      filteredChildren.forEach(function (child) {
        var childIsADivider = child.type && child.type.muiName === 'Divider';
        var childIsDisabled = child.props.disabled;
        if (!childIsADivider && !childIsDisabled) menuItemCount++;
      });
      return menuItemCount;
    }
  }, {
    key: 'getSelectedIndex',
    value: function getSelectedIndex(props, filteredChildren) {
      var _this3 = this;

      var selectedIndex = -1;
      var menuItemIndex = 0;

      filteredChildren.forEach(function (child) {
        var childIsADivider = child.type && child.type.muiName === 'Divider';

        if (_this3.isChildSelected(child, props)) selectedIndex = menuItemIndex;
        if (!childIsADivider) menuItemIndex++;
      });

      return selectedIndex;
    }
  }, {
    key: 'setFocusIndexStartsWith',
    value: function setFocusIndexStartsWith(keys) {
      var foundIndex = -1;
      _react2.default.Children.forEach(this.props.children, function (child, index) {
        if (foundIndex >= 0) {
          return;
        }
        var primaryText = child.props.primaryText;

        if (typeof primaryText === 'string' && new RegExp('^' + keys, 'i').test(primaryText)) {
          foundIndex = index;
        }
      });
      if (foundIndex >= 0) {
        this.setFocusIndex(foundIndex, true);
        return true;
      }
      return false;
    }
  }, {
    key: 'handleMenuItemTouchTap',
    value: function handleMenuItemTouchTap(event, item, index) {
      var children = this.props.children;
      var multiple = this.props.multiple;
      var valueLink = this.getValueLink(this.props);
      var menuValue = valueLink.value;
      var itemValue = item.props.value;
      var focusIndex = _react2.default.isValidElement(children) ? 0 : children.indexOf(item);

      this.setFocusIndex(focusIndex, false);

      if (multiple) {
        var itemIndex = menuValue.indexOf(itemValue);

        var _menuValue = _toArray(menuValue);

        var newMenuValue = _menuValue;

        if (itemIndex === -1) {
          newMenuValue.push(itemValue);
        } else {
          newMenuValue.splice(itemIndex, 1);
        }

        valueLink.requestChange(event, newMenuValue);
      } else if (!multiple && itemValue !== menuValue) {
        valueLink.requestChange(event, itemValue);
      }

      this.props.onItemTouchTap(event, item, index);
    }
  }, {
    key: 'incrementKeyboardFocusIndex',
    value: function incrementKeyboardFocusIndex(filteredChildren) {
      var index = this.state.focusIndex;
      var maxIndex = this.getMenuItemCount(filteredChildren) - 1;

      index++;
      if (index > maxIndex) index = maxIndex;

      this.setFocusIndex(index, true);
    }
  }, {
    key: 'isChildSelected',
    value: function isChildSelected(child, props) {
      var menuValue = this.getValueLink(props).value;
      var childValue = child.props.value;

      if (props.multiple) {
        return menuValue.length && menuValue.indexOf(childValue) !== -1;
      } else {
        return child.props.hasOwnProperty('value') && menuValue === childValue;
      }
    }
  }, {
    key: 'setFocusIndex',
    value: function setFocusIndex(newIndex, isKeyboardFocused) {
      this.setState({
        focusIndex: newIndex,
        isKeyboardFocused: isKeyboardFocused
      });
    }
  }, {
    key: 'setScollPosition',
    value: function setScollPosition() {
      var desktop = this.props.desktop;
      var focusedMenuItem = this.refs.focusedMenuItem;
      var menuItemHeight = desktop ? 32 : 48;

      if (focusedMenuItem) {
        var selectedOffSet = _reactDom2.default.findDOMNode(focusedMenuItem).offsetTop;

        // Make the focused item be the 2nd item in the list the user sees
        var scrollTop = selectedOffSet - menuItemHeight;
        if (scrollTop < menuItemHeight) scrollTop = 0;

        _reactDom2.default.findDOMNode(this.refs.scrollContainer).scrollTop = scrollTop;
      }
    }
  }, {
    key: 'setWidth',
    value: function setWidth() {
      var el = _reactDom2.default.findDOMNode(this);
      var listEl = _reactDom2.default.findDOMNode(this.refs.list);
      var elWidth = el.offsetWidth;
      var keyWidth = this.state.keyWidth;
      var minWidth = keyWidth * 1.5;
      var keyIncrements = elWidth / keyWidth;
      var newWidth = void 0;

      keyIncrements = keyIncrements <= 1.5 ? 1.5 : Math.ceil(keyIncrements);
      newWidth = keyIncrements * keyWidth;

      if (newWidth < minWidth) newWidth = minWidth;

      el.style.width = newWidth + 'px';
      listEl.style.width = newWidth + 'px';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props3 = this.props;
      var animated = _props3.animated;
      var autoWidth = _props3.autoWidth;
      var children = _props3.children;
      var desktop = _props3.desktop;
      var disableAutoFocus = _props3.disableAutoFocus;
      var initiallyKeyboardFocused = _props3.initiallyKeyboardFocused;
      var listStyle = _props3.listStyle;
      var maxHeight = _props3.maxHeight;
      var multiple = _props3.multiple;
      var _props3$openDirection = _props3.openDirection;
      var openDirection = _props3$openDirection === undefined ? 'bottom-left' : _props3$openDirection;
      var onItemTouchTap = _props3.onItemTouchTap;
      var onEscKeyDown = _props3.onEscKeyDown;
      var selectedMenuItemStyle = _props3.selectedMenuItemStyle;
      var style = _props3.style;
      var value = _props3.value;
      var valueLink = _props3.valueLink;
      var width = _props3.width;
      var zDepth = _props3.zDepth;

      var other = _objectWithoutProperties(_props3, ['animated', 'autoWidth', 'children', 'desktop', 'disableAutoFocus', 'initiallyKeyboardFocused', 'listStyle', 'maxHeight', 'multiple', 'openDirection', 'onItemTouchTap', 'onEscKeyDown', 'selectedMenuItemStyle', 'style', 'value', 'valueLink', 'width', 'zDepth']);

      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(typeof zDepth === 'undefined', 'Menu no longer supports `zDepth`. Instead, wrap it in `Paper` ' + 'or another component that provides `zDepth`. It will be removed with v0.16.0.') : void 0;

      var focusIndex = this.state.focusIndex;
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);

      var mergedRootStyles = (0, _simpleAssign2.default)(styles.root, style);
      var mergedListStyles = (0, _simpleAssign2.default)(styles.list, listStyle);

      var openDown = openDirection.split('-')[0] === 'bottom';
      var filteredChildren = this.getFilteredChildren(children);

      // Cascade children opacity
      var cumulativeDelay = openDown ? 175 : 325;
      var cascadeChildrenCount = this.getCascadeChildrenCount(filteredChildren);
      var cumulativeDelayIncrement = Math.ceil(150 / cascadeChildrenCount);

      var menuItemIndex = 0;
      var newChildren = _react2.default.Children.map(filteredChildren, function (child, index) {
        var childIsADivider = child.type && child.type.muiName === 'Divider';
        var childIsDisabled = child.props.disabled;
        var childrenContainerStyles = {};

        if (animated) {
          var transitionDelay = 0;

          // Only cascade the visible menu items
          if (menuItemIndex >= focusIndex - 1 && menuItemIndex <= focusIndex + cascadeChildrenCount - 1) {
            cumulativeDelay = openDown ? cumulativeDelay + cumulativeDelayIncrement : cumulativeDelay - cumulativeDelayIncrement;
            transitionDelay = cumulativeDelay;
          }

          childrenContainerStyles = (0, _simpleAssign2.default)({}, styles.menuItemContainer, {
            transitionDelay: transitionDelay + 'ms'
          });
        }

        var clonedChild = childIsADivider ? _react2.default.cloneElement(child, { style: styles.divider }) : childIsDisabled ? _react2.default.cloneElement(child, { desktop: desktop }) : _this4.cloneMenuItem(child, menuItemIndex, styles, index);

        if (!childIsADivider && !childIsDisabled) menuItemIndex++;

        return animated ? _react2.default.createElement(
          'div',
          { style: prepareStyles(childrenContainerStyles) },
          clonedChild
        ) : clonedChild;
      });

      return _react2.default.createElement(
        _ClickAwayListener2.default,
        { onClickAway: this.handleClickAway },
        _react2.default.createElement(
          'div',
          {
            onKeyDown: this.handleKeyDown,
            style: prepareStyles(mergedRootStyles),
            ref: 'scrollContainer'
          },
          _react2.default.createElement(
            _List2.default,
            _extends({}, other, {
              ref: 'list',
              style: mergedListStyles
            }),
            newChildren
          )
        )
      );
    }
  }]);

  return Menu;
}(_react.Component);

Menu.propTypes = {
  /**
   * If true, the menu will apply transitions when it
   * is added to the DOM. In order for transitions to
   * work, wrap the menu inside a `ReactTransitionGroup`.
   */
  animated: (0, _deprecatedPropType2.default)(_react.PropTypes.bool, 'Instead, use a [Popover](/#/components/popover).\n      It will be removed with v0.16.0.'),
  /**
   * If true, the width of the menu will be set automatically
   * according to the widths of its children,
   * using proper keyline increments (64px for desktop,
   * 56px otherwise).
   */
  autoWidth: _react.PropTypes.bool,
  /**
   * The content of the menu. This is usually used to pass `MenuItem`
   * elements.
   */
  children: _react.PropTypes.node,
  /**
   * If true, the menu item will render with compact desktop styles.
   */
  desktop: _react.PropTypes.bool,
  /**
   * If true, the menu will not be auto-focused.
   */
  disableAutoFocus: _react.PropTypes.bool,
  /**
   * If true, the menu will be keyboard-focused initially.
   */
  initiallyKeyboardFocused: _react.PropTypes.bool,
  /**
   * Override the inline-styles of the underlying `List` element.
   */
  listStyle: _react.PropTypes.object,
  /**
   * The maximum height of the menu in pixels. If specified,
   * the menu will be scrollable if it is taller than the provided
   * height.
   */
  maxHeight: _react.PropTypes.number,
  /**
   * If true, `value` must be an array and the menu will support
   * multiple selections.
   */
  multiple: _react.PropTypes.bool,
  /**
   * Callback function fired when a menu item with `value` not
   * equal to the current `value` of the menu is touch-tapped.
   *
   * @param {object} event TouchTap event targeting the menu item.
   * @param {any}  value If `multiple` is true, the menu's `value`
   * array with either the menu item's `value` added (if
   * it wasn't already selected) or omitted (if it was already selected).
   * Otherwise, the `value` of the menu item.
   */
  onChange: _react.PropTypes.func,
  /**
   * Callback function fired when the menu is focused and the *Esc* key
   * is pressed.
   *
   * @param {object} event `keydown` event targeting the menu.
   */
  onEscKeyDown: _react.PropTypes.func,
  /**
   * Callback function fired when a menu item is touch-tapped.
   *
   * @param {object} event TouchTap event targeting the menu item.
   * @param {object} menuItem The menu item.
   * @param {number} index The index of the menu item.
   */
  onItemTouchTap: _react.PropTypes.func,
  /** @ignore */
  onKeyDown: _react.PropTypes.func,
  /**
   * This is the placement of the menu relative to the `IconButton`.
   */
  openDirection: (0, _deprecatedPropType2.default)(_propTypes2.default.corners, 'Instead, use a [Popover](/#/components/popover).\n      It will be removed with v0.16.0.'),
  /**
   * Override the inline-styles of selected menu items.
   */
  selectedMenuItemStyle: _react.PropTypes.object,
  /**
   * Override the inline-styles of the root element.
   */
  style: _react.PropTypes.object,
  /**
   * If `multiple` is true, an array of the `value`s of the selected
   * menu items. Otherwise, the `value` of the selected menu item.
   * If provided, the menu will be a controlled component.
   * This component also supports valueLink.
   */
  value: _react.PropTypes.any,
  /**
   * ValueLink for the menu's `value`.
   */
  valueLink: _react.PropTypes.object,
  /**
   * The width of the menu. If not specified, the menu's width
   * will be set according to the widths of its children, using
   * proper keyline increments (64px for desktop, 56px otherwise).
   */
  width: _propTypes2.default.stringOrNumber,
  /**
   * @ignore
   * Menu no longer supports `zDepth`. Instead, wrap it in `Paper`
   * or another component that provides zDepth.
   */
  zDepth: _propTypes2.default.zDepth
};
Menu.defaultProps = {
  autoWidth: true,
  desktop: false,
  disableAutoFocus: false,
  initiallyKeyboardFocused: false,
  maxHeight: null,
  multiple: false,
  onChange: function onChange() {},
  onEscKeyDown: function onEscKeyDown() {},
  onItemTouchTap: function onItemTouchTap() {},
  onKeyDown: function onKeyDown() {}
};
Menu.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};

var _initialiseProps = function _initialiseProps() {
  var _this5 = this;

  this.handleClickAway = function (event) {
    if (event.defaultPrevented) {
      return;
    }

    _this5.setFocusIndex(-1, false);
  };

  this.handleKeyDown = function (event) {
    var filteredChildren = _this5.getFilteredChildren(_this5.props.children);
    var key = (0, _keycode2.default)(event);
    switch (key) {
      case 'down':
        event.preventDefault();
        _this5.incrementKeyboardFocusIndex(filteredChildren);
        break;
      case 'esc':
        _this5.props.onEscKeyDown(event);
        break;
      case 'tab':
        event.preventDefault();
        if (event.shiftKey) {
          _this5.decrementKeyboardFocusIndex();
        } else {
          _this5.incrementKeyboardFocusIndex(filteredChildren);
        }
        break;
      case 'up':
        event.preventDefault();
        _this5.decrementKeyboardFocusIndex();
        break;
      default:
        if (key.length === 1) {
          var hotKeys = _this5.hotKeyHolder.append(key);
          if (_this5.setFocusIndexStartsWith(hotKeys)) {
            event.preventDefault();
          }
        }
    }
    _this5.props.onKeyDown(event);
  };
};

exports.default = Menu;