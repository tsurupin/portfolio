'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TimeDisplay = require('./TimeDisplay');

var _TimeDisplay2 = _interopRequireDefault(_TimeDisplay);

var _ClockHours = require('./ClockHours');

var _ClockHours2 = _interopRequireDefault(_ClockHours);

var _ClockMinutes = require('./ClockMinutes');

var _ClockMinutes2 = _interopRequireDefault(_ClockMinutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Clock = function (_Component) {
  _inherits(Clock, _Component);

  function Clock() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Clock);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Clock)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      selectedTime: null,
      mode: 'hour'
    }, _this.setMode = function (mode) {
      setTimeout(function () {
        _this.setState({
          mode: mode
        });
      }, 100);
    }, _this.handleSelectAffix = function (affix) {
      if (affix === _this.getAffix()) return;

      var hours = _this.state.selectedTime.getHours();

      if (affix === 'am') {
        _this.handleChangeHours(hours - 12, affix);
        return;
      }

      _this.handleChangeHours(hours + 12, affix);
    }, _this.handleChangeHours = function (hours, finished) {
      var time = new Date(_this.state.selectedTime);
      var affix = void 0;

      if (typeof finished === 'string') {
        affix = finished;
        finished = undefined;
      }
      if (!affix) {
        affix = _this.getAffix();
      }
      if (affix === 'pm' && hours < 12) {
        hours += 12;
      }

      time.setHours(hours);
      _this.setState({
        selectedTime: time
      });

      if (finished) {
        setTimeout(function () {
          _this.setState({
            mode: 'minute'
          });

          var onChangeHours = _this.props.onChangeHours;

          if (onChangeHours) {
            onChangeHours(time);
          }
        }, 100);
      }
    }, _this.handleChangeMinutes = function (minutes) {
      var time = new Date(_this.state.selectedTime);
      time.setMinutes(minutes);
      _this.setState({
        selectedTime: time
      });

      var onChangeMinutes = _this.props.onChangeMinutes;

      if (onChangeMinutes) {
        setTimeout(function () {
          onChangeMinutes(time);
        }, 0);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Clock, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        selectedTime: this.props.initialTime || new Date()
      });
    }
  }, {
    key: 'getAffix',
    value: function getAffix() {
      if (this.props.format !== 'ampm') return '';

      var hours = this.state.selectedTime.getHours();
      if (hours < 12) {
        return 'am';
      }

      return 'pm';
    }
  }, {
    key: 'getSelectedTime',
    value: function getSelectedTime() {
      return this.state.selectedTime;
    }
  }, {
    key: 'render',
    value: function render() {
      var clock = null;

      var _context$muiTheme = this.context.muiTheme;
      var prepareStyles = _context$muiTheme.prepareStyles;
      var timePicker = _context$muiTheme.timePicker;


      var styles = {
        root: {
          userSelect: 'none'
        },
        container: {
          height: 280,
          padding: 10,
          position: 'relative',
          boxSizing: 'content-box'
        },
        circle: {
          position: 'absolute',
          top: 20,
          width: 260,
          height: 260,
          borderRadius: '100%',
          backgroundColor: timePicker.clockCircleColor
        }
      };

      if (this.state.mode === 'hour') {
        clock = _react2.default.createElement(_ClockHours2.default, {
          key: 'hours',
          format: this.props.format,
          onChange: this.handleChangeHours,
          initialHours: this.state.selectedTime.getHours()
        });
      } else {
        clock = _react2.default.createElement(_ClockMinutes2.default, {
          key: 'minutes',
          onChange: this.handleChangeMinutes,
          initialMinutes: this.state.selectedTime.getMinutes()
        });
      }

      return _react2.default.createElement(
        'div',
        { style: prepareStyles(styles.root) },
        _react2.default.createElement(_TimeDisplay2.default, {
          selectedTime: this.state.selectedTime,
          mode: this.state.mode,
          format: this.props.format,
          affix: this.getAffix(),
          onSelectAffix: this.handleSelectAffix,
          onSelectHour: this.setMode.bind(this, 'hour'),
          onSelectMin: this.setMode.bind(this, 'minute')
        }),
        _react2.default.createElement(
          'div',
          { style: prepareStyles(styles.container) },
          _react2.default.createElement('div', { style: prepareStyles(styles.circle) }),
          clock
        )
      );
    }
  }]);

  return Clock;
}(_react.Component);

Clock.propTypes = {
  format: _react.PropTypes.oneOf(['ampm', '24hr']),
  initialTime: _react.PropTypes.object,
  onChangeHours: _react.PropTypes.func,
  onChangeMinutes: _react.PropTypes.func
};
Clock.defaultProps = {
  initialTime: new Date()
};
Clock.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = Clock;