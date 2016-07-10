'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NestedList = function (_Component) {
  _inherits(NestedList, _Component);

  function NestedList() {
    _classCallCheck(this, NestedList);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NestedList).apply(this, arguments));
  }

  _createClass(NestedList, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var open = _props.open;
      var nestedLevel = _props.nestedLevel;
      var style = _props.style;


      var styles = {
        root: {
          display: open ? null : 'none'
        }
      };

      return _react2.default.createElement(
        _List2.default,
        { style: (0, _simpleAssign2.default)({}, styles.root, style) },
        _react2.default.Children.map(children, function (child) {
          return _react2.default.isValidElement(child) ? _react2.default.cloneElement(child, {
            nestedLevel: nestedLevel + 1
          }) : child;
        })
      );
    }
  }]);

  return NestedList;
}(_react.Component);

NestedList.propTypes = {
  children: _react.PropTypes.node,
  nestedLevel: _react.PropTypes.number,
  open: _react.PropTypes.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: _react.PropTypes.object
};
NestedList.defaultProps = {
  nestedLevel: 1,
  open: false
};
exports.default = NestedList;