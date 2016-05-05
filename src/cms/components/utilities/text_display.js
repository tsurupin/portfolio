import React, { Component, PropTypes } from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createLinkifyPlugin from 'draft-js-linkify-plugin';

const linkifyPlugin = createLinkifyPlugin({ target: '_blank' });
const plugins = [linkifyPlugin];
export default class TextDisplay extends Component {
  constructor(props) {
    super(...props);
    
    const blocks = convertFromRaw(JSON.parse(props.description));
    this.state = { editorState: EditorState.createWithContent(blocks) };
  }

  render() {
    return (
      <div className="RichEditor-root">
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={this.state.editorState}
            readOnly={true}
            plugins={plugins}
          />
      </div>
    )

  }
}

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};
function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

