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

function getStyles(props, context, state) {
  var tableRow = context.muiTheme.tableRow;


  var cellBgColor = 'inherit';
  if (props.hovered || state.hovered) {
    cellBgColor = tableRow.hoverColor;
  } else if (props.selected) {
    cellBgColor = tableRow.selectedColor;
  } else if (props.striped) {
    cellBgColor = tableRow.stripeColor;
  }

  return {
    root: {
      borderBottom: props.displayBorder && '1px solid ' + tableRow.borderColor,
      color: tableRow.textColor,
      height: tableRow.height
    },
    cell: {
      backgroundColor: cellBgColor
    }
  };
}

var TableRow = function (_Component) {
  _inherits(TableRow, _Component);

  function TableRow() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, TableRow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TableRow)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      hovered: false
    }, _this.onCellClick = function (event, columnIndex) {
      if (_this.props.selectable && _this.props.onCellClick) {
        _this.props.onCellClick(event, _this.props.rowNumber, columnIndex);
      }
      event.ctrlKey = true;
      _this.onRowClick(event);
    }, _this.onCellHover = function (event, columnIndex) {
      if (_this.props.hoverable) {
        _this.setState({ hovered: true });
        if (_this.props.onCellHover) _this.props.onCellHover(event, _this.props.rowNumber, columnIndex);
        _this.onRowHover(event);
      }
    }, _this.onCellHoverExit = function (event, columnIndex) {
      if (_this.props.hoverable) {
        _this.setState({ hovered: false });
        if (_this.props.onCellHoverExit) _this.props.onCellHoverExit(event, _this.props.rowNumber, columnIndex);
        _this.onRowHoverExit(event);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TableRow, [{
    key: 'onRowClick',
    value: function onRowClick(event) {
      if (this.props.selectable && this.props.onRowClick) this.props.onRowClick(event, this.props.rowNumber);
    }
  }, {
    key: 'onRowHover',
    value: function onRowHover(event) {
      if (this.props.onRowHover) this.props.onRowHover(event, this.props.rowNumber);
    }
  }, {
    key: 'onRowHoverExit',
    value: function onRowHoverExit(event) {
      if (this.props.onRowHoverExit) this.props.onRowHoverExit(event, this.props.rowNumber);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var className = _props.className;
      var displayBorder = _props.displayBorder;
      var hoverable = _props.hoverable;
      var hovered = _props.hovered;
      var onCellClick = _props.onCellClick;
      var onCellHover = _props.onCellHover;
      var onCellHoverExit = _props.onCellHoverExit;
      var onRowClick = _props.onRowClick;
      var onRowHover = _props.onRowHover;
      var onRowHoverExit = _props.onRowHoverExit;
      var rowNumber = _props.rowNumber;
      var selectable = _props.selectable;
      var selected = _props.selected;
      var striped = _props.striped;
      var style = _props.style;

      var other = _objectWithoutProperties(_props, ['className', 'displayBorder', 'hoverable', 'hovered', 'onCellClick', 'onCellHover', 'onCellHoverExit', 'onRowClick', 'onRowHover', 'onRowHoverExit', 'rowNumber', 'selectable', 'selected', 'striped', 'style']);

      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context, this.state);

      var rowColumns = _react2.default.Children.map(this.props.children, function (child, columnNumber) {
        if (_react2.default.isValidElement(child)) {
          return _react2.default.cloneElement(child, {
            columnNumber: columnNumber,
            hoverable: _this2.props.hoverable,
            key: _this2.props.rowNumber + '-' + columnNumber,
            onClick: _this2.onCellClick,
            onHover: _this2.onCellHover,
            onHoverExit: _this2.onCellHoverExit,
            style: (0, _simpleAssign2.default)({}, styles.cell, child.props.style)
          });
        }
      });

      return _react2.default.createElement(
        'tr',
        _extends({
          className: className,
          style: prepareStyles((0, _simpleAssign2.default)(styles.root, style))
        }, other),
        rowColumns
      );
    }
  }]);

  return TableRow;
}(_react.Component);

TableRow.propTypes = {
  /**
   * Children passed to table row.
   */
  children: _react.PropTypes.node,
  /**
   * The css class name of the root element.
   */
  className: _react.PropTypes.string,
  /**
   * If true, row border will be displayed for the row.
   * If false, no border will be drawn.
   */
  displayBorder: _react.PropTypes.bool,
  /**
   * Controls whether or not the row reponseds to hover events.
   */
  hoverable: _react.PropTypes.bool,
  /**
   * Controls whether or not the row should be rendered as being
   * hovered. This property is evaluated in addition to this.state.hovered
   * and can be used to synchronize the hovered state with some other
   * external events.
   */
  hovered: _react.PropTypes.bool,
  /**
   * @ignore
   * Called when a row cell is clicked.
   * rowNumber is the row number and columnId is
   * the column number or the column key.
   */
  onCellClick: _react.PropTypes.func,
  /**
   * @ignore
   * Called when a table cell is hovered.
   * rowNumber is the row number of the hovered row
   * and columnId is the column number or the column key of the cell.
   */
  onCellHover: _react.PropTypes.func,
  /**
   * @ignore
   * Called when a table cell is no longer hovered.
   * rowNumber is the row number of the row and columnId
   * is the column number or the column key of the cell.
   */
  onCellHoverExit: _react.PropTypes.func,
  /**
   * @ignore
   * Called when row is clicked.
   */
  onRowClick: _react.PropTypes.func,
  /**
   * @ignore
   * Called when a table row is hovered.
   * rowNumber is the row number of the hovered row.
   */
  onRowHover: _react.PropTypes.func,
  /**
   * @ignore
   * Called when a table row is no longer hovered.
   * rowNumber is the row number of the row that is no longer hovered.
   */
  onRowHoverExit: _react.PropTypes.func,
  /**
   * Number to identify the row. This property is
   * automatically populated when used with the TableBody component.
   */
  rowNumber: _react.PropTypes.number,
  /**
   * If true, table rows can be selected. If multiple row
   * selection is desired, enable multiSelectable.
   * The default value is true.
   */
  selectable: _react.PropTypes.bool,
  /**
   * Indicates that a particular row is selected.
   * This property can be used to programmatically select rows.
   */
  selected: _react.PropTypes.bool,
  /**
   * Indicates whether or not the row is striped.
   */
  striped: _react.PropTypes.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: _react.PropTypes.object
};
TableRow.defaultProps = {
  displayBorder: true,
  hoverable: false,
  hovered: false,
  selectable: true,
  selected: false,
  striped: false
};
TableRow.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = TableRow;