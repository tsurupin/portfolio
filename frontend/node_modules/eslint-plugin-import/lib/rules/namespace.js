'use strict';

require('es6-symbol/implement');

var _es6Map = require('es6-map');

var _es6Map2 = _interopRequireDefault(_es6Map);

var _getExports = require('../core/getExports');

var _getExports2 = _interopRequireDefault(_getExports);

var _importDeclaration = require('../importDeclaration');

var _importDeclaration2 = _interopRequireDefault(_importDeclaration);

var _declaredScope = require('../core/declaredScope');

var _declaredScope2 = _interopRequireDefault(_declaredScope);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (context) {

  var namespaces = new _es6Map2.default();

  function makeMessage(last, namepath) {
    return '\'' + last.name + '\' not found in' + (namepath.length > 1 ? ' deeply ' : ' ') + ('imported namespace \'' + namepath.join('.') + '\'.');
  }

  return {

    // pick up all imports at body entry time, to properly respect hoisting
    'Program': function Program(_ref) {
      var body = _ref.body;

      function processBodyStatement(declaration) {
        if (declaration.type !== 'ImportDeclaration') return;

        if (declaration.specifiers.length === 0) return;

        var imports = _getExports2.default.get(declaration.source.value, context);
        if (imports == null) return null;

        if (imports.errors.length) {
          imports.reportErrors(context, declaration);
          return;
        }

        for (var _iterator = declaration.specifiers, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref2;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref2 = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref2 = _i.value;
          }

          var specifier = _ref2;

          switch (specifier.type) {
            case 'ImportNamespaceSpecifier':
              if (!imports.size) {
                context.report(specifier, 'No exported names found in module \'' + declaration.source.value + '\'.');
              }
              namespaces.set(specifier.local.name, imports);
              break;
            case 'ImportDefaultSpecifier':
            case 'ImportSpecifier':
              {
                var meta = imports.get(
                // default to 'default' for default http://i.imgur.com/nj6qAWy.jpg
                specifier.imported ? specifier.imported.name : 'default');
                if (!meta || !meta.namespace) break;
                namespaces.set(specifier.local.name, meta.namespace);
                break;
              }
          }
        }
      }
      body.forEach(processBodyStatement);
    },

    // same as above, but does not add names to local map
    'ExportNamespaceSpecifier': function ExportNamespaceSpecifier(namespace) {
      var declaration = (0, _importDeclaration2.default)(context);

      var imports = _getExports2.default.get(declaration.source.value, context);
      if (imports == null) return null;

      if (imports.errors.length) {
        imports.reportErrors(context, declaration);
        return;
      }

      if (!imports.size) {
        context.report(namespace, 'No exported names found in module \'' + declaration.source.value + '\'.');
      }
    },

    // todo: check for possible redefinition

    'MemberExpression': function MemberExpression(dereference) {
      if (dereference.object.type !== 'Identifier') return;
      if (!namespaces.has(dereference.object.name)) return;

      if (dereference.parent.type === 'AssignmentExpression' && dereference.parent.left === dereference) {
        context.report(dereference.parent, 'Assignment to member of namespace \'' + dereference.object.name + '\'.');
      }

      // go deep
      var namespace = namespaces.get(dereference.object.name);
      var namepath = [dereference.object.name];
      // while property is namespace and parent is member expression, keep validating
      while (namespace instanceof _getExports2.default && dereference.type === 'MemberExpression') {

        if (dereference.computed) {
          context.report(dereference.property, 'Unable to validate computed reference to imported namespace \'' + dereference.object.name + '\'.');
          return;
        }

        if (!namespace.has(dereference.property.name)) {
          context.report(dereference.property, makeMessage(dereference.property, namepath));
          break;
        }

        // stash and pop
        namepath.push(dereference.property.name);
        namespace = namespace.get(dereference.property.name).namespace;
        dereference = dereference.parent;
      }
    },

    'VariableDeclarator': function VariableDeclarator(_ref3) {
      var id = _ref3.id;
      var init = _ref3.init;

      if (init == null) return;
      if (init.type !== 'Identifier') return;
      if (!namespaces.has(init.name)) return;

      // check for redefinition in intermediate scopes
      if ((0, _declaredScope2.default)(context, init.name) !== 'module') return;

      // DFS traverse child namespaces
      function testKey(pattern, namespace) {
        var path = arguments.length <= 2 || arguments[2] === undefined ? [init.name] : arguments[2];

        if (!(namespace instanceof _getExports2.default)) return;

        if (pattern.type !== 'ObjectPattern') return;

        for (var _iterator2 = pattern.properties, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
          var _ref4;

          if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref4 = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref4 = _i2.value;
          }

          var property = _ref4;


          if (property.key.type !== 'Identifier') {
            context.report({
              node: property,
              message: 'Only destructure top-level names.'
            });
            continue;
          }

          if (!namespace.has(property.key.name)) {
            context.report({
              node: property,
              message: makeMessage(property.key, path)
            });
            continue;
          }

          path.push(property.key.name);
          testKey(property.value, namespace.get(property.key.name).namespace, path);
          path.pop();
        }
      }

      testKey(id, namespaces.get(init.name));
    }
  };
};
//# sourceMappingURL=data:application/json;base64,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b3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2VzNi1zeW1ib2wvaW1wbGVtZW50J1xuaW1wb3J0IE1hcCBmcm9tICdlczYtbWFwJ1xuXG5pbXBvcnQgRXhwb3J0cyBmcm9tICcuLi9jb3JlL2dldEV4cG9ydHMnXG5pbXBvcnQgaW1wb3J0RGVjbGFyYXRpb24gZnJvbSAnLi4vaW1wb3J0RGVjbGFyYXRpb24nXG5pbXBvcnQgZGVjbGFyZWRTY29wZSBmcm9tICcuLi9jb3JlL2RlY2xhcmVkU2NvcGUnXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcblxuICBjb25zdCBuYW1lc3BhY2VzID0gbmV3IE1hcCgpXG5cbiAgZnVuY3Rpb24gbWFrZU1lc3NhZ2UobGFzdCwgbmFtZXBhdGgpIHtcbiAgICAgcmV0dXJuIGAnJHtsYXN0Lm5hbWV9JyBub3QgZm91bmQgaW5gICtcbiAgICAgICAgICAgIChuYW1lcGF0aC5sZW5ndGggPiAxID8gJyBkZWVwbHkgJyA6ICcgJykgK1xuICAgICAgICAgICAgYGltcG9ydGVkIG5hbWVzcGFjZSAnJHtuYW1lcGF0aC5qb2luKCcuJyl9Jy5gXG4gIH1cblxuICByZXR1cm4ge1xuXG4gICAgLy8gcGljayB1cCBhbGwgaW1wb3J0cyBhdCBib2R5IGVudHJ5IHRpbWUsIHRvIHByb3Blcmx5IHJlc3BlY3QgaG9pc3RpbmdcbiAgICAnUHJvZ3JhbSc6IGZ1bmN0aW9uICh7IGJvZHkgfSkge1xuICAgICAgZnVuY3Rpb24gcHJvY2Vzc0JvZHlTdGF0ZW1lbnQoZGVjbGFyYXRpb24pIHtcbiAgICAgICAgaWYgKGRlY2xhcmF0aW9uLnR5cGUgIT09ICdJbXBvcnREZWNsYXJhdGlvbicpIHJldHVyblxuXG4gICAgICAgIGlmIChkZWNsYXJhdGlvbi5zcGVjaWZpZXJzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG5cbiAgICAgICAgY29uc3QgaW1wb3J0cyA9IEV4cG9ydHMuZ2V0KGRlY2xhcmF0aW9uLnNvdXJjZS52YWx1ZSwgY29udGV4dClcbiAgICAgICAgaWYgKGltcG9ydHMgPT0gbnVsbCkgcmV0dXJuIG51bGxcblxuICAgICAgICBpZiAoaW1wb3J0cy5lcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgaW1wb3J0cy5yZXBvcnRFcnJvcnMoY29udGV4dCwgZGVjbGFyYXRpb24pXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBzcGVjaWZpZXIgb2YgZGVjbGFyYXRpb24uc3BlY2lmaWVycykge1xuICAgICAgICAgIHN3aXRjaCAoc3BlY2lmaWVyLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0ltcG9ydE5hbWVzcGFjZVNwZWNpZmllcic6XG4gICAgICAgICAgICAgIGlmICghaW1wb3J0cy5zaXplKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5yZXBvcnQoc3BlY2lmaWVyLFxuICAgICAgICAgICAgICAgICAgYE5vIGV4cG9ydGVkIG5hbWVzIGZvdW5kIGluIG1vZHVsZSAnJHtkZWNsYXJhdGlvbi5zb3VyY2UudmFsdWV9Jy5gKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG5hbWVzcGFjZXMuc2V0KHNwZWNpZmllci5sb2NhbC5uYW1lLCBpbXBvcnRzKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnSW1wb3J0RGVmYXVsdFNwZWNpZmllcic6XG4gICAgICAgICAgICBjYXNlICdJbXBvcnRTcGVjaWZpZXInOiB7XG4gICAgICAgICAgICAgIGNvbnN0IG1ldGEgPSBpbXBvcnRzLmdldChcbiAgICAgICAgICAgICAgICAvLyBkZWZhdWx0IHRvICdkZWZhdWx0JyBmb3IgZGVmYXVsdCBodHRwOi8vaS5pbWd1ci5jb20vbmo2cUFXeS5qcGdcbiAgICAgICAgICAgICAgICBzcGVjaWZpZXIuaW1wb3J0ZWQgPyBzcGVjaWZpZXIuaW1wb3J0ZWQubmFtZSA6ICdkZWZhdWx0JylcbiAgICAgICAgICAgICAgaWYgKCFtZXRhIHx8ICFtZXRhLm5hbWVzcGFjZSkgYnJlYWtcbiAgICAgICAgICAgICAgbmFtZXNwYWNlcy5zZXQoc3BlY2lmaWVyLmxvY2FsLm5hbWUsIG1ldGEubmFtZXNwYWNlKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYm9keS5mb3JFYWNoKHByb2Nlc3NCb2R5U3RhdGVtZW50KVxuICAgIH0sXG5cbiAgICAvLyBzYW1lIGFzIGFib3ZlLCBidXQgZG9lcyBub3QgYWRkIG5hbWVzIHRvIGxvY2FsIG1hcFxuICAgICdFeHBvcnROYW1lc3BhY2VTcGVjaWZpZXInOiBmdW5jdGlvbiAobmFtZXNwYWNlKSB7XG4gICAgICB2YXIgZGVjbGFyYXRpb24gPSBpbXBvcnREZWNsYXJhdGlvbihjb250ZXh0KVxuXG4gICAgICB2YXIgaW1wb3J0cyA9IEV4cG9ydHMuZ2V0KGRlY2xhcmF0aW9uLnNvdXJjZS52YWx1ZSwgY29udGV4dClcbiAgICAgIGlmIChpbXBvcnRzID09IG51bGwpIHJldHVybiBudWxsXG5cbiAgICAgIGlmIChpbXBvcnRzLmVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgaW1wb3J0cy5yZXBvcnRFcnJvcnMoY29udGV4dCwgZGVjbGFyYXRpb24pXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoIWltcG9ydHMuc2l6ZSkge1xuICAgICAgICBjb250ZXh0LnJlcG9ydChuYW1lc3BhY2UsXG4gICAgICAgICAgYE5vIGV4cG9ydGVkIG5hbWVzIGZvdW5kIGluIG1vZHVsZSAnJHtkZWNsYXJhdGlvbi5zb3VyY2UudmFsdWV9Jy5gKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB0b2RvOiBjaGVjayBmb3IgcG9zc2libGUgcmVkZWZpbml0aW9uXG5cbiAgICAnTWVtYmVyRXhwcmVzc2lvbic6IGZ1bmN0aW9uIChkZXJlZmVyZW5jZSkge1xuICAgICAgaWYgKGRlcmVmZXJlbmNlLm9iamVjdC50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVyblxuICAgICAgaWYgKCFuYW1lc3BhY2VzLmhhcyhkZXJlZmVyZW5jZS5vYmplY3QubmFtZSkpIHJldHVyblxuXG4gICAgICBpZiAoZGVyZWZlcmVuY2UucGFyZW50LnR5cGUgPT09ICdBc3NpZ25tZW50RXhwcmVzc2lvbicgJiZcbiAgICAgICAgICBkZXJlZmVyZW5jZS5wYXJlbnQubGVmdCA9PT0gZGVyZWZlcmVuY2UpIHtcbiAgICAgICAgICBjb250ZXh0LnJlcG9ydChkZXJlZmVyZW5jZS5wYXJlbnQsXG4gICAgICAgICAgICAgIGBBc3NpZ25tZW50IHRvIG1lbWJlciBvZiBuYW1lc3BhY2UgJyR7ZGVyZWZlcmVuY2Uub2JqZWN0Lm5hbWV9Jy5gKVxuICAgICAgfVxuXG4gICAgICAvLyBnbyBkZWVwXG4gICAgICB2YXIgbmFtZXNwYWNlID0gbmFtZXNwYWNlcy5nZXQoZGVyZWZlcmVuY2Uub2JqZWN0Lm5hbWUpXG4gICAgICB2YXIgbmFtZXBhdGggPSBbZGVyZWZlcmVuY2Uub2JqZWN0Lm5hbWVdXG4gICAgICAvLyB3aGlsZSBwcm9wZXJ0eSBpcyBuYW1lc3BhY2UgYW5kIHBhcmVudCBpcyBtZW1iZXIgZXhwcmVzc2lvbiwga2VlcCB2YWxpZGF0aW5nXG4gICAgICB3aGlsZSAobmFtZXNwYWNlIGluc3RhbmNlb2YgRXhwb3J0cyAmJlxuICAgICAgICAgICAgIGRlcmVmZXJlbmNlLnR5cGUgPT09ICdNZW1iZXJFeHByZXNzaW9uJykge1xuXG4gICAgICAgIGlmIChkZXJlZmVyZW5jZS5jb21wdXRlZCkge1xuICAgICAgICAgIGNvbnRleHQucmVwb3J0KGRlcmVmZXJlbmNlLnByb3BlcnR5LFxuICAgICAgICAgICAgJ1VuYWJsZSB0byB2YWxpZGF0ZSBjb21wdXRlZCByZWZlcmVuY2UgdG8gaW1wb3J0ZWQgbmFtZXNwYWNlIFxcJycgK1xuICAgICAgICAgICAgZGVyZWZlcmVuY2Uub2JqZWN0Lm5hbWUgKyAnXFwnLicpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW5hbWVzcGFjZS5oYXMoZGVyZWZlcmVuY2UucHJvcGVydHkubmFtZSkpIHtcbiAgICAgICAgICBjb250ZXh0LnJlcG9ydChcbiAgICAgICAgICAgIGRlcmVmZXJlbmNlLnByb3BlcnR5LFxuICAgICAgICAgICAgbWFrZU1lc3NhZ2UoZGVyZWZlcmVuY2UucHJvcGVydHksIG5hbWVwYXRoKSlcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3Rhc2ggYW5kIHBvcFxuICAgICAgICBuYW1lcGF0aC5wdXNoKGRlcmVmZXJlbmNlLnByb3BlcnR5Lm5hbWUpXG4gICAgICAgIG5hbWVzcGFjZSA9IG5hbWVzcGFjZS5nZXQoZGVyZWZlcmVuY2UucHJvcGVydHkubmFtZSkubmFtZXNwYWNlXG4gICAgICAgIGRlcmVmZXJlbmNlID0gZGVyZWZlcmVuY2UucGFyZW50XG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgJ1ZhcmlhYmxlRGVjbGFyYXRvcic6IGZ1bmN0aW9uICh7IGlkLCBpbml0IH0pIHtcbiAgICAgIGlmIChpbml0ID09IG51bGwpIHJldHVyblxuICAgICAgaWYgKGluaXQudHlwZSAhPT0gJ0lkZW50aWZpZXInKSByZXR1cm5cbiAgICAgIGlmICghbmFtZXNwYWNlcy5oYXMoaW5pdC5uYW1lKSkgcmV0dXJuXG5cbiAgICAgIC8vIGNoZWNrIGZvciByZWRlZmluaXRpb24gaW4gaW50ZXJtZWRpYXRlIHNjb3Blc1xuICAgICAgaWYgKGRlY2xhcmVkU2NvcGUoY29udGV4dCwgaW5pdC5uYW1lKSAhPT0gJ21vZHVsZScpIHJldHVyblxuXG4gICAgICAvLyBERlMgdHJhdmVyc2UgY2hpbGQgbmFtZXNwYWNlc1xuICAgICAgZnVuY3Rpb24gdGVzdEtleShwYXR0ZXJuLCBuYW1lc3BhY2UsIHBhdGggPSBbaW5pdC5uYW1lXSkge1xuICAgICAgICBpZiAoIShuYW1lc3BhY2UgaW5zdGFuY2VvZiBFeHBvcnRzKSkgcmV0dXJuXG5cbiAgICAgICAgaWYgKHBhdHRlcm4udHlwZSAhPT0gJ09iamVjdFBhdHRlcm4nKSByZXR1cm5cblxuICAgICAgICBmb3IgKGxldCBwcm9wZXJ0eSBvZiBwYXR0ZXJuLnByb3BlcnRpZXMpIHtcblxuICAgICAgICAgIGlmIChwcm9wZXJ0eS5rZXkudHlwZSAhPT0gJ0lkZW50aWZpZXInKSB7XG4gICAgICAgICAgICBjb250ZXh0LnJlcG9ydCh7XG4gICAgICAgICAgICAgIG5vZGU6IHByb3BlcnR5LFxuICAgICAgICAgICAgICBtZXNzYWdlOiAnT25seSBkZXN0cnVjdHVyZSB0b3AtbGV2ZWwgbmFtZXMuJyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghbmFtZXNwYWNlLmhhcyhwcm9wZXJ0eS5rZXkubmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnRleHQucmVwb3J0KHtcbiAgICAgICAgICAgICAgbm9kZTogcHJvcGVydHksXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IG1ha2VNZXNzYWdlKHByb3BlcnR5LmtleSwgcGF0aCksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwYXRoLnB1c2gocHJvcGVydHkua2V5Lm5hbWUpXG4gICAgICAgICAgdGVzdEtleShwcm9wZXJ0eS52YWx1ZSwgbmFtZXNwYWNlLmdldChwcm9wZXJ0eS5rZXkubmFtZSkubmFtZXNwYWNlLCBwYXRoKVxuICAgICAgICAgIHBhdGgucG9wKClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0ZXN0S2V5KGlkLCBuYW1lc3BhY2VzLmdldChpbml0Lm5hbWUpKVxuICAgIH0sXG4gIH1cbn1cbiJdfQ==