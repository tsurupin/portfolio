'use strict';

require('es6-symbol/implement');

var _es6Map = require('es6-map');

var _es6Map2 = _interopRequireDefault(_es6Map);

var _getExports = require('../core/getExports');

var _getExports2 = _interopRequireDefault(_getExports);

var _importDeclaration = require('../importDeclaration');

var _importDeclaration2 = _interopRequireDefault(_importDeclaration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @fileoverview Rule to warn about potentially confused use of name exports
 * @author Desmond Brand
 * @copyright 2016 Desmond Brand. All rights reserved.
 * See LICENSE in root directory for full license.
 */

module.exports = function (context) {

  var fileImports = new _es6Map2.default();
  var allPropertyLookups = new _es6Map2.default();

  function handleImportDefault(node) {
    var declaration = (0, _importDeclaration2.default)(context);
    var exportMap = _getExports2.default.get(declaration.source.value, context);
    if (exportMap == null) return;

    if (exportMap.errors.length) {
      exportMap.reportErrors(context, declaration);
      return;
    }

    fileImports.set(node.local.name, {
      exportMap: exportMap,
      sourcePath: declaration.source.value
    });
  }

  function storePropertyLookup(objectName, propName, node) {
    var lookups = allPropertyLookups.get(objectName) || [];
    lookups.push({ node: node, propName: propName });
    allPropertyLookups.set(objectName, lookups);
  }

  function handlePropLookup(node) {
    var objectName = node.object.name;
    var propName = node.property.name;
    storePropertyLookup(objectName, propName, node);
  }

  function handleDestructuringAssignment(node) {
    var isDestructure = node.id.type === 'ObjectPattern' && node.init != null && node.init.type === 'Identifier';
    if (!isDestructure) return;

    var objectName = node.init.name;
    for (var _iterator = node.id.properties, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var _ref2 = _ref;
      var key = _ref2.key;

      if (key == null) continue; // true for rest properties
      storePropertyLookup(objectName, key.name, key);
    }
  }

  function handleProgramExit() {
    allPropertyLookups.forEach(function (lookups, objectName) {
      var fileImport = fileImports.get(objectName);
      if (fileImport == null) return;

      for (var _iterator2 = lookups, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref3 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref3 = _i2.value;
        }

        var _ref4 = _ref3;
        var propName = _ref4.propName;
        var node = _ref4.node;

        if (!fileImport.exportMap.namespace.has(propName)) continue;

        context.report({
          node: node,
          message: 'Caution: `' + objectName + '` also has a named export ' + ('`' + propName + '`. Check if you meant to write ') + ('`import {' + propName + '} from \'' + fileImport.sourcePath + '\'` ') + 'instead.'
        });
      }
    });
  }

  return {
    'ImportDefaultSpecifier': handleImportDefault,
    'MemberExpression': handlePropLookup,
    'VariableDeclarator': handleDestructuringAssignment,
    'Program:exit': handleProgramExit
  };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vLW5hbWVkLWFzLWRlZmF1bHQtbWVtYmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBT0E7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQU1BLE9BQU8sT0FBUCxHQUFpQixVQUFTLE9BQVQsRUFBa0I7O0FBRWpDLE1BQU0sY0FBYyxzQkFBcEI7QUFDQSxNQUFNLHFCQUFxQixzQkFBM0I7O0FBRUEsV0FBUyxtQkFBVCxDQUE2QixJQUE3QixFQUFtQztBQUNqQyxRQUFNLGNBQWMsaUNBQWtCLE9BQWxCLENBQXBCO0FBQ0EsUUFBTSxZQUFZLHFCQUFRLEdBQVIsQ0FBWSxZQUFZLE1BQVosQ0FBbUIsS0FBL0IsRUFBc0MsT0FBdEMsQ0FBbEI7QUFDQSxRQUFJLGFBQWEsSUFBakIsRUFBdUI7O0FBRXZCLFFBQUksVUFBVSxNQUFWLENBQWlCLE1BQXJCLEVBQTZCO0FBQzNCLGdCQUFVLFlBQVYsQ0FBdUIsT0FBdkIsRUFBZ0MsV0FBaEM7QUFDQTtBQUNEOztBQUVELGdCQUFZLEdBQVosQ0FBZ0IsS0FBSyxLQUFMLENBQVcsSUFBM0IsRUFBaUM7QUFDL0IsMEJBRCtCO0FBRS9CLGtCQUFZLFlBQVksTUFBWixDQUFtQjtBQUZBLEtBQWpDO0FBSUQ7O0FBRUQsV0FBUyxtQkFBVCxDQUE2QixVQUE3QixFQUF5QyxRQUF6QyxFQUFtRCxJQUFuRCxFQUF5RDtBQUN2RCxRQUFNLFVBQVUsbUJBQW1CLEdBQW5CLENBQXVCLFVBQXZCLEtBQXNDLEVBQXREO0FBQ0EsWUFBUSxJQUFSLENBQWEsRUFBQyxVQUFELEVBQU8sa0JBQVAsRUFBYjtBQUNBLHVCQUFtQixHQUFuQixDQUF1QixVQUF2QixFQUFtQyxPQUFuQztBQUNEOztBQUVELFdBQVMsZ0JBQVQsQ0FBMEIsSUFBMUIsRUFBZ0M7QUFDOUIsUUFBTSxhQUFhLEtBQUssTUFBTCxDQUFZLElBQS9CO0FBQ0EsUUFBTSxXQUFXLEtBQUssUUFBTCxDQUFjLElBQS9CO0FBQ0Esd0JBQW9CLFVBQXBCLEVBQWdDLFFBQWhDLEVBQTBDLElBQTFDO0FBQ0Q7O0FBRUQsV0FBUyw2QkFBVCxDQUF1QyxJQUF2QyxFQUE2QztBQUMzQyxRQUFNLGdCQUNKLEtBQUssRUFBTCxDQUFRLElBQVIsS0FBaUIsZUFBakIsSUFDQSxLQUFLLElBQUwsSUFBYSxJQURiLElBRUEsS0FBSyxJQUFMLENBQVUsSUFBVixLQUFtQixZQUhyQjtBQUtBLFFBQUksQ0FBQyxhQUFMLEVBQW9COztBQUVwQixRQUFNLGFBQWEsS0FBSyxJQUFMLENBQVUsSUFBN0I7QUFDQSx5QkFBc0IsS0FBSyxFQUFMLENBQVEsVUFBOUIsa0hBQTBDO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLFVBQTdCLEdBQTZCLFNBQTdCLEdBQTZCOztBQUN4QyxVQUFJLE9BQU8sSUFBWCxFQUFpQixTO0FBQ2pCLDBCQUFvQixVQUFwQixFQUFnQyxJQUFJLElBQXBDLEVBQTBDLEdBQTFDO0FBQ0Q7QUFDRjs7QUFFRCxXQUFTLGlCQUFULEdBQTZCO0FBQzNCLHVCQUFtQixPQUFuQixDQUEyQixVQUFDLE9BQUQsRUFBVSxVQUFWLEVBQXlCO0FBQ2xELFVBQU0sYUFBYSxZQUFZLEdBQVosQ0FBZ0IsVUFBaEIsQ0FBbkI7QUFDQSxVQUFJLGNBQWMsSUFBbEIsRUFBd0I7O0FBRXhCLDRCQUErQixPQUEvQix5SEFBd0M7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsWUFBNUIsUUFBNEIsU0FBNUIsUUFBNEI7QUFBQSxZQUFsQixJQUFrQixTQUFsQixJQUFrQjs7QUFDdEMsWUFBSSxDQUFDLFdBQVcsU0FBWCxDQUFxQixTQUFyQixDQUErQixHQUEvQixDQUFtQyxRQUFuQyxDQUFMLEVBQW1EOztBQUVuRCxnQkFBUSxNQUFSLENBQWU7QUFDYixvQkFEYTtBQUViLG1CQUNFLGVBQWMsVUFBZCx5Q0FDSyxRQURMLHVEQUVhLFFBRmIsaUJBRWdDLFdBQVcsVUFGM0MsYUFHQTtBQU5XLFNBQWY7QUFTRDtBQUNGLEtBakJEO0FBa0JEOztBQUVELFNBQU87QUFDTCw4QkFBMEIsbUJBRHJCO0FBRUwsd0JBQW9CLGdCQUZmO0FBR0wsMEJBQXNCLDZCQUhqQjtBQUlMLG9CQUFnQjtBQUpYLEdBQVA7QUFNRCxDQTNFRCIsImZpbGUiOiJydWxlcy9uby1uYW1lZC1hcy1kZWZhdWx0LW1lbWJlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVvdmVydmlldyBSdWxlIHRvIHdhcm4gYWJvdXQgcG90ZW50aWFsbHkgY29uZnVzZWQgdXNlIG9mIG5hbWUgZXhwb3J0c1xuICogQGF1dGhvciBEZXNtb25kIEJyYW5kXG4gKiBAY29weXJpZ2h0IDIwMTYgRGVzbW9uZCBCcmFuZC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFNlZSBMSUNFTlNFIGluIHJvb3QgZGlyZWN0b3J5IGZvciBmdWxsIGxpY2Vuc2UuXG4gKi9cblxuaW1wb3J0ICdlczYtc3ltYm9sL2ltcGxlbWVudCdcbmltcG9ydCBNYXAgZnJvbSAnZXM2LW1hcCdcblxuaW1wb3J0IEV4cG9ydHMgZnJvbSAnLi4vY29yZS9nZXRFeHBvcnRzJ1xuaW1wb3J0IGltcG9ydERlY2xhcmF0aW9uIGZyb20gJy4uL2ltcG9ydERlY2xhcmF0aW9uJ1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUnVsZSBEZWZpbml0aW9uXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcblxuICBjb25zdCBmaWxlSW1wb3J0cyA9IG5ldyBNYXAoKVxuICBjb25zdCBhbGxQcm9wZXJ0eUxvb2t1cHMgPSBuZXcgTWFwKClcblxuICBmdW5jdGlvbiBoYW5kbGVJbXBvcnREZWZhdWx0KG5vZGUpIHtcbiAgICBjb25zdCBkZWNsYXJhdGlvbiA9IGltcG9ydERlY2xhcmF0aW9uKGNvbnRleHQpXG4gICAgY29uc3QgZXhwb3J0TWFwID0gRXhwb3J0cy5nZXQoZGVjbGFyYXRpb24uc291cmNlLnZhbHVlLCBjb250ZXh0KVxuICAgIGlmIChleHBvcnRNYXAgPT0gbnVsbCkgcmV0dXJuXG5cbiAgICBpZiAoZXhwb3J0TWFwLmVycm9ycy5sZW5ndGgpIHtcbiAgICAgIGV4cG9ydE1hcC5yZXBvcnRFcnJvcnMoY29udGV4dCwgZGVjbGFyYXRpb24pXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBmaWxlSW1wb3J0cy5zZXQobm9kZS5sb2NhbC5uYW1lLCB7XG4gICAgICBleHBvcnRNYXAsXG4gICAgICBzb3VyY2VQYXRoOiBkZWNsYXJhdGlvbi5zb3VyY2UudmFsdWUsXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3JlUHJvcGVydHlMb29rdXAob2JqZWN0TmFtZSwgcHJvcE5hbWUsIG5vZGUpIHtcbiAgICBjb25zdCBsb29rdXBzID0gYWxsUHJvcGVydHlMb29rdXBzLmdldChvYmplY3ROYW1lKSB8fCBbXVxuICAgIGxvb2t1cHMucHVzaCh7bm9kZSwgcHJvcE5hbWV9KVxuICAgIGFsbFByb3BlcnR5TG9va3Vwcy5zZXQob2JqZWN0TmFtZSwgbG9va3VwcylcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVByb3BMb29rdXAobm9kZSkge1xuICAgIGNvbnN0IG9iamVjdE5hbWUgPSBub2RlLm9iamVjdC5uYW1lXG4gICAgY29uc3QgcHJvcE5hbWUgPSBub2RlLnByb3BlcnR5Lm5hbWVcbiAgICBzdG9yZVByb3BlcnR5TG9va3VwKG9iamVjdE5hbWUsIHByb3BOYW1lLCBub2RlKVxuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlRGVzdHJ1Y3R1cmluZ0Fzc2lnbm1lbnQobm9kZSkge1xuICAgIGNvbnN0IGlzRGVzdHJ1Y3R1cmUgPSAoXG4gICAgICBub2RlLmlkLnR5cGUgPT09ICdPYmplY3RQYXR0ZXJuJyAmJlxuICAgICAgbm9kZS5pbml0ICE9IG51bGwgJiZcbiAgICAgIG5vZGUuaW5pdC50eXBlID09PSAnSWRlbnRpZmllcidcbiAgICApXG4gICAgaWYgKCFpc0Rlc3RydWN0dXJlKSByZXR1cm5cblxuICAgIGNvbnN0IG9iamVjdE5hbWUgPSBub2RlLmluaXQubmFtZVxuICAgIGZvciAoY29uc3QgeyBrZXkgfSBvZiBub2RlLmlkLnByb3BlcnRpZXMpIHtcbiAgICAgIGlmIChrZXkgPT0gbnVsbCkgY29udGludWUgIC8vIHRydWUgZm9yIHJlc3QgcHJvcGVydGllc1xuICAgICAgc3RvcmVQcm9wZXJ0eUxvb2t1cChvYmplY3ROYW1lLCBrZXkubmFtZSwga2V5KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVByb2dyYW1FeGl0KCkge1xuICAgIGFsbFByb3BlcnR5TG9va3Vwcy5mb3JFYWNoKChsb29rdXBzLCBvYmplY3ROYW1lKSA9PiB7XG4gICAgICBjb25zdCBmaWxlSW1wb3J0ID0gZmlsZUltcG9ydHMuZ2V0KG9iamVjdE5hbWUpXG4gICAgICBpZiAoZmlsZUltcG9ydCA9PSBudWxsKSByZXR1cm5cblxuICAgICAgZm9yIChjb25zdCB7cHJvcE5hbWUsIG5vZGV9IG9mIGxvb2t1cHMpIHtcbiAgICAgICAgaWYgKCFmaWxlSW1wb3J0LmV4cG9ydE1hcC5uYW1lc3BhY2UuaGFzKHByb3BOYW1lKSkgY29udGludWVcblxuICAgICAgICBjb250ZXh0LnJlcG9ydCh7XG4gICAgICAgICAgbm9kZSxcbiAgICAgICAgICBtZXNzYWdlOiAoXG4gICAgICAgICAgICBgQ2F1dGlvbjogXFxgJHtvYmplY3ROYW1lfVxcYCBhbHNvIGhhcyBhIG5hbWVkIGV4cG9ydCBgICtcbiAgICAgICAgICAgIGBcXGAke3Byb3BOYW1lfVxcYC4gQ2hlY2sgaWYgeW91IG1lYW50IHRvIHdyaXRlIGAgK1xuICAgICAgICAgICAgYFxcYGltcG9ydCB7JHtwcm9wTmFtZX19IGZyb20gJyR7ZmlsZUltcG9ydC5zb3VyY2VQYXRofSdcXGAgYCArXG4gICAgICAgICAgICAnaW5zdGVhZC4nXG4gICAgICAgICAgKSxcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAnSW1wb3J0RGVmYXVsdFNwZWNpZmllcic6IGhhbmRsZUltcG9ydERlZmF1bHQsXG4gICAgJ01lbWJlckV4cHJlc3Npb24nOiBoYW5kbGVQcm9wTG9va3VwLFxuICAgICdWYXJpYWJsZURlY2xhcmF0b3InOiBoYW5kbGVEZXN0cnVjdHVyaW5nQXNzaWdubWVudCxcbiAgICAnUHJvZ3JhbTpleGl0JzogaGFuZGxlUHJvZ3JhbUV4aXQsXG4gIH1cbn1cbiJdfQ==