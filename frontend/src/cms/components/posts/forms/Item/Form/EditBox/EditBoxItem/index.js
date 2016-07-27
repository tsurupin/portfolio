import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import imageLogo from './image-icon.png';
import textLogo from './text-icon.png';
import twitterLogo from './twitter-icon.png';
import styles from './styles';

const propTypes = {
  name: PropTypes.string.isRequired,
  handleAddItem: PropTypes.func.isRequired,
};

function getImage(name) {
  switch (name) {
    case 'ItemTwitter':
      return twitterLogo;
    case 'ItemText':
      return textLogo;
    case 'ItemImage':
      return imageLogo;
    default:
      return;
  }
}

function EditBoxItem({ name, handleAddItem }) {
  return (
    <li className={styles.root}>
      <IconButton
        className={styles.button}
        onClick={() => handleAddItem(name)}
        disableTouchRipple
      >
        <img src={getImage(name)} alt={name} className={styles.icon} />
      </IconButton>
    </li>
  );
}

EditBoxItem.propTypes = propTypes;

export default EditBoxItem;
