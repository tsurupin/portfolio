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

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _TimePickerDialog = require('./TimePickerDialog');

var _TimePickerDialog2 = _interopRequireDefault(_TimePickerDialog);

var _TextField = require('../TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _timeUtils = require('./timeUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var emptyTime = new Date();
emptyTime.setHours(0);
emptyTime.setMinutes(0);
emptyTime.setSeconds(0);
emptyTime.setMilliseconds(0);

var TimePicker = function (_Component) {
  _inherits(TimePicker, _Component);

  function TimePicker() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, TimePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TimePicker)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      time: null,
      dialogTime: new Date()
    }, _this.handleAcceptDialog = function (time) {
      _this.setState({
        time: time
      });
      if (_this.props.onChange) _this.props.onChange(null, time);
    }, _this.handleFocusInput = function (event) {
      event.target.blur();
      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    }, _this.handleTouchTapInput = function (event) {
      event.preventDefault();

      if (!_this.props.disabled) {
        _this.openDialog();
      }

      if (_this.props.onTouchTap) {
        _this.props.onTouchTap(event);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TimePicker, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        time: this.isControlled() ? this.getControlledTime() : this.props.defaultTime
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        this.setState({
          time: this.getControlledTime(nextProps)
        });
      }
    }

    /**
     * Deprecated.
     * returns timepicker value.
     **/

  }, {
    key: 'getTime',
    value: function getTime() {
      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'getTime() method is deprecated. Use the defaultTime property\n    instead. Or use the TimePicker as a controlled component with the value\n    property. It will be removed with v0.16.0.') : void 0;
      return this.state.time;
    }

    /**
     * Deprecated
     * sets timepicker value.
     **/

  }, {
    key: 'setTime',
    value: function setTime(time) {
      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'setTime() method is deprecated. Use the defaultTime property\n    instead. Or use the TimePicker as a controlled component with the value\n    property. It will be removed with v0.16.0.') : void 0;
      this.setState({ time: time ? time : emptyTime });
    }

    /**
     * Alias for `openDialog()` for an api consistent with TextField.
     */

  }, {
    key: 'focus',
    value: function focus() {
      this.openDialog();
    }
  }, {
    key: 'openDialog',
    value: function openDialog() {
      this.setState({
        dialogTime: this.state.time
      });
      this.refs.dialogWindow.show();
    }
  }, {
    key: 'isControlled',
    value: function isControlled() {
      return this.props.value !== null;
    }
  }, {
    key: 'getControlledTime',
    value: function getControlledTime() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

      var result = null;
      if (props.value instanceof Date) {
        result = props.value;
      }
      return result;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var autoOk = _props.autoOk;
      var cancelLabel = _props.cancelLabel;
      var defaultTime = _props.defaultTime;
      var dialogBodyStyle = _props.dialogBodyStyle;
      var dialogStyle = _props.dialogStyle;
      var format = _props.format;
      var okLabel = _props.okLabel;
      var onFocus = _props.onFocus;
      var onTouchTap = _props.onTouchTap;
      var onShow = _props.onShow;
      var onDismiss = _props.onDismiss;
      var pedantic = _props.pedantic;
      var style = _props.style;
      var textFieldStyle = _props.textFieldStyle;

      var other = _objectWithoutProperties(_props, ['autoOk', 'cancelLabel', 'defaultTime', 'dialogBodyStyle', 'dialogStyle', 'format', 'okLabel', 'onFocus', 'onTouchTap', 'onShow', 'onDismiss', 'pedantic', 'style', 'textFieldStyle']);

      var prepareStyles = this.context.muiTheme.prepareStyles;
      var time = this.state.time;


      return _react2.default.createElement(
        'div',
        { style: prepareStyles((0, _simpleAssign2.default)({}, style)) },
        _react2.default.createElement(_TextField2.default, _extends({}, other, {
          style: textFieldStyle,
          ref: 'input',
          value: time === emptyTime ? null : (0, _timeUtils.formatTime)(time, format, pedantic),
          onFocus: this.handleFocusInput,
          onTouchTap: this.handleTouchTapInput
        })),
        _react2.default.createElement(_TimePickerDialog2.default, {
          ref: 'dialogWindow',
          bodyStyle: dialogBodyStyle,
          initialTime: this.state.dialogTime,
          onAccept: this.handleAcceptDialog,
          onShow: onShow,
          onDismiss: onDismiss,
          format: format,
          okLabel: okLabel,
          cancelLabel: cancelLabel,
          autoOk: autoOk,
          style: dialogStyle
        })
      );
    }
  }]);

  return TimePicker;
}(_react.Component);

TimePicker.propTypes = {
  /**
   * If true, automatically accept and close the picker on set minutes.
   */
  autoOk: _react.PropTypes.bool,
  /**
   * Override the label of the 'Cancel' button.
   */
  cancelLabel: _react.PropTypes.node,
  /**
   * The initial time value of the TimePicker.
   */
  defaultTime: _react.PropTypes.object,
  /**
   * Override the inline-styles of TimePickerDialog's body element.
   */
  dialogBodyStyle: _react.PropTypes.object,
  /**
   * Override the inline-styles of TimePickerDialog's root element.
   */
  dialogStyle: _react.PropTypes.object,
  /**
   * If true, the TimePicker is disabled.
   */
  disabled: _react.PropTypes.bool,
  /**
   * Tells the component to display the picker in `ampm` (12hr) format or `24hr` format.
   */
  format: _react.PropTypes.oneOf(['ampm', '24hr']),
  /**
   * Override the label of the 'OK' button.
   */
  okLabel: _react.PropTypes.node,
  /**
   * Callback function that is fired when the time value changes. The time value is passed in a Date Object.
   * Since there is no particular event associated with the change the first argument will always be null
   * and the second argument will be the new Date instance.
   */
  onChange: _react.PropTypes.func,
  /**
   * Callback function fired when the TimePicker dialog is dismissed.
   */
  onDismiss: _react.PropTypes.func,
  /**
   * Callback function fired when the TimePicker `TextField` gains focus.
   */
  onFocus: _react.PropTypes.func,
  /**
   * Callback function fired when the TimePicker dialog is shown.
   */
  onShow: _react.PropTypes.func,
  /**
   * Callback function fired when the TimePicker is tapped or clicked.
   */
  onTouchTap: _react.PropTypes.func,
  /**
   * If true, uses ("noon" / "midnight") instead of ("12 a.m." / "12 p.m.").
   *
   * It's technically more correct to refer to "12 noon" and "12 midnight" rather than "12 a.m." and "12 p.m."
   * and it avoids confusion between different locales. By default (for compatibility reasons) TimePicker uses
   * ("12 a.m." / "12 p.m.").
   */
  pedantic: _react.PropTypes.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: _react.PropTypes.object,
  /**
   * Override the inline-styles of TimePicker's TextField element.
   */
  textFieldStyle: _react.PropTypes.object,
  /**
   * Sets the time for the Time Picker programmatically.
   */
  value: _react.PropTypes.object
};
TimePicker.defaultProps = {
  autoOk: false,
  cancelLabel: 'Cancel',
  defaultTime: null,
  disabled: false,
  format: 'ampm',
  okLabel: 'OK',
  pedantic: false,
  style: {},
  value: null
};
TimePicker.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = TimePicker;