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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getStyles(props, context) {
  var _titleBar;

  var _context$muiTheme = context.muiTheme;
  var baseTheme = _context$muiTheme.baseTheme;
  var gridTile = _context$muiTheme.gridTile;


  var actionPos = props.actionIcon && props.actionPosition;

  var styles = {
    root: {
      position: 'relative',
      display: 'block',
      height: '100%',
      overflow: 'hidden'
    },
    titleBar: (_titleBar = {
      position: 'absolute',
      left: 0,
      right: 0
    }, _defineProperty(_titleBar, props.titlePosition, 0), _defineProperty(_titleBar, 'height', props.subtitle ? 68 : 48), _defineProperty(_titleBar, 'background', props.titleBackground), _defineProperty(_titleBar, 'display', 'flex'), _defineProperty(_titleBar, 'alignItems', 'center'), _titleBar),
    titleWrap: {
      flexGrow: 1,
      marginLeft: actionPos !== 'left' ? baseTheme.spacing.desktopGutterLess : 0,
      marginRight: actionPos === 'left' ? baseTheme.spacing.desktopGutterLess : 0,
      color: gridTile.textColor,
      overflow: 'hidden'
    },
    title: {
      fontSize: '16px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    },
    subtitle: {
      fontSize: '12px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    },
    actionIcon: {
      order: actionPos === 'left' ? -1 : 1
    },
    childImg: {
      height: '100%',
      transform: 'translateX(-50%)',
      position: 'relative',
      left: '50%'
    }
  };
  return styles;
}

var GridTile = function (_Component) {
  _inherits(GridTile, _Component);

  function GridTile() {
    _classCallCheck(this, GridTile);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GridTile).apply(this, arguments));
  }

  _createClass(GridTile, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.ensureImageCover();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.ensureImageCover();
    }
  }, {
    key: 'ensureImageCover',
    value: function ensureImageCover() {
      var imgEl = this.refs.img;

      if (imgEl) {
        (function () {
          var fit = function fit() {
            if (imgEl.offsetWidth < imgEl.parentNode.offsetWidth) {
              imgEl.style.height = 'auto';
              imgEl.style.left = '0';
              imgEl.style.width = '100%';
              imgEl.style.top = '50%';
              imgEl.style.transform = imgEl.style.WebkitTransform = 'translateY(-50%)';
            }
            imgEl.removeEventListener('load', fit);
            imgEl = null; // prevent closure memory leak
          };
          if (imgEl.complete) {
            fit();
          } else {
            imgEl.addEventListener('load', fit);
          }
        })();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var title = _props.title;
      var subtitle = _props.subtitle;
      var titlePosition = _props.titlePosition;
      var titleBackground = _props.titleBackground;
      var actionIcon = _props.actionIcon;
      var actionPosition = _props.actionPosition;
      var style = _props.style;
      var children = _props.children;
      var containerElement = _props.containerElement;

      var other = _objectWithoutProperties(_props, ['title', 'subtitle', 'titlePosition', 'titleBackground', 'actionIcon', 'actionPosition', 'style', 'children', 'containerElement']);

      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);
      var mergedRootStyles = (0, _simpleAssign2.default)(styles.root, style);

      var titleBar = null;

      if (title) {
        titleBar = _react2.default.createElement(
          'div',
          { key: 'titlebar', style: prepareStyles(styles.titleBar) },
          _react2.default.createElement(
            'div',
            { style: prepareStyles(styles.titleWrap) },
            _react2.default.createElement(
              'div',
              { style: prepareStyles(styles.title) },
              title
            ),
            subtitle ? _react2.default.createElement(
              'div',
              { style: prepareStyles(styles.subtitle) },
              subtitle
            ) : null
          ),
          actionIcon ? _react2.default.createElement(
            'div',
            { style: prepareStyles(styles.actionIcon) },
            actionIcon
          ) : null
        );
      }

      var newChildren = children;

      // if there is a single image passed as children
      // clone it and add our styles
      if (_react2.default.Children.count(children) === 1) {
        newChildren = _react2.default.Children.map(children, function (child) {
          if (child.type === 'img') {
            return _react2.default.cloneElement(child, {
              key: 'img',
              ref: 'img',
              style: prepareStyles((0, _simpleAssign2.default)({}, styles.childImg, child.props.style))
            });
          } else {
            return child;
          }
        });
      }

      var containerProps = _extends({
        style: prepareStyles(mergedRootStyles)
      }, other);

      return _react2.default.isValidElement(containerElement) ? _react2.default.cloneElement(containerElement, containerProps, [newChildren, titleBar]) : _react2.default.createElement(containerElement, containerProps, [newChildren, titleBar]);
    }
  }]);

  return GridTile;
}(_react.Component);

GridTile.propTypes = {
  /**
   * An IconButton element to be used as secondary action target
   * (primary action target is the tile itself).
   */
  actionIcon: _react.PropTypes.element,
  /**
   * Position of secondary action IconButton.
   */
  actionPosition: _react.PropTypes.oneOf(['left', 'right']),
  /**
   * Theoretically you can pass any node as children, but the main use case is to pass an img,
   * in whichcase GridTile takes care of making the image "cover" available space
   * (similar to background-size: cover or to object-fit:cover).
   */
  children: _react.PropTypes.node,
  /**
   * Width of the tile in number of grid cells.
   */
  cols: _react.PropTypes.number,
  /**
   * Either a string used as tag name for the tile root element, or a ReactElement.
   * This is useful when you have, for example, a custom implementation of
   * a navigation link (that knows about your routes) and you want to use it as the primary tile action.
   * In case you pass a ReactElement, please ensure that it passes all props,
   * accepts styles overrides and render it's children.
   */
  containerElement: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
  /**
   * Height of the tile in number of grid cells.
   */
  rows: _react.PropTypes.number,
  /**
   * Override the inline-styles of the root element.
   */
  style: _react.PropTypes.object,
  /**
   * String or element serving as subtitle (support text).
   */
  subtitle: _react.PropTypes.node,
  /**
   * Title to be displayed on tile.
   */
  title: _react.PropTypes.node,
  /**
   * Style used for title bar background.
   * Useful for setting custom gradients for example
   */
  titleBackground: _react.PropTypes.string,
  /**
   * Position of the title bar (container of title, subtitle and action icon).
   */
  titlePosition: _react.PropTypes.oneOf(['top', 'bottom'])
};
GridTile.defaultProps = {
  titlePosition: 'bottom',
  titleBackground: 'rgba(0, 0, 0, 0.4)',
  actionPosition: 'right',
  cols: 1,
  rows: 1,
  containerElement: 'div'
};
GridTile.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = GridTile;