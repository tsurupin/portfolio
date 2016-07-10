'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EnhancedButton = require('../internal/EnhancedButton');

var _EnhancedButton2 = _interopRequireDefault(_EnhancedButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getStyles(props, context, state) {
  var selected = props.selected;
  var year = props.year;
  var _context$muiTheme = context.muiTheme;
  var baseTheme = _context$muiTheme.baseTheme;
  var datePicker = _context$muiTheme.datePicker;
  var hover = state.hover;


  return {
    root: {
      boxSizing: 'border-box',
      color: year === new Date().getFullYear() && datePicker.color,
      display: 'block',
      fontSize: 14,
      margin: '0 auto',
      position: 'relative',
      textAlign: 'center',
      lineHeight: 'inherit',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)' },
    label: {
      alignSelf: 'center',
      color: hover || selected ? datePicker.color : baseTheme.palette.textColor,
      fontSize: selected ? 26 : 17,
      fontWeight: hover ? 450 : selected ? 500 : 400,
      position: 'relative',
      top: -1
    }
  };
}

var YearButton = function (_Component) {
  _inherits(YearButton, _Component);

  function YearButton() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, YearButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(YearButton)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      hover: false
    }, _this.handleMouseEnter = function () {
      _this.setState({ hover: true });
    }, _this.handleMouseLeave = function () {
      _this.setState({ hover: false });
    }, _this.handleTouchTap = function (event) {
      if (_this.props.onTouchTap) _this.props.onTouchTap(event, _this.props.year);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(YearButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var year = _props.year;
      var onTouchTap = _props.onTouchTap;
      var selected = _props.selected;

      var other = _objectWithoutProperties(_props, ['className', 'year', 'onTouchTap', 'selected']);

      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context, this.state);

      return _react2.default.createElement(
        _EnhancedButton2.default,
        _extends({}, other, {
          disableFocusRipple: true,
          disableTouchRipple: true,
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
          onTouchTap: this.handleTouchTap,
          style: styles.root
        }),
        _react2.default.createElement(
          'span',
          { style: prepareStyles(styles.label) },
          year
        )
      );
    }
  }]);

  return YearButton;
}(_react.Component);

YearButton.propTypes = {
  /**
   * The css class name of the root element.
   */
  className: _react.PropTypes.string,
  onTouchTap: _react.PropTypes.func,
  selected: _react.PropTypes.bool,
  year: _react.PropTypes.number
};
YearButton.defaultProps = {
  selected: false
};
YearButton.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = YearButton;