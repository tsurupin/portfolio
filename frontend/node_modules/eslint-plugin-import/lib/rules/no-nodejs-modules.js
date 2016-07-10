'use strict';

var _importType = require('../core/importType');

var _importType2 = _interopRequireDefault(_importType);

var _staticRequire = require('../core/staticRequire');

var _staticRequire2 = _interopRequireDefault(_staticRequire);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reportIfMissing(context, node, name) {
  if ((0, _importType2.default)(name, context) === 'builtin') {
    context.report(node, 'Do not import Node.js builtin modules');
  }
}

module.exports = function (context) {
  return {
    ImportDeclaration: function handleImports(node) {
      reportIfMissing(context, node, node.source.value);
    },
    CallExpression: function handleRequires(node) {
      if ((0, _staticRequire2.default)(node)) {
        reportIfMissing(context, node, node.arguments[0].value);
      }
    }
  };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vLW5vZGVqcy1tb2R1bGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsU0FBUyxlQUFULENBQXlCLE9BQXpCLEVBQWtDLElBQWxDLEVBQXdDLElBQXhDLEVBQThDO0FBQzVDLE1BQUksMEJBQVcsSUFBWCxFQUFpQixPQUFqQixNQUE4QixTQUFsQyxFQUE2QztBQUMzQyxZQUFRLE1BQVIsQ0FBZSxJQUFmLEVBQXFCLHVDQUFyQjtBQUNEO0FBQ0Y7O0FBRUQsT0FBTyxPQUFQLEdBQWlCLFVBQVUsT0FBVixFQUFtQjtBQUNsQyxTQUFPO0FBQ0wsdUJBQW1CLFNBQVMsYUFBVCxDQUF1QixJQUF2QixFQUE2QjtBQUM5QyxzQkFBZ0IsT0FBaEIsRUFBeUIsSUFBekIsRUFBK0IsS0FBSyxNQUFMLENBQVksS0FBM0M7QUFDRCxLQUhJO0FBSUwsb0JBQWdCLFNBQVMsY0FBVCxDQUF3QixJQUF4QixFQUE4QjtBQUM1QyxVQUFJLDZCQUFnQixJQUFoQixDQUFKLEVBQTJCO0FBQ3pCLHdCQUFnQixPQUFoQixFQUF5QixJQUF6QixFQUErQixLQUFLLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLEtBQWpEO0FBQ0Q7QUFDRjtBQVJJLEdBQVA7QUFVRCxDQVhEIiwiZmlsZSI6InJ1bGVzL25vLW5vZGVqcy1tb2R1bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGltcG9ydFR5cGUgZnJvbSAnLi4vY29yZS9pbXBvcnRUeXBlJ1xuaW1wb3J0IGlzU3RhdGljUmVxdWlyZSBmcm9tICcuLi9jb3JlL3N0YXRpY1JlcXVpcmUnXG5cbmZ1bmN0aW9uIHJlcG9ydElmTWlzc2luZyhjb250ZXh0LCBub2RlLCBuYW1lKSB7XG4gIGlmIChpbXBvcnRUeXBlKG5hbWUsIGNvbnRleHQpID09PSAnYnVpbHRpbicpIHtcbiAgICBjb250ZXh0LnJlcG9ydChub2RlLCAnRG8gbm90IGltcG9ydCBOb2RlLmpzIGJ1aWx0aW4gbW9kdWxlcycpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICByZXR1cm4ge1xuICAgIEltcG9ydERlY2xhcmF0aW9uOiBmdW5jdGlvbiBoYW5kbGVJbXBvcnRzKG5vZGUpIHtcbiAgICAgIHJlcG9ydElmTWlzc2luZyhjb250ZXh0LCBub2RlLCBub2RlLnNvdXJjZS52YWx1ZSlcbiAgICB9LFxuICAgIENhbGxFeHByZXNzaW9uOiBmdW5jdGlvbiBoYW5kbGVSZXF1aXJlcyhub2RlKSB7XG4gICAgICBpZiAoaXNTdGF0aWNSZXF1aXJlKG5vZGUpKSB7XG4gICAgICAgIHJlcG9ydElmTWlzc2luZyhjb250ZXh0LCBub2RlLCBub2RlLmFyZ3VtZW50c1swXS52YWx1ZSlcbiAgICAgIH1cbiAgICB9LFxuICB9XG59XG4iXX0=