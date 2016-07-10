'use strict';

exports.__esModule = true;

var _createHelper = require('./createHelper');

var _createHelper2 = _interopRequireDefault(_createHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderNothing = function renderNothing(_) {
  var Nothing = function Nothing() {
    return null;
  };
  Nothing.displayName = 'Nothing';
  return Nothing;
};

exports.default = (0, _createHelper2.default)(renderNothing, 'renderNothing', false, true);