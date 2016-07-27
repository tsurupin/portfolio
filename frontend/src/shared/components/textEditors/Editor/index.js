import React, { Component, PropTypes } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
  Entity,
} from 'draft-js';

import { getBlockStyle } from './../shared/utilities';
import { decorator } from '../shared/Decorator/index';
import { BlockStyleControls } from '../shared/BlockStyleControl/index';
import { InlineStyleControls } from '../shared/InlineStyleControl/index';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import inlineStyles from 'shared/styles/MaterialUI/index';
import styles from '../shared/styles';


const propTypes = {
  value: PropTypes.string,
  handleUpdate: PropTypes.func.isRequired,
};

class TextEditor extends Component {

  constructor(props) {
    super(props);

    if (props.value) {
      const blocks = convertFromRaw(JSON.parse(props.value));
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

  componentWillReceiveProps(nextProps) {
    if (!this.props.value && nextProps.value) {
      const blocks = convertFromRaw(JSON.parse(nextProps.value));
      this.setState({ editorState: EditorState.createWithContent(blocks, decorator) });
    } else if (!nextProps.value) {
      this.state = { editorState: EditorState.createEmpty(decorator) };
    }
  }

  handlePromptForLink(e) {
    e.preventDefault();
    const { editorState } = this.state;
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
    const { editorState, urlValue } = this.state;
    const entityKey = Entity.create('LINK', 'MUTABLE', { url: urlValue });
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
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null),
      });
    }
  }

  handleUpdate() {
    const description = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    this.props.handleUpdate(description);
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
      return (
        <div className={styles.urlInputBox}>
          <TextField
            onChange={this.handleChangeURL}
            ref="url"
            hintText="Enter Link URL"
            style={inlineStyles.urlInput}
            value={this.state.urlValue}
            onKeyDown={this.handleInputKeyDown}
          />
          <IconButton onMouseDown={this.handleConfirmLink}>
            <ContentAddCircle />
          </IconButton>
        </div>
      );
    }
  }

  render() {
    const { editorState } = this.state;

    return (
      <div className={styles.root} onBlur={this.handleUpdate} >
        <div className={styles.controls}>
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.handleToggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.handleToggleInlineStyle}
            onRemoveLink={this.handleRemoveLink}
            onPromptForLink={this.handlePromptForLink}
          />
          {this.renderURLField()}
          <Divider />
        </div>
        <div className={styles.editor} onClick={this.handleFocus}>
          <Editor
            onChange={this.handleChange}
            blockStyleFn={getBlockStyle}
            editorState={editorState}
            spellCheck
            placeholder="Enter Text"
            ref="editor"
            handleKeyCommand={this.handleKeyCommand}
          />
        </div>
      </div>
    );
  }
}

TextEditor.propTypes = propTypes;

export default TextEditor;
