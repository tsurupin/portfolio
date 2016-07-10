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

var _propTypes = require('../utils/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Subheader = require('../Subheader');

var _Subheader2 = _interopRequireDefault(_Subheader);

var _deprecatedPropType = require('../utils/deprecatedPropType');

var _deprecatedPropType2 = _interopRequireDefault(_deprecatedPropType);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = function (_Component) {
  _inherits(List, _Component);

  function List() {
    _classCallCheck(this, List);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(List).apply(this, arguments));
  }

  _createClass(List, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var _props$insetSubheader = _props.insetSubheader;
      var insetSubheader = _props$insetSubheader === undefined ? false : _props$insetSubheader;
      var style = _props.style;
      var subheader = _props.subheader;
      var subheaderStyle = _props.subheaderStyle;
      var zDepth = _props.zDepth;

      var other = _objectWithoutProperties(_props, ['children', 'insetSubheader', 'style', 'subheader', 'subheaderStyle', 'zDepth']);

      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(typeof zDepth === 'undefined', 'List no longer supports `zDepth`. Instead, wrap it in `Paper` ' + 'or another component that provides zDepth. It will be removed with v0.16.0.') : void 0;

      var hasSubheader = false;

      if (subheader) {
        hasSubheader = true;
      } else {
        var firstChild = _react2.default.Children.toArray(children)[0];
        if (_react2.default.isValidElement(firstChild) && firstChild.type === _Subheader2.default) {
          hasSubheader = true;
        }
      }

      var styles = {
        root: {
          padding: 0,
          paddingBottom: 8,
          paddingTop: hasSubheader ? 0 : 8
        }
      };

      return _react2.default.createElement(
        'div',
        _extends({}, other, {
          style: (0, _simpleAssign2.default)(styles.root, style)
        }),
        subheader && _react2.default.createElement(
          _Subheader2.default,
          { inset: insetSubheader, style: subheaderStyle },
          subheader
        ),
        children
      );
    }
  }]);

  return List;
}(_react.Component);

List.propTypes = {
  /**
   * These are usually `ListItem`s that are passed to
   * be part of the list.
   */
  children: _react.PropTypes.node,
  /**
   * If true, the subheader will be indented by 72px.
   */
  insetSubheader: (0, _deprecatedPropType2.default)(_react.PropTypes.bool, 'Refer to the `subheader` property. It will be removed with v0.16.0.'),
  /**
   * Override the inline-styles of the root element.
   */
  style: _react.PropTypes.object,
  /**
   * The subheader string that will be displayed at the top of the list.
   */
  subheader: (0, _deprecatedPropType2.default)(_react.PropTypes.node, 'Instead, nest the `Subheader` component directly inside the `List`. It will be removed with v0.16.0.'),
  /**
   * Override the inline-styles of the subheader element.
   */
  subheaderStyle: (0, _deprecatedPropType2.default)(_react.PropTypes.object, 'Refer to the `subheader` property. It will be removed with v0.16.0.'),
  /**
   * @ignore
   * ** Breaking change ** List no longer supports `zDepth`. Instead, wrap it in `Paper`
   * or another component that provides zDepth.
   */
  zDepth: _propTypes2.default.zDepth
};
List.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = List;