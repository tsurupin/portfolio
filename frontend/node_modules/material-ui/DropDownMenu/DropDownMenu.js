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

var _arrowDropDown = require('../svg-icons/navigation/arrow-drop-down');

var _arrowDropDown2 = _interopRequireDefault(_arrowDropDown);

var _Menu = require('../Menu/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _ClearFix = require('../internal/ClearFix');

var _ClearFix2 = _interopRequireDefault(_ClearFix);

var _Popover = require('../Popover/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _PopoverAnimationVertical = require('../Popover/PopoverAnimationVertical');

var _PopoverAnimationVertical2 = _interopRequireDefault(_PopoverAnimationVertical);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var anchorOrigin = {
  vertical: 'top',
  horizontal: 'left'
};

function getStyles(props, context) {
  var disabled = props.disabled;

  var spacing = context.muiTheme.baseTheme.spacing;
  var palette = context.muiTheme.baseTheme.palette;
  var accentColor = context.muiTheme.dropDownMenu.accentColor;
  return {
    control: {
      cursor: disabled ? 'not-allowed' : 'pointer',
      height: '100%',
      position: 'relative',
      width: '100%'
    },
    icon: {
      fill: accentColor,
      position: 'absolute',
      right: spacing.desktopGutterLess,
      top: (spacing.desktopToolbarHeight - 24) / 2
    },
    label: {
      color: disabled ? palette.disabledColor : palette.textColor,
      lineHeight: spacing.desktopToolbarHeight + 'px',
      opacity: 1,
      position: 'relative',
      paddingLeft: spacing.desktopGutter,
      paddingRight: spacing.iconSize + spacing.desktopGutterLess + spacing.desktopGutterMini,
      top: 0
    },
    labelWhenOpen: {
      opacity: 0,
      top: spacing.desktopToolbarHeight / 8
    },
    root: {
      display: 'inline-block',
      fontSize: spacing.desktopDropDownMenuFontSize,
      height: spacing.desktopSubheaderHeight,
      fontFamily: context.muiTheme.baseTheme.fontFamily,
      outline: 'none',
      position: 'relative',
      transition: _transitions2.default.easeOut()
    },
    rootWhenOpen: {
      opacity: 1
    },
    underline: {
      borderTop: 'solid 1px ' + accentColor,
      bottom: 1,
      left: 0,
      margin: '-1px ' + spacing.desktopGutter + 'px',
      right: 0,
      position: 'absolute'
    }
  };
}

var DropDownMenu = function (_Component) {
  _inherits(DropDownMenu, _Component);

  function DropDownMenu() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, DropDownMenu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DropDownMenu)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      open: false
    }, _this.handleTouchTapControl = function (event) {
      event.preventDefault();
      if (!_this.props.disabled) {
        _this.setState({
          open: !_this.state.open,
          anchorEl: _this.refs.root
        });
      }
    }, _this.handleRequestCloseMenu = function () {
      _this.setState({
        open: false,
        anchorEl: null
      });
    }, _this.handleItemTouchTap = function (event, child, index) {
      event.persist();
      _this.setState({
        open: false
      }, function () {
        if (_this.props.onChange) {
          _this.props.onChange(event, index, child.props.value);
        }
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // The nested styles for drop-down-menu are modified by toolbar and possibly
  // other user components, so it will give full access to its js styles rather
  // than just the parent.


  _createClass(DropDownMenu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.autoWidth) {
        this.setWidth();
      }
      if (this.props.openImmediately) {
        // TODO: Temporary fix to make openImmediately work with popover.
        /* eslint-disable react/no-did-mount-set-state */
        setTimeout(function () {
          return _this2.setState({ open: true, anchorEl: _this2.refs.root });
        });
        setTimeout(function () {
          return _this2.setState({
            open: true,
            anchorEl: _this2.refs.root
          });
        }, 0);
        /* eslint-enable react/no-did-mount-set-state */
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      if (this.props.autoWidth) {
        this.setWidth();
      }
    }

    /**
     * This method is deprecated but still here because the TextField
     * need it in order to work. TODO: That will be addressed later.
     */

  }, {
    key: 'getInputNode',
    value: function getInputNode() {
      var _this3 = this;

      var root = this.refs.root;

      root.focus = function () {
        if (!_this3.props.disabled) {
          _this3.setState({
            open: !_this3.state.open,
            anchorEl: _this3.refs.root
          });
        }
      };

      return root;
    }
  }, {
    key: 'setWidth',
    value: function setWidth() {
      var el = this.refs.root;
      if (!this.props.style || !this.props.style.hasOwnProperty('width')) {
        el.style.width = 'auto';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var animated = _props.animated;
      var autoWidth = _props.autoWidth;
      var children = _props.children;
      var className = _props.className;
      var iconStyle = _props.iconStyle;
      var labelStyle = _props.labelStyle;
      var listStyle = _props.listStyle;
      var maxHeight = _props.maxHeight;
      var menuStyleProp = _props.menuStyle;
      var openImmediately = _props.openImmediately;
      var style = _props.style;
      var underlineStyle = _props.underlineStyle;
      var value = _props.value;

      var other = _objectWithoutProperties(_props, ['animated', 'autoWidth', 'children', 'className', 'iconStyle', 'labelStyle', 'listStyle', 'maxHeight', 'menuStyle', 'openImmediately', 'style', 'underlineStyle', 'value']);

      var _state = this.state;
      var anchorEl = _state.anchorEl;
      var open = _state.open;
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);

      var displayValue = '';
      _react2.default.Children.forEach(children, function (child) {
        if (value === child.props.value) {
          // This will need to be improved (in case primaryText is a node)
          displayValue = child.props.label || child.props.primaryText;
        }
      });

      var menuStyle = void 0;
      if (anchorEl && !autoWidth) {
        menuStyle = (0, _simpleAssign2.default)({
          width: anchorEl.clientWidth
        }, menuStyleProp);
      } else {
        menuStyle = menuStyleProp;
      }

      return _react2.default.createElement(
        'div',
        _extends({}, other, {
          ref: 'root',
          className: className,
          style: prepareStyles((0, _simpleAssign2.default)({}, styles.root, open && styles.rootWhenOpen, style))
        }),
        _react2.default.createElement(
          _ClearFix2.default,
          { style: styles.control, onTouchTap: this.handleTouchTapControl },
          _react2.default.createElement(
            'div',
            {
              style: prepareStyles((0, _simpleAssign2.default)({}, styles.label, open && styles.labelWhenOpen, labelStyle))
            },
            displayValue
          ),
          _react2.default.createElement(_arrowDropDown2.default, { style: (0, _simpleAssign2.default)({}, styles.icon, iconStyle) }),
          _react2.default.createElement('div', { style: prepareStyles((0, _simpleAssign2.default)({}, styles.underline, underlineStyle)) })
        ),
        _react2.default.createElement(
          _Popover2.default,
          {
            anchorOrigin: anchorOrigin,
            anchorEl: anchorEl,
            animation: _PopoverAnimationVertical2.default,
            open: open,
            animated: animated,
            onRequestClose: this.handleRequestCloseMenu
          },
          _react2.default.createElement(
            _Menu2.default,
            {
              maxHeight: maxHeight,
              desktop: true,
              value: value,
              style: menuStyle,
              listStyle: listStyle,
              onItemTouchTap: this.handleItemTouchTap
            },
            children
          )
        )
      );
    }
  }]);

  return DropDownMenu;
}(_react.Component);

DropDownMenu.muiName = 'DropDownMenu';
DropDownMenu.propTypes = {
  /**
   * If true, the popover will apply transitions when
   * it gets added to the DOM.
   */
  animated: _react.PropTypes.bool,
  /**
   * The width will automatically be set according to the items inside the menu.
   * To control this width in css instead, set this prop to `false`.
   */
  autoWidth: _react.PropTypes.bool,
  /**
   * The `MenuItem`s to populate the `Menu` with. If the `MenuItems` have the
   * prop `label` that value will be used to render the representation of that
   * item within the field.
   */
  children: _react.PropTypes.node,
  /**
   * The css class name of the root element.
   */
  className: _react.PropTypes.string,
  /**
   * Disables the menu.
   */
  disabled: _react.PropTypes.bool,
  /**
   * Overrides the styles of icon element.
   */
  iconStyle: _react.PropTypes.object,
  /**
   * Overrides the styles of label when the `DropDownMenu` is inactive.
   */
  labelStyle: _react.PropTypes.object,
  /**
   * The style object to use to override underlying list style.
   */
  listStyle: _react.PropTypes.object,
  /**
   * The maximum height of the `Menu` when it is displayed.
   */
  maxHeight: _react.PropTypes.number,
  /**
   * Overrides the styles of `Menu` when the `DropDownMenu` is displayed.
   */
  menuStyle: _react.PropTypes.object,
  /**
   * Callback function fired when a menu item is clicked, other than the one currently selected.
   *
   * @param {object} event TouchTap event targeting the menu item that was clicked.
   * @param {number} key The index of the clicked menu item in the `children` collection.
   * @param {any} payload The `value` prop of the clicked menu item.
   */
  onChange: _react.PropTypes.func,
  /**
   * Set to true to have the `DropDownMenu` automatically open on mount.
   */
  openImmediately: _react.PropTypes.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: _react.PropTypes.object,
  /**
   * Overrides the inline-styles of the underline.
   */
  underlineStyle: _react.PropTypes.object,
  /**
   * The value that is currently selected.
   */
  value: _react.PropTypes.any
};
DropDownMenu.defaultProps = {
  animated: true,
  autoWidth: true,
  disabled: false,
  openImmediately: false,
  maxHeight: 500
};
DropDownMenu.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = DropDownMenu;