'use strict';

exports.__esModule = true;
exports['default'] = createSourceFactory;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _lodashIsPlainObject = require('lodash/isPlainObject');

var _lodashIsPlainObject2 = _interopRequireDefault(_lodashIsPlainObject);

var ALLOWED_SPEC_METHODS = ['canDrag', 'beginDrag', 'canDrag', 'isDragging', 'endDrag'];
var REQUIRED_SPEC_METHODS = ['beginDrag'];

function createSourceFactory(spec) {
  Object.keys(spec).forEach(function (key) {
    _invariant2['default'](ALLOWED_SPEC_METHODS.indexOf(key) > -1, 'Expected the drag source specification to only have ' + 'some of the following keys: %s. ' + 'Instead received a specification with an unexpected "%s" key. ' + 'Read more: http://gaearon.github.io/react-dnd/docs-drag-source.html', ALLOWED_SPEC_METHODS.join(', '), key);
    _invariant2['default'](typeof spec[key] === 'function', 'Expected %s in the drag source specification to be a function. ' + 'Instead received a specification with %s: %s. ' + 'Read more: http://gaearon.github.io/react-dnd/docs-drag-source.html', key, key, spec[key]);
  });
  REQUIRED_SPEC_METHODS.forEach(function (key) {
    _invariant2['default'](typeof spec[key] === 'function', 'Expected %s in the drag source specification to be a function. ' + 'Instead received a specification with %s: %s. ' + 'Read more: http://gaearon.github.io/react-dnd/docs-drag-source.html', key, key, spec[key]);
  });

  var Source = (function () {
    function Source(monitor) {
      _classCallCheck(this, Source);

      this.monitor = monitor;
      this.props = null;
      this.component = null;
    }

    Source.prototype.receiveProps = function receiveProps(props) {
      this.props = props;
    };

    Source.prototype.receiveComponent = function receiveComponent(component) {
      this.component = component;
    };

    Source.prototype.canDrag = function canDrag() {
      if (!spec.canDrag) {
        return true;
      }

      return spec.canDrag(this.props, this.monitor);
    };

    Source.prototype.isDragging = function isDragging(globalMonitor, sourceId) {
      if (!spec.isDragging) {
        return sourceId === globalMonitor.getSourceId();
      }

      return spec.isDragging(this.props, this.monitor);
    };

    Source.prototype.beginDrag = function beginDrag() {
      var item = spec.beginDrag(this.props, this.monitor, this.component);
      if (process.env.NODE_ENV !== 'production') {
        _invariant2['default'](_lodashIsPlainObject2['default'](item), 'beginDrag() must return a plain object that represents the dragged item. ' + 'Instead received %s. ' + 'Read more: http://gaearon.github.io/react-dnd/docs-drag-source.html', item);
      }
      return item;
    };

    Source.prototype.endDrag = function endDrag() {
      if (!spec.endDrag) {
        return;
      }

      spec.endDrag(this.props, this.monitor, this.component);
    };

    return Source;
  })();

  return function createSource(monitor) {
    return new Source(monitor);
  };
}

module.exports = exports['default'];