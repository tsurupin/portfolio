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
  var cardMedia = context.muiTheme.cardMedia;


  return {
    root: {
      position: 'relative'
    },
    overlayContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0
    },
    overlay: {
      height: '100%',
      position: 'relative'
    },
    overlayContent: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      paddingTop: 8,
      background: cardMedia.overlayContentBackground
    },
    media: {},
    mediaChild: {
      verticalAlign: 'top',
      maxWidth: '100%',
      minWidth: '100%',
      width: '100%'
    }
  };
}

var CardMedia = function (_Component) {
  _inherits(CardMedia, _Component);

  function CardMedia() {
    _classCallCheck(this, CardMedia);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CardMedia).apply(this, arguments));
  }

  _createClass(CardMedia, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var overlay = _props.overlay;

      var other = _objectWithoutProperties(_props, ['overlay']);

      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);
      var rootStyle = (0, _simpleAssign2.default)(styles.root, this.props.style);
      var mediaStyle = (0, _simpleAssign2.default)(styles.media, this.props.mediaStyle);
      var overlayContainerStyle = (0, _simpleAssign2.default)(styles.overlayContainer, this.props.overlayContainerStyle);
      var overlayContentStyle = (0, _simpleAssign2.default)(styles.overlayContent, this.props.overlayContentStyle);
      var overlayStyle = (0, _simpleAssign2.default)(styles.overlay, this.props.overlayStyle);
      var titleColor = this.context.muiTheme.cardMedia.titleColor;
      var subtitleColor = this.context.muiTheme.cardMedia.subtitleColor;
      var color = this.context.muiTheme.cardMedia.color;

      var children = _react2.default.Children.map(this.props.children, function (child) {
        return _react2.default.cloneElement(child, {
          style: prepareStyles((0, _simpleAssign2.default)({}, styles.mediaChild, child.props.style))
        });
      });

      var overlayChildren = _react2.default.Children.map(this.props.overlay, function (child) {
        if (child.type.muiName === 'CardHeader' || child.type.muiName === 'CardTitle') {
          return _react2.default.cloneElement(child, {
            titleColor: titleColor,
            subtitleColor: subtitleColor
          });
        } else if (child.type.muiName === 'CardText') {
          return _react2.default.cloneElement(child, {
            color: color
          });
        } else {
          return child;
        }
      });

      return _react2.default.createElement(
        'div',
        _extends({}, other, { style: prepareStyles(rootStyle) }),
        _react2.default.createElement(
          'div',
          { style: prepareStyles(mediaStyle) },
          children
        ),
        overlay ? _react2.default.createElement(
          'div',
          { style: prepareStyles(overlayContainerStyle) },
          _react2.default.createElement(
            'div',
            { style: prepareStyles(overlayStyle) },
            _react2.default.createElement(
              'div',
              { style: prepareStyles(overlayContentStyle) },
              overlayChildren
            )
          )
        ) : ''
      );
    }
  }]);

  return CardMedia;
}(_react.Component);

CardMedia.propTypes = {
  /**
   * If true, a click on this card component expands the card.
   */
  actAsExpander: _react.PropTypes.bool,
  /**
   * Can be used to render elements inside the Card Media.
   */
  children: _react.PropTypes.node,
  /**
   * If true, this card component is expandable.
   */
  expandable: _react.PropTypes.bool,
  /**
   * Override the inline-styles of the Card Media.
   */
  mediaStyle: _react.PropTypes.object,
  /**
   * Can be used to render overlay element in Card Media.
   */
  overlay: _react.PropTypes.node,
  /**
   * Override the inline-styles of the overlay container.
   */
  overlayContainerStyle: _react.PropTypes.object,
  /**
   * Override the inline-styles of the overlay content.
   */
  overlayContentStyle: _react.PropTypes.object,
  /**
   * Override the inline-styles of the overlay element.
   */
  overlayStyle: _react.PropTypes.object,
  /**
   * Override the inline-styles of the root element.
   */
  style: _react.PropTypes.object
};
CardMedia.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = CardMedia;