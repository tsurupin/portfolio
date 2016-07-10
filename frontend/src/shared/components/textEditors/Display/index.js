import React, { Component, PropTypes } from 'react';
import {
  Editor,
  EditorState,
  convertFromRaw,
} from 'draft-js';

import { getBlockStyle } from '../shared/utilities';
import { decorator } from '../shared/Decorator/index';
import styles from './styles';


const propTypes = {
  description: PropTypes.string,
};

class TextDisplay extends Component {
  constructor(props) {
    super(props);

    if (props.description) {
      const blocks = convertFromRaw(JSON.parse(props.description));
      this.state = { editorState: EditorState.createWithContent(blocks, decorator) };
    } else {
      this.state = {
        editorState: EditorState.createEmpty(decorator),
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.description && nextProps.description) {
      const blocks = convertFromRaw(JSON.parse(nextProps.description));
      this.setState({ editorState: EditorState.createWithContent(blocks, decorator) });
    }
  }

  render() {
    return (
      <div className={styles.root}>
        <Editor
          blockStyleFn={getBlockStyle}
          editorState={this.state.editorState}
          readOnly
        />
      </div>
    );
  }
}

TextDisplay.propTypes = propTypes;

export default TextDisplay;

