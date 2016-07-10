/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftModifier
 * @typechecks
 * 
 */

/**
 * `DraftModifier` provides a set of convenience methods that apply
 * modifications to a `ContentState` object based on a target `SelectionState`.
 *
 * Any change to a `ContentState` should be decomposable into a series of
 * transaction functions that apply the required changes and return output
 * `ContentState` objects.
 *
 * These functions encapsulate some of the most common transaction sequences.
 */
'use strict';

var CharacterMetadata = require('./CharacterMetadata');
var ContentStateInlineStyle = require('./ContentStateInlineStyle');

var _require = require('immutable');

var OrderedSet = _require.OrderedSet;

var applyEntityToContentState = require('./applyEntityToContentState');
var getCharacterRemovalRange = require('./getCharacterRemovalRange');
var getContentStateFragment = require('./getContentStateFragment');
var insertFragmentIntoContentState = require('./insertFragmentIntoContentState');
var insertTextIntoContentState = require('./insertTextIntoContentState');
var invariant = require('fbjs/lib/invariant');
var removeEntitiesAtEdges = require('./removeEntitiesAtEdges');
var removeRangeFromContentState = require('./removeRangeFromContentState');
var setBlockTypeForContentState = require('./setBlockTypeForContentState');
var splitBlockInContentState = require('./splitBlockInContentState');

var DraftModifier = {
  replaceText: function replaceText(contentState, rangeToReplace, text, inlineStyle, entityKey) {
    var withoutEntities = removeEntitiesAtEdges(contentState, rangeToReplace);
    var withoutText = removeRangeFromContentState(withoutEntities, rangeToReplace);

    var character = CharacterMetadata.create({
      style: inlineStyle || OrderedSet(),
      entity: entityKey || null
    });

    return insertTextIntoContentState(withoutText, withoutText.getSelectionAfter(), text, character);
  },

  insertText: function insertText(contentState, targetRange, text, inlineStyle, entityKey) {
    !targetRange.isCollapsed() ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Target range must be collapsed for `insertText`.') : invariant(false) : undefined;
    return DraftModifier.replaceText(contentState, targetRange, text, inlineStyle, entityKey);
  },

  moveText: function moveText(contentState, removalRange, targetRange) {
    var movedFragment = getContentStateFragment(contentState, removalRange);

    var afterRemoval = DraftModifier.removeRange(contentState, removalRange, 'backward');

    return DraftModifier.replaceWithFragment(afterRemoval, targetRange, movedFragment);
  },

  replaceWithFragment: function replaceWithFragment(contentState, targetRange, fragment) {
    var withoutEntities = removeEntitiesAtEdges(contentState, targetRange);
    var withoutText = removeRangeFromContentState(withoutEntities, targetRange);

    return insertFragmentIntoContentState(withoutText, withoutText.getSelectionAfter(), fragment);
  },

  removeRange: function removeRange(contentState, rangeToRemove, removalDirection) {
    // Check whether the selection state overlaps with a single entity.
    // If so, try to remove the appropriate substring of the entity text.
    if (rangeToRemove.getAnchorKey() === rangeToRemove.getFocusKey()) {
      var key = rangeToRemove.getAnchorKey();
      var startOffset = rangeToRemove.getStartOffset();
      var endOffset = rangeToRemove.getEndOffset();
      var block = contentState.getBlockForKey(key);

      var startEntity = block.getEntityAt(startOffset);
      var endEntity = block.getEntityAt(endOffset - 1);
      if (startEntity && startEntity === endEntity) {
        var adjustedRemovalRange = getCharacterRemovalRange(block, rangeToRemove, removalDirection);
        return removeRangeFromContentState(contentState, adjustedRemovalRange);
      }
    }

    var withoutEntities = removeEntitiesAtEdges(contentState, rangeToRemove);
    return removeRangeFromContentState(withoutEntities, rangeToRemove);
  },

  splitBlock: function splitBlock(contentState, selectionState) {
    var withoutEntities = removeEntitiesAtEdges(contentState, selectionState);
    var withoutText = removeRangeFromContentState(withoutEntities, selectionState);

    return splitBlockInContentState(withoutText, withoutText.getSelectionAfter());
  },

  applyInlineStyle: function applyInlineStyle(contentState, selectionState, inlineStyle) {
    return ContentStateInlineStyle.add(contentState, selectionState, inlineStyle);
  },

  removeInlineStyle: function removeInlineStyle(contentState, selectionState, inlineStyle) {
    return ContentStateInlineStyle.remove(contentState, selectionState, inlineStyle);
  },

  setBlockType: function setBlockType(contentState, selectionState, blockType) {
    return setBlockTypeForContentState(contentState, selectionState, blockType);
  },

  applyEntity: function applyEntity(contentState, selectionState, entityKey) {
    var withoutEntities = removeEntitiesAtEdges(contentState, selectionState);
    return applyEntityToContentState(withoutEntities, selectionState, entityKey);
  }
};

module.exports = DraftModifier;