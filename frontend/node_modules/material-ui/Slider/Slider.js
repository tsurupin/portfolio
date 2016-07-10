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

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _transitions = require('../styles/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

var _FocusRipple = require('../internal/FocusRipple');

var _FocusRipple2 = _interopRequireDefault(_FocusRipple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Verifies min/max range.
 * @param   {Object} props         Properties of the React component.
 * @param   {String} propName      Name of the property to validate.
 * @param   {String} componentName Name of the component whose property is being validated.
 * @returns {Object} Returns an Error if min >= max otherwise null.
 */
var minMaxPropType = function minMaxPropType(props, propName, componentName) {
  var error = _react.PropTypes.number(props, propName, componentName);
  if (error !== null) return error;

  if (props.min >= props.max) {
    var errorMsg = propName === 'min' ? 'min should be less than max' : 'max should be greater than min';
    return new Error(errorMsg);
  }
};

/**
 * Verifies value is within the min/max range.
 * @param   {Object} props         Properties of the React component.
 * @param   {String} propName      Name of the property to validate.
 * @param   {String} componentName Name of the component whose property is being validated.
 * @returns {Object} Returns an Error if the value is not within the range otherwise null.
 */
var valueInRangePropType = function valueInRangePropType(props, propName, componentName) {
  var error = _react.PropTypes.number(props, propName, componentName);
  if (error !== null) return error;

  var value = props[propName];
  if (value < props.min || props.max < value) {
    return new Error(propName + ' should be within the range specified by min and max');
  }
};

var crossAxisProperty = {
  x: 'height',
  'x-reverse': 'height',
  y: 'width',
  'y-reverse': 'width'
};

var crossAxisOffsetProperty = {
  x: 'top',
  'x-reverse': 'top',
  y: 'left',
  'y-reverse': 'left'
};

var mainAxisProperty = {
  x: 'width',
  'x-reverse': 'width',
  y: 'height',
  'y-reverse': 'height'
};

var mainAxisMarginFromEnd = {
  x: 'marginRight',
  'x-reverse': 'marginLeft',
  y: 'marginTop',
  'y-reverse': 'marginBottom'
};

var mainAxisMarginFromStart = {
  x: 'marginLeft',
  'x-reverse': 'marginRight',
  y: 'marginBottom',
  'y-reverse': 'marginTop'
};

var mainAxisOffsetProperty = {
  x: 'left',
  'x-reverse': 'right',
  y: 'bottom',
  'y-reverse': 'top'
};

var mainAxisClientProperty = {
  x: 'clientWidth',
  'x-reverse': 'clientWidth',
  y: 'clientHeight',
  'y-reverse': 'clientHeight'
};

var mainAxisClientOffsetProperty = {
  x: 'clientX',
  'x-reverse': 'clientX',
  y: 'clientY',
  'y-reverse': 'clientY'
};

var reverseMainAxisOffsetProperty = {
  x: 'right',
  'x-reverse': 'left',
  y: 'top',
  'y-reverse': 'bottom'
};

var isMouseControlInverted = function isMouseControlInverted(axis) {
  return axis === 'x-reverse' || axis === 'y';
};

var getStyles = function getStyles(props, context, state) {
  var _slider, _track, _filledAndRemaining, _handle, _objectAssign2, _objectAssign3;

  var slider = context.muiTheme.slider;

  var fillGutter = slider.handleSize / 2;
  var disabledGutter = slider.trackSize + slider.handleSizeDisabled / 2;
  var calcDisabledSpacing = props.disabled ? ' - ' + disabledGutter + 'px' : '';
  var axis = props.axis;

  var styles = {
    slider: (_slider = {
      touchCallout: 'none',
      userSelect: 'none',
      cursor: 'default'
    }, _defineProperty(_slider, crossAxisProperty[axis], slider.handleSizeActive), _defineProperty(_slider, mainAxisProperty[axis], '100%'), _defineProperty(_slider, 'position', 'relative'), _defineProperty(_slider, 'marginTop', 24), _defineProperty(_slider, 'marginBottom', 48), _slider),
    track: (_track = {
      position: 'absolute'
    }, _defineProperty(_track, crossAxisOffsetProperty[axis], (slider.handleSizeActive - slider.trackSize) / 2), _defineProperty(_track, mainAxisOffsetProperty[axis], 0), _defineProperty(_track, mainAxisProperty[axis], '100%'), _defineProperty(_track, crossAxisProperty[axis], slider.trackSize), _track),
    filledAndRemaining: (_filledAndRemaining = {
      position: 'absolute'
    }, _defineProperty(_filledAndRemaining, crossAxisOffsetProperty, 0), _defineProperty(_filledAndRemaining, crossAxisProperty[axis], '100%'), _defineProperty(_filledAndRemaining, 'transition', _transitions2.default.easeOut(null, 'margin')), _filledAndRemaining),
    handle: (_handle = {
      boxSizing: 'border-box',
      position: 'absolute',
      cursor: 'pointer',
      pointerEvents: 'inherit'
    }, _defineProperty(_handle, crossAxisOffsetProperty[axis], 0), _defineProperty(_handle, mainAxisOffsetProperty[axis], state.percent === 0 ? '0%' : state.percent * 100 + '%'), _defineProperty(_handle, 'zIndex', 1), _defineProperty(_handle, 'margin', {
      x: slider.trackSize / 2 + 'px 0 0 0',
      'x-reverse': slider.trackSize / 2 + 'px 0 0 0',
      y: '0 0 0 ' + slider.trackSize / 2 + 'px',
      'y-reverse': '0 0 0 ' + slider.trackSize / 2 + 'px'
    }[props.axis]), _defineProperty(_handle, 'width', slider.handleSize), _defineProperty(_handle, 'height', slider.handleSize), _defineProperty(_handle, 'backgroundColor', slider.selectionColor), _defineProperty(_handle, 'backgroundClip', 'padding-box'), _defineProperty(_handle, 'border', '0px solid transparent'), _defineProperty(_handle, 'borderRadius', '50%'), _defineProperty(_handle, 'transform', {
      x: 'translate(-50%, -50%)',
      'x-reverse': 'translate(50%, -50%)',
      y: 'translate(-50%, 50%)',
      'y-reverse': 'translate(-50%, -50%)'
    }[props.axis]), _defineProperty(_handle, 'transition', _transitions2.default.easeOut('450ms', 'background') + ', ' + _transitions2.default.easeOut('450ms', 'border-color') + ', ' + _transitions2.default.easeOut('450ms', 'width') + ', ' + _transitions2.default.easeOut('450ms', 'height')), _defineProperty(_handle, 'overflow', 'visible'), _defineProperty(_handle, 'outline', 'none'), _handle),
    handleWhenDisabled: {
      boxSizing: 'content-box',
      cursor: 'not-allowed',
      backgroundColor: slider.trackColor,
      width: slider.handleSizeDisabled,
      height: slider.handleSizeDisabled,
      border: 'none'
    },
    handleWhenPercentZero: {
      border: slider.trackSize + 'px solid ' + slider.handleColorZero,
      backgroundColor: slider.handleFillColor,
      boxShadow: 'none'
    },
    handleWhenPercentZeroAndDisabled: {
      cursor: 'not-allowed',
      width: slider.handleSizeDisabled,
      height: slider.handleSizeDisabled
    },
    handleWhenPercentZeroAndFocused: {
      border: slider.trackSize + 'px solid ' + slider.trackColorSelected
    },
    handleWhenActive: {
      width: slider.handleSizeActive,
      height: slider.handleSizeActive
    },
    ripple: {
      height: slider.handleSize,
      width: slider.handleSize,
      overflow: 'visible'
    },
    rippleWhenPercentZero: {
      top: -slider.trackSize,
      left: -slider.trackSize
    },
    rippleInner: {
      height: '300%',
      width: '300%',
      top: -slider.handleSize,
      left: -slider.handleSize
    },
    rippleColor: {
      fill: state.percent === 0 ? slider.handleColorZero : slider.rippleColor
    }
  };
  styles.filled = (0, _simpleAssign2.default)({}, styles.filledAndRemaining, (_objectAssign2 = {}, _defineProperty(_objectAssign2, mainAxisOffsetProperty[axis], 0), _defineProperty(_objectAssign2, 'backgroundColor', props.disabled ? slider.trackColor : slider.selectionColor), _defineProperty(_objectAssign2, mainAxisMarginFromEnd[axis], fillGutter), _defineProperty(_objectAssign2, mainAxisProperty[axis], 'calc(' + state.percent * 100 + '%' + calcDisabledSpacing + ')'), _objectAssign2));
  styles.remaining = (0, _simpleAssign2.default)({}, styles.filledAndRemaining, (_objectAssign3 = {}, _defineProperty(_objectAssign3, reverseMainAxisOffsetProperty[axis], 0), _defineProperty(_objectAssign3, 'backgroundColor', (state.hovered || state.focused) && !props.disabled ? slider.trackColorSelected : slider.trackColor), _defineProperty(_objectAssign3, mainAxisMarginFromStart[axis], fillGutter), _defineProperty(_objectAssign3, mainAxisProperty[axis], 'calc(' + (1 - state.percent) * 100 + '%' + calcDisabledSpacing + ')'), _objectAssign3));

  return styles;
};

var Slider = function (_Component) {
  _inherits(Slider, _Component);

  function Slider() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Slider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Slider)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      active: false,
      dragging: false,
      focused: false,
      hovered: false,
      percent: 0,
      value: 0
    }, _this.onHandleTouchStart = function (event) {
      if (document) {
        document.addEventListener('touchmove', _this.dragTouchHandler, false);
        document.addEventListener('touchup', _this.dragTouchEndHandler, false);
        document.addEventListener('touchend', _this.dragTouchEndHandler, false);
        document.addEventListener('touchcancel', _this.dragTouchEndHandler, false);
      }
      _this.onDragStart(event);

      // Cancel scroll and context menu
      event.preventDefault();
    }, _this.onHandleMouseDown = function (event) {
      if (document) {
        document.addEventListener('mousemove', _this.dragHandler, false);
        document.addEventListener('mouseup', _this.dragEndHandler, false);

        // Cancel text selection
        event.preventDefault();

        // Set focus manually since we called preventDefault()
        _this.refs.handle.focus();
      }
      _this.onDragStart(event);
    }, _this.onHandleKeyDown = function (event) {
      var _this$props = _this.props;
      var axis = _this$props.axis;
      var min = _this$props.min;
      var max = _this$props.max;
      var step = _this$props.step;

      var action = void 0;

      switch ((0, _keycode2.default)(event)) {
        case 'page down':
        case 'down':
          if (axis === 'y-reverse') {
            action = 'increase';
          } else {
            action = 'decrease';
          }
          break;
        case 'left':
          if (axis === 'x-reverse') {
            action = 'increase';
          } else {
            action = 'decrease';
          }
          break;
        case 'page up':
        case 'up':
          if (axis === 'y-reverse') {
            action = 'decrease';
          } else {
            action = 'increase';
          }
          break;
        case 'right':
          if (axis === 'x-reverse') {
            action = 'decrease';
          } else {
            action = 'increase';
          }
          break;
        case 'home':
          action = 'home';
          break;
        case 'end':
          action = 'end';
          break;
      }

      if (action) {
        var newValue = void 0;
        var newPercent = void 0;

        // Cancel scroll
        event.preventDefault();

        // When pressing home or end the handle should be taken to the
        // beginning or end of the track respectively
        switch (action) {
          case 'decrease':
            newValue = Math.max(min, _this.state.value - step);
            newPercent = (newValue - min) / (max - min);
            break;
          case 'increase':
            newValue = Math.min(max, _this.state.value + step);
            newPercent = (newValue - min) / (max - min);
            break;
          case 'home':
            newValue = min;
            newPercent = 0;
            break;
          case 'end':
            newValue = max;
            newPercent = 1;
            break;
        }

        // We need to use toFixed() because of float point errors.
        // For example, 0.01 + 0.06 = 0.06999999999999999
        if (_this.state.value !== newValue) {
          _this.setState({
            percent: newPercent,
            value: parseFloat(newValue.toFixed(5))
          }, function () {
            if (_this.props.onChange) _this.props.onChange(event, _this.state.value);
          });
        }
      }
    }, _this.dragHandler = function (event) {
      if (_this.dragRunning) {
        return;
      }
      _this.dragRunning = true;
      requestAnimationFrame(function () {
        var pos = void 0;
        if (isMouseControlInverted(_this.props.axis)) {
          pos = _this.getTrackOffset() - event[mainAxisClientOffsetProperty[_this.props.axis]];
        } else {
          pos = event[mainAxisClientOffsetProperty[_this.props.axis]] - _this.getTrackOffset();
        }
        _this.onDragUpdate(event, pos);
        _this.dragRunning = false;
      });
    }, _this.dragTouchHandler = function (event) {
      if (_this.dragRunning) {
        return;
      }
      _this.dragRunning = true;
      requestAnimationFrame(function () {
        var pos = void 0;
        if (isMouseControlInverted(_this.props.axis)) {
          pos = _this.getTrackOffset() - event.touches[0][mainAxisClientOffsetProperty[_this.props.axis]];
        } else {
          pos = event.touches[0][mainAxisClientOffsetProperty[_this.props.axis]] - _this.getTrackOffset();
        }
        _this.onDragUpdate(event, pos);
        _this.dragRunning = false;
      });
    }, _this.dragEndHandler = function (event) {
      if (document) {
        document.removeEventListener('mousemove', _this.dragHandler, false);
        document.removeEventListener('mouseup', _this.dragEndHandler, false);
      }

      _this.onDragStop(event);
    }, _this.dragTouchEndHandler = function (event) {
      if (document) {
        document.removeEventListener('touchmove', _this.dragTouchHandler, false);
        document.removeEventListener('touchup', _this.dragTouchEndHandler, false);
        document.removeEventListener('touchend', _this.dragTouchEndHandler, false);
        document.removeEventListener('touchcancel', _this.dragTouchEndHandler, false);
      }

      _this.onDragStop(event);
    }, _this.handleTouchStart = function (event) {
      if (!_this.props.disabled && !_this.state.dragging) {
        var pos = void 0;
        if (isMouseControlInverted(_this.props.axis)) {
          pos = _this.getTrackOffset() - event.touches[0][mainAxisClientOffsetProperty[_this.props.axis]];
        } else {
          pos = event.touches[0][mainAxisClientOffsetProperty[_this.props.axis]] - _this.getTrackOffset();
        }
        _this.dragTo(event, pos);

        // Since the touch event fired for the track and handle is child of
        // track, we need to manually propagate the event to the handle.
        _this.onHandleTouchStart(event);
      }
    }, _this.handleFocus = function (event) {
      _this.setState({ focused: true });

      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    }, _this.handleBlur = function (event) {
      _this.setState({
        focused: false,
        active: false
      });

      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }
    }, _this.handleMouseDown = function (event) {
      if (!_this.props.disabled && !_this.state.dragging) {
        var pos = void 0;
        if (isMouseControlInverted(_this.props.axis)) {
          pos = _this.getTrackOffset() - event[mainAxisClientOffsetProperty[_this.props.axis]];
        } else {
          pos = event[mainAxisClientOffsetProperty[_this.props.axis]] - _this.getTrackOffset();
        }
        _this.dragTo(event, pos);

        // Since the click event fired for the track and handle is child of
        // track, we need to manually propagate the event to the handle.
        _this.onHandleMouseDown(event);
      }
    }, _this.handleMouseUp = function () {
      if (!_this.props.disabled) {
        _this.setState({ active: false });
      }
    }, _this.handleMouseEnter = function () {
      _this.setState({ hovered: true });
    }, _this.handleMouseLeave = function () {
      _this.setState({ hovered: false });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Slider, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var value = this.props.value;
      if (value === undefined) {
        value = this.props.defaultValue !== undefined ? this.props.defaultValue : this.props.min;
      }
      var percent = (value - this.props.min) / (this.props.max - this.props.min);
      if (isNaN(percent)) {
        percent = 0;
      }

      this.setState({
        percent: percent,
        value: value
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== undefined && !this.state.dragging) {
        this.setValue(nextProps.value);
      }
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.state.value;
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      // calculate percentage
      var percent = (value - this.props.min) / (this.props.max - this.props.min);
      if (isNaN(percent)) percent = 0;
      // update state
      this.setState({
        value: value,
        percent: percent
      });
    }
  }, {
    key: 'getPercent',
    value: function getPercent() {
      return this.state.percent;
    }
  }, {
    key: 'setPercent',
    value: function setPercent(percent, callback) {
      var value = this.alignValue(this.percentToValue(percent));
      var _props = this.props;
      var min = _props.min;
      var max = _props.max;

      var alignedPercent = (value - min) / (max - min);
      if (this.state.value !== value) {
        this.setState({ value: value, percent: alignedPercent }, callback);
      }
    }
  }, {
    key: 'clearValue',
    value: function clearValue() {
      this.setValue(this.props.min);
    }
  }, {
    key: 'alignValue',
    value: function alignValue(val) {
      var _props2 = this.props;
      var step = _props2.step;
      var min = _props2.min;

      var alignValue = Math.round((val - min) / step) * step + min;
      return parseFloat(alignValue.toFixed(5));
    }
  }, {
    key: 'getTrackOffset',
    value: function getTrackOffset() {
      return this.refs.track.getBoundingClientRect()[mainAxisOffsetProperty[this.props.axis]];
    }
  }, {
    key: 'onDragStart',
    value: function onDragStart(event) {
      this.setState({
        dragging: true,
        active: true
      });

      if (this.props.onDragStart) {
        this.props.onDragStart(event);
      }
    }
  }, {
    key: 'onDragStop',
    value: function onDragStop(event) {
      this.setState({
        dragging: false,
        active: false
      });

      if (this.props.onDragStop) {
        this.props.onDragStop(event);
      }
    }
  }, {
    key: 'onDragUpdate',
    value: function onDragUpdate(event, pos) {
      if (!this.state.dragging) {
        return;
      }
      if (!this.props.disabled) {
        this.dragTo(event, pos);
      }
    }
  }, {
    key: 'dragTo',
    value: function dragTo(event, pos) {
      var max = this.refs.track[mainAxisClientProperty[this.props.axis]];
      if (pos < 0) {
        pos = 0;
      } else if (pos > max) {
        pos = max;
      }
      this.updateWithChangeEvent(event, pos / max);
    }
  }, {
    key: 'updateWithChangeEvent',
    value: function updateWithChangeEvent(event, percent) {
      var _this2 = this;

      this.setPercent(percent, function () {
        if (_this2.props.onChange) {
          _this2.props.onChange(event, _this2.state.value);
        }
      });
    }
  }, {
    key: 'percentToValue',
    value: function percentToValue(percent) {
      return percent * (this.props.max - this.props.min) + this.props.min;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var axis = _props3.axis;
      var description = _props3.description;
      var disabled = _props3.disabled;
      var disableFocusRipple = _props3.disableFocusRipple;
      var error = _props3.error;
      var max = _props3.max;
      var min = _props3.min;
      var name = _props3.name;
      var onBlur = _props3.onBlur;
      var onChange = _props3.onChange;
      var onDragStart = _props3.onDragStart;
      var onDragStop = _props3.onDragStop;
      var onFocus = _props3.onFocus;
      var required = _props3.required;
      var sliderStyle = _props3.sliderStyle;
      var step = _props3.step;
      var style = _props3.style;

      var other = _objectWithoutProperties(_props3, ['axis', 'description', 'disabled', 'disableFocusRipple', 'error', 'max', 'min', 'name', 'onBlur', 'onChange', 'onDragStart', 'onDragStop', 'onFocus', 'required', 'sliderStyle', 'step', 'style']);

      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context, this.state);

      var handleStyles = {};
      var percent = this.state.percent;
      if (percent > 1) {
        percent = 1;
      } else if (percent < 0) {
        percent = 0;
      }

      if (percent === 0) {
        handleStyles = (0, _simpleAssign2.default)({}, styles.handle, styles.handleWhenPercentZero, this.state.active && styles.handleWhenActive, (this.state.hovered || this.state.focused) && !disabled && styles.handleWhenPercentZeroAndFocused, disabled && styles.handleWhenPercentZeroAndDisabled);
      } else {
        handleStyles = (0, _simpleAssign2.default)({}, styles.handle, this.state.active && styles.handleWhenActive, disabled && styles.handleWhenDisabled);
      }

      var rippleStyle = (0, _simpleAssign2.default)({}, styles.ripple, percent === 0 && styles.rippleWhenPercentZero);

      var rippleShowCondition = (this.state.hovered || this.state.focused) && !this.state.active;

      var focusRipple = void 0;
      if (!disabled && !disableFocusRipple) {
        focusRipple = _react2.default.createElement(_FocusRipple2.default, {
          ref: 'focusRipple',
          key: 'focusRipple',
          style: rippleStyle,
          innerStyle: styles.rippleInner,
          show: rippleShowCondition,
          muiTheme: this.context.muiTheme,
          color: styles.rippleColor.fill
        });
      }

      var handleDragProps = void 0;
      if (!disabled) {
        handleDragProps = {
          onTouchStart: this.onHandleTouchStart,
          onMouseDown: this.onHandleMouseDown,
          onKeyDown: this.onHandleKeyDown
        };
      }

      return _react2.default.createElement(
        'div',
        _extends({}, other, { style: prepareStyles((0, _simpleAssign2.default)({}, style)) }),
        _react2.default.createElement(
          'span',
          null,
          description
        ),
        _react2.default.createElement(
          'span',
          null,
          error
        ),
        _react2.default.createElement(
          'div',
          {
            style: prepareStyles((0, _simpleAssign2.default)(styles.slider, sliderStyle)),
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onMouseDown: this.handleMouseDown,
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave,
            onMouseUp: this.handleMouseUp,
            onTouchStart: this.handleTouchStart
          },
          _react2.default.createElement(
            'div',
            { ref: 'track', style: prepareStyles(styles.track) },
            _react2.default.createElement('div', { style: prepareStyles(styles.filled) }),
            _react2.default.createElement('div', { style: prepareStyles(styles.remaining) }),
            _react2.default.createElement(
              'div',
              _extends({
                ref: 'handle',
                style: prepareStyles(handleStyles),
                tabIndex: 0
              }, handleDragProps),
              focusRipple
            )
          )
        ),
        _react2.default.createElement('input', {
          ref: 'input',
          type: 'hidden',
          name: name,
          value: this.state.value,
          required: required,
          min: min,
          max: max,
          step: step
        })
      );
    }
  }]);

  return Slider;
}(_react.Component);

Slider.propTypes = {
  /**
   * The axis on which the slider will slide.
   */
  axis: _react.PropTypes.oneOf(['x', 'x-reverse', 'y', 'y-reverse']),
  /**
   * The default value of the slider.
   */
  defaultValue: valueInRangePropType,
  /**
   * Describe the slider.
   */
  description: _react.PropTypes.string,
  /**
   * Disables focus ripple if set to true.
   */
  disableFocusRipple: _react.PropTypes.bool,
  /**
   * If true, the slider will not be interactable.
   */
  disabled: _react.PropTypes.bool,
  /**
   * An error message for the slider.
   */
  error: _react.PropTypes.string,
  /**
   * The maximum value the slider can slide to on
   * a scale from 0 to 1 inclusive. Cannot be equal to min.
   */
  max: minMaxPropType,
  /**
   * The minimum value the slider can slide to on a scale
   * from 0 to 1 inclusive. Cannot be equal to max.
   */
  min: minMaxPropType,
  /**
   * The name of the slider. Behaves like the name attribute
   * of an input element.
   */
  name: _react.PropTypes.string,
  /** @ignore */
  onBlur: _react.PropTypes.func,
  /**
   * Callback function that is fired when the user changes the slider's value.
   */
  onChange: _react.PropTypes.func,
  /**
   * Callback function that is fired when the slider has begun to move.
   */
  onDragStart: _react.PropTypes.func,
  /**
   * Callback function that is fried when the slide has stopped moving.
   */
  onDragStop: _react.PropTypes.func,
  /** @ignore */
  onFocus: _react.PropTypes.func,
  /**
   * Whether or not the slider is required in a form.
   */
  required: _react.PropTypes.bool,
  /**
   * Override the inline-styles of the inner slider element.
   */
  sliderStyle: _react.PropTypes.object,
  /**
   * The granularity the slider can step through values.
   */
  step: _react.PropTypes.number,
  /**
   * Override the inline-styles of the root element.
   */
  style: _react.PropTypes.object,
  /**
   * The value of the slider.
   */
  value: valueInRangePropType
};
Slider.defaultProps = {
  axis: 'x',
  disabled: false,
  disableFocusRipple: false,
  max: 1,
  min: 0,
  required: true,
  step: 0.01,
  style: {}
};
Slider.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = Slider;