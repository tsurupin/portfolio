/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ContentState
 * @typechecks
 * 
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BlockMapBuilder = require('./BlockMapBuilder');
var CharacterMetadata = require('./CharacterMetadata');
var ContentBlock = require('./ContentBlock');
var Immutable = require('immutable');
var SelectionState = require('./SelectionState');

var generateRandomKey = require('./generateRandomKey');
var sanitizeDraftText = require('./sanitizeDraftText');

var List = Immutable.List;
var Record = Immutable.Record;
var Repeat = Immutable.Repeat;

var defaultRecord = {
  blockMap: null,
  selectionBefore: null,
  selectionAfter: null
};

var ContentStateRecord = Record(defaultRecord);

var ContentState = (function (_ContentStateRecord) {
  _inherits(ContentState, _ContentStateRecord);

  function ContentState() {
    _classCallCheck(this, ContentState);

    _get(Object.getPrototypeOf(ContentState.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ContentState, [{
    key: 'getBlockMap',
    value: function getBlockMap() {
      return this.get('blockMap');
    }
  }, {
    key: 'getSelectionBefore',
    value: function getSelectionBefore() {
      return this.get('selectionBefore');
    }
  }, {
    key: 'getSelectionAfter',
    value: function getSelectionAfter() {
      return this.get('selectionAfter');
    }
  }, {
    key: 'getBlockForKey',
    value: function getBlockForKey(key) {
      var block = this.getBlockMap().get(key);
      return block;
    }
  }, {
    key: 'getKeyBefore',
    value: function getKeyBefore(key) {
      return this.getBlockMap().reverse().keySeq().skipUntil(function (v) {
        return v === key;
      }).skip(1).first();
    }
  }, {
    key: 'getKeyAfter',
    value: function getKeyAfter(key) {
      return this.getBlockMap().keySeq().skipUntil(function (v) {
        return v === key;
      }).skip(1).first();
    }
  }, {
    key: 'getBlockAfter',
    value: function getBlockAfter(key) {
      return this.getBlockMap().skipUntil(function (_, k) {
        return k === key;
      }).skip(1).first();
    }
  }, {
    key: 'getBlockBefore',
    value: function getBlockBefore(key) {
      return this.getBlockMap().reverse().skipUntil(function (_, k) {
        return k === key;
      }).skip(1).first();
    }
  }, {
    key: 'getBlocksAsArray',
    value: function getBlocksAsArray() {
      return this.getBlockMap().toArray();
    }
  }, {
    key: 'getFirstBlock',
    value: function getFirstBlock() {
      return this.getBlockMap().first();
    }
  }, {
    key: 'getLastBlock',
    value: function getLastBlock() {
      return this.getBlockMap().last();
    }
  }, {
    key: 'getPlainText',
    value: function getPlainText(delimiter) {
      return this.getBlockMap().map(function (block) {
        return block ? block.getText() : '';
      }).join(delimiter || '\n');
    }
  }, {
    key: 'hasText',
    value: function hasText() {
      var blockMap = this.getBlockMap();
      return blockMap.size > 1 || blockMap.first().getLength() > 0;
    }
  }], [{
    key: 'createFromBlockArray',
    value: function createFromBlockArray(blocks) {
      var blockMap = BlockMapBuilder.createFromArray(blocks);
      var selectionState = SelectionState.createEmpty(blockMap.first().getKey());
      return new ContentState({
        blockMap: blockMap,
        selectionBefore: selectionState,
        selectionAfter: selectionState
      });
    }
  }, {
    key: 'createFromText',
    value: function createFromText(text) {
      var delimiter = arguments.length <= 1 || arguments[1] === undefined ? /\r\n?|\n/g : arguments[1];

      var strings = text.split(delimiter);
      var blocks = strings.map(function (block) {
        block = sanitizeDraftText(block);
        return new ContentBlock({
          key: generateRandomKey(),
          text: block,
          type: 'unstyled',
          characterList: List(Repeat(CharacterMetadata.EMPTY, block.length))
        });
      });
      return ContentState.createFromBlockArray(blocks);
    }
  }]);

  return ContentState;
})(ContentStateRecord);

module.exports = ContentState;