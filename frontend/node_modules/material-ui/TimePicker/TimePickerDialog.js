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

var _reactEventListener = require('react-event-listener');

var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _Clock = require('./Clock');

var _Clock2 = _interopRequireDefault(_Clock);

var _Dialog = require('../Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = require('../FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimePickerDialog = function (_Component) {
  _inherits(TimePickerDialog, _Component);

  function TimePickerDialog() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, TimePickerDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TimePickerDialog)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      open: false
    }, _this.handleRequestClose = function () {
      _this.dismiss();
    }, _this.handleTouchTapCancel = function () {
      _this.dismiss();
    }, _this.handleTouchTapOK = function () {
      _this.dismiss();
      if (_this.props.onAccept) {
        _this.props.onAccept(_this.refs.clock.getSelectedTime());
      }
    }, _this.handleKeyUp = function (event) {
      switch ((0, _keycode2.default)(event)) {
        case 'enter':
          _this.handleTouchTapOK();
          break;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TimePickerDialog, [{
    key: 'show',
    value: function show() {
      if (this.props.onShow && !this.state.open) this.props.onShow();
      this.setState({
        open: true
      });
    }
  }, {
    key: 'dismiss',
    value: function dismiss() {
      if (this.props.onDismiss && this.state.open) this.props.onDismiss();
      this.setState({
        open: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var bodyStyle = _props.bodyStyle;
      var initialTime = _props.initialTime;
      var onAccept = _props.onAccept;
      var format = _props.format;
      var autoOk = _props.autoOk;
      var okLabel = _props.okLabel;
      var cancelLabel = _props.cancelLabel;
      var style = _props.style;

      var other = _objectWithoutProperties(_props, ['bodyStyle', 'initialTime', 'onAccept', 'format', 'autoOk', 'okLabel', 'cancelLabel', 'style']);

      var styles = {
        root: {
          fontSize: 14,
          color: this.context.muiTheme.timePicker.clockColor
        },
        dialogContent: {
          width: 280
        },
        body: {
          padding: 0
        }
      };

      var actions = [_react2.default.createElement(_FlatButton2.default, {
        key: 0,
        label: cancelLabel,
        primary: true,
        onTouchTap: this.handleTouchTapCancel
      }), _react2.default.createElement(_FlatButton2.default, {
        key: 1,
        label: okLabel,
        primary: true,
        onTouchTap: this.handleTouchTapOK
      })];

      var onClockChangeMinutes = autoOk === true ? this.handleTouchTapOK : undefined;
      var open = this.state.open;

      return _react2.default.createElement(
        _Dialog2.default,
        _extends({}, other, {
          style: (0, _simpleAssign2.default)(styles.root, style),
          bodyStyle: (0, _simpleAssign2.default)(styles.body, bodyStyle),
          actions: actions,
          contentStyle: styles.dialogContent,
          repositionOnUpdate: false,
          open: open,
          onRequestClose: this.handleRequestClose
        }),
        open && _react2.default.createElement(_reactEventListener2.default, { target: 'window', onKeyUp: this.handleKeyUp }),
        open && _react2.default.createElement(_Clock2.default, {
          ref: 'clock',
          format: format,
          initialTime: initialTime,
          onChangeMinutes: onClockChangeMinutes
        })
      );
    }
  }]);

  return TimePickerDialog;
}(_react.Component);

TimePickerDialog.propTypes = {
  autoOk: _react.PropTypes.bool,
  bodyStyle: _react.PropTypes.object,
  cancelLabel: _react.PropTypes.node,
  format: _react.PropTypes.oneOf(['ampm', '24hr']),
  initialTime: _react.PropTypes.object,
  okLabel: _react.PropTypes.node,
  onAccept: _react.PropTypes.func,
  onDismiss: _react.PropTypes.func,
  onShow: _react.PropTypes.func,
  style: _react.PropTypes.object
};
TimePickerDialog.defaultProps = {
  okLabel: 'OK',
  cancelLabel: 'Cancel'
};
TimePickerDialog.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = TimePickerDialog;