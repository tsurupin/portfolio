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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getStyles(props, context) {
  var card = context.muiTheme.card;


  return {
    root: {
      padding: 16,
      position: 'relative'
    },
    title: {
      fontSize: 24,
      color: props.titleColor || card.titleColor,
      display: 'block',
      lineHeight: '36px'
    },
    subtitle: {
      fontSize: 14,
      color: props.subtitleColor || card.subtitleColor,
      display: 'block'
    }
  };
}

var CardTitle = function (_Component) {
  _inherits(CardTitle, _Component);

  function CardTitle() {
    _classCallCheck(this, CardTitle);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CardTitle).apply(this, arguments));
  }

  _createClass(CardTitle, [{
    key: 'render',
    value: function render() {
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);
      var rootStyle = (0, _simpleAssign2.default)({}, styles.root, this.props.style);
      var titleStyle = (0, _simpleAssign2.default)({}, styles.title, this.props.titleStyle);
      var subtitleStyle = (0, _simpleAssign2.default)({}, styles.subtitle, this.props.subtitleStyle);

      var _props = this.props;
      var subtitle = _props.subtitle;
      var subtitleColor = _props.subtitleColor;
      var title = _props.title;
      var titleColor = _props.titleColor;

      var other = _objectWithoutProperties(_props, ['subtitle', 'subtitleColor', 'title', 'titleColor']);

      return _react2.default.createElement(
        'div',
        _extends({}, other, { style: prepareStyles(rootStyle) }),
        _react2.default.createElement(
          'span',
          { style: prepareStyles(titleStyle) },
          title
        ),
        _react2.default.createElement(
          'span',
          { style: prepareStyles(subtitleStyle) },
          subtitle
        ),
        this.props.children
      );
    }
  }]);

  return CardTitle;
}(_react.Component);

CardTitle.muiName = 'CardTitle';
CardTitle.propTypes = {
  /**
   * If true, a click on this card component expands the card.
   */
  actAsExpander: _react.PropTypes.bool,
  /**
   * Can be used to render elements inside the Card Title.
   */
  children: _react.PropTypes.node,
  /**
   * If true, this card component is expandable.
   */
  expandable: _react.PropTypes.bool,
  /**
   * If true, this card component will include a button to expand the card.
   */
  showExpandableButton: _react.PropTypes.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: _react.PropTypes.object,
  /**
   * Can be used to render a subtitle in the Card Title.
   */
  subtitle: _react.PropTypes.node,
  /**
   * Override the subtitle color.
   */
  subtitleColor: _react.PropTypes.string,
  /**
   * Override the inline-styles of the subtitle.
   */
  subtitleStyle: _react.PropTypes.object,
  /**
   * Can be used to render a title in the Card Title.
   */
  title: _react.PropTypes.node,
  /**
   * Override the title color.
   */
  titleColor: _react.PropTypes.string,
  /**
   * Override the inline-styles of the title.
   */
  titleStyle: _react.PropTypes.object
};
CardTitle.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = CardTitle;