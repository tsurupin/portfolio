/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditorCommand
 * 
 */

/*eslint-disable no-bitwise*/

'use strict';

/**
 * A set of editor commands that may be invoked by keyboard commands or UI
 * controls. These commands should map to operations that modify content or
 * selection state and update the editor state accordingly.
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});

/**
 * Self-explanatory.
 */

/**
 * Perform a forward deletion.
 */

/**
 * Perform a forward deletion to the next word boundary after the selection.
 */

/**
 * Perform a backward deletion.
 */

/**
 * Perform a backward deletion to the previous word boundary before the
 * selection.
 */

/**
 * Perform a backward deletion to the beginning of the current line.
 */

/**
 * Toggle styles. Commands may be intepreted to modify inline text ranges
 * or block types.
 */

/**
 * Split a block in two.
 */

/**
 * Self-explanatory.
 */

/**
 * Commands to support the "secondary" clipboard provided by certain
 * browsers and operating systems.
 */