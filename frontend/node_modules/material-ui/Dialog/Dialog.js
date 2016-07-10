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

var _reactEventListener = require('react-event-listener');

var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _transitions = require('../styles/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

var _Overlay = require('../internal/Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _RenderToLayer = require('../internal/RenderToLayer');

var _RenderToLayer2 = _interopRequireDefault(_RenderToLayer);

var _Paper = require('../Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _reactAddonsTransitionGroup = require('react-addons-transition-group');

var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TransitionItem = function (_Component) {
  _inherits(TransitionItem, _Component);

  function TransitionItem() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, TransitionItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TransitionItem)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      style: {}
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TransitionItem, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.enterTimeout);
      clearTimeout(this.leaveTimeout);
    }
  }, {
    key: 'componentWillEnter',
    value: function componentWillEnter(callback) {
      this.componentWillAppear(callback);
    }
  }, {
    key: 'componentWillAppear',
    value: function componentWillAppear(callback) {
      var spacing = this.context.muiTheme.baseTheme.spacing;

      this.setState({
        style: {
          opacity: 1,
          transform: 'translate3d(0, ' + spacing.desktopKeylineIncrement + 'px, 0)'
        }
      });

      this.enterTimeout = setTimeout(callback, 450); // matches transition duration
    }
  }, {
    key: 'componentWillLeave',
    value: function componentWillLeave(callback) {
      this.setState({
        style: {
          opacity: 0,
          transform: 'translate3d(0, 0, 0)'
        }
      });

      this.leaveTimeout = setTimeout(callback, 450); // matches transition duration
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var style = _props.style;
      var children = _props.children;

      var other = _objectWithoutProperties(_props, ['style', 'children']);

      var prepareStyles = this.context.muiTheme.prepareStyles;


      return _react2.default.createElement(
        'div',
        _extends({}, other, { style: prepareStyles((0, _simpleAssign2.default)({}, this.state.style, style)) }),
        children
      );
    }
  }]);

  return TransitionItem;
}(_react.Component);

TransitionItem.propTypes = {
  children: _react.PropTypes.node,
  style: _react.PropTypes.object
};
TransitionItem.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};


function getStyles(props, context) {
  var autoScrollBodyContent = props.autoScrollBodyContent;
  var open = props.open;
  var _context$muiTheme = context.muiTheme;
  var _context$muiTheme$bas = _context$muiTheme.baseTheme;
  var spacing = _context$muiTheme$bas.spacing;
  var palette = _context$muiTheme$bas.palette;
  var dialog = _context$muiTheme.dialog;
  var zIndex = _context$muiTheme.zIndex;


  var gutter = spacing.desktopGutter;
  var borderScroll = '1px solid ' + palette.borderColor;

  return {
    root: {
      position: 'fixed',
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      zIndex: zIndex.dialog,
      top: 0,
      left: open ? 0 : -10000,
      width: '100%',
      height: '100%',
      transition: open ? _transitions2.default.easeOut('0ms', 'left', '0ms') : _transitions2.default.easeOut('0ms', 'left', '450ms')
    },
    content: {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      transition: _transitions2.default.easeOut(),
      position: 'relative',
      width: '75%',
      maxWidth: spacing.desktopKeylineIncrement * 12,
      margin: '0 auto',
      zIndex: zIndex.dialog
    },
    actionsContainer: {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      padding: 8,
      width: '100%',
      textAlign: 'right',
      marginTop: autoScrollBodyContent ? -1 : 0,
      borderTop: autoScrollBodyContent ? borderScroll : 'none'
    },
    overlay: {
      zIndex: zIndex.dialogOverlay
    },
    title: {
      margin: 0,
      padding: gutter + 'px ' + gutter + 'px 20px ' + gutter + 'px',
      color: palette.textColor,
      fontSize: dialog.titleFontSize,
      lineHeight: '32px',
      fontWeight: 400,
      marginBottom: autoScrollBodyContent ? -1 : 0,
      borderBottom: autoScrollBodyContent ? borderScroll : 'none'
    },
    body: {
      fontSize: dialog.bodyFontSize,
      color: dialog.bodyColor,
      padding: (props.title ? 0 : gutter) + 'px ' + gutter + 'px ' + gutter + 'px',
      boxSizing: 'border-box',
      overflowY: autoScrollBodyContent ? 'auto' : 'hidden'
    }
  };
}

var DialogInline = function (_Component2) {
  _inherits(DialogInline, _Component2);

  function DialogInline() {
    var _Object$getPrototypeO2;

    var _temp2, _this2, _ret2;

    _classCallCheck(this, DialogInline);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(DialogInline)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this2), _this2.handleTouchTapOverlay = function () {
      _this2.requestClose(false);
    }, _this2.handleKeyUp = function (event) {
      if ((0, _keycode2.default)(event) === 'esc') {
        _this2.requestClose(false);
      }
    }, _this2.handleResize = function () {
      _this2.positionDialog();
    }, _temp2), _possibleConstructorReturn(_this2, _ret2);
  }

  _createClass(DialogInline, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.positionDialog();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.positionDialog();
    }
  }, {
    key: 'positionDialog',
    value: function positionDialog() {
      var _props2 = this.props;
      var actions = _props2.actions;
      var autoDetectWindowHeight = _props2.autoDetectWindowHeight;
      var autoScrollBodyContent = _props2.autoScrollBodyContent;
      var bodyStyle = _props2.bodyStyle;
      var open = _props2.open;
      var repositionOnUpdate = _props2.repositionOnUpdate;
      var title = _props2.title;


      if (!open) {
        return;
      }

      var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      var container = _reactDom2.default.findDOMNode(this);
      var dialogWindow = _reactDom2.default.findDOMNode(this.refs.dialogWindow);
      var dialogContent = _reactDom2.default.findDOMNode(this.refs.dialogContent);
      var minPaddingTop = 16;

      // Reset the height in case the window was resized.
      dialogWindow.style.height = '';
      dialogContent.style.height = '';

      var dialogWindowHeight = dialogWindow.offsetHeight;
      var paddingTop = (clientHeight - dialogWindowHeight) / 2 - 64;
      if (paddingTop < minPaddingTop) paddingTop = minPaddingTop;

      // Vertically center the dialog window, but make sure it doesn't
      // transition to that position.
      if (repositionOnUpdate || !container.style.paddingTop) {
        container.style.paddingTop = paddingTop + 'px';
      }

      // Force a height if the dialog is taller than clientHeight
      if (autoDetectWindowHeight || autoScrollBodyContent) {
        var styles = getStyles(this.props, this.context);
        styles.body = (0, _simpleAssign2.default)(styles.body, bodyStyle);
        var maxDialogContentHeight = clientHeight - 2 * 64;

        if (title) maxDialogContentHeight -= dialogContent.previousSibling.offsetHeight;

        if (_react2.default.Children.count(actions)) {
          maxDialogContentHeight -= dialogContent.nextSibling.offsetHeight;
        }

        dialogContent.style.maxHeight = maxDialogContentHeight + 'px';
      }
    }
  }, {
    key: 'requestClose',
    value: function requestClose(buttonClicked) {
      if (!buttonClicked && this.props.modal) {
        return;
      }

      if (this.props.onRequestClose) {
        this.props.onRequestClose(!!buttonClicked);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var actions = _props3.actions;
      var actionsContainerClassName = _props3.actionsContainerClassName;
      var actionsContainerStyle = _props3.actionsContainerStyle;
      var bodyClassName = _props3.bodyClassName;
      var bodyStyle = _props3.bodyStyle;
      var children = _props3.children;
      var className = _props3.className;
      var contentClassName = _props3.contentClassName;
      var contentStyle = _props3.contentStyle;
      var overlayClassName = _props3.overlayClassName;
      var overlayStyle = _props3.overlayStyle;
      var open = _props3.open;
      var titleClassName = _props3.titleClassName;
      var titleStyle = _props3.titleStyle;
      var title = _props3.title;
      var style = _props3.style;
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);

      styles.root = (0, _simpleAssign2.default)(styles.root, style);
      styles.content = (0, _simpleAssign2.default)(styles.content, contentStyle);
      styles.body = (0, _simpleAssign2.default)(styles.body, bodyStyle);
      styles.actionsContainer = (0, _simpleAssign2.default)(styles.actionsContainer, actionsContainerStyle);
      styles.overlay = (0, _simpleAssign2.default)(styles.overlay, overlayStyle);
      styles.title = (0, _simpleAssign2.default)(styles.title, titleStyle);

      var actionsContainer = _react2.default.Children.count(actions) > 0 && _react2.default.createElement(
        'div',
        { className: actionsContainerClassName, style: prepareStyles(styles.actionsContainer) },
        _react2.default.Children.toArray(actions)
      );

      var titleElement = title;
      if (_react2.default.isValidElement(title)) {
        titleElement = _react2.default.cloneElement(title, {
          className: title.props.className || titleClassName,
          style: prepareStyles((0, _simpleAssign2.default)(styles.title, title.props.style))
        });
      } else if (typeof title === 'string') {
        titleElement = _react2.default.createElement(
          'h3',
          { className: titleClassName, style: prepareStyles(styles.title) },
          title
        );
      }

      return _react2.default.createElement(
        'div',
        { className: className, style: prepareStyles(styles.root) },
        open && _react2.default.createElement(_reactEventListener2.default, {
          target: 'window',
          onKeyUp: this.handleKeyUp,
          onResize: this.handleResize
        }),
        _react2.default.createElement(
          _reactAddonsTransitionGroup2.default,
          {
            component: 'div',
            ref: 'dialogWindow',
            transitionAppear: true,
            transitionAppearTimeout: 450,
            transitionEnter: true,
            transitionEnterTimeout: 450
          },
          open && _react2.default.createElement(
            TransitionItem,
            {
              className: contentClassName,
              style: styles.content
            },
            _react2.default.createElement(
              _Paper2.default,
              { zDepth: 4 },
              titleElement,
              _react2.default.createElement(
                'div',
                {
                  ref: 'dialogContent',
                  className: bodyClassName,
                  style: prepareStyles(styles.body)
                },
                children
              ),
              actionsContainer
            )
          )
        ),
        _react2.default.createElement(_Overlay2.default, {
          show: open,
          className: overlayClassName,
          style: styles.overlay,
          onTouchTap: this.handleTouchTapOverlay
        })
      );
    }
  }]);

  return DialogInline;
}(_react.Component);

DialogInline.propTypes = {
  actions: _react.PropTypes.node,
  actionsContainerClassName: _react.PropTypes.string,
  actionsContainerStyle: _react.PropTypes.object,
  autoDetectWindowHeight: _react.PropTypes.bool,
  autoScrollBodyContent: _react.PropTypes.bool,
  bodyClassName: _react.PropTypes.string,
  bodyStyle: _react.PropTypes.object,
  children: _react.PropTypes.node,
  className: _react.PropTypes.string,
  contentClassName: _react.PropTypes.string,
  contentStyle: _react.PropTypes.object,
  modal: _react.PropTypes.bool,
  onRequestClose: _react.PropTypes.func,
  open: _react.PropTypes.bool.isRequired,
  overlayClassName: _react.PropTypes.string,
  overlayStyle: _react.PropTypes.object,
  repositionOnUpdate: _react.PropTypes.bool,
  style: _react.PropTypes.object,
  title: _react.PropTypes.node,
  titleClassName: _react.PropTypes.string,
  titleStyle: _react.PropTypes.object
};
DialogInline.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};

var Dialog = function (_Component3) {
  _inherits(Dialog, _Component3);

  function Dialog() {
    var _Object$getPrototypeO3;

    var _temp3, _this3, _ret3;

    _classCallCheck(this, Dialog);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _ret3 = (_temp3 = (_this3 = _possibleConstructorReturn(this, (_Object$getPrototypeO3 = Object.getPrototypeOf(Dialog)).call.apply(_Object$getPrototypeO3, [this].concat(args))), _this3), _this3.renderLayer = function () {
      return _react2.default.createElement(DialogInline, _this3.props);
    }, _temp3), _possibleConstructorReturn(_this3, _ret3);
  }

  _createClass(Dialog, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_RenderToLayer2.default, { render: this.renderLayer, open: true, useLayerForClickAway: false });
    }
  }]);

  return Dialog;
}(_react.Component);

Dialog.propTypes = {
  /**
   * Action buttons to display below the Dialog content (`children`).
   * This property accepts either a React element, or an array of React elements.
   */
  actions: _react.PropTypes.node,
  /**
   * The `className` to add to the actions container's root element.
   */
  actionsContainerClassName: _react.PropTypes.string,
  /**
   * Overrides the inline-styles of the actions container's root element.
   */
  actionsContainerStyle: _react.PropTypes.object,
  /**
   * If set to true, the height of the `Dialog` will be auto detected. A max height
   * will be enforced so that the content does not extend beyond the viewport.
   */
  autoDetectWindowHeight: _react.PropTypes.bool,
  /**
   * If set to true, the body content of the `Dialog` will be scrollable.
   */
  autoScrollBodyContent: _react.PropTypes.bool,
  /**
   * The `className` to add to the content's root element under the title.
   */
  bodyClassName: _react.PropTypes.string,
  /**
   * Overrides the inline-styles of the content's root element under the title.
   */
  bodyStyle: _react.PropTypes.object,
  /**
   * The contents of the `Dialog`.
   */
  children: _react.PropTypes.node,
  /**
   * The css class name of the root element.
   */
  className: _react.PropTypes.string,
  /**
   * The `className` to add to the content container.
   */
  contentClassName: _react.PropTypes.string,
  /**
   * Overrides the inline-styles of the content container.
   */
  contentStyle: _react.PropTypes.object,
  /**
   * Force the user to use one of the actions in the `Dialog`.
   * Clicking outside the `Dialog` will not trigger the `onRequestClose`.
   */
  modal: _react.PropTypes.bool,
  /**
   * Fired when the `Dialog` is requested to be closed by a click outside the `Dialog` or on the buttons.
   *
   * @param {bool} buttonClicked Determines whether a button click triggered this request.
   */
  onRequestClose: _react.PropTypes.func,
  /**
   * Controls whether the Dialog is opened or not.
   */
  open: _react.PropTypes.bool.isRequired,
  /**
   * The `className` to add to the `Overlay` component that is rendered behind the `Dialog`.
   */
  overlayClassName: _react.PropTypes.string,
  /**
   * Overrides the inline-styles of the `Overlay` component that is rendered behind the `Dialog`.
   */
  overlayStyle: _react.PropTypes.object,
  /**
   * Determines whether the `Dialog` should be repositioned when it's contents are updated.
   */
  repositionOnUpdate: _react.PropTypes.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: _react.PropTypes.object,
  /**
   * The title to display on the `Dialog`. Could be number, string, element or an array containing these types.
   */
  title: _react.PropTypes.node,
  /**
   * The `className` to add to the title's root container element.
   */
  titleClassName: _react.PropTypes.string,
  /**
   * Overrides the inline-styles of the title's root container element.
   */
  titleStyle: _react.PropTypes.object
};
Dialog.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
Dialog.defaultProps = {
  autoDetectWindowHeight: true,
  autoScrollBodyContent: false,
  modal: false,
  repositionOnUpdate: true
};
exports.default = Dialog;