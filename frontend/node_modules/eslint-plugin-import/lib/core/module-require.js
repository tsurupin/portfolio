'use strict';

exports.__esModule = true;
exports.default = moduleRequire;

var _module = require('module');

var _module2 = _interopRequireDefault(_module);

var _path = require('path');

var path = _interopRequireWildcard(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// borrowed from babel-eslint
function createModule(filename) {
  var mod = new _module2.default(filename);
  mod.filename = filename;
  mod.paths = _module2.default._nodeModulePaths(path.dirname(filename));
  return mod;
}

function moduleRequire(p) {
  try {
    // attempt to get espree relative to eslint
    var eslintPath = require.resolve('eslint');
    var eslintModule = createModule(eslintPath);
    return require(_module2.default._resolveFilename(p, eslintModule));
  } catch (err) {/* ignore */}

  try {
    // try relative to entry point
    return require.main.require(p);
  } catch (err) {} /* ignore */

  // finally, try from here
  return require(p);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvbW9kdWxlLXJlcXVpcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2tCQVd3QixhOztBQVh4Qjs7OztBQUNBOztJQUFZLEk7Ozs7Ozs7QUFHWixTQUFTLFlBQVQsQ0FBc0IsUUFBdEIsRUFBZ0M7QUFDOUIsTUFBSSxNQUFNLHFCQUFXLFFBQVgsQ0FBVjtBQUNBLE1BQUksUUFBSixHQUFlLFFBQWY7QUFDQSxNQUFJLEtBQUosR0FBWSxpQkFBTyxnQkFBUCxDQUF3QixLQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXhCLENBQVo7QUFDQSxTQUFPLEdBQVA7QUFDRDs7QUFFYyxTQUFTLGFBQVQsQ0FBdUIsQ0FBdkIsRUFBMEI7QUFDdkMsTUFBSTs7QUFFRixRQUFNLGFBQWEsUUFBUSxPQUFSLENBQWdCLFFBQWhCLENBQW5CO0FBQ0EsUUFBTSxlQUFlLGFBQWEsVUFBYixDQUFyQjtBQUNBLFdBQU8sUUFBUSxpQkFBTyxnQkFBUCxDQUF3QixDQUF4QixFQUEyQixZQUEzQixDQUFSLENBQVA7QUFDRCxHQUxELENBS0UsT0FBTSxHQUFOLEVBQVcsQyxZQUFnQjs7QUFFN0IsTUFBSTs7QUFFRixXQUFPLFFBQVEsSUFBUixDQUFhLE9BQWIsQ0FBcUIsQ0FBckIsQ0FBUDtBQUNELEdBSEQsQ0FHRSxPQUFNLEdBQU4sRUFBVyxDQUFnQixDOzs7QUFHN0IsU0FBTyxRQUFRLENBQVIsQ0FBUDtBQUNEIiwiZmlsZSI6ImNvcmUvbW9kdWxlLXJlcXVpcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9kdWxlIGZyb20gJ21vZHVsZSdcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCdcblxuLy8gYm9ycm93ZWQgZnJvbSBiYWJlbC1lc2xpbnRcbmZ1bmN0aW9uIGNyZWF0ZU1vZHVsZShmaWxlbmFtZSkge1xuICB2YXIgbW9kID0gbmV3IE1vZHVsZShmaWxlbmFtZSlcbiAgbW9kLmZpbGVuYW1lID0gZmlsZW5hbWVcbiAgbW9kLnBhdGhzID0gTW9kdWxlLl9ub2RlTW9kdWxlUGF0aHMocGF0aC5kaXJuYW1lKGZpbGVuYW1lKSlcbiAgcmV0dXJuIG1vZFxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtb2R1bGVSZXF1aXJlKHApIHtcbiAgdHJ5IHtcbiAgICAvLyBhdHRlbXB0IHRvIGdldCBlc3ByZWUgcmVsYXRpdmUgdG8gZXNsaW50XG4gICAgY29uc3QgZXNsaW50UGF0aCA9IHJlcXVpcmUucmVzb2x2ZSgnZXNsaW50JylcbiAgICBjb25zdCBlc2xpbnRNb2R1bGUgPSBjcmVhdGVNb2R1bGUoZXNsaW50UGF0aClcbiAgICByZXR1cm4gcmVxdWlyZShNb2R1bGUuX3Jlc29sdmVGaWxlbmFtZShwLCBlc2xpbnRNb2R1bGUpKVxuICB9IGNhdGNoKGVycikgeyAvKiBpZ25vcmUgKi8gfVxuXG4gIHRyeSB7XG4gICAgLy8gdHJ5IHJlbGF0aXZlIHRvIGVudHJ5IHBvaW50XG4gICAgcmV0dXJuIHJlcXVpcmUubWFpbi5yZXF1aXJlKHApXG4gIH0gY2F0Y2goZXJyKSB7IC8qIGlnbm9yZSAqLyB9XG5cbiAgLy8gZmluYWxseSwgdHJ5IGZyb20gaGVyZVxuICByZXR1cm4gcmVxdWlyZShwKVxufVxuIl19