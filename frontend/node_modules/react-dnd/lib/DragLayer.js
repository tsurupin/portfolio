'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slice = Array.prototype.slice;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = DragLayer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsShallowEqual = require('./utils/shallowEqual');

var _utilsShallowEqual2 = _interopRequireDefault(_utilsShallowEqual);

var _utilsShallowEqualScalar = require('./utils/shallowEqualScalar');

var _utilsShallowEqualScalar2 = _interopRequireDefault(_utilsShallowEqualScalar);

var _lodashIsPlainObject = require('lodash/isPlainObject');

var _lodashIsPlainObject2 = _interopRequireDefault(_lodashIsPlainObject);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _utilsCheckDecoratorArguments = require('./utils/checkDecoratorArguments');

var _utilsCheckDecoratorArguments2 = _interopRequireDefault(_utilsCheckDecoratorArguments);

function DragLayer(collect) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  _utilsCheckDecoratorArguments2['default'].apply(undefined, ['DragLayer', 'collect[, options]'].concat(_slice.call(arguments)));
  _invariant2['default'](typeof collect === 'function', 'Expected "collect" provided as the first argument to DragLayer ' + 'to be a function that collects props to inject into the component. ', 'Instead, received %s. ' + 'Read more: http://gaearon.github.io/react-dnd/docs-drag-layer.html', collect);
  _invariant2['default'](_lodashIsPlainObject2['default'](options), 'Expected "options" provided as the second argument to DragLayer to be ' + 'a plain object when specified. ' + 'Instead, received %s. ' + 'Read more: http://gaearon.github.io/react-dnd/docs-drag-layer.html', options);

  return function decorateLayer(DecoratedComponent) {
    var _options$arePropsEqual = options.arePropsEqual;
    var arePropsEqual = _options$arePropsEqual === undefined ? _utilsShallowEqualScalar2['default'] : _options$arePropsEqual;

    var displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';

    return (function (_Component) {
      _inherits(DragLayerContainer, _Component);

      DragLayerContainer.prototype.getDecoratedComponentInstance = function getDecoratedComponentInstance() {
        return this.refs.child;
      };

      DragLayerContainer.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
        return !arePropsEqual(nextProps, this.props) || !_utilsShallowEqual2['default'](nextState, this.state);
      };

      _createClass(DragLayerContainer, null, [{
        key: 'DecoratedComponent',
        value: DecoratedComponent,
        enumerable: true
      }, {
        key: 'displayName',
        value: 'DragLayer(' + displayName + ')',
        enumerable: true
      }, {
        key: 'contextTypes',
        value: {
          dragDropManager: _react.PropTypes.object.isRequired
        },
        enumerable: true
      }]);

      function DragLayerContainer(props, context) {
        _classCallCheck(this, DragLayerContainer);

        _Component.call(this, props);
        this.handleChange = this.handleChange.bind(this);

        this.manager = context.dragDropManager;
        _invariant2['default'](typeof this.manager === 'object', 'Could not find the drag and drop manager in the context of %s. ' + 'Make sure to wrap the top-level component of your app with DragDropContext. ' + 'Read more: http://gaearon.github.io/react-dnd/docs-troubleshooting.html#could-not-find-the-drag-and-drop-manager-in-the-context', displayName, displayName);

        this.state = this.getCurrentState();
      }

      DragLayerContainer.prototype.componentDidMount = function componentDidMount() {
        this.isCurrentlyMounted = true;

        var monitor = this.manager.getMonitor();
        this.unsubscribeFromOffsetChange = monitor.subscribeToOffsetChange(this.handleChange);
        this.unsubscribeFromStateChange = monitor.subscribeToStateChange(this.handleChange);

        this.handleChange();
      };

      DragLayerContainer.prototype.componentWillUnmount = function componentWillUnmount() {
        this.isCurrentlyMounted = false;

        this.unsubscribeFromOffsetChange();
        this.unsubscribeFromStateChange();
      };

      DragLayerContainer.prototype.handleChange = function handleChange() {
        if (!this.isCurrentlyMounted) {
          return;
        }

        var nextState = this.getCurrentState();
        if (!_utilsShallowEqual2['default'](nextState, this.state)) {
          this.setState(nextState);
        }
      };

      DragLayerContainer.prototype.getCurrentState = function getCurrentState() {
        var monitor = this.manager.getMonitor();
        return collect(monitor);
      };

      DragLayerContainer.prototype.render = function render() {
        return _react2['default'].createElement(DecoratedComponent, _extends({}, this.props, this.state, {
          ref: 'child' }));
      };

      return DragLayerContainer;
    })(_react.Component);
  };
}

module.exports = exports['default'];