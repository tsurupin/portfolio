import styles from './styles';

export function getBlockStyle(block) {
  switch (block.getType()) {
    case 'header-two':return styles.h2;
    case 'header-three':return styles.h3;
    // TODO: Using the original name as block raises an error, so need to figure out the cause.
    case 'header-four':return styles.caption;
    case 'blockquote': return styles.blockquote;
    case 'code-block': return styles.code;
    case 'ordered-list-item': return styles.orderedListItem;
    case 'unordered-list-item': return styles.unorderedListItem;
    default: return styles.text;
  }
}
