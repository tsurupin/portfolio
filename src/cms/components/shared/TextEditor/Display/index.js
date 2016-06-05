import React, { Component, PropTypes } from 'react';
import {
  Editor,
  EditorState,
  convertFromRaw
} from 'draft-js';

import { getBlockStyle } from '../shared/utilities';
import { decorator } from '../shared/Decorator/index';
import styles from './styles.scss';

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

