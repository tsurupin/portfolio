'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FlatButton = require('../FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalendarActionButton = function (_Component) {
  _inherits(CalendarActionButton, _Component);

  function CalendarActionButton() {
    _classCallCheck(this, CalendarActionButton);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CalendarActionButton).apply(this, arguments));
  }

  _createClass(CalendarActionButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var cancelLabel = _props.cancelLabel;
      var okLabel = _props.okLabel;
      var wordings = _props.wordings;


      var styles = {
        root: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          margin: 0,
          maxHeight: 48,
          padding: 0
        },
        flatButtons: {
          fontsize: 14,
          margin: '4px 8px 8px 0px',
          maxHeight: 36,
          minWidth: 64,
          padding: 0
        }
      };

      return _react2.default.createElement(
        'div',
        { style: styles.root },
        _react2.default.createElement(_FlatButton2.default, {
          label: wordings ? wordings.cancel : cancelLabel,
          onTouchTap: this.props.onTouchTapCancel,
          primary: true,
          style: styles.flatButtons
        }),
        !this.props.autoOk && _react2.default.createElement(_FlatButton2.default, {
          disabled: this.refs.calendar !== undefined && this.refs.calendar.isSelectedDateDisabled(),
          label: wordings ? wordings.ok : okLabel,
          onTouchTap: this.props.onTouchTapOk,
          primary: true,
          style: styles.flatButtons
        })
      );
    }
  }]);

  return CalendarActionButton;
}(_react.Component);

CalendarActionButton.propTypes = {
  autoOk: _react.PropTypes.bool,
  cancelLabel: _react.PropTypes.node,
  okLabel: _react.PropTypes.node,
  onTouchTapCancel: _react.PropTypes.func,
  onTouchTapOk: _react.PropTypes.func,
  wordings: _react.PropTypes.object
};
exports.default = CalendarActionButton;