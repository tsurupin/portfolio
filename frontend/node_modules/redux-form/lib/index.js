'use strict';

exports.__esModule = true;
exports.untouchWithKey = exports.untouch = exports.touchWithKey = exports.touch = exports.swapArrayValues = exports.stopSubmit = exports.stopAsyncValidation = exports.startSubmit = exports.startAsyncValidation = exports.reset = exports.propTypes = exports.initializeWithKey = exports.initialize = exports.getValues = exports.removeArrayValue = exports.reduxForm = exports.reducer = exports.focus = exports.destroy = exports.changeWithKey = exports.change = exports.blur = exports.autofillWithKey = exports.autofill = exports.addArrayValue = exports.actionTypes = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _createAll2 = require('./createAll');

var _createAll3 = _interopRequireDefault(_createAll2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isNative = typeof window !== 'undefined' && window.navigator && window.navigator.product && window.navigator.product === 'ReactNative';

var _createAll = (0, _createAll3.default)(isNative, _react2.default, _reactRedux.connect);

var actionTypes = _createAll.actionTypes;
var addArrayValue = _createAll.addArrayValue;
var autofill = _createAll.autofill;
var autofillWithKey = _createAll.autofillWithKey;
var blur = _createAll.blur;
var change = _createAll.change;
var changeWithKey = _createAll.changeWithKey;
var destroy = _createAll.destroy;
var focus = _createAll.focus;
var reducer = _createAll.reducer;
var reduxForm = _createAll.reduxForm;
var removeArrayValue = _createAll.removeArrayValue;
var getValues = _createAll.getValues;
var initialize = _createAll.initialize;
var initializeWithKey = _createAll.initializeWithKey;
var propTypes = _createAll.propTypes;
var reset = _createAll.reset;
var startAsyncValidation = _createAll.startAsyncValidation;
var startSubmit = _createAll.startSubmit;
var stopAsyncValidation = _createAll.stopAsyncValidation;
var stopSubmit = _createAll.stopSubmit;
var swapArrayValues = _createAll.swapArrayValues;
var touch = _createAll.touch;
var touchWithKey = _createAll.touchWithKey;
var untouch = _createAll.untouch;
var untouchWithKey = _createAll.untouchWithKey;
exports.actionTypes = actionTypes;
exports.addArrayValue = addArrayValue;
exports.autofill = autofill;
exports.autofillWithKey = autofillWithKey;
exports.blur = blur;
exports.change = change;
exports.changeWithKey = changeWithKey;
exports.destroy = destroy;
exports.focus = focus;
exports.reducer = reducer;
exports.reduxForm = reduxForm;
exports.removeArrayValue = removeArrayValue;
exports.getValues = getValues;
exports.initialize = initialize;
exports.initializeWithKey = initializeWithKey;
exports.propTypes = propTypes;
exports.reset = reset;
exports.startAsyncValidation = startAsyncValidation;
exports.startSubmit = startSubmit;
exports.stopAsyncValidation = stopAsyncValidation;
exports.stopSubmit = stopSubmit;
exports.swapArrayValues = swapArrayValues;
exports.touch = touch;
exports.touchWithKey = touchWithKey;
exports.untouch = untouch;
exports.untouchWithKey = untouchWithKey;