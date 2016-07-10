'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _getMuiTheme2 = require('../styles/getMuiTheme');

var _getMuiTheme3 = _interopRequireDefault(_getMuiTheme2);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  getMuiTheme: function getMuiTheme(baseTheme, muiTheme) {
    process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'ThemeManager is deprecated. please import getMuiTheme\n        directly from "material-ui/styles/getMuiTheme".\n        It will be removed with v0.16.0.') : void 0;
    return (0, _getMuiTheme3.default)(baseTheme, muiTheme);
  },
  modifyRawThemeSpacing: function modifyRawThemeSpacing(muiTheme, spacing) {
    process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'modifyRawThemeSpacing is deprecated. please use getMuiTheme\n        to modify your theme directly. http://www.material-ui.com/#/customization/themes.\n        It will be removed with v0.16.0.') : void 0;
    return (0, _getMuiTheme3.default)((0, _merge2.default)({}, muiTheme.baseTheme, { spacing: spacing }));
  },
  modifyRawThemePalette: function modifyRawThemePalette(muiTheme, palette) {
    process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'modifyRawThemePalette is deprecated. please use getMuiTheme\n        to modify your theme directly. http://www.material-ui.com/#/customization/themes.\n        It will be removed with v0.16.0.') : void 0;
    return (0, _getMuiTheme3.default)((0, _merge2.default)({}, muiTheme.baseTheme, { baseTheme: { palette: palette } }));
  },
  modifyRawThemeFontFamily: function modifyRawThemeFontFamily(muiTheme, fontFamily) {
    process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'modifyRawThemeFontFamily is deprecated. please use getMuiTheme\n        to modify your theme directly. http://www.material-ui.com/#/customization/themes.\n        It will be removed with v0.16.0.') : void 0;
    return (0, _getMuiTheme3.default)((0, _merge2.default)({}, muiTheme.baseTheme, { fontFamily: fontFamily }));
  }
};