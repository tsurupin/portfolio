'use strict';

module.exports = function (context) {
  function checkDeclaration(node) {
    var kind = node.kind;

    if (kind === 'var' || kind === 'let') {
      context.report(node, 'Exporting mutable \'' + kind + '\' binding, use \'const\' instead.');
    }
  }

  function checkDeclarationsInScope(_ref, name) {
    var variables = _ref.variables;

    for (var _iterator = variables, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref2 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref2 = _i.value;
      }

      var variable = _ref2;

      if (variable.name === name) {
        for (var _iterator2 = variable.defs, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
          var _ref3;

          if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref3 = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref3 = _i2.value;
          }

          var def = _ref3;

          if (def.type === 'Variable') {
            checkDeclaration(def.parent);
          }
        }
      }
    }
  }

  function handleExportDefault(node) {
    var scope = context.getScope();

    if (node.declaration.name) {
      checkDeclarationsInScope(scope, node.declaration.name);
    }
  }

  function handleExportNamed(node) {
    var scope = context.getScope();

    if (node.declaration) {
      checkDeclaration(node.declaration);
    } else if (!node.source) {
      for (var _iterator3 = node.specifiers, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref4 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref4 = _i3.value;
        }

        var specifier = _ref4;

        checkDeclarationsInScope(scope, specifier.local.name);
      }
    }
  }

  return {
    'ExportDefaultDeclaration': handleExportDefault,
    'ExportNamedDeclaration': handleExportNamed
  };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vLW11dGFibGUtZXhwb3J0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sT0FBUCxHQUFpQixVQUFVLE9BQVYsRUFBbUI7QUFDbEMsV0FBUyxnQkFBVCxDQUEwQixJQUExQixFQUFnQztBQUFBLFFBQ3ZCLElBRHVCLEdBQ2YsSUFEZSxDQUN2QixJQUR1Qjs7QUFFOUIsUUFBSSxTQUFTLEtBQVQsSUFBa0IsU0FBUyxLQUEvQixFQUFzQztBQUNwQyxjQUFRLE1BQVIsQ0FBZSxJQUFmLDJCQUEyQyxJQUEzQztBQUNEO0FBQ0Y7O0FBRUQsV0FBUyx3QkFBVCxPQUErQyxJQUEvQyxFQUFxRDtBQUFBLFFBQWxCLFNBQWtCLFFBQWxCLFNBQWtCOztBQUNuRCx5QkFBcUIsU0FBckIsa0hBQWdDO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQSxVQUF2QixRQUF1Qjs7QUFDOUIsVUFBSSxTQUFTLElBQVQsS0FBa0IsSUFBdEIsRUFBNEI7QUFDMUIsOEJBQWdCLFNBQVMsSUFBekIseUhBQStCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQSxjQUF0QixHQUFzQjs7QUFDN0IsY0FBSSxJQUFJLElBQUosS0FBYSxVQUFqQixFQUE2QjtBQUMzQiw2QkFBaUIsSUFBSSxNQUFyQjtBQUNEO0FBQ0Y7QUFDRjtBQUNGO0FBQ0Y7O0FBRUQsV0FBUyxtQkFBVCxDQUE2QixJQUE3QixFQUFtQztBQUNqQyxRQUFNLFFBQVEsUUFBUSxRQUFSLEVBQWQ7O0FBRUEsUUFBSSxLQUFLLFdBQUwsQ0FBaUIsSUFBckIsRUFBMkI7QUFDekIsK0JBQXlCLEtBQXpCLEVBQWdDLEtBQUssV0FBTCxDQUFpQixJQUFqRDtBQUNEO0FBQ0Y7O0FBRUQsV0FBUyxpQkFBVCxDQUEyQixJQUEzQixFQUFpQztBQUMvQixRQUFNLFFBQVEsUUFBUSxRQUFSLEVBQWQ7O0FBRUEsUUFBSSxLQUFLLFdBQVQsRUFBdUI7QUFDckIsdUJBQWlCLEtBQUssV0FBdEI7QUFDRCxLQUZELE1BRU8sSUFBSSxDQUFDLEtBQUssTUFBVixFQUFrQjtBQUN2Qiw0QkFBc0IsS0FBSyxVQUEzQix5SEFBdUM7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBLFlBQTlCLFNBQThCOztBQUNyQyxpQ0FBeUIsS0FBekIsRUFBZ0MsVUFBVSxLQUFWLENBQWdCLElBQWhEO0FBQ0Q7QUFDRjtBQUNGOztBQUVELFNBQU87QUFDTCxnQ0FBNEIsbUJBRHZCO0FBRUwsOEJBQTBCO0FBRnJCLEdBQVA7QUFJRCxDQTVDRCIsImZpbGUiOiJydWxlcy9uby1tdXRhYmxlLWV4cG9ydHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gIGZ1bmN0aW9uIGNoZWNrRGVjbGFyYXRpb24obm9kZSkge1xuICAgIGNvbnN0IHtraW5kfSA9IG5vZGVcbiAgICBpZiAoa2luZCA9PT0gJ3ZhcicgfHwga2luZCA9PT0gJ2xldCcpIHtcbiAgICAgIGNvbnRleHQucmVwb3J0KG5vZGUsIGBFeHBvcnRpbmcgbXV0YWJsZSAnJHtraW5kfScgYmluZGluZywgdXNlICdjb25zdCcgaW5zdGVhZC5gKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrRGVjbGFyYXRpb25zSW5TY29wZSh7dmFyaWFibGVzfSwgbmFtZSkge1xuICAgIGZvciAobGV0IHZhcmlhYmxlIG9mIHZhcmlhYmxlcykge1xuICAgICAgaWYgKHZhcmlhYmxlLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgZm9yIChsZXQgZGVmIG9mIHZhcmlhYmxlLmRlZnMpIHtcbiAgICAgICAgICBpZiAoZGVmLnR5cGUgPT09ICdWYXJpYWJsZScpIHtcbiAgICAgICAgICAgIGNoZWNrRGVjbGFyYXRpb24oZGVmLnBhcmVudClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVFeHBvcnREZWZhdWx0KG5vZGUpIHtcbiAgICBjb25zdCBzY29wZSA9IGNvbnRleHQuZ2V0U2NvcGUoKVxuXG4gICAgaWYgKG5vZGUuZGVjbGFyYXRpb24ubmFtZSkge1xuICAgICAgY2hlY2tEZWNsYXJhdGlvbnNJblNjb3BlKHNjb3BlLCBub2RlLmRlY2xhcmF0aW9uLm5hbWUpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlRXhwb3J0TmFtZWQobm9kZSkge1xuICAgIGNvbnN0IHNjb3BlID0gY29udGV4dC5nZXRTY29wZSgpXG5cbiAgICBpZiAobm9kZS5kZWNsYXJhdGlvbikgIHtcbiAgICAgIGNoZWNrRGVjbGFyYXRpb24obm9kZS5kZWNsYXJhdGlvbilcbiAgICB9IGVsc2UgaWYgKCFub2RlLnNvdXJjZSkge1xuICAgICAgZm9yIChsZXQgc3BlY2lmaWVyIG9mIG5vZGUuc3BlY2lmaWVycykge1xuICAgICAgICBjaGVja0RlY2xhcmF0aW9uc0luU2NvcGUoc2NvcGUsIHNwZWNpZmllci5sb2NhbC5uYW1lKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgJ0V4cG9ydERlZmF1bHREZWNsYXJhdGlvbic6IGhhbmRsZUV4cG9ydERlZmF1bHQsXG4gICAgJ0V4cG9ydE5hbWVkRGVjbGFyYXRpb24nOiBoYW5kbGVFeHBvcnROYW1lZCxcbiAgfVxufVxuIl19