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

var _Tooltip = require('../internal/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getStyles(props, context) {
  var tableHeaderColumn = context.muiTheme.tableHeaderColumn;


  return {
    root: {
      fontWeight: 'normal',
      fontSize: 12,
      paddingLeft: tableHeaderColumn.spacing,
      paddingRight: tableHeaderColumn.spacing,
      height: tableHeaderColumn.height,
      textAlign: 'left',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      color: tableHeaderColumn.textColor,
      position: 'relative'
    },
    tooltip: {
      boxSizing: 'border-box',
      marginTop: tableHeaderColumn.height / 2
    }
  };
}

var TableHeaderColumn = function (_Component) {
  _inherits(TableHeaderColumn, _Component);

  function TableHeaderColumn() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, TableHeaderColumn);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TableHeaderColumn)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      hovered: false
    }, _this.onMouseEnter = function () {
      if (_this.props.tooltip !== undefined) {
        _this.setState({ hovered: true });
      }
    }, _this.onMouseLeave = function () {
      if (_this.props.tooltip !== undefined) {
        _this.setState({ hovered: false });
      }
    }, _this.onClick = function (event) {
      if (_this.props.onClick) {
        _this.props.onClick(event, _this.props.columnNumber);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TableHeaderColumn, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var columnNumber = _props.columnNumber;
      var hoverable = _props.hoverable;
      var onClick = _props.onClick;
      var onHover = _props.onHover;
      var onHoverExit = _props.onHoverExit;
      var style = _props.style;
      var tooltip = _props.tooltip;
      var tooltipStyle = _props.tooltipStyle;

      var other = _objectWithoutProperties(_props, ['children', 'className', 'columnNumber', 'hoverable', 'onClick', 'onHover', 'onHoverExit', 'style', 'tooltip', 'tooltipStyle']);

      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);

      var handlers = {
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseLeave,
        onClick: this.onClick
      };

      var tooltipNode = void 0;

      if (tooltip !== undefined) {
        tooltipNode = _react2.default.createElement(_Tooltip2.default, {
          label: tooltip,
          show: this.state.hovered,
          style: (0, _simpleAssign2.default)(styles.tooltip, tooltipStyle)
        });
      }

      return _react2.default.createElement(
        'th',
        _extends({
          className: className,
          style: prepareStyles((0, _simpleAssign2.default)(styles.root, style))
        }, handlers, other),
        tooltipNode,
        children
      );
    }
  }]);

  return TableHeaderColumn;
}(_react.Component);

TableHeaderColumn.propTypes = {
  children: _react.PropTypes.node,
  /**
   * The css class name of the root element.
   */
  className: _react.PropTypes.string,
  /**
   * Number to identify the header row. This property
   * is automatically populated when used with TableHeader.
   */
  columnNumber: _react.PropTypes.number,
  /**
   * @ignore
   * Not used here but we need to remove it from the root element.
   */
  hoverable: _react.PropTypes.bool,
  /** @ignore */
  onClick: _react.PropTypes.func,
  /**
   * @ignore
   * Not used here but we need to remove it from the root element.
   */
  onHover: _react.PropTypes.func,
  /**
   * @ignore
   * Not used here but we need to remove it from the root element.
   */
  onHoverExit: _react.PropTypes.func,
  /**
   * Override the inline-styles of the root element.
   */
  style: _react.PropTypes.object,
  /**
   * The string to supply to the tooltip. If not
   * string is supplied no tooltip will be shown.
   */
  tooltip: _react.PropTypes.string,
  /**
   * Additional styling that can be applied to the tooltip.
   */
  tooltipStyle: _react.PropTypes.object
};
TableHeaderColumn.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = TableHeaderColumn;