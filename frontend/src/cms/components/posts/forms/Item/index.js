import React, { PropTypes } from 'react';
import Preview from './Preview/index';
import Form from './Form/index';


const propTypes = {
  sortRank: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  totalCount: PropTypes.number.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  handleMoveItem: PropTypes.func.isRequired,
  handleUpdateItem: PropTypes.func.isRequired,
};


function renderComponent(props) {
  if (props.item.editing) {
    return (
      <Form
        sortRank={props.sortRank}
        item={props.item}
        handleDeleteItem={props.handleDeleteItem}
        handleUpdateItem={props.handleUpdateItem}
      />
    );
  }

  return (
    <Preview
      sortRank={props.sortRank}
      item={props.item}
      totalCount={props.totalCount}
      handleMoveItem={props.handleMoveItem}
      handleDeleteItem={props.handleDeleteItem}
      handleUpdateItem={props.handleUpdateItem}
    />
  );
}

function Item(props) {
  return <li>{renderComponent(props)}</li>;
}


Item.propTypes = propTypes;

export default Item;
