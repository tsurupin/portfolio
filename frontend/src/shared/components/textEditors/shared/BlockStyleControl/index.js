import React, { PropTypes } from 'react';
import StyleButton from '../StyleButton/index';
import styles from './styles';

export const BLOCK_TYPES = [
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'Code', style: 'code-block' },
  { label: 'Caption', style: 'header-four' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'UL', style: 'unordered-list-item' },
];

export const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className={styles.root}>
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

