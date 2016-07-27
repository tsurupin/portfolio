import React from 'react';
import StyleButton from '../StyleButton/index';
import styles from './styles';


const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
];

export const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className={styles.root}>
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
      <span
        className={styles.button}
        onMouseDown={props.onPromptForLink}
      >
        Add Link
      </span>
      <span
        className={styles.button}
        onMouseDown={props.onRemoveLink}
      >
        Remove Link
      </span>
    </div>
  );
};
