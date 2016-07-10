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

var _ExpandTransition = require('../internal/ExpandTransition');

var _ExpandTransition2 = _interopRequireDefault(_ExpandTransition);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function ExpandTransition(props) {
  return _react2.default.createElement(_ExpandTransition2.default, props);
}

var getStyles = function getStyles(props, context) {
  var styles = {
    root: {
      marginTop: -14,
      marginLeft: 14 + 11, // padding + 1/2 icon
      paddingLeft: 24 - 11 + 8,
      paddingRight: 16,
      overflow: 'hidden'
    }
  };

  if (!props.last) {
    styles.root.borderLeft = '1px solid ' + context.muiTheme.stepper.connectorLineColor;
  }

  return styles;
};

var StepContent = function (_Component) {
  _inherits(StepContent, _Component);

  function StepContent() {
    _classCallCheck(this, StepContent);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(StepContent).apply(this, arguments));
  }

  _createClass(StepContent, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var active = _props.active;
      var children = _props.children;
      var completed = _props.completed;
      var last = _props.last;
      var style = _props.style;
      var transition = _props.transition;
      var transitionDuration = _props.transitionDuration;

      var other = _objectWithoutProperties(_props, ['active', 'children', 'completed', 'last', 'style', 'transition', 'transitionDuration']);

      var _context = this.context;
      var stepper = _context.stepper;
      var prepareStyles = _context.muiTheme.prepareStyles;


      if (stepper.orientation !== 'vertical') {
        process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, '<StepContent /> is only designed for use with the vertical stepper.') : void 0;
        return null;
      }

      var styles = getStyles(this.props, this.context);
      var transitionProps = {
        enterDelay: transitionDuration,
        transitionDuration: transitionDuration,
        open: active
      };

      return _react2.default.createElement(
        'div',
        _extends({ style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)) }, other),
        _react2.default.createElement(transition, transitionProps, _react2.default.createElement(
          'div',
          { style: { overflow: 'hidden' } },
          children
        ))
      );
    }
  }]);

  return StepContent;
}(_react.Component);

StepContent.propTypes = {
  /**
   * Expands the content
   */
  active: _react.PropTypes.bool,
  /**
   * Step content
   */
  children: _react.PropTypes.node,
  /**
   * @ignore
   */
  completed: _react.PropTypes.bool,
  /**
   * @ignore
   */
  last: _react.PropTypes.bool,
  /**
   * Override the inline-style of the root element.
   */
  style: _react.PropTypes.object,
  /**
   * ReactTransitionGroup component.
   */
  transition: _react.PropTypes.func,
  /**
   * Adjust the duration of the content expand transition. Passed as a prop to the transition component.
   */
  transitionDuration: _react.PropTypes.number
};
StepContent.defaultProps = {
  transition: ExpandTransition,
  transitionDuration: 450
};
StepContent.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired,
  stepper: _react.PropTypes.object
};
exports.default = StepContent;