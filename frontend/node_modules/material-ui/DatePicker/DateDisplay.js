'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _transitions = require('../styles/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

var _SlideIn = require('../internal/SlideIn');

var _SlideIn2 = _interopRequireDefault(_SlideIn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getStyles(props, context, state) {
  var datePicker = context.muiTheme.datePicker;
  var selectedYear = state.selectedYear;

  var isLandscape = props.mode === 'landscape';

  var styles = {
    root: {
      width: isLandscape ? 165 : '100%',
      height: isLandscape ? 330 : 'auto',
      float: isLandscape ? 'left' : 'none',
      fontWeight: 700,
      display: 'inline-block',
      backgroundColor: datePicker.selectColor,
      borderTopLeftRadius: 2,
      borderTopRightRadius: isLandscape ? 0 : 2,
      borderBottomLeftRadius: isLandscape ? 2 : 0,
      color: datePicker.textColor,
      padding: 20,
      boxSizing: 'border-box'
    },
    monthDay: {
      display: 'block',
      fontSize: 36,
      lineHeight: '36px',
      height: props.mode === 'landscape' ? '100%' : 38,
      opacity: selectedYear ? 0.7 : 1,
      transition: _transitions2.default.easeOut(),
      width: '100%',
      fontWeight: '500'
    },
    monthDayTitle: {
      cursor: !selectedYear ? 'default' : 'pointer',
      width: '100%',
      display: 'block'
    },
    year: {
      margin: 0,
      fontSize: 16,
      fontWeight: '500',
      lineHeight: '16px',
      height: 16,
      opacity: selectedYear ? 1 : 0.7,
      transition: _transitions2.default.easeOut(),
      marginBottom: 10
    },
    yearTitle: {
      cursor: props.disableYearSelection ? 'not-allowed' : !selectedYear ? 'pointer' : 'default'
    }
  };

  return styles;
}

var DateDisplay = function (_Component) {
  _inherits(DateDisplay, _Component);

  function DateDisplay() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, DateDisplay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DateDisplay)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      selectedYear: false,
      transitionDirection: 'up'
    }, _this.handleTouchTapMonthDay = function () {
      if (_this.props.onTouchTapMonthDay && _this.state.selectedYear) {
        _this.props.onTouchTapMonthDay();
      }

      _this.setState({ selectedYear: false });
    }, _this.handleTouchTapYear = function () {
      if (_this.props.onTouchTapYear && !_this.props.disableYearSelection && !_this.state.selectedYear) {
        _this.props.onTouchTapYear();
      }

      if (!_this.props.disableYearSelection) {
        _this.setState({ selectedYear: true });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateDisplay, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (!this.props.monthDaySelected) {
        this.setState({ selectedYear: true });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.selectedDate !== this.props.selectedDate) {
        var direction = nextProps.selectedDate > this.props.selectedDate ? 'up' : 'down';
        this.setState({
          transitionDirection: direction
        });
      }

      if (nextProps.monthDaySelected !== undefined) {
        this.setState({
          selectedYear: !nextProps.monthDaySelected
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var DateTimeFormat = _props.DateTimeFormat;
      var disableYearSelection = _props.disableYearSelection;
      var locale = _props.locale;
      var mode = _props.mode;
      var monthDaySelected = _props.monthDaySelected;
      var onTouchTapMonthDay = _props.onTouchTapMonthDay;
      var onTouchTapYear = _props.onTouchTapYear;
      var selectedDate = _props.selectedDate;
      var style = _props.style;
      var weekCount = _props.weekCount;

      var other = _objectWithoutProperties(_props, ['DateTimeFormat', 'disableYearSelection', 'locale', 'mode', 'monthDaySelected', 'onTouchTapMonthDay', 'onTouchTapYear', 'selectedDate', 'style', 'weekCount']);

      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context, this.state);
      var year = selectedDate.getFullYear();

      var dateTimeFormatted = new DateTimeFormat(locale, {
        month: 'short',
        weekday: 'short',
        day: '2-digit'
      }).format(selectedDate);

      return _react2.default.createElement(
        'div',
        _extends({}, other, { style: prepareStyles(styles.root, style) }),
        _react2.default.createElement(
          _SlideIn2.default,
          {
            style: styles.year,
            direction: this.state.transitionDirection
          },
          _react2.default.createElement(
            'div',
            { key: year, style: styles.yearTitle, onTouchTap: this.handleTouchTapYear },
            year
          )
        ),
        _react2.default.createElement(
          _SlideIn2.default,
          {
            style: styles.monthDay,
            direction: this.state.transitionDirection
          },
          _react2.default.createElement(
            'div',
            {
              key: dateTimeFormatted,
              onTouchTap: this.handleTouchTapMonthDay,
              style: styles.monthDayTitle
            },
            dateTimeFormatted
          )
        )
      );
    }
  }]);

  return DateDisplay;
}(_react.Component);

DateDisplay.propTypes = {
  DateTimeFormat: _react.PropTypes.func.isRequired,
  disableYearSelection: _react.PropTypes.bool,
  locale: _react.PropTypes.string.isRequired,
  mode: _react.PropTypes.oneOf(['portrait', 'landscape']),
  monthDaySelected: _react.PropTypes.bool,
  onTouchTapMonthDay: _react.PropTypes.func,
  onTouchTapYear: _react.PropTypes.func,
  selectedDate: _react.PropTypes.object.isRequired,
  style: _react.PropTypes.object,
  weekCount: _react.PropTypes.number
};
DateDisplay.defaultProps = {
  disableYearSelection: false,
  monthDaySelected: true,
  weekCount: 4
};
DateDisplay.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = DateDisplay;