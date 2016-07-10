/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RawDraftContentState
 * 
 */

/**
 * A type that represents a composed document as vanilla JavaScript objects,
 * with all styles and entities represented as ranges. Corresponding entity
 * objects are packaged as objects as well.
 *
 * This object is especially useful when sending the document state to the
 * server for storage, as its representation is more concise than our
 * immutable objects.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});