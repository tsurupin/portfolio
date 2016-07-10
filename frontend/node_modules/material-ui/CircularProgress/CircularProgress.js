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

var _autoPrefix = require('../utils/autoPrefix');

var _autoPrefix2 = _interopRequireDefault(_autoPrefix);

var _transitions = require('../styles/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getRelativeValue(value, min, max) {
  var clampedValue = Math.min(Math.max(min, value), max);
  var rangeValue = max - min;
  var relValue = Math.round(clampedValue / rangeValue * 10000) / 10000;
  return relValue * 100;
}

function getStyles(props, context) {
  var max = props.max;
  var min = props.min;
  var size = props.size;
  var value = props.value;
  var palette = context.muiTheme.baseTheme.palette;

  var zoom = size * 1.4;
  var baseSize = 50;
  var margin = Math.round((50 * zoom - 50) / 2);

  if (margin < 0) margin = 0;

  var styles = {
    root: {
      position: 'relative',
      margin: margin,
      display: 'inline-block',
      width: baseSize,
      height: baseSize
    },
    wrapper: {
      width: baseSize,
      height: baseSize,
      display: 'inline-block',
      transition: _transitions2.default.create('transform', '20s', null, 'linear'),
      transitionTimingFunction: 'linear'
    },
    svg: {
      height: baseSize,
      position: 'relative',
      transform: 'scale(' + zoom + ')',
      width: baseSize
    },
    path: {
      strokeDasharray: '89, 200',
      strokeDashoffset: 0,
      stroke: props.color || palette.primary1Color,
      strokeLinecap: 'round',
      transition: _transitions2.default.create('all', '1.5s', null, 'ease-in-out')
    }
  };

  if (props.mode === 'determinate') {
    var relVal = getRelativeValue(value, min, max);
    styles.path.transition = _transitions2.default.create('all', '0.3s', null, 'linear');
    styles.path.strokeDasharray = Math.round(relVal * 1.25) + ', 200';
  }

  return styles;
}

var CircularProgress = function (_Component) {
  _inherits(CircularProgress, _Component);

  function CircularProgress() {
    _classCallCheck(this, CircularProgress);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CircularProgress).apply(this, arguments));
  }

  _createClass(CircularProgress, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scalePath(this.refs.path);
      this.rotateWrapper(this.refs.wrapper);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.scalePathTimer);
      clearTimeout(this.rotateWrapperTimer);
    }
  }, {
    key: 'scalePath',
    value: function scalePath(path, step) {
      var _this2 = this;

      if (this.props.mode !== 'indeterminate') return;

      step = step || 0;
      step %= 3;

      if (step === 0) {
        path.style.strokeDasharray = '1, 200';
        path.style.strokeDashoffset = 0;
        path.style.transitionDuration = '0ms';
      } else if (step === 1) {
        path.style.strokeDasharray = '89, 200';
        path.style.strokeDashoffset = -35;
        path.style.transitionDuration = '750ms';
      } else {
        path.style.strokeDasharray = '89, 200';
        path.style.strokeDashoffset = -124;
        path.style.transitionDuration = '850ms';
      }

      this.scalePathTimer = setTimeout(function () {
        return _this2.scalePath(path, step + 1);
      }, step ? 750 : 250);
    }
  }, {
    key: 'rotateWrapper',
    value: function rotateWrapper(wrapper) {
      var _this3 = this;

      if (this.props.mode !== 'indeterminate') return;

      _autoPrefix2.default.set(wrapper.style, 'transform', 'rotate(0deg)');
      _autoPrefix2.default.set(wrapper.style, 'transitionDuration', '0ms');

      setTimeout(function () {
        _autoPrefix2.default.set(wrapper.style, 'transform', 'rotate(1800deg)');
        _autoPrefix2.default.set(wrapper.style, 'transitionDuration', '10s');
        _autoPrefix2.default.set(wrapper.style, 'transitionTimingFunction', 'linear');
      }, 50);

      this.rotateWrapperTimer = setTimeout(function () {
        return _this3.rotateWrapper(wrapper);
      }, 10050);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var style = _props.style;
      var innerStyle = _props.innerStyle;
      var size = _props.size;

      var other = _objectWithoutProperties(_props, ['style', 'innerStyle', 'size']);

      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);

      return _react2.default.createElement(
        'div',
        _extends({}, other, { style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)) }),
        _react2.default.createElement(
          'div',
          { ref: 'wrapper', style: prepareStyles((0, _simpleAssign2.default)(styles.wrapper, innerStyle)) },
          _react2.default.createElement(
            'svg',
            { style: prepareStyles(styles.svg) },
            _react2.default.createElement('circle', {
              ref: 'path',
              style: prepareStyles(styles.path),
              cx: '25',
              cy: '25',
              r: '20',
              fill: 'none',
              strokeWidth: '2.5',
              strokeMiterlimit: '20'
            })
          )
        )
      );
    }
  }]);

  return CircularProgress;
}(_react.Component);

CircularProgress.propTypes = {
  /**
   * Override the progress's color.
   */
  color: _react.PropTypes.string,
  /**
   * Style for inner wrapper div.
   */
  innerStyle: _react.PropTypes.object,
  /**
   * The max value of progress, only works in determinate mode.
   */
  max: _react.PropTypes.number,
  /**
   * The min value of progress, only works in determinate mode.
   */
  min: _react.PropTypes.number,
  /**
   * The mode of show your progress, indeterminate
   * for when there is no value for progress.
   */
  mode: _react.PropTypes.oneOf(['determinate', 'indeterminate']),
  /**
   * The size of the progress.
   */
  size: _react.PropTypes.number,
  /**
   * Override the inline-styles of the root element.
   */
  style: _react.PropTypes.object,
  /**
   * The value of progress, only works in determinate mode.
   */
  value: _react.PropTypes.number
};
CircularProgress.defaultProps = {
  mode: 'indeterminate',
  value: 0,
  min: 0,
  max: 100,
  size: 1
};
CircularProgress.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = CircularProgress;