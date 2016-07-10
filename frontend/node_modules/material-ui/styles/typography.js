'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colors = require('./colors');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Typography = function Typography() {
  _classCallCheck(this, Typography);

  // text colors
  this.textFullBlack = _colors.fullBlack;
  this.textDarkBlack = _colors.darkBlack;
  this.textLightBlack = _colors.lightBlack;
  this.textMinBlack = _colors.minBlack;
  this.textFullWhite = _colors.fullWhite;
  this.textDarkWhite = _colors.darkWhite;
  this.textLightWhite = _colors.lightWhite;

  // font weight
  this.fontWeightLight = 300;
  this.fontWeightNormal = 400;
  this.fontWeightMedium = 500;

  this.fontStyleButtonFontSize = 14;
};

exports.default = new Typography();