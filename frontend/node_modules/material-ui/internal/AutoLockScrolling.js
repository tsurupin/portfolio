'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var originalBodyOverflow = null;
var lockingCounter = 0;

var AutoLockScrolling = function (_Component) {
  _inherits(AutoLockScrolling, _Component);

  function AutoLockScrolling() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, AutoLockScrolling);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(AutoLockScrolling)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.locked = false, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AutoLockScrolling, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.lock === true) this.preventScrolling();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.lock !== nextProps.lock) {
        if (nextProps.lock) {
          this.preventScrolling();
        } else {
          this.allowScrolling();
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.allowScrolling();
    }

    // force to only lock/unlock once

  }, {
    key: 'preventScrolling',
    value: function preventScrolling() {
      if (this.locked === true) return;
      lockingCounter = lockingCounter + 1;
      this.locked = true;

      // only lock the first time the component is mounted.
      if (lockingCounter === 1) {
        var body = document.getElementsByTagName('body')[0];
        originalBodyOverflow = body.style.overflow;
        body.style.overflow = 'hidden';
      }
    }
  }, {
    key: 'allowScrolling',
    value: function allowScrolling() {
      if (this.locked === true) {
        lockingCounter = lockingCounter - 1;
        this.locked = false;
      }

      if (lockingCounter === 0 && originalBodyOverflow !== null) {
        var body = document.getElementsByTagName('body')[0];
        body.style.overflow = originalBodyOverflow || '';
        originalBodyOverflow = null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return AutoLockScrolling;
}(_react.Component);

AutoLockScrolling.propTypes = {
  lock: _react.PropTypes.bool.isRequired
};
exports.default = AutoLockScrolling;