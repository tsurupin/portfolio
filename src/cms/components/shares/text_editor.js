import React, { Component, PropTypes } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
  Entity,
  CompositeDecorator
} from 'draft-js';

import {
  styleMap,
  getBlockStyle,
  BLOCK_TYPES,
  INLINE_STYLES,
  findLinkEntities,
  Link,
  styles
} from './text_editor_utilities';

export default class TextEditor extends Component {
  constructor(props) {
    super(...props);

    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link,
      },
    ]);


    if(props.description) {
      const blocks = convertFromRaw(JSON.parse(props.description));
      this.state = {
        editorState: EditorState.createWithContent(blocks, decorator),
        showURLInput: false,
        urlValue: '',
      };
    } else {
      this.state = {
        editorState: EditorState.createEmpty(decorator),
        showURLInput: false,
        urlValue: '',
      };
    }


    this.handleFocus = () => this.refs.editor.focus();
    this.handleToggleInlineStyle = this.handleToggleInlineStyle.bind(this);
    this.handleToggleBlockType = this.handleToggleBlockType.bind(this);
    this.handleChange = (editorState) => this.setState({ editorState });
    this.handleChangeURL = (e) => this.setState({ urlValue: e.target.value });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleUpdateText = this.handleUpdateText.bind(this);
    this.handlePromptForLink = this.handlePromptForLink.bind(this);
    this.handleConfirmLink = this.handleConfirmLink.bind(this);
    this.handleInputKeyDown = this.hanldeInputKeyDown.bind(this);
    this.handleRemoveLink = this.handleRemoveLink.bind(this);
  }

  handlePromptForLink(e) {
    e.preventDefault();
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        showURLInput: true,
        urlValue: '',
      }, () => {
        setTimeout(() => this.refs.url.focus(), 0);
      });
    }
  }

  handleConfirmLink(e) {
    e.preventDefault();
    const {editorState, urlValue} = this.state;
    const entityKey = Entity.create('LINK', 'MUTABLE', {url: urlValue});
    this.setState({
      editorState: RichUtils.toggleLink(
        editorState,
        editorState.getSelection(),
        entityKey
      ),
      showURLInput: false,
      urlValue: '',
    }, () => {
      setTimeout(() => this.refs.editor.focus(), 0);
    });
  }

  hanldeInputKeyDown(e) {
    if (e.which === 13) {
      this._handleConfirmLink(e);
    }
  }

  handleRemoveLink(e) {
    e.preventDefault();
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null)
      });
    }
  }

  handleUpdateText() {
    const raw = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    console.log(raw);
    this.props.handleUpdateText(raw)
  }
  
  handleToggleBlockType(blockType) {
    this.handleChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }


  handleToggleInlineStyle(inlineStyle) {
    this.handleChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.handleChange(newState);
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

    let urlInput;
    if (this.state.showURLInput) {
      urlInput =
        <div style={styles.urlInputContainer}>
          <input
            onChange={this.handleChangeURL}
            ref="url"
            style={styles.urlInput}
            type="text"
            value={this.state.urlValue}
            onKeyDown={this.handleInputKeyDown}
          />
          <button onMouseDown={this.handleConfirmLink}>
            Confirm
          </button>
        </div>;
    }
    return (
      <div className="RichEditor-root">
        <div style={styles.buttons}>
          <button
            onClick={this.handlePromptForLink}
            style={{marginRight: 10}}>
            Add Link
          </button>
          <button onClick={this.handleRemoveLink}>
            Remove Link
          </button>
        </div>
        {urlInput}
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.handleToggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.handleToggleInlineStyle}
        />
        <div className={className} onClick={this.handleFocus}>
          <Editor
            onChange={this.handleChange}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={this.state.editorState}
            placeholder="This is the editor"
            spellCheck={true}
            ref="editor"
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

class StyleButton extends Component {
  constructor() {
    super();
    this.handleToggle =this.handleToggle.bind(this);
  }

  handleToggle(event) {
    event.preventDefault();
    this.props.onToggle(this.props.style);
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.handleToggle}>
        {this.props.label}
      </span>
    );
  }
}


const BlockStyleControls = (props) => {
  const { editorState } = props;
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

