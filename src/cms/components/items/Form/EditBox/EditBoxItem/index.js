import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/lib/icon-button';
import styles from './styles.scss';

export default class EditBoxItem extends Component {

  constructor(props) {
    super(...props);
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  handleAddItem() {
    this.props.handleAddItem(this.props.name);
  }

  render() {
    return (
      <li className={styles.root}>
        <IconButton
          className={styles.button}
          tooltip={this.props.label}
          tooltipPosition="bottom-center"
          onClick={this.handleAddItem}
        >
          <img src={this.props.image} className={styles.icon}/>
        </IconButton>
      </li>
    );
  }
}

EditBoxItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleAddItem: PropTypes.func.isRequired
};
