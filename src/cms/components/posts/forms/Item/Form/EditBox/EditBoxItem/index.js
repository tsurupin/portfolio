import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import styles from './styles.scss';
import imageLogo from './image-icon.png';
import textLogo from './text-icon.png';
import twitterLogo from './twitter-icon.png';

const propTypes = {
  name: PropTypes.string.isRequired,
  handleAddItem: PropTypes.func.isRequired
};

class EditBoxItem extends Component {

  constructor(props) {
    super(props);
    
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  handleAddItem() {
    this.props.handleAddItem(this.props.name);
  }

  get image() {
    switch(this.props.name) {
      case "ItemTwitter":
        return twitterLogo;
      case "ItemText":
        return textLogo;
      case "ItemImage":
        return imageLogo
    }
  }

  render() {
    return (
      <li className={styles.root}>
        <IconButton
          className={styles.button}
          onClick={this.handleAddItem}
        >
          <img src={this.image} className={styles.icon}/>
        </IconButton>
      </li>
    );
  }
}

EditBoxItem.propTypes = propTypes;

export default EditBoxItem;
