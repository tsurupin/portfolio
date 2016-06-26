import React, { Component, PropTypes } from 'react';
import Display from './Display/index';
import Form from './Form/index';


const propTypes = {
  sortRank: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  totalCount: PropTypes.number.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  handleMoveItem: PropTypes.func.isRequired,
  handleUpdateItem: PropTypes.func.isRequired
};

class Item extends Component {

  renderComponent() {
    if (this.props.item.editing) {
      return (
        <Form
          sortRank={this.props.sortRank}
          item={this.props.item}
          handleDeleteItem={this.props.handleDeleteItem}
          handleUpdateItem={this.props.handleUpdateItem}
        />
      );
    }

    return (
      <Display
        sortRank={this.props.sortRank}
        item={this.props.item}
        totalCount={this.props.totalCount}
        handleMoveItem={this.props.handleMoveItem}
        handleDeleteItem={this.props.handleDeleteItem}
        handleUpdateItem={this.props.handleUpdateItem}
      />
    );
  }

  render() {
    return <li>{this.renderComponent()}</li>;
  }
}


Item.propTypes = propTypes;

export default Item;