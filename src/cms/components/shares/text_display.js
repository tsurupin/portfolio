import React, { Component, PropTypes } from 'react';
import { 
  Editor, 
  EditorState, 
  convertFromRaw,
  Entity,
  CompositeDecorator
} from 'draft-js';

import {
  styleMap,
  getBlockStyle,
  BLOCK_TYPES,
  INLINE_STYLES,
  findLinkEntities,
  Link
} from './text_editor_utilities';


export default class TextDisplay extends Component {
  constructor(props) {
    super(...props);
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link
      }
    ]);

    const blocks = convertFromRaw(JSON.parse(props.description));
    this.state = { editorState: EditorState.createWithContent(blocks, decorator) };
  }

  render() {
    return (
      <div className="RichEditor-root">
        <div className="RichEditor-editor">
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={this.state.editorState}
            readOnly={true}
          />
        </div>
      </div>
    )
  }
}

