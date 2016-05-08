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
  findLinkEntities,
  Link
} from '../shared/utilities';
import styles from '../shared/styles.scss';

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
      <div className={styles.root}>
        <div className={styles.editor}>
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

