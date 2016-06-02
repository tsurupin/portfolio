import React, { Component, PropTypes } from 'react';
import {
  Editor,
  EditorState,
  convertFromRaw,
  Entity
} from 'draft-js';

import { styleMap, getBlockStyle } from '../shared/utilities';
import { decorator } from '../shared/Decorator/index';
import styles from '../shared/styles.scss';

class TextDisplay extends Component {
  constructor(props) {
    super(props);
    
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

TextDisplay.propTypes = {
  description: PropTypes.string.isRequired
};

export default TextDisplay

