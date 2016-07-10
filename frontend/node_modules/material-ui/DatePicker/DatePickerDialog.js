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

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _Dialog = require('../Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Popover = require('../Popover/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _PopoverAnimationVertical = require('../Popover/PopoverAnimationVertical');

var _PopoverAnimationVertical2 = _interopRequireDefault(_PopoverAnimationVertical);

var _dateUtils = require('./dateUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatePickerDialog = function (_Component) {
  _inherits(DatePickerDialog, _Component);

  function DatePickerDialog() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, DatePickerDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DatePickerDialog)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      open: false
    }, _this.show = function () {
      if (_this.props.onShow && !_this.state.open) {
        _this.props.onShow();
      }

      _this.setState({
        open: true
      });
    }, _this.dismiss = function () {
      if (_this.props.onDismiss && _this.state.open) {
        _this.props.onDismiss();
      }

      _this.setState({
        open: false
      });
    }, _this.handleTouchTapDay = function () {
      if (_this.props.autoOk) {
        setTimeout(_this.handleTouchTapOk, 300);
      }
    }, _this.handleTouchTapCancel = function () {
      _this.dismiss();
    }, _this.handleRequestClose = function () {
      _this.dismiss();
    }, _this.handleTouchTapOk = function () {
      if (_this.props.onAccept && !_this.refs.calendar.isSelectedDateDisabled()) {
        _this.props.onAccept(_this.refs.calendar.getSelectedDate());
      }

      _this.setState({
        open: false
      });
    }, _this.handleWindowKeyUp = function (event) {
      switch ((0, _keycode2.default)(event)) {
        case 'enter':
          _this.handleTouchTapOk();
          break;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DatePickerDialog, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var DateTimeFormat = _props.DateTimeFormat;
      var autoOk = _props.autoOk;
      var cancelLabel = _props.cancelLabel;
      var container = _props.container;
      var containerStyle = _props.containerStyle;
      var disableYearSelection = _props.disableYearSelection;
      var initialDate = _props.initialDate;
      var firstDayOfWeek = _props.firstDayOfWeek;
      var locale = _props.locale;
      var maxDate = _props.maxDate;
      var minDate = _props.minDate;
      var mode = _props.mode;
      var okLabel = _props.okLabel;
      var onAccept = _props.onAccept;
      var onDismiss = _props.onDismiss;
      var onShow = _props.onShow;
      var shouldDisableDate = _props.shouldDisableDate;
      var style = _props.style;
      var wordings = _props.wordings;

      var other = _objectWithoutProperties(_props, ['DateTimeFormat', 'autoOk', 'cancelLabel', 'container', 'containerStyle', 'disableYearSelection', 'initialDate', 'firstDayOfWeek', 'locale', 'maxDate', 'minDate', 'mode', 'okLabel', 'onAccept', 'onDismiss', 'onShow', 'shouldDisableDate', 'style', 'wordings']);

      var open = this.state.open;


      var styles = {
        dialogContent: {
          width: mode === 'landscape' ? 479 : 310
        },
        dialogBodyContent: {
          padding: 0,
          minHeight: mode === 'landscape' ? 330 : 434,
          minWidth: mode === 'landscape' ? 479 : 310
        }
      };

      var Container = container === 'inline' ? _Popover2.default : _Dialog2.default;

      return _react2.default.createElement(
        'div',
        _extends({}, other, { ref: 'root' }),
        _react2.default.createElement(
          Container,
          {
            anchorEl: this.refs.root // For Popover
            , animation: _PopoverAnimationVertical2.default // For Popover
            , bodyStyle: styles.dialogBodyContent,
            contentStyle: styles.dialogContent,
            ref: 'dialog',
            repositionOnUpdate: true,
            open: open,
            onRequestClose: this.handleRequestClose,
            style: (0, _simpleAssign2.default)(styles.dialogBodyContent, containerStyle)
          },
          _react2.default.createElement(_reactEventListener2.default, {
            target: 'window',
            onKeyUp: this.handleWindowKeyUp
          }),
          _react2.default.createElement(_Calendar2.default, {
            autoOk: autoOk,
            DateTimeFormat: DateTimeFormat,
            cancelLabel: cancelLabel,
            disableYearSelection: disableYearSelection,
            firstDayOfWeek: firstDayOfWeek,
            initialDate: initialDate,
            locale: locale,
            onTouchTapDay: this.handleTouchTapDay,
            maxDate: maxDate,
            minDate: minDate,
            mode: mode,
            open: open,
            ref: 'calendar',
            onTouchTapCancel: this.handleTouchTapCancel,
            onTouchTapOk: this.handleTouchTapOk,
            okLabel: okLabel,
            shouldDisableDate: shouldDisableDate,
            wordings: wordings
          })
        )
      );
    }
  }]);

  return DatePickerDialog;
}(_react.Component);

DatePickerDialog.propTypes = {
  DateTimeFormat: _react.PropTypes.func,
  autoOk: _react.PropTypes.bool,
  cancelLabel: _react.PropTypes.node,
  container: _react.PropTypes.oneOf(['dialog', 'inline']),
  containerStyle: _react.PropTypes.object,
  disableYearSelection: _react.PropTypes.bool,
  firstDayOfWeek: _react.PropTypes.number,
  initialDate: _react.PropTypes.object,
  locale: _react.PropTypes.string,
  maxDate: _react.PropTypes.object,
  minDate: _react.PropTypes.object,
  mode: _react.PropTypes.oneOf(['portrait', 'landscape']),
  okLabel: _react.PropTypes.node,
  onAccept: _react.PropTypes.func,
  onDismiss: _react.PropTypes.func,
  onShow: _react.PropTypes.func,
  open: _react.PropTypes.bool,
  shouldDisableDate: _react.PropTypes.func,
  style: _react.PropTypes.object,
  wordings: _react.PropTypes.object
};
DatePickerDialog.defaultProps = {
  DateTimeFormat: _dateUtils.dateTimeFormat,
  cancelLabel: 'Cancel',
  container: 'dialog',
  locale: 'en-US',
  okLabel: 'OK'
};
DatePickerDialog.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = DatePickerDialog;