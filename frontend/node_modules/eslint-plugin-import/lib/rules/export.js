'use strict';

require('es6-symbol/implement');

var _es6Map = require('es6-map');

var _es6Map2 = _interopRequireDefault(_es6Map);

var _es6Set = require('es6-set');

var _es6Set2 = _interopRequireDefault(_es6Set);

var _getExports = require('../core/getExports');

var _getExports2 = _interopRequireDefault(_getExports);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (context) {
  var named = new _es6Map2.default();

  function addNamed(name, node) {
    var nodes = named.get(name);

    if (nodes == null) {
      nodes = new _es6Set2.default();
      named.set(name, nodes);
    }

    nodes.add(node);
  }

  return {
    'ExportDefaultDeclaration': function ExportDefaultDeclaration(node) {
      return addNamed('default', node);
    },

    'ExportSpecifier': function ExportSpecifier(node) {
      addNamed(node.exported.name, node.exported);
    },

    'ExportNamedDeclaration': function ExportNamedDeclaration(node) {
      if (node.declaration == null) return;

      if (node.declaration.id != null) {
        addNamed(node.declaration.id.name, node.declaration.id);
      }

      if (node.declaration.declarations != null) {
        for (var _iterator = node.declaration.declarations, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var declaration = _ref;

          (0, _getExports.recursivePatternCapture)(declaration.id, function (v) {
            return addNamed(v.name, v);
          });
        }
      }
    },

    'ExportAllDeclaration': function ExportAllDeclaration(node) {
      if (node.source == null) return; // not sure if this is ever true

      var remoteExports = _getExports2.default.get(node.source.value, context);
      if (remoteExports == null) return;

      if (remoteExports.errors.length) {
        remoteExports.reportErrors(context, node);
        return;
      }
      var any = false;
      remoteExports.forEach(function (v, name) {
        return name !== 'default' && (any = true) && // poor man's filter
        addNamed(name, node);
      });

      if (!any) {
        context.report(node.source, 'No named exports found in module \'' + node.source.value + '\'.');
      }
    },

    'Program:exit': function ProgramExit() {
      for (var _iterator2 = named, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var _ref3 = _ref2;
        var name = _ref3[0];
        var nodes = _ref3[1];

        if (nodes.size <= 1) continue;

        for (var _iterator3 = nodes, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
          var _ref4;

          if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref4 = _iterator3[_i3++];
          } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref4 = _i3.value;
          }

          var node = _ref4;

          if (name === 'default') {
            context.report(node, 'Multiple default exports.');
          } else context.report(node, 'Multiple exports of name \'' + name + '\'.');
        }
      }
    }
  };
};
//# sourceMappingURL=data:application/json;base64,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LG9CQUFRLE1BQVIsQ0FBZSxJQUFmLEVBQXFCLDJCQUFyQjtBQUNELFdBRkQsTUFFTyxRQUFRLE1BQVIsQ0FBZSxJQUFmLGtDQUFrRCxJQUFsRDtBQUNSO0FBQ0Y7QUFDRjtBQXJESSxHQUFQO0FBdURELENBckVEIiwiZmlsZSI6InJ1bGVzL2V4cG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnZXM2LXN5bWJvbC9pbXBsZW1lbnQnXG5pbXBvcnQgTWFwIGZyb20gJ2VzNi1tYXAnXG5pbXBvcnQgU2V0IGZyb20gJ2VzNi1zZXQnXG5cbmltcG9ydCBFeHBvcnRNYXAsIHsgcmVjdXJzaXZlUGF0dGVybkNhcHR1cmUgfSBmcm9tICcuLi9jb3JlL2dldEV4cG9ydHMnXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgY29uc3QgbmFtZWQgPSBuZXcgTWFwKClcblxuICBmdW5jdGlvbiBhZGROYW1lZChuYW1lLCBub2RlKSB7XG4gICAgbGV0IG5vZGVzID0gbmFtZWQuZ2V0KG5hbWUpXG5cbiAgICBpZiAobm9kZXMgPT0gbnVsbCkge1xuICAgICAgbm9kZXMgPSBuZXcgU2V0KClcbiAgICAgIG5hbWVkLnNldChuYW1lLCBub2RlcylcbiAgICB9XG5cbiAgICBub2Rlcy5hZGQobm9kZSlcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgJ0V4cG9ydERlZmF1bHREZWNsYXJhdGlvbic6IChub2RlKSA9PiBhZGROYW1lZCgnZGVmYXVsdCcsIG5vZGUpLFxuXG4gICAgJ0V4cG9ydFNwZWNpZmllcic6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICBhZGROYW1lZChub2RlLmV4cG9ydGVkLm5hbWUsIG5vZGUuZXhwb3J0ZWQpXG4gICAgfSxcblxuICAgICdFeHBvcnROYW1lZERlY2xhcmF0aW9uJzogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIGlmIChub2RlLmRlY2xhcmF0aW9uID09IG51bGwpIHJldHVyblxuXG4gICAgICBpZiAobm9kZS5kZWNsYXJhdGlvbi5pZCAhPSBudWxsKSB7XG4gICAgICAgIGFkZE5hbWVkKG5vZGUuZGVjbGFyYXRpb24uaWQubmFtZSwgbm9kZS5kZWNsYXJhdGlvbi5pZClcbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUuZGVjbGFyYXRpb24uZGVjbGFyYXRpb25zICE9IG51bGwpIHtcbiAgICAgICAgZm9yIChsZXQgZGVjbGFyYXRpb24gb2Ygbm9kZS5kZWNsYXJhdGlvbi5kZWNsYXJhdGlvbnMpIHtcbiAgICAgICAgICByZWN1cnNpdmVQYXR0ZXJuQ2FwdHVyZShkZWNsYXJhdGlvbi5pZCwgdiA9PiBhZGROYW1lZCh2Lm5hbWUsIHYpKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgICdFeHBvcnRBbGxEZWNsYXJhdGlvbic6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICBpZiAobm9kZS5zb3VyY2UgPT0gbnVsbCkgcmV0dXJuIC8vIG5vdCBzdXJlIGlmIHRoaXMgaXMgZXZlciB0cnVlXG5cbiAgICAgIGNvbnN0IHJlbW90ZUV4cG9ydHMgPSBFeHBvcnRNYXAuZ2V0KG5vZGUuc291cmNlLnZhbHVlLCBjb250ZXh0KVxuICAgICAgaWYgKHJlbW90ZUV4cG9ydHMgPT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgIGlmIChyZW1vdGVFeHBvcnRzLmVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgcmVtb3RlRXhwb3J0cy5yZXBvcnRFcnJvcnMoY29udGV4dCwgbm9kZSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBsZXQgYW55ID0gZmFsc2VcbiAgICAgIHJlbW90ZUV4cG9ydHMuZm9yRWFjaCgodiwgbmFtZSkgPT5cbiAgICAgICAgbmFtZSAhPT0gJ2RlZmF1bHQnICYmXG4gICAgICAgIChhbnkgPSB0cnVlKSAmJiAvLyBwb29yIG1hbidzIGZpbHRlclxuICAgICAgICBhZGROYW1lZChuYW1lLCBub2RlKSlcblxuICAgICAgaWYgKCFhbnkpIHtcbiAgICAgICAgY29udGV4dC5yZXBvcnQobm9kZS5zb3VyY2UsXG4gICAgICAgICAgYE5vIG5hbWVkIGV4cG9ydHMgZm91bmQgaW4gbW9kdWxlICcke25vZGUuc291cmNlLnZhbHVlfScuYClcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgJ1Byb2dyYW06ZXhpdCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAobGV0IFtuYW1lLCBub2Rlc10gb2YgbmFtZWQpIHtcbiAgICAgICAgaWYgKG5vZGVzLnNpemUgPD0gMSkgY29udGludWVcblxuICAgICAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgICAgaWYgKG5hbWUgPT09ICdkZWZhdWx0Jykge1xuICAgICAgICAgICAgY29udGV4dC5yZXBvcnQobm9kZSwgJ011bHRpcGxlIGRlZmF1bHQgZXhwb3J0cy4nKVxuICAgICAgICAgIH0gZWxzZSBjb250ZXh0LnJlcG9ydChub2RlLCBgTXVsdGlwbGUgZXhwb3J0cyBvZiBuYW1lICcke25hbWV9Jy5gKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgfVxufVxuIl19