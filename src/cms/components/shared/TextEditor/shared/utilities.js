import styles from './styles.scss';

export const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 10
  }
};

export function getBlockStyle(block) {
  console.log(block.getType());
  switch (block.getType()) {
    case 'header-one':return styles.h1;
    case 'header-two':return styles.h2;
    case 'header-three':return styles.caption;
    case 'blockquote': return styles.blockquote;
    case 'code-block': return styles.code;
    default: return styles.text;
  }
}
