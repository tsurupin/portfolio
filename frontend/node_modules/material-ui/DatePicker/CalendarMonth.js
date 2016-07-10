'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dateUtils = require('./dateUtils');

var _DayButton = require('./DayButton');

var _DayButton2 = _interopRequireDefault(_DayButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalendarMonth = function (_Component) {
  _inherits(CalendarMonth, _Component);

  function CalendarMonth() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, CalendarMonth);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(CalendarMonth)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleTouchTapDay = function (event, date) {
      if (_this.props.onTouchTapDay) _this.props.onTouchTapDay(event, date);
    }, _this.styles = {
      root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        fontWeight: 400,
        height: 228,
        lineHeight: 2,
        position: 'relative',
        textAlign: 'center',
        MozPaddingStart: 0
      },
      week: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 34,
        marginBottom: 2
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CalendarMonth, [{
    key: 'isSelectedDateDisabled',
    value: function isSelectedDateDisabled() {
      return this.selectedDateDisabled;
    }
  }, {
    key: 'shouldDisableDate',
    value: function shouldDisableDate(day) {
      if (day === null) return false;
      var disabled = !(0, _dateUtils.isBetweenDates)(day, this.props.minDate, this.props.maxDate);
      if (!disabled && this.props.shouldDisableDate) disabled = this.props.shouldDisableDate(day);

      return disabled;
    }
  }, {
    key: 'getWeekElements',
    value: function getWeekElements() {
      var _this2 = this;

      var weekArray = (0, _dateUtils.getWeekArray)(this.props.displayDate, this.props.firstDayOfWeek);

      return weekArray.map(function (week, i) {
        return _react2.default.createElement(
          'div',
          { key: i, style: _this2.styles.week },
          _this2.getDayElements(week, i)
        );
      }, this);
    }
  }, {
    key: 'getDayElements',
    value: function getDayElements(week, i) {
      var _this3 = this;

      return week.map(function (day, j) {
        var isSameDate = (0, _dateUtils.isEqualDate)(_this3.props.selectedDate, day);
        var disabled = _this3.shouldDisableDate(day);
        var selected = !disabled && isSameDate;

        if (isSameDate) {
          _this3.selectedDateDisabled = disabled;
        }

        return _react2.default.createElement(_DayButton2.default, {
          date: day,
          disabled: disabled,
          key: 'db' + (i + j),
          onTouchTap: _this3.handleTouchTapDay,
          selected: selected
        });
      }, this);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: this.styles.root },
        this.getWeekElements()
      );
    }
  }]);

  return CalendarMonth;
}(_react.Component);

CalendarMonth.propTypes = {
  autoOk: _react.PropTypes.bool,
  displayDate: _react.PropTypes.object.isRequired,
  firstDayOfWeek: _react.PropTypes.number,
  maxDate: _react.PropTypes.object,
  minDate: _react.PropTypes.object,
  onTouchTapDay: _react.PropTypes.func,
  selectedDate: _react.PropTypes.object.isRequired,
  shouldDisableDate: _react.PropTypes.func
};
exports.default = CalendarMonth;