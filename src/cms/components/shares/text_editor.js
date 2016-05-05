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

import RaisedButton from 'material-ui/lib/raised-button';
import ContentAddCircle from 'material-ui/lib/svg-icons/content/add-circle';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import IconButton from 'material-ui/lib/icon-button';
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
        inputtable: false,
        urlValue: '',
      };
    } else {
      this.state = {
        editorState: EditorState.createEmpty(decorator),
        inputtable: false,
        urlValue: '',
      };
    }


    this.handleFocus = () => this.refs.editor.focus();
    this.handleToggleInlineStyle = this.handleToggleInlineStyle.bind(this);
    this.handleToggleBlockType = this.handleToggleBlockType.bind(this);
    this.handleChange = (editorState) => this.setState({ editorState });
    this.handleChangeURL = (e) => this.setState({ urlValue: e.target.value });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handlePromptForLink = this.handlePromptForLink.bind(this);
    this.handleConfirmLink = this.handleConfirmLink.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleRemoveLink = this.handleRemoveLink.bind(this);
  }

  handlePromptForLink(e) {
    e.preventDefault();
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        inputtable: true,
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
      inputtable: false,
      urlValue: '',
    }, () => {
      setTimeout(() => this.refs.editor.focus(), 0);
    });
  }

  handleInputKeyDown(e) {
    if (e.which === 13) {
      this.handleConfirmLink(e);
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

  handleUpdate() {
    const raw = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    console.log(raw);
    this.props.handleUpdate(raw)
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
  renderURLField() {
      if (this.state.inputtable) {
        return(
          <div style={styles.urlInputContainer}>
            <TextField
              onChange={this.handleChangeURL}
              ref="url"
              hintText='Enter Link URL'
              style={styles.urlInput}
              value={this.state.urlValue}
              onKeyDown={this.handleInputKeyDown}
            />
              <IconButton onMouseDown={this.handleConfirmLink}>
                <ContentAddCircle />
              </IconButton>
          </div>
        )
      }
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
          onToggle={this.handleToggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.handleToggleInlineStyle}
        />
        <FlatButton label="Add Link" onClick={this.handlePromptForLink} />
        <FlatButton label="Remove Link" onClick={this.handleRemoveLink} />
        {this.renderURLField()}
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
        <div className="text-editor__action-box" style={{textAlign: 'right'}}>
          {this.props.cancelButton}
          <RaisedButton
            className='text-editor__button'
            label='Save'
            labelPosition="after"
            icon={<ContentAddCircle />}
            style={{marginLeft: 12}}
            onClick={this.handleUpdate}
          />
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

