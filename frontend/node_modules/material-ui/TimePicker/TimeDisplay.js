'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeDisplay = function (_Component) {
  _inherits(TimeDisplay, _Component);

  function TimeDisplay() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, TimeDisplay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TimeDisplay)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      transitionDirection: 'up'
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TimeDisplay, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.selectedTime !== this.props.selectedTime) {
        var direction = nextProps.selectedTime > this.props.selectedTime ? 'up' : 'down';

        this.setState({
          transitionDirection: direction
        });
      }
    }
  }, {
    key: 'sanitizeTime',
    value: function sanitizeTime() {
      var hour = this.props.selectedTime.getHours();
      var min = this.props.selectedTime.getMinutes().toString();

      if (this.props.format === 'ampm') {
        hour %= 12;
        hour = hour || 12;
      }

      hour = hour.toString();
      if (hour.length < 2) hour = '0' + hour;
      if (min.length < 2) min = '0' + min;

      return [hour, min];
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var affix = _props.affix;
      var format = _props.format;
      var mode = _props.mode;
      var onSelectAffix = _props.onSelectAffix;
      var onSelectHour = _props.onSelectHour;
      var onSelectMin = _props.onSelectMin;
      var selectedTime = _props.selectedTime;

      var other = _objectWithoutProperties(_props, ['affix', 'format', 'mode', 'onSelectAffix', 'onSelectHour', 'onSelectMin', 'selectedTime']);

      var _context$muiTheme = this.context.muiTheme;
      var prepareStyles = _context$muiTheme.prepareStyles;
      var timePicker = _context$muiTheme.timePicker;


      var styles = {
        root: {
          padding: '14px 0',
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
          backgroundColor: timePicker.headerColor,
          color: 'white'
        },
        text: {
          margin: '6px 0',
          lineHeight: '58px',
          height: 58,
          fontSize: 58,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'baseline'
        },
        time: {
          margin: '0 10px'
        },
        affix: {
          flex: 1,
          position: 'relative',
          lineHeight: '17px',
          height: 17,
          fontSize: 17
        },
        affixTop: {
          position: 'absolute',
          top: -20,
          left: 0
        },
        clickable: {
          cursor: 'pointer'
        },
        inactive: {
          opacity: 0.7
        }
      };

      var _sanitizeTime = this.sanitizeTime();

      var _sanitizeTime2 = _slicedToArray(_sanitizeTime, 2);

      var hour = _sanitizeTime2[0];
      var min = _sanitizeTime2[1];


      var buttons = [];
      if (format === 'ampm') {
        buttons = [_react2.default.createElement(
          'div',
          {
            key: 'pm',
            style: prepareStyles((0, _simpleAssign2.default)({}, styles.clickable, affix === 'pm' ? {} : styles.inactive)),
            onTouchTap: function onTouchTap() {
              return onSelectAffix('pm');
            }
          },
          'PM'
        ), _react2.default.createElement(
          'div',
          {
            key: 'am',
            style: prepareStyles((0, _simpleAssign2.default)({}, styles.affixTop, styles.clickable, affix === 'am' ? {} : styles.inactive)),
            onTouchTap: function onTouchTap() {
              return onSelectAffix('am');
            }
          },
          'AM'
        )];
      }

      return _react2.default.createElement(
        'div',
        _extends({}, other, { style: prepareStyles(styles.root) }),
        _react2.default.createElement(
          'div',
          { style: prepareStyles(styles.text) },
          _react2.default.createElement('div', { style: prepareStyles((0, _simpleAssign2.default)({}, styles.affix)) }),
          _react2.default.createElement(
            'div',
            { style: prepareStyles(styles.time) },
            _react2.default.createElement(
              'span',
              {
                style: prepareStyles((0, _simpleAssign2.default)({}, styles.clickable, mode === 'hour' ? {} : styles.inactive)),
                onTouchTap: onSelectHour
              },
              hour
            ),
            _react2.default.createElement(
              'span',
              null,
              ':'
            ),
            _react2.default.createElement(
              'span',
              {
                style: prepareStyles((0, _simpleAssign2.default)({}, styles.clickable, mode === 'minute' ? {} : styles.inactive)),
                onTouchTap: onSelectMin
              },
              min
            )
          ),
          _react2.default.createElement(
            'div',
            { style: prepareStyles((0, _simpleAssign2.default)({}, styles.affix)) },
            buttons
          )
        )
      );
    }
  }]);

  return TimeDisplay;
}(_react.Component);

TimeDisplay.propTypes = {
  affix: _react.PropTypes.oneOf(['', 'pm', 'am']),
  format: _react.PropTypes.oneOf(['ampm', '24hr']),
  mode: _react.PropTypes.oneOf(['hour', 'minute']),
  onSelectAffix: _react.PropTypes.func,
  onSelectHour: _react.PropTypes.func,
  onSelectMin: _react.PropTypes.func,
  selectedTime: _react.PropTypes.object.isRequired
};
TimeDisplay.defaultProps = {
  affix: '',
  mode: 'hour'
};
TimeDisplay.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = TimeDisplay;