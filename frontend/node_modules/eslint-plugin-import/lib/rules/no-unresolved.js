'use strict';

require('es6-symbol/implement');

var _resolve = require('../core/resolve');

var _resolve2 = _interopRequireDefault(_resolve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @fileOverview Ensures that an imported path exists, given resolution rules.
 * @author Ben Mosher
 */

module.exports = function (context) {

  var ignoreRegExps = [];
  if (context.options[0] != null && context.options[0].ignore != null) {
    ignoreRegExps = context.options[0].ignore.map(function (p) {
      return new RegExp(p);
    });
  }

  function checkSourceValue(source) {
    if (source == null) return;

    if (ignoreRegExps.some(function (re) {
      return re.test(source.value);
    })) return;

    if ((0, _resolve2.default)(source.value, context) === undefined) {
      context.report(source, 'Unable to resolve path to module \'' + source.value + '\'.');
    }
  }

  // for import-y declarations
  function checkSource(node) {
    checkSourceValue(node.source);
  }

  // for CommonJS `require` calls
  // adapted from @mctep: http://git.io/v4rAu
  function checkCommon(call) {
    if (call.callee.type !== 'Identifier') return;
    if (call.callee.name !== 'require') return;
    if (call.arguments.length !== 1) return;

    var modulePath = call.arguments[0];
    if (modulePath.type !== 'Literal') return;
    if (typeof modulePath.value !== 'string') return;

    checkSourceValue(modulePath);
  }

  function checkAMD(call) {
    if (call.callee.type !== 'Identifier') return;
    if (call.callee.name !== 'require' && call.callee.name !== 'define') return;
    if (call.arguments.length !== 2) return;

    var modules = call.arguments[0];
    if (modules.type !== 'ArrayExpression') return;

    for (var _iterator = modules.elements, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var element = _ref;

      if (element.type !== 'Literal') continue;
      if (typeof element.value !== 'string') continue;

      if (element.value === 'require' || element.value === 'exports') continue; // magic modules: http://git.io/vByan

      checkSourceValue(element);
    }
  }

  var visitors = {
    'ImportDeclaration': checkSource,
    'ExportNamedDeclaration': checkSource,
    'ExportAllDeclaration': checkSource
  };

  if (context.options[0] != null) {
    (function () {
      var _context$options$ = context.options[0];
      var commonjs = _context$options$.commonjs;
      var amd = _context$options$.amd;


      if (commonjs || amd) {
        visitors['CallExpression'] = function (call) {
          if (commonjs) checkCommon(call);
          if (amd) checkAMD(call);
        };
      }
    })();
  }

  return visitors;
};

module.exports.schema = [{
  'type': 'object',
  'properties': {
    'commonjs': { 'type': 'boolean' },
    'amd': { 'type': 'boolean' },
    'ignore': {
      'type': 'array',
      'minItems': 1,
      'items': { 'type': 'string' },
      'uniqueItems': true
    }
  },
  'additionalProperties': false
}];
//# sourceMappingURL=data:application/json;base64,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QixDQURJO0FBQUEsVUFDdEIsUUFEc0IscUJBQ3RCLFFBRHNCO0FBQUEsVUFDWixHQURZLHFCQUNaLEdBRFk7OztBQUc5QixVQUFJLFlBQVksR0FBaEIsRUFBcUI7QUFDbkIsaUJBQVMsZ0JBQVQsSUFBNkIsVUFBVSxJQUFWLEVBQWdCO0FBQzNDLGNBQUksUUFBSixFQUFjLFlBQVksSUFBWjtBQUNkLGNBQUksR0FBSixFQUFTLFNBQVMsSUFBVDtBQUNWLFNBSEQ7QUFJRDtBQVI2QjtBQVMvQjs7QUFFRCxTQUFPLFFBQVA7QUFDRCxDQTNFRDs7QUE2RUEsT0FBTyxPQUFQLENBQWUsTUFBZixHQUF3QixDQUN0QjtBQUNFLFVBQVEsUUFEVjtBQUVFLGdCQUFjO0FBQ1osZ0JBQVksRUFBRSxRQUFRLFNBQVYsRUFEQTtBQUVaLFdBQU8sRUFBRSxRQUFRLFNBQVYsRUFGSztBQUdaLGNBQVU7QUFDUixjQUFRLE9BREE7QUFFUixrQkFBWSxDQUZKO0FBR1IsZUFBUyxFQUFFLFFBQVEsUUFBVixFQUhEO0FBSVIscUJBQWU7QUFKUDtBQUhFLEdBRmhCO0FBWUUsMEJBQXdCO0FBWjFCLENBRHNCLENBQXhCIiwiZmlsZSI6InJ1bGVzL25vLXVucmVzb2x2ZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlT3ZlcnZpZXcgRW5zdXJlcyB0aGF0IGFuIGltcG9ydGVkIHBhdGggZXhpc3RzLCBnaXZlbiByZXNvbHV0aW9uIHJ1bGVzLlxuICogQGF1dGhvciBCZW4gTW9zaGVyXG4gKi9cblxuaW1wb3J0ICdlczYtc3ltYm9sL2ltcGxlbWVudCdcblxuaW1wb3J0IHJlc29sdmUgZnJvbSAnLi4vY29yZS9yZXNvbHZlJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG5cbiAgbGV0IGlnbm9yZVJlZ0V4cHMgPSBbXVxuICBpZiAoY29udGV4dC5vcHRpb25zWzBdICE9IG51bGwgJiYgY29udGV4dC5vcHRpb25zWzBdLmlnbm9yZSAhPSBudWxsKSB7XG4gICAgaWdub3JlUmVnRXhwcyA9IGNvbnRleHQub3B0aW9uc1swXS5pZ25vcmUubWFwKHAgPT4gbmV3IFJlZ0V4cChwKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrU291cmNlVmFsdWUoc291cmNlKSB7XG4gICAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm5cblxuICAgIGlmIChpZ25vcmVSZWdFeHBzLnNvbWUocmUgPT4gcmUudGVzdChzb3VyY2UudmFsdWUpKSkgcmV0dXJuXG5cbiAgICBpZiAocmVzb2x2ZShzb3VyY2UudmFsdWUsIGNvbnRleHQpID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnRleHQucmVwb3J0KHNvdXJjZSxcbiAgICAgICAgJ1VuYWJsZSB0byByZXNvbHZlIHBhdGggdG8gbW9kdWxlIFxcJycgKyBzb3VyY2UudmFsdWUgKyAnXFwnLicpXG4gICAgfVxuICB9XG5cbiAgLy8gZm9yIGltcG9ydC15IGRlY2xhcmF0aW9uc1xuICBmdW5jdGlvbiBjaGVja1NvdXJjZShub2RlKSB7XG4gICAgY2hlY2tTb3VyY2VWYWx1ZShub2RlLnNvdXJjZSlcbiAgfVxuXG4gIC8vIGZvciBDb21tb25KUyBgcmVxdWlyZWAgY2FsbHNcbiAgLy8gYWRhcHRlZCBmcm9tIEBtY3RlcDogaHR0cDovL2dpdC5pby92NHJBdVxuICBmdW5jdGlvbiBjaGVja0NvbW1vbihjYWxsKSB7XG4gICAgaWYgKGNhbGwuY2FsbGVlLnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuXG4gICAgaWYgKGNhbGwuY2FsbGVlLm5hbWUgIT09ICdyZXF1aXJlJykgcmV0dXJuXG4gICAgaWYgKGNhbGwuYXJndW1lbnRzLmxlbmd0aCAhPT0gMSkgcmV0dXJuXG5cbiAgICBjb25zdCBtb2R1bGVQYXRoID0gY2FsbC5hcmd1bWVudHNbMF1cbiAgICBpZiAobW9kdWxlUGF0aC50eXBlICE9PSAnTGl0ZXJhbCcpIHJldHVyblxuICAgIGlmICh0eXBlb2YgbW9kdWxlUGF0aC52YWx1ZSAhPT0gJ3N0cmluZycpIHJldHVyblxuXG4gICAgY2hlY2tTb3VyY2VWYWx1ZShtb2R1bGVQYXRoKVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tBTUQoY2FsbCkge1xuICAgIGlmIChjYWxsLmNhbGxlZS50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVyblxuICAgIGlmIChjYWxsLmNhbGxlZS5uYW1lICE9PSAncmVxdWlyZScgJiZcbiAgICAgICAgY2FsbC5jYWxsZWUubmFtZSAhPT0gJ2RlZmluZScpIHJldHVyblxuICAgIGlmIChjYWxsLmFyZ3VtZW50cy5sZW5ndGggIT09IDIpIHJldHVyblxuXG4gICAgY29uc3QgbW9kdWxlcyA9IGNhbGwuYXJndW1lbnRzWzBdXG4gICAgaWYgKG1vZHVsZXMudHlwZSAhPT0gJ0FycmF5RXhwcmVzc2lvbicpIHJldHVyblxuXG4gICAgZm9yIChsZXQgZWxlbWVudCBvZiBtb2R1bGVzLmVsZW1lbnRzKSB7XG4gICAgICBpZiAoZWxlbWVudC50eXBlICE9PSAnTGl0ZXJhbCcpIGNvbnRpbnVlXG4gICAgICBpZiAodHlwZW9mIGVsZW1lbnQudmFsdWUgIT09ICdzdHJpbmcnKSBjb250aW51ZVxuXG4gICAgICBpZiAoZWxlbWVudC52YWx1ZSA9PT0gJ3JlcXVpcmUnIHx8XG4gICAgICAgICAgZWxlbWVudC52YWx1ZSA9PT0gJ2V4cG9ydHMnKSBjb250aW51ZSAvLyBtYWdpYyBtb2R1bGVzOiBodHRwOi8vZ2l0LmlvL3ZCeWFuXG5cbiAgICAgIGNoZWNrU291cmNlVmFsdWUoZWxlbWVudClcbiAgICB9XG4gIH1cblxuICBjb25zdCB2aXNpdG9ycyA9IHtcbiAgICAnSW1wb3J0RGVjbGFyYXRpb24nOiBjaGVja1NvdXJjZSxcbiAgICAnRXhwb3J0TmFtZWREZWNsYXJhdGlvbic6IGNoZWNrU291cmNlLFxuICAgICdFeHBvcnRBbGxEZWNsYXJhdGlvbic6IGNoZWNrU291cmNlLFxuICB9XG5cbiAgaWYgKGNvbnRleHQub3B0aW9uc1swXSAhPSBudWxsKSB7XG4gICAgY29uc3QgeyBjb21tb25qcywgYW1kIH0gPSBjb250ZXh0Lm9wdGlvbnNbMF1cblxuICAgIGlmIChjb21tb25qcyB8fCBhbWQpIHtcbiAgICAgIHZpc2l0b3JzWydDYWxsRXhwcmVzc2lvbiddID0gZnVuY3Rpb24gKGNhbGwpIHtcbiAgICAgICAgaWYgKGNvbW1vbmpzKSBjaGVja0NvbW1vbihjYWxsKVxuICAgICAgICBpZiAoYW1kKSBjaGVja0FNRChjYWxsKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB2aXNpdG9yc1xufVxuXG5tb2R1bGUuZXhwb3J0cy5zY2hlbWEgPSBbXG4gIHtcbiAgICAndHlwZSc6ICdvYmplY3QnLFxuICAgICdwcm9wZXJ0aWVzJzoge1xuICAgICAgJ2NvbW1vbmpzJzogeyAndHlwZSc6ICdib29sZWFuJyB9LFxuICAgICAgJ2FtZCc6IHsgJ3R5cGUnOiAnYm9vbGVhbicgfSxcbiAgICAgICdpZ25vcmUnOiB7XG4gICAgICAgICd0eXBlJzogJ2FycmF5JyxcbiAgICAgICAgJ21pbkl0ZW1zJzogMSxcbiAgICAgICAgJ2l0ZW1zJzogeyAndHlwZSc6ICdzdHJpbmcnIH0sXG4gICAgICAgICd1bmlxdWVJdGVtcyc6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJzogZmFsc2UsXG4gIH0sXG5dXG4iXX0=