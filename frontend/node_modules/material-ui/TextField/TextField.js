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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _shallowEqual = require('recompose/shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _colorManipulator = require('../utils/colorManipulator');

var _transitions = require('../styles/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

var _deprecatedPropType = require('../utils/deprecatedPropType');

var _deprecatedPropType2 = _interopRequireDefault(_deprecatedPropType);

var _EnhancedTextarea = require('./EnhancedTextarea');

var _EnhancedTextarea2 = _interopRequireDefault(_EnhancedTextarea);

var _TextFieldHint = require('./TextFieldHint');

var _TextFieldHint2 = _interopRequireDefault(_TextFieldHint);

var _TextFieldLabel = require('./TextFieldLabel');

var _TextFieldLabel2 = _interopRequireDefault(_TextFieldLabel);

var _TextFieldUnderline = require('./TextFieldUnderline');

var _TextFieldUnderline2 = _interopRequireDefault(_TextFieldUnderline);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getStyles = function getStyles(props, context, state) {
  var _context$muiTheme = context.muiTheme;
  var baseTheme = _context$muiTheme.baseTheme;
  var _context$muiTheme$tex = _context$muiTheme.textField;
  var floatingLabelColor = _context$muiTheme$tex.floatingLabelColor;
  var focusColor = _context$muiTheme$tex.focusColor;
  var textColor = _context$muiTheme$tex.textColor;
  var disabledTextColor = _context$muiTheme$tex.disabledTextColor;
  var backgroundColor = _context$muiTheme$tex.backgroundColor;
  var hintColor = _context$muiTheme$tex.hintColor;
  var errorColor = _context$muiTheme$tex.errorColor;


  var styles = {
    root: {
      fontSize: 16,
      lineHeight: '24px',
      width: props.fullWidth ? '100%' : 256,
      height: (props.rows - 1) * 24 + (props.floatingLabelText ? 72 : 48),
      display: 'inline-block',
      position: 'relative',
      backgroundColor: backgroundColor,
      fontFamily: baseTheme.fontFamily,
      transition: _transitions2.default.easeOut('200ms', 'height')
    },
    error: {
      position: 'relative',
      bottom: 2,
      fontSize: 12,
      lineHeight: '12px',
      color: errorColor,
      transition: _transitions2.default.easeOut()
    },
    floatingLabel: {
      color: hintColor,
      pointerEvents: 'none'
    },
    input: {
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated style)
      padding: 0,
      position: 'relative',
      width: '100%',
      border: 'none',
      outline: 'none',
      backgroundColor: 'rgba(0,0,0,0)',
      color: props.disabled ? disabledTextColor : textColor,
      cursor: props.disabled ? 'not-allowed' : 'initial',
      font: 'inherit'
    },
    textarea: {}
  };

  (0, _simpleAssign2.default)(styles.error, props.errorStyle);

  (0, _simpleAssign2.default)(styles.textarea, styles.input, {
    marginTop: props.floatingLabelText ? 36 : 12,
    marginBottom: props.floatingLabelText ? -36 : -12,
    boxSizing: 'border-box',
    font: 'inherit'
  });

  // Do not assign a height to the textarea as he handles it on his own.
  styles.input.height = '100%';

  if (state.hasValue) {
    styles.floatingLabel.color = (0, _colorManipulator.fade)(props.disabled ? disabledTextColor : floatingLabelColor, 0.5);
  }

  if (state.isFocused) {
    styles.floatingLabel.color = focusColor;
  }

  if (props.floatingLabelText) {
    styles.input.boxSizing = 'border-box';

    if (!props.multiLine) {
      styles.input.marginTop = 14;
    }

    if (state.errorText) {
      styles.error.bottom = !props.multiLine ? styles.error.fontSize + 3 : 3;
    }
  }

  if (state.errorText) {
    if (state.isFocused) {
      styles.floatingLabel.color = styles.error.color;
    }
  }

  return styles;
};

/**
 * Check if a value is valid to be displayed inside an input.
 *
 * @param The value to check.
 * @returns True if the string provided is valid, false otherwise.
 */
function isValid(value) {
  return Boolean(value || value === 0);
}

var TextField = function (_Component) {
  _inherits(TextField, _Component);

  function TextField() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, TextField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TextField)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      isFocused: false,
      errorText: undefined,
      hasValue: false,
      isClean: true
    }, _this.handleInputBlur = function (event) {
      _this.setState({ isFocused: false });
      if (_this.props.onBlur) _this.props.onBlur(event);
    }, _this.handleInputChange = function (event) {
      _this.setState({ hasValue: isValid(event.target.value), isClean: false });
      if (_this.props.onChange) _this.props.onChange(event, event.target.value);
    }, _this.handleInputFocus = function (event) {
      if (_this.props.disabled) return;
      _this.setState({ isFocused: true });
      if (_this.props.onFocus) _this.props.onFocus(event);
    }, _this.handleInputKeyDown = function (event) {
      if ((0, _keycode2.default)(event) === 'enter' && _this.props.onEnterKeyDown) _this.props.onEnterKeyDown(event);
      if (_this.props.onKeyDown) _this.props.onKeyDown(event);
    }, _this.handleHeightChange = function (event, height) {
      var newHeight = height + 24;
      if (_this.props.floatingLabelText) {
        newHeight += 24;
      }
      _reactDom2.default.findDOMNode(_this).style.height = newHeight + 'px';
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TextField, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var children = _props.children;
      var name = _props.name;
      var hintText = _props.hintText;
      var floatingLabelText = _props.floatingLabelText;
      var id = _props.id;


      var propsLeaf = children ? children.props : this.props;

      this.setState({
        errorText: this.props.errorText,
        hasValue: isValid(propsLeaf.value) || isValid(propsLeaf.defaultValue)
      });

      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(name || hintText || floatingLabelText || id, 'We don\'t have enough information\n      to build a robust unique id for the TextField component. Please provide an id or a name.') : void 0;

      var uniqueId = name + '-' + hintText + '-' + floatingLabelText + '-' + Math.floor(Math.random() * 0xFFFF);
      this.uniqueId = uniqueId.replace(/[^A-Za-z0-9-]/gi, '');
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.errorText !== this.props.errorText) {
        this.setState({
          errorText: nextProps.errorText
        });
      }

      if (nextProps.children && nextProps.children.props) {
        nextProps = nextProps.children.props;
      }

      if (nextProps.hasOwnProperty('value')) {
        var hasValue = isValid(nextProps.value) || this.state.isClean && isValid(nextProps.defaultValue);

        if (hasValue !== this.state.hasValue) {
          this.setState({
            hasValue: hasValue
          });
        }
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
      return !(0, _shallowEqual2.default)(this.props, nextProps) || !(0, _shallowEqual2.default)(this.state, nextState) || !(0, _shallowEqual2.default)(this.context, nextContext);
    }
  }, {
    key: 'blur',
    value: function blur() {
      if (this.input) this.getInputNode().blur();
    }
  }, {
    key: 'focus',
    value: function focus() {
      if (this.input) this.getInputNode().focus();
    }
  }, {
    key: 'select',
    value: function select() {
      if (this.input) this.getInputNode().select();
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.input ? this.getInputNode().value : undefined;
    }
  }, {
    key: 'getInputNode',
    value: function getInputNode() {
      return this.props.children || this.props.multiLine ? this.input.getInputNode() : _reactDom2.default.findDOMNode(this.input);
    }
  }, {
    key: '_isControlled',
    value: function _isControlled() {
      return this.props.hasOwnProperty('value');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props;
      var children = _props2.children;
      var className = _props2.className;
      var disabled = _props2.disabled;
      var errorStyle = _props2.errorStyle;
      var errorText = _props2.errorText;
      var floatingLabelFixed = _props2.floatingLabelFixed;
      var floatingLabelFocusStyle = _props2.floatingLabelFocusStyle;
      var floatingLabelStyle = _props2.floatingLabelStyle;
      var floatingLabelText = _props2.floatingLabelText;
      var fullWidth = _props2.fullWidth;
      var hintText = _props2.hintText;
      var hintStyle = _props2.hintStyle;
      var id = _props2.id;
      var inputStyle = _props2.inputStyle;
      var multiLine = _props2.multiLine;
      var onBlur = _props2.onBlur;
      var onChange = _props2.onChange;
      var onFocus = _props2.onFocus;
      var style = _props2.style;
      var type = _props2.type;
      var underlineDisabledStyle = _props2.underlineDisabledStyle;
      var underlineFocusStyle = _props2.underlineFocusStyle;
      var underlineShow = _props2.underlineShow;
      var underlineStyle = _props2.underlineStyle;
      var rows = _props2.rows;
      var rowsMax = _props2.rowsMax;
      var textareaStyle = _props2.textareaStyle;

      var other = _objectWithoutProperties(_props2, ['children', 'className', 'disabled', 'errorStyle', 'errorText', 'floatingLabelFixed', 'floatingLabelFocusStyle', 'floatingLabelStyle', 'floatingLabelText', 'fullWidth', 'hintText', 'hintStyle', 'id', 'inputStyle', 'multiLine', 'onBlur', 'onChange', 'onFocus', 'style', 'type', 'underlineDisabledStyle', 'underlineFocusStyle', 'underlineShow', 'underlineStyle', 'rows', 'rowsMax', 'textareaStyle']);

      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context, this.state);
      var inputId = id || this.uniqueId;

      var errorTextElement = this.state.errorText && _react2.default.createElement(
        'div',
        { style: prepareStyles(styles.error) },
        this.state.errorText
      );

      var floatingLabelTextElement = floatingLabelText && _react2.default.createElement(
        _TextFieldLabel2.default,
        {
          muiTheme: this.context.muiTheme,
          style: (0, _simpleAssign2.default)(styles.floatingLabel, this.props.floatingLabelStyle),
          shrinkStyle: this.props.floatingLabelFocusStyle,
          htmlFor: inputId,
          shrink: this.state.hasValue || this.state.isFocused || floatingLabelFixed,
          disabled: disabled
        },
        floatingLabelText
      );

      var inputProps = {
        id: inputId,
        ref: function ref(elem) {
          return _this2.input = elem;
        },
        disabled: this.props.disabled,
        onBlur: this.handleInputBlur,
        onChange: this.handleInputChange,
        onFocus: this.handleInputFocus,
        onKeyDown: this.handleInputKeyDown
      };

      var inputStyleMerged = (0, _simpleAssign2.default)(styles.input, inputStyle);

      var inputElement = void 0;
      if (children) {
        inputElement = _react2.default.cloneElement(children, _extends({}, inputProps, children.props, {
          style: (0, _simpleAssign2.default)(inputStyleMerged, children.props.style)
        }));
      } else {
        inputElement = multiLine ? _react2.default.createElement(_EnhancedTextarea2.default, _extends({}, other, inputProps, {
          style: inputStyleMerged,
          rows: rows,
          rowsMax: rowsMax,
          onHeightChange: this.handleHeightChange,
          textareaStyle: (0, _simpleAssign2.default)(styles.textarea, textareaStyle)
        })) : _react2.default.createElement('input', _extends({}, other, inputProps, {
          style: prepareStyles(inputStyleMerged),
          type: type
        }));
      }

      var rootProps = {};

      if (children) {
        rootProps = other;
      }

      return _react2.default.createElement(
        'div',
        _extends({}, rootProps, {
          className: className,
          style: prepareStyles((0, _simpleAssign2.default)(styles.root, style))
        }),
        floatingLabelTextElement,
        hintText ? _react2.default.createElement(_TextFieldHint2.default, {
          muiTheme: this.context.muiTheme,
          show: !(this.state.hasValue || floatingLabelText && !this.state.isFocused) || !this.state.hasValue && floatingLabelText && floatingLabelFixed && !this.state.isFocused,
          style: hintStyle,
          text: hintText
        }) : null,
        inputElement,
        underlineShow ? _react2.default.createElement(_TextFieldUnderline2.default, {
          disabled: disabled,
          disabledStyle: underlineDisabledStyle,
          error: !!this.state.errorText,
          errorStyle: errorStyle,
          focus: this.state.isFocused,
          focusStyle: underlineFocusStyle,
          muiTheme: this.context.muiTheme,
          style: underlineStyle
        }) : null,
        errorTextElement
      );
    }
  }]);

  return TextField;
}(_react.Component);

TextField.propTypes = {
  children: _react.PropTypes.node,
  /**
   * The css class name of the root element.
   */
  className: _react.PropTypes.string,
  /**
   * The text string to use for the default value.
   */
  defaultValue: _react.PropTypes.any,
  /**
   * Disables the text field if set to true.
   */
  disabled: _react.PropTypes.bool,
  /**
   * The style object to use to override error styles.
   */
  errorStyle: _react.PropTypes.object,
  /**
   * The error content to display.
   */
  errorText: _react.PropTypes.node,
  /**
   * If true, the floating label will float even when there is no value.
   */
  floatingLabelFixed: _react.PropTypes.bool,
  /**
   * The style object to use to override floating label styles when focused.
   */
  floatingLabelFocusStyle: _react.PropTypes.object,
  /**
   * The style object to use to override floating label styles.
   */
  floatingLabelStyle: _react.PropTypes.object,
  /**
   * The content to use for the floating label element.
   */
  floatingLabelText: _react.PropTypes.node,
  /**
   * If true, the field receives the property width 100%.
   */
  fullWidth: _react.PropTypes.bool,
  /**
   * Override the inline-styles of the TextField's hint text element.
   */
  hintStyle: _react.PropTypes.object,
  /**
   * The hint content to display.
   */
  hintText: _react.PropTypes.node,
  /**
   * The id prop for the text field.
   */
  id: _react.PropTypes.string,
  /**
   * Override the inline-styles of the TextField's input element.
   * When multiLine is false: define the style of the input element.
   * When multiLine is true: define the style of the container of the textarea.
   */
  inputStyle: _react.PropTypes.object,
  /**
   * If true, a textarea element will be rendered.
   * The textarea also grows and shrinks according to the number of lines.
   */
  multiLine: _react.PropTypes.bool,
  /**
   * Name applied to the input.
   */
  name: _react.PropTypes.string,
  /** @ignore */
  onBlur: _react.PropTypes.func,
  /**
   * Callback function that is fired when the textfield's value changes.
   */
  onChange: _react.PropTypes.func,
  /**
   * The function to call when the user presses the Enter key.
   */
  onEnterKeyDown: (0, _deprecatedPropType2.default)(_react.PropTypes.func, 'Use onKeyDown and check for keycode instead. It will be removed with v0.16.0.'),
  /** @ignore */
  onFocus: _react.PropTypes.func,
  /** @ignore */
  onKeyDown: _react.PropTypes.func,
  /**
   * Number of rows to display when multiLine option is set to true.
   */
  rows: _react.PropTypes.number,
  /**
   * Maximum number of rows to display when
   * multiLine option is set to true.
   */
  rowsMax: _react.PropTypes.number,
  /**
   * Override the inline-styles of the root element.
   */
  style: _react.PropTypes.object,
  /**
   * Override the inline-styles of the TextField's textarea element.
   * The TextField use either a textarea or an input,
   * this property has effects only when multiLine is true.
   */
  textareaStyle: _react.PropTypes.object,
  /**
   * Specifies the type of input to display
   * such as "password" or "text".
   */
  type: _react.PropTypes.string,
  /**
   * Override the inline-styles of the
   * TextField's underline element when disabled.
   */
  underlineDisabledStyle: _react.PropTypes.object,
  /**
   * Override the inline-styles of the TextField's
   * underline element when focussed.
   */
  underlineFocusStyle: _react.PropTypes.object,
  /**
   * If true, shows the underline for the text field.
   */
  underlineShow: _react.PropTypes.bool,
  /**
   * Override the inline-styles of the TextField's underline element.
   */
  underlineStyle: _react.PropTypes.object,
  /**
   * The value of the text field.
   */
  value: _react.PropTypes.any
};
TextField.defaultProps = {
  disabled: false,
  floatingLabelFixed: false,
  multiLine: false,
  fullWidth: false,
  type: 'text',
  underlineShow: true,
  rows: 1
};
TextField.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = TextField;