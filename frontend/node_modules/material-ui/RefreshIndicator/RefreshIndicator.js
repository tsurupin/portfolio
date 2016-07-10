'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

var _Paper = require('../Paper');

var _Paper2 = _interopRequireDefault(_Paper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VIEWBOX_SIZE = 32;

function getStyles(props) {
  var padding = props.size * 0.1; // same implementation of `this.getPaddingSize()`
  return {
    root: {
      position: 'absolute',
      zIndex: 2,
      width: props.size,
      height: props.size,
      padding: padding,
      top: -10000,
      left: -10000,
      transform: 'translate3d(' + (10000 + props.left) + 'px, ' + (10000 + props.top) + 'px, 0)',
      opacity: props.status === 'hide' ? 0 : 1,
      transition: props.status === 'hide' ? _transitions2.default.create('all', '.3s', 'ease-out') : 'none'
    }
  };
}

var RefreshIndicator = function (_Component) {
  _inherits(RefreshIndicator, _Component);

  function RefreshIndicator() {
    _classCallCheck(this, RefreshIndicator);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(RefreshIndicator).apply(this, arguments));
  }

  _createClass(RefreshIndicator, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scalePath(this.refs.path, 0);
      this.rotateWrapper(this.refs.wrapper);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      clearTimeout(this.scalePathTimer);
      clearTimeout(this.rotateWrapperTimer);
      clearTimeout(this.rotateWrapperSecondTimer);

      this.scalePath(this.refs.path, 0);
      this.rotateWrapper(this.refs.wrapper);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.scalePathTimer);
      clearTimeout(this.rotateWrapperTimer);
      clearTimeout(this.rotateWrapperSecondTimer);
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var paperSize = this.getPaperSize();

      var childrenCmp = null;
      if (this.props.status !== 'ready') {
        var circleStyle = this.getCircleStyle(paperSize);
        childrenCmp = _react2.default.createElement(
          'div',
          {
            ref: 'wrapper',
            style: prepareStyles({
              transition: _transitions2.default.create('transform', '20s', null, 'linear'),
              width: '100%',
              height: '100%'
            })
          },
          _react2.default.createElement(
            'svg',
            {
              style: {
                width: paperSize,
                height: paperSize
              },
              viewBox: '0 0 ' + VIEWBOX_SIZE + ' ' + VIEWBOX_SIZE
            },
            _react2.default.createElement('circle', _extends({
              ref: 'path',
              style: prepareStyles((0, _simpleAssign2.default)(circleStyle.style, {
                transition: _transitions2.default.create('all', '1.5s', null, 'ease-in-out')
              }))
            }, circleStyle.attr))
          )
        );
      } else {
        var _circleStyle = this.getCircleStyle(paperSize);
        var polygonStyle = this.getPolygonStyle(paperSize);
        childrenCmp = _react2.default.createElement(
          'svg',
          {
            style: {
              width: paperSize,
              height: paperSize
            },
            viewBox: '0 0 ' + VIEWBOX_SIZE + ' ' + VIEWBOX_SIZE
          },
          _react2.default.createElement('circle', _extends({
            style: prepareStyles(_circleStyle.style)
          }, _circleStyle.attr)),
          _react2.default.createElement('polygon', _extends({
            style: prepareStyles(polygonStyle.style)
          }, polygonStyle.attr))
        );
      }

      return childrenCmp;
    }
  }, {
    key: 'getTheme',
    value: function getTheme() {
      return this.context.muiTheme.refreshIndicator;
    }
  }, {
    key: 'getPaddingSize',
    value: function getPaddingSize() {
      var padding = this.props.size * 0.1;
      return padding;
    }
  }, {
    key: 'getPaperSize',
    value: function getPaperSize() {
      return this.props.size - this.getPaddingSize() * 2;
    }
  }, {
    key: 'getCircleAttr',
    value: function getCircleAttr() {
      return {
        radiu: VIEWBOX_SIZE / 2 - 5,
        originX: VIEWBOX_SIZE / 2,
        originY: VIEWBOX_SIZE / 2,
        strokeWidth: 3
      };
    }
  }, {
    key: 'getArcDeg',
    value: function getArcDeg() {
      var p = this.props.percentage / 100;

      var beginDeg = p * 120;
      var endDeg = p * 410;
      return [beginDeg, endDeg];
    }
  }, {
    key: 'getFactor',
    value: function getFactor() {
      var p = this.props.percentage / 100;
      var p1 = Math.min(1, p / 0.4);

      return p1;
    }
  }, {
    key: 'getCircleStyle',
    value: function getCircleStyle() {
      var isLoading = this.props.status === 'loading';
      var p1 = isLoading ? 1 : this.getFactor();
      var circle = this.getCircleAttr();
      var perimeter = Math.PI * 2 * circle.radiu;

      var _getArcDeg = this.getArcDeg();

      var _getArcDeg2 = _slicedToArray(_getArcDeg, 2);

      var beginDeg = _getArcDeg2[0];
      var endDeg = _getArcDeg2[1];

      var arcLen = (endDeg - beginDeg) * perimeter / 360;
      var dashOffset = -beginDeg * perimeter / 360;

      var theme = this.getTheme();
      return {
        style: {
          strokeDasharray: arcLen + ', ' + (perimeter - arcLen),
          strokeDashoffset: dashOffset,
          stroke: isLoading || this.props.percentage === 100 ? this.props.loadingColor || theme.loadingStrokeColor : this.props.color || theme.strokeColor,
          strokeLinecap: 'round',
          opacity: p1,
          strokeWidth: circle.strokeWidth * p1,
          fill: 'none'
        },
        attr: {
          cx: circle.originX,
          cy: circle.originY,
          r: circle.radiu
        }
      };
    }
  }, {
    key: 'getPolygonStyle',
    value: function getPolygonStyle() {
      var p1 = this.getFactor();
      var circle = this.getCircleAttr();

      var triangleCx = circle.originX + circle.radiu;
      var triangleCy = circle.originY;
      var dx = circle.strokeWidth * 7 / 4 * p1;
      var trianglePath = triangleCx - dx + ',' + triangleCy + ' ' + (triangleCx + dx) + ',' + triangleCy + ' ' + triangleCx + ',' + (triangleCy + dx);

      var _getArcDeg3 = this.getArcDeg();

      var _getArcDeg4 = _slicedToArray(_getArcDeg3, 2);

      var endDeg = _getArcDeg4[1];


      var theme = this.getTheme();
      return {
        style: {
          fill: this.props.percentage === 100 ? this.props.loadingColor || theme.loadingStrokeColor : this.props.color || theme.strokeColor,
          transform: 'rotate(' + endDeg + 'deg)',
          transformOrigin: circle.originX + 'px ' + circle.originY + 'px',
          opacity: p1
        },
        attr: {
          points: trianglePath
        }
      };
    }
  }, {
    key: 'scalePath',
    value: function scalePath(path, step) {
      var _this2 = this;

      if (this.props.status !== 'loading') return;

      var currStep = (step || 0) % 3;

      var circle = this.getCircleAttr();
      var perimeter = Math.PI * 2 * circle.radiu;
      var arcLen = perimeter * 0.64;

      var strokeDasharray = void 0;
      var strokeDashoffset = void 0;
      var transitionDuration = void 0;

      if (currStep === 0) {
        strokeDasharray = '1, 200';
        strokeDashoffset = 0;
        transitionDuration = '0ms';
      } else if (currStep === 1) {
        strokeDasharray = arcLen + ', 200';
        strokeDashoffset = -15;
        transitionDuration = '750ms';
      } else {
        strokeDasharray = arcLen + ', 200';
        strokeDashoffset = -(perimeter - 1);
        transitionDuration = '850ms';
      }

      _autoPrefix2.default.set(path.style, 'strokeDasharray', strokeDasharray);
      _autoPrefix2.default.set(path.style, 'strokeDashoffset', strokeDashoffset);
      _autoPrefix2.default.set(path.style, 'transitionDuration', transitionDuration);

      this.scalePathTimer = setTimeout(function () {
        return _this2.scalePath(path, currStep + 1);
      }, currStep ? 750 : 250);
    }
  }, {
    key: 'rotateWrapper',
    value: function rotateWrapper(wrapper) {
      var _this3 = this;

      if (this.props.status !== 'loading') return;

      _autoPrefix2.default.set(wrapper.style, 'transform', null);
      _autoPrefix2.default.set(wrapper.style, 'transform', 'rotate(0deg)');
      _autoPrefix2.default.set(wrapper.style, 'transitionDuration', '0ms');

      this.rotateWrapperSecondTimer = setTimeout(function () {
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
      var style = this.props.style;

      var styles = getStyles(this.props, this.context);

      return _react2.default.createElement(
        _Paper2.default,
        {
          circle: true,
          style: (0, _simpleAssign2.default)(styles.root, style),
          ref: 'indicatorCt'
        },
        this.renderChildren()
      );
    }
  }]);

  return RefreshIndicator;
}(_react.Component);

RefreshIndicator.propTypes = {
  /**
   * Override the theme's color of the indicator while it's status is
   * "ready" and it's percentage is less than 100.
   */
  color: _react.PropTypes.string,
  /**
   * The absolute left position of the indicator in pixels.
   */
  left: _react.PropTypes.number.isRequired,
  /**
   * Override the theme's color of the indicator while
   * it's status is "loading" or when it's percentage is 100.
   */
  loadingColor: _react.PropTypes.string,
  /**
   * The confirmation progress to fetch data. Max value is 100.
   */
  percentage: _react.PropTypes.number,
  /**
   * Size in pixels.
   */
  size: _react.PropTypes.number,
  /**
   * The display status of the indicator. If the status is
   * "ready", the indicator will display the ready state
   * arrow. If the status is "loading", it will display
   * the loading progress indicator. If the status is "hide",
   * the indicator will be hidden.
   */
  status: _react.PropTypes.oneOf(['ready', 'loading', 'hide']),
  /**
   * Override the inline-styles of the root element.
   */
  style: _react.PropTypes.object,
  /**
   * The absolute top position of the indicator in pixels.
   */
  top: _react.PropTypes.number.isRequired
};
RefreshIndicator.defaultProps = {
  percentage: 0,
  size: 40,
  status: 'hide'
};
RefreshIndicator.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = RefreshIndicator;