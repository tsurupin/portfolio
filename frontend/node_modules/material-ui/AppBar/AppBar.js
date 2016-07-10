'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.getStyles = getStyles;

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _IconButton = require('../IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _menu = require('../svg-icons/navigation/menu');

var _menu2 = _interopRequireDefault(_menu);

var _Paper = require('../Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _propTypes = require('../utils/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getStyles(props, context) {
  var _context$muiTheme = context.muiTheme;
  var appBar = _context$muiTheme.appBar;
  var iconButtonSize = _context$muiTheme.button.iconButtonSize;
  var zIndex = _context$muiTheme.zIndex;


  var flatButtonSize = 36;

  var styles = {
    root: {
      position: 'relative',
      zIndex: zIndex.appBar,
      width: '100%',
      display: 'flex',
      backgroundColor: appBar.color,
      paddingLeft: appBar.padding,
      paddingRight: appBar.padding
    },
    title: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      margin: 0,
      paddingTop: 0,
      letterSpacing: 0,
      fontSize: 24,
      fontWeight: appBar.titleFontWeight,
      color: appBar.textColor,
      height: appBar.height,
      lineHeight: appBar.height + 'px'
    },
    mainElement: {
      boxFlex: 1,
      flex: '1'
    },
    iconButtonStyle: {
      marginTop: (appBar.height - iconButtonSize) / 2,
      marginRight: 8,
      marginLeft: -16
    },
    iconButtonIconStyle: {
      fill: appBar.textColor,
      color: appBar.textColor
    },
    flatButton: {
      color: appBar.textColor,
      marginTop: (iconButtonSize - flatButtonSize) / 2 + 1
    }
  };

  return styles;
}

var AppBar = function (_Component) {
  _inherits(AppBar, _Component);

  function AppBar() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, AppBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(AppBar)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleTouchTapLeftIconButton = function (event) {
      if (_this.props.onLeftIconButtonTouchTap) {
        _this.props.onLeftIconButtonTouchTap(event);
      }
    }, _this.handleTouchTapRightIconButton = function (event) {
      if (_this.props.onRightIconButtonTouchTap) {
        _this.props.onRightIconButtonTouchTap(event);
      }
    }, _this.handleTitleTouchTap = function (event) {
      if (_this.props.onTitleTouchTap) {
        _this.props.onTitleTouchTap(event);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AppBar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(!this.props.iconElementLeft || !this.props.iconClassNameLeft, 'Properties iconElementLeft\n      and iconClassNameLeft cannot be simultaneously defined. Please use one or the other.') : void 0;

      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(!this.props.iconElementRight || !this.props.iconClassNameRight, 'Properties iconElementRight\n      and iconClassNameRight cannot be simultaneously defined. Please use one or the other.') : void 0;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var title = _props.title;
      var titleStyle = _props.titleStyle;
      var iconStyleLeft = _props.iconStyleLeft;
      var iconStyleRight = _props.iconStyleRight;
      var onTitleTouchTap = _props.onTitleTouchTap;
      var showMenuIconButton = _props.showMenuIconButton;
      var iconElementLeft = _props.iconElementLeft;
      var iconElementRight = _props.iconElementRight;
      var iconClassNameLeft = _props.iconClassNameLeft;
      var iconClassNameRight = _props.iconClassNameRight;
      var onLeftIconButtonTouchTap = _props.onLeftIconButtonTouchTap;
      var className = _props.className;
      var style = _props.style;
      var zDepth = _props.zDepth;
      var children = _props.children;

      var other = _objectWithoutProperties(_props, ['title', 'titleStyle', 'iconStyleLeft', 'iconStyleRight', 'onTitleTouchTap', 'showMenuIconButton', 'iconElementLeft', 'iconElementRight', 'iconClassNameLeft', 'iconClassNameRight', 'onLeftIconButtonTouchTap', 'className', 'style', 'zDepth', 'children']);

      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);

      var menuElementLeft = void 0;
      var menuElementRight = void 0;

      // If the title is a string, wrap in an h1 tag.
      // If not, wrap in a div tag.
      var titleComponent = typeof title === 'string' || title instanceof String ? 'h1' : 'div';

      var titleElement = _react2.default.createElement(titleComponent, {
        onTouchTap: this.handleTitleTouchTap,
        style: prepareStyles((0, _simpleAssign2.default)(styles.title, styles.mainElement, titleStyle))
      }, title);

      var iconLeftStyle = (0, _simpleAssign2.default)({}, styles.iconButtonStyle, iconStyleLeft);

      if (showMenuIconButton) {
        var iconElementLeftNode = iconElementLeft;

        if (iconElementLeft) {
          if (iconElementLeft.type.muiName === 'IconButton') {
            var iconElemLeftChildren = iconElementLeft.props.children;
            var iconButtonIconStyle = !(iconElemLeftChildren && iconElemLeftChildren.props && iconElemLeftChildren.props.color) ? styles.iconButtonIconStyle : null;

            iconElementLeftNode = _react2.default.cloneElement(iconElementLeft, {
              iconStyle: (0, _simpleAssign2.default)({}, iconButtonIconStyle, iconElementLeft.props.iconStyle)
            });
          }

          menuElementLeft = _react2.default.createElement(
            'div',
            { style: prepareStyles(iconLeftStyle) },
            iconElementLeftNode
          );
        } else {
          var child = iconClassNameLeft ? '' : _react2.default.createElement(_menu2.default, { style: (0, _simpleAssign2.default)({}, styles.iconButtonIconStyle) });
          menuElementLeft = _react2.default.createElement(
            _IconButton2.default,
            {
              style: iconLeftStyle,
              iconStyle: styles.iconButtonIconStyle,
              iconClassName: iconClassNameLeft,
              onTouchTap: this.handleTouchTapLeftIconButton
            },
            child
          );
        }
      }

      var iconRightStyle = (0, _simpleAssign2.default)({}, styles.iconButtonStyle, {
        marginRight: -16,
        marginLeft: 'auto'
      }, iconStyleRight);

      if (iconElementRight) {
        var iconElementRightNode = iconElementRight;

        switch (iconElementRight.type.muiName) {
          case 'IconMenu':
          case 'IconButton':
            var iconElemRightChildren = iconElementRight.props.children;
            var _iconButtonIconStyle = !(iconElemRightChildren && iconElemRightChildren.props && iconElemRightChildren.props.color) ? styles.iconButtonIconStyle : null;

            iconElementRightNode = _react2.default.cloneElement(iconElementRight, {
              iconStyle: (0, _simpleAssign2.default)({}, _iconButtonIconStyle, iconElementRight.props.iconStyle)
            });
            break;

          case 'FlatButton':
            iconElementRightNode = _react2.default.cloneElement(iconElementRight, {
              style: (0, _simpleAssign2.default)({}, styles.flatButton, iconElementRight.props.style)
            });
            break;

          default:
        }

        menuElementRight = _react2.default.createElement(
          'div',
          { style: prepareStyles(iconRightStyle) },
          iconElementRightNode
        );
      } else if (iconClassNameRight) {
        menuElementRight = _react2.default.createElement(_IconButton2.default, {
          style: iconRightStyle,
          iconStyle: styles.iconButtonIconStyle,
          iconClassName: iconClassNameRight,
          onTouchTap: this.handleTouchTapRightIconButton
        });
      }

      return _react2.default.createElement(
        _Paper2.default,
        _extends({}, other, {
          rounded: false,
          className: className,
          style: (0, _simpleAssign2.default)({}, styles.root, style),
          zDepth: zDepth
        }),
        menuElementLeft,
        titleElement,
        menuElementRight,
        children
      );
    }
  }]);

  return AppBar;
}(_react.Component);

AppBar.muiName = 'AppBar';
AppBar.propTypes = {
  /**
   * Can be used to render a tab inside an app bar for instance.
   */
  children: _react.PropTypes.node,
  /**
   * Applied to the app bar's root element.
   */
  className: _react.PropTypes.string,
  /**
   * The classname of the icon on the left of the app bar.
   * If you are using a stylesheet for your icons, enter the class name for the icon to be used here.
   */
  iconClassNameLeft: _react.PropTypes.string,
  /**
   * Similiar to the iconClassNameLeft prop except that
   * it applies to the icon displayed on the right of the app bar.
   */
  iconClassNameRight: _react.PropTypes.string,
  /**
   * The custom element to be displayed on the left side of the
   * app bar such as an SvgIcon.
   */
  iconElementLeft: _react.PropTypes.element,
  /**
   * Similiar to the iconElementLeft prop except that this element is displayed on the right of the app bar.
   */
  iconElementRight: _react.PropTypes.element,
  /**
   * Override the inline-styles of the element displayed on the left side of the app bar.
   */
  iconStyleLeft: _react.PropTypes.object,
  /**
   * Override the inline-styles of the element displayed on the right side of the app bar.
   */
  iconStyleRight: _react.PropTypes.object,
  /**
   * Callback function for when the left icon is selected via a touch tap.
   *
   * @param {object} event TouchTap event targeting the left `IconButton`.
   */
  onLeftIconButtonTouchTap: _react.PropTypes.func,
  /**
   * Callback function for when the right icon is selected via a touch tap.
   *
   * @param {object} event TouchTap event targeting the right `IconButton`.
   */
  onRightIconButtonTouchTap: _react.PropTypes.func,
  /**
   * Callback function for when the title text is selected via a touch tap.
   *
   * @param {object} event TouchTap event targeting the `title` node.
   */
  onTitleTouchTap: _react.PropTypes.func,
  /**
   * Determines whether or not to display the Menu icon next to the title.
   * Setting this prop to false will hide the icon.
   */
  showMenuIconButton: _react.PropTypes.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: _react.PropTypes.object,
  /**
   * The title to display on the app bar.
   */
  title: _react.PropTypes.node,
  /**
   * Override the inline-styles of the app bar's title element.
   */
  titleStyle: _react.PropTypes.object,
  /**
   * The zDepth of the component.
   * The shadow of the app bar is also dependent on this property.
   */
  zDepth: _propTypes2.default.zDepth
};
AppBar.defaultProps = {
  showMenuIconButton: true,
  title: '',
  zDepth: 1
};
AppBar.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = AppBar;