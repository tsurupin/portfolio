'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deprecated;

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deprecated(propType, explanation) {
  return function validate(props, propName, componentName) {
    if (props[propName] != null) {
      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, '"' + propName + '" property of "' + componentName + '" has been deprecated.\n' + explanation) : void 0;
    }

    return propType(props, propName, componentName);
  };
}