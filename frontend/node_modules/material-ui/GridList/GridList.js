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

function getStyles(props) {
  return {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: -props.padding / 2
    },
    item: {
      boxSizing: 'border-box',
      padding: props.padding / 2
    }
  };
}

var GridList = function (_Component) {
  _inherits(GridList, _Component);

  function GridList() {
    _classCallCheck(this, GridList);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GridList).apply(this, arguments));
  }

  _createClass(GridList, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var cols = _props.cols;
      var padding = _props.padding;
      var cellHeight = _props.cellHeight;
      var children = _props.children;
      var style = _props.style;

      var other = _objectWithoutProperties(_props, ['cols', 'padding', 'cellHeight', 'children', 'style']);

      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);
      var mergedRootStyles = (0, _simpleAssign2.default)(styles.root, style);

      var wrappedChildren = _react2.default.Children.map(children, function (currentChild) {
        if (_react2.default.isValidElement(currentChild) && currentChild.type.muiName === 'Subheader') {
          return currentChild;
        }
        var childCols = currentChild.props.cols || 1;
        var childRows = currentChild.props.rows || 1;
        var itemStyle = (0, _simpleAssign2.default)({}, styles.item, {
          width: 100 / cols * childCols + '%',
          height: cellHeight * childRows + padding
        });

        return _react2.default.createElement(
          'div',
          { style: prepareStyles(itemStyle) },
          currentChild
        );
      });

      return _react2.default.createElement(
        'div',
        _extends({ style: prepareStyles(mergedRootStyles) }, other),
        wrappedChildren
      );
    }
  }]);

  return GridList;
}(_react.Component);

GridList.propTypes = {
  /**
   * Number of px for one cell height.
   */
  cellHeight: _react.PropTypes.number,
  /**
   * Grid Tiles that will be in Grid List.
   */
  children: _react.PropTypes.node,
  /**
   * Number of columns.
   */
  cols: _react.PropTypes.number,
  /**
   * Number of px for the padding/spacing between items.
   */
  padding: _react.PropTypes.number,
  /**
   * Override the inline-styles of the root element.
   */
  style: _react.PropTypes.object
};
GridList.defaultProps = {
  cols: 2,
  padding: 4,
  cellHeight: 180
};
GridList.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = GridList;