"use strict";

exports.__esModule = true;
exports["default"] = stateId;

function stateId() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

  return state + 1;
}

module.exports = exports["default"];