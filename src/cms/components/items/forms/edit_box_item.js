import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/lib/icon-button';
export default class ItemEditBoxItem extends Component {

  constructor(props) {
    super(...props);
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  handleAddItem() {
    this.props.handleAddItem(this.props.name);
  }

  render() {
    return (
      <li className="item-edit-box-item">
        <IconButton
          className="item-edit-box-item__button"
          tooltip={this.props.label}
          tooltipPosition="bottom-center"
          onClick={this.handleAddItem}>
          <img 
            src={this.props.image}
            className="item-edit-box-item__icon"
          />
        </IconButton>
      </li>
    );
  }
}

ItemEditBoxItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleAddItem: PropTypes.func.isRequired
};
