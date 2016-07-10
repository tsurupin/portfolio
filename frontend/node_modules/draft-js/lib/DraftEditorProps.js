/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditorProps
 * 
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

/**
 * The two most critical props are `editorState` and `onChange`.
 *
 * The `editorState` prop defines the entire state of the editor, while the
 * `onChange` prop is the method in which all state changes are propagated
 * upward to higher-level components.
 *
 * These props are analagous to `value` and `onChange` in controlled React
 * text inputs.
 */

// Specify whether text alignment should be forced in a direction
// regardless of input characters.

// For a given `ContentBlock` object, return an object that specifies
// a custom block component and/or props. If no object is returned,
// the default `TextEditorBlock` is used.

// Function that returns a cx map corresponding to block-level styles.

// A function that accepts a synthetic key event and returns
// the matching DraftEditorCommand constant, or null if no command should
// be invoked.

// Set whether the `DraftEditor` component should be editable. Useful for
// temporarily disabling edit behavior or allowing `DraftEditor` rendering
// to be used for consumption purposes.

// Note: spellcheck is always disabled for IE. If enabled in Safari, OSX
// autocorrect is enabled as well.

// Set whether to remove all style information from pasted content. If your
// use case should not have any block or inline styles, it is recommended
// that you set this to `true`.

/**
 * Cancelable event handlers, handled from the top level down. A handler
 * that returns true will be the last handler to execute for that event.
 */

// Useful for managing special behavior for pressing the `Return` key. E.g.
// removing the style from an empty list item.

// Map a key command string provided by your key binding function to a
// specified behavior.

// Handle intended text insertion before the insertion occurs. This may be
// useful in cases where the user has entered characters that you would like
// to trigger some special behavior. E.g. immediately converting `:)` to an
// emoji Unicode character, or replacing ASCII quote characters with smart
// quotes.

// Handle dropped files

// Handle other drops to prevent default text movement/insertion behaviour

/**
 * Non-cancelable event triggers.
 */

// Provide a map of inline style names corresponding to CSS style objects
// that will be rendered for matching ranges.

// Provide a map of block rendering configurations. Each block type maps to
// an element tag and am optional react element wrapper. This configuration
// is used for both rendering and paste processing.