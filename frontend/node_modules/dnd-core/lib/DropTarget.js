"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DropTarget = (function () {
  function DropTarget() {
    _classCallCheck(this, DropTarget);
  }

  DropTarget.prototype.canDrop = function canDrop() {
    return true;
  };

  DropTarget.prototype.hover = function hover() {};

  DropTarget.prototype.drop = function drop() {};

  return DropTarget;
})();

exports["default"] = DropTarget;
module.exports = exports["default"];