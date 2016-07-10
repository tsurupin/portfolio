'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _timeUtils = require('./timeUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function calcAngle(value, base) {
  value %= base;
  var angle = 360 / base * value;
  return angle;
}

function getStyles(props, context, state) {
  var hasSelected = props.hasSelected;
  var type = props.type;
  var value = props.value;
  var inner = state.inner;
  var timePicker = context.muiTheme.timePicker;

  var angle = type === 'hour' ? calcAngle(value, 12) : calcAngle(value, 60);

  var styles = {
    root: {
      height: inner ? '30%' : '40%',
      background: timePicker.accentColor,
      width: 2,
      left: 'calc(50% - 1px)',
      position: 'absolute',
      bottom: '50%',
      transformOrigin: 'bottom',
      pointerEvents: 'none',
      transform: 'rotateZ(' + angle + 'deg)'
    },
    mark: {
      background: timePicker.selectTextColor,
      border: '4px solid ' + timePicker.accentColor,
      display: hasSelected && 'none',
      width: 7,
      height: 7,
      position: 'absolute',
      top: -5,
      left: -6,
      borderRadius: '100%'
    }
  };

  return styles;
}

var ClockPointer = function (_Component) {
  _inherits(ClockPointer, _Component);

  function ClockPointer() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, ClockPointer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ClockPointer)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      inner: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ClockPointer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        inner: (0, _timeUtils.isInner)(this.props)
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        inner: (0, _timeUtils.isInner)(nextProps)
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.value === null) {
        return _react2.default.createElement('span', null);
      }

      var styles = getStyles(this.props, this.context, this.state);
      var prepareStyles = this.context.muiTheme.prepareStyles;


      return _react2.default.createElement(
        'div',
        { style: prepareStyles(styles.root) },
        _react2.default.createElement('div', { style: prepareStyles(styles.mark) })
      );
    }
  }]);

  return ClockPointer;
}(_react.Component);

ClockPointer.propTypes = {
  hasSelected: _react.PropTypes.bool,
  type: _react.PropTypes.oneOf(['hour', 'minute']),
  value: _react.PropTypes.number
};
ClockPointer.defaultProps = {
  hasSelected: false,
  value: null,
  type: 'minute'
};
ClockPointer.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = ClockPointer;