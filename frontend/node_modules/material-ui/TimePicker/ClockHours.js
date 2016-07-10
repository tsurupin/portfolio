'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ClockNumber = require('./ClockNumber');

var _ClockNumber2 = _interopRequireDefault(_ClockNumber);

var _ClockPointer = require('./ClockPointer');

var _ClockPointer2 = _interopRequireDefault(_ClockPointer);

var _timeUtils = require('./timeUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClockHours = function (_Component) {
  _inherits(ClockHours, _Component);

  function ClockHours() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, ClockHours);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ClockHours)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleUp = function (event) {
      event.preventDefault();
      _this.setClock(event.nativeEvent, true);
    }, _this.handleMove = function (event) {
      event.preventDefault();
      if (_this.isMousePressed(event) !== 1) return;
      _this.setClock(event.nativeEvent, false);
    }, _this.handleTouchMove = function (event) {
      event.preventDefault();
      _this.setClock(event.changedTouches[0], false);
    }, _this.handleTouchEnd = function (event) {
      event.preventDefault();
      _this.setClock(event.changedTouches[0], true);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ClockHours, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var clockElement = _reactDom2.default.findDOMNode(this.refs.mask);

      this.center = {
        x: clockElement.offsetWidth / 2,
        y: clockElement.offsetHeight / 2
      };

      this.basePoint = {
        x: this.center.x,
        y: 0
      };
    }
  }, {
    key: 'isMousePressed',
    value: function isMousePressed(event) {
      if (typeof event.buttons === 'undefined') {
        return event.nativeEvent.which;
      }

      return event.buttons;
    }
  }, {
    key: 'setClock',
    value: function setClock(event, finish) {
      if (typeof event.offsetX === 'undefined') {
        var offset = (0, _timeUtils.getTouchEventOffsetValues)(event);

        event.offsetX = offset.offsetX;
        event.offsetY = offset.offsetY;
      }

      var hours = this.getHours(event.offsetX, event.offsetY);

      this.props.onChange(hours, finish);
    }
  }, {
    key: 'getHours',
    value: function getHours(offsetX, offsetY) {
      var step = 30;
      var x = offsetX - this.center.x;
      var y = offsetY - this.center.y;
      var cx = this.basePoint.x - this.center.x;
      var cy = this.basePoint.y - this.center.y;

      var atan = Math.atan2(cx, cy) - Math.atan2(x, y);

      var deg = (0, _timeUtils.rad2deg)(atan);
      deg = Math.round(deg / step) * step;
      deg %= 360;

      var value = Math.floor(deg / step) || 0;

      var delta = Math.pow(x, 2) + Math.pow(y, 2);
      var distance = Math.sqrt(delta);

      value = value || 12;
      if (this.props.format === '24hr') {
        if (distance < 90) {
          value += 12;
          value %= 24;
        }
      } else {
        value %= 12;
      }

      return value;
    }
  }, {
    key: 'getSelected',
    value: function getSelected() {
      var hour = this.props.initialHours;

      if (this.props.format === 'ampm') {
        hour %= 12;
        hour = hour || 12;
      }

      return hour;
    }
  }, {
    key: 'getHourNumbers',
    value: function getHourNumbers() {
      var _this2 = this;

      var style = {
        pointerEvents: 'none'
      };
      var hourSize = this.props.format === 'ampm' ? 12 : 24;

      var hours = [];
      for (var i = 1; i <= hourSize; i++) {
        hours.push(i % 24);
      }

      return hours.map(function (hour) {
        var isSelected = _this2.getSelected() === hour;
        return _react2.default.createElement(_ClockNumber2.default, {
          key: hour,
          style: style,
          isSelected: isSelected,
          type: 'hour',
          value: hour
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = {
        root: {
          height: '100%',
          width: '100%',
          borderRadius: '100%',
          position: 'relative',
          pointerEvents: 'none',
          boxSizing: 'border-box'
        },

        hitMask: {
          height: '100%',
          width: '100%',
          pointerEvents: 'auto'
        }
      };

      var prepareStyles = this.context.muiTheme.prepareStyles;

      var hours = this.getSelected();
      var numbers = this.getHourNumbers();

      return _react2.default.createElement(
        'div',
        { ref: 'clock', style: prepareStyles(styles.root) },
        _react2.default.createElement(_ClockPointer2.default, { hasSelected: true, value: hours, type: 'hour' }),
        numbers,
        _react2.default.createElement('div', {
          ref: 'mask', style: prepareStyles(styles.hitMask), onTouchMove: this.handleTouchMove,
          onTouchEnd: this.handleTouchEnd, onMouseUp: this.handleUp, onMouseMove: this.handleMove
        })
      );
    }
  }]);

  return ClockHours;
}(_react.Component);

ClockHours.propTypes = {
  format: _react.PropTypes.oneOf(['ampm', '24hr']),
  initialHours: _react.PropTypes.number,
  onChange: _react.PropTypes.func
};
ClockHours.defaultProps = {
  initialHours: new Date().getHours(),
  onChange: function onChange() {},
  format: 'ampm'
};
ClockHours.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = ClockHours;