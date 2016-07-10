'use strict';

exports.__esModule = true;
var _slice = Array.prototype.slice;
exports['default'] = DragSource;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _lodashIsPlainObject = require('lodash/isPlainObject');

var _lodashIsPlainObject2 = _interopRequireDefault(_lodashIsPlainObject);

var _utilsCheckDecoratorArguments = require('./utils/checkDecoratorArguments');

var _utilsCheckDecoratorArguments2 = _interopRequireDefault(_utilsCheckDecoratorArguments);

var _decorateHandler = require('./decorateHandler');

var _decorateHandler2 = _interopRequireDefault(_decorateHandler);

var _registerSource = require('./registerSource');

var _registerSource2 = _interopRequireDefault(_registerSource);

var _createSourceFactory = require('./createSourceFactory');

var _createSourceFactory2 = _interopRequireDefault(_createSourceFactory);

var _createSourceMonitor = require('./createSourceMonitor');

var _createSourceMonitor2 = _interopRequireDefault(_createSourceMonitor);

var _createSourceConnector = require('./createSourceConnector');

var _createSourceConnector2 = _interopRequireDefault(_createSourceConnector);

var _utilsIsValidType = require('./utils/isValidType');

var _utilsIsValidType2 = _interopRequireDefault(_utilsIsValidType);

function DragSource(type, spec, collect) {
  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

  _utilsCheckDecoratorArguments2['default'].apply(undefined, ['DragSource', 'type, spec, collect[, options]'].concat(_slice.call(arguments)));
  var getType = type;
  if (typeof type !== 'function') {
    _invariant2['default'](_utilsIsValidType2['default'](type), 'Expected "type" provided as the first argument to DragSource to be ' + 'a string, or a function that returns a string given the current props. ' + 'Instead, received %s. ' + 'Read more: http://gaearon.github.io/react-dnd/docs-drag-source.html', type);
    getType = function () {
      return type;
    };
  }
  _invariant2['default'](_lodashIsPlainObject2['default'](spec), 'Expected "spec" provided as the second argument to DragSource to be ' + 'a plain object. Instead, received %s. ' + 'Read more: http://gaearon.github.io/react-dnd/docs-drag-source.html', spec);
  var createSource = _createSourceFactory2['default'](spec);
  _invariant2['default'](typeof collect === 'function', 'Expected "collect" provided as the third argument to DragSource to be ' + 'a function that returns a plain object of props to inject. ' + 'Instead, received %s. ' + 'Read more: http://gaearon.github.io/react-dnd/docs-drag-source.html', collect);
  _invariant2['default'](_lodashIsPlainObject2['default'](options), 'Expected "options" provided as the fourth argument to DragSource to be ' + 'a plain object when specified. ' + 'Instead, received %s. ' + 'Read more: http://gaearon.github.io/react-dnd/docs-drag-source.html', collect);

  return function decorateSource(DecoratedComponent) {
    return _decorateHandler2['default']({
      connectBackend: function connectBackend(backend, sourceId) {
        return backend.connectDragSource(sourceId);
      },
      containerDisplayName: 'DragSource',
      createHandler: createSource,
      registerHandler: _registerSource2['default'],
      createMonitor: _createSourceMonitor2['default'],
      createConnector: _createSourceConnector2['default'],
      DecoratedComponent: DecoratedComponent,
      getType: getType,
      collect: collect,
      options: options
    });
  };
}

module.exports = exports['default'];