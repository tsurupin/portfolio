'use strict';

var _getExports = require('../core/getExports');

var _getExports2 = _interopRequireDefault(_getExports);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (context) {

  function checkDefault(specifierType, node) {

    // poor man's Array.find
    var defaultSpecifier = void 0;
    node.specifiers.some(function (n) {
      if (n.type === specifierType) {
        defaultSpecifier = n;
        return true;
      }
    });

    if (!defaultSpecifier) return;
    var imports = _getExports2.default.get(node.source.value, context);
    if (imports == null) return;

    if (imports.errors.length) {
      imports.reportErrors(context, node);
    } else if (!imports.get('default')) {
      context.report(defaultSpecifier, 'No default export found in module.');
    }
  }

  return {
    'ImportDeclaration': checkDefault.bind(null, 'ImportDefaultSpecifier'),
    'ExportNamedDeclaration': checkDefault.bind(null, 'ExportDefaultSpecifier')
  };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL2RlZmF1bHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0FBRUEsT0FBTyxPQUFQLEdBQWlCLFVBQVUsT0FBVixFQUFtQjs7QUFFbEMsV0FBUyxZQUFULENBQXNCLGFBQXRCLEVBQXFDLElBQXJDLEVBQTJDOzs7QUFHekMsUUFBSSx5QkFBSjtBQUNBLFNBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixVQUFDLENBQUQsRUFBTztBQUMxQixVQUFJLEVBQUUsSUFBRixLQUFXLGFBQWYsRUFBOEI7QUFDNUIsMkJBQW1CLENBQW5CO0FBQ0EsZUFBTyxJQUFQO0FBQ0Q7QUFDRixLQUxEOztBQU9BLFFBQUksQ0FBQyxnQkFBTCxFQUF1QjtBQUN2QixRQUFJLFVBQVUscUJBQVEsR0FBUixDQUFZLEtBQUssTUFBTCxDQUFZLEtBQXhCLEVBQStCLE9BQS9CLENBQWQ7QUFDQSxRQUFJLFdBQVcsSUFBZixFQUFxQjs7QUFFckIsUUFBSSxRQUFRLE1BQVIsQ0FBZSxNQUFuQixFQUEyQjtBQUN6QixjQUFRLFlBQVIsQ0FBcUIsT0FBckIsRUFBOEIsSUFBOUI7QUFDRCxLQUZELE1BRU8sSUFBSSxDQUFDLFFBQVEsR0FBUixDQUFZLFNBQVosQ0FBTCxFQUE2QjtBQUNsQyxjQUFRLE1BQVIsQ0FBZSxnQkFBZixFQUFpQyxvQ0FBakM7QUFDRDtBQUNGOztBQUVELFNBQU87QUFDTCx5QkFBcUIsYUFBYSxJQUFiLENBQWtCLElBQWxCLEVBQXdCLHdCQUF4QixDQURoQjtBQUVMLDhCQUEwQixhQUFhLElBQWIsQ0FBa0IsSUFBbEIsRUFBd0Isd0JBQXhCO0FBRnJCLEdBQVA7QUFJRCxDQTVCRCIsImZpbGUiOiJydWxlcy9kZWZhdWx0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV4cG9ydHMgZnJvbSAnLi4vY29yZS9nZXRFeHBvcnRzJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG5cbiAgZnVuY3Rpb24gY2hlY2tEZWZhdWx0KHNwZWNpZmllclR5cGUsIG5vZGUpIHtcblxuICAgIC8vIHBvb3IgbWFuJ3MgQXJyYXkuZmluZFxuICAgIGxldCBkZWZhdWx0U3BlY2lmaWVyXG4gICAgbm9kZS5zcGVjaWZpZXJzLnNvbWUoKG4pID0+IHtcbiAgICAgIGlmIChuLnR5cGUgPT09IHNwZWNpZmllclR5cGUpIHtcbiAgICAgICAgZGVmYXVsdFNwZWNpZmllciA9IG5cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKCFkZWZhdWx0U3BlY2lmaWVyKSByZXR1cm5cbiAgICB2YXIgaW1wb3J0cyA9IEV4cG9ydHMuZ2V0KG5vZGUuc291cmNlLnZhbHVlLCBjb250ZXh0KVxuICAgIGlmIChpbXBvcnRzID09IG51bGwpIHJldHVyblxuXG4gICAgaWYgKGltcG9ydHMuZXJyb3JzLmxlbmd0aCkge1xuICAgICAgaW1wb3J0cy5yZXBvcnRFcnJvcnMoY29udGV4dCwgbm9kZSlcbiAgICB9IGVsc2UgaWYgKCFpbXBvcnRzLmdldCgnZGVmYXVsdCcpKSB7XG4gICAgICBjb250ZXh0LnJlcG9ydChkZWZhdWx0U3BlY2lmaWVyLCAnTm8gZGVmYXVsdCBleHBvcnQgZm91bmQgaW4gbW9kdWxlLicpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAnSW1wb3J0RGVjbGFyYXRpb24nOiBjaGVja0RlZmF1bHQuYmluZChudWxsLCAnSW1wb3J0RGVmYXVsdFNwZWNpZmllcicpLFxuICAgICdFeHBvcnROYW1lZERlY2xhcmF0aW9uJzogY2hlY2tEZWZhdWx0LmJpbmQobnVsbCwgJ0V4cG9ydERlZmF1bHRTcGVjaWZpZXInKSxcbiAgfVxufVxuIl19