'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnackbarBody = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _transitions = require('../styles/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

var _withWidth = require('../utils/withWidth');

var _withWidth2 = _interopRequireDefault(_withWidth);

var _FlatButton = require('../FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function getStyles(props, context) {
  var open = props.open;
  var width = props.width;
  var _context$muiTheme = context.muiTheme;
  var _context$muiTheme$bas = _context$muiTheme.baseTheme.spacing;
  var desktopGutter = _context$muiTheme$bas.desktopGutter;
  var desktopSubheaderHeight = _context$muiTheme$bas.desktopSubheaderHeight;
  var _context$muiTheme$sna = _context$muiTheme.snackbar;
  var backgroundColor = _context$muiTheme$sna.backgroundColor;
  var textColor = _context$muiTheme$sna.textColor;
  var actionColor = _context$muiTheme$sna.actionColor;


  var isSmall = width === _withWidth.SMALL;

  var styles = {
    root: {
      backgroundColor: backgroundColor,
      padding: '0 ' + desktopGutter + 'px',
      height: desktopSubheaderHeight,
      lineHeight: desktopSubheaderHeight + 'px',
      borderRadius: isSmall ? 0 : 2,
      maxWidth: isSmall ? 'inherit' : 568,
      minWidth: isSmall ? 'inherit' : 288,
      flexGrow: isSmall ? 1 : 0,
      margin: 'auto'
    },
    content: {
      fontSize: 14,
      color: textColor,
      opacity: open ? 1 : 0,
      transition: open ? _transitions2.default.easeOut('500ms', 'opacity', '100ms') : _transitions2.default.easeOut('400ms', 'opacity')
    },
    action: {
      color: actionColor,
      float: 'right',
      marginTop: 6,
      marginRight: -16,
      marginLeft: desktopGutter,
      backgroundColor: 'transparent'
    }
  };

  return styles;
}

var SnackbarBody = exports.SnackbarBody = function SnackbarBody(props, context) {
  var open = props.open;
  var action = props.action;
  var message = props.message;
  var onActionTouchTap = props.onActionTouchTap;
  var style = props.style;

  var other = _objectWithoutProperties(props, ['open', 'action', 'message', 'onActionTouchTap', 'style']);

  var prepareStyles = context.muiTheme.prepareStyles;

  var styles = getStyles(props, context);

  var actionButton = action && _react2.default.createElement(_FlatButton2.default, {
    style: styles.action,
    label: action,
    onTouchTap: onActionTouchTap
  });

  return _react2.default.createElement(
    'div',
    _extends({}, other, { style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)) }),
    _react2.default.createElement(
      'div',
      { style: prepareStyles(styles.content) },
      _react2.default.createElement(
        'span',
        null,
        message
      ),
      actionButton
    )
  );
};

SnackbarBody.propTypes = {
  /**
   * The label for the action on the snackbar.
   */
  action: _react.PropTypes.string,
  /**
   * The message to be displayed.
   *
   * (Note: If the message is an element or array, and the `Snackbar` may re-render while it is still open,
   * ensure that the same object remains as the `message` property if you want to avoid the `Snackbar` hiding and
   * showing again)
   */
  message: _react.PropTypes.node.isRequired,
  /**
   * Fired when the action button is touchtapped.
   *
   * @param {object} event Action button event.
   */
  onActionTouchTap: _react.PropTypes.func,
  /**
   * @ignore
   * Controls whether the `Snackbar` is opened or not.
   */
  open: _react.PropTypes.bool.isRequired,
  /**
   * Override the inline-styles of the root element.
   */
  style: _react.PropTypes.object,
  /**
   * @ignore
   * Width of the screen.
   */
  width: _react.PropTypes.number.isRequired
};

SnackbarBody.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};

exports.default = (0, _withWidth2.default)()(SnackbarBody);