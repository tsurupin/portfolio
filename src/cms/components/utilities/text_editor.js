import React, { Component, PropTypes } from 'react';
import { EditorState, RichUtils, convertFromRaw, convertToRaw, Entity, CompositeDecorator} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createLinkifyPlugin from 'draft-js-linkify-plugin';

const linkifyPlugin = createLinkifyPlugin({ target: '_blank' });
const plugins = [linkifyPlugin];

export default class TextEditor extends Component {
  constructor(props) {
    console.log(props)
    super(...props);

    if(props.description) {
      const blocks = convertFromRaw(JSON.parse(props.description));
      this.state = { editorState: EditorState.createWithContent(blocks) };
    } else {
      this.state = { editorState: EditorState.createEmpty() };
    }

    // const decorator = new CompositeDecorator([
    //   {
    //     strategy: findLinkEntities,
    //     component: Link,
    //   },
    // ]);

    this.focus = () => this.refs.editor.focus();
    this.toggleInlineStyle = (style) => this.handleToggleInlineStyle(style);
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.toggleBlockType = (type) => this.handleToggleBlockType(type);
    this.handleUpdateText = this.handleUpdateText.bind(this);
  }

  handleUpdateText() {
    const raw = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    console.log(raw);
    this.props.handleUpdateText(raw)
  }
  handleToggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }


  handleToggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  render() {
    const {editorState} = this.state;
    let className = 'RichEditor-editor';
    let contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div className={className} onClick={this.focus}>
          <Editor
            onChange={this.onChange}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={this.state.editorState}
            placeHolder="This is the editor"
            spellCheck={true}
            ref="editor"
            plugins={plugins}
            handleKeyCommand={this.handleKeyCommand}
          />
        </div>
        <div>
          <button onClick={this.handleUpdateText}>Update</button>
        </div>
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


class StyleButton extends Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
              {this.props.label}
            </span>
    );
  }
}

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];

const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];

const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};