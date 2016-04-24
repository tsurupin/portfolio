import React, { Component, PropTypes } from 'react';
import PostItemCell from './post_item_cell';
import PostItemForm from './post_item_form';


export default class PostItemBlock extends Component {

    renderComponent() {
        if (this.props.item.editing) {
          return (
            <PostItemForm
                sortRank={this.props.sortRank}
                item={this.props.item}
                handleDeleteItem={this.props.handleDeleteItem}
                handleUpdateItem={this.props.handleUpdateItem}
            />
          );
        }

        return (
            <PostItemCell
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


PostItemBlock.propTypes = {
    sortRank: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    totalCount: PropTypes.number.isRequired,
    handleDeleteItem: PropTypes.func.isRequired,
    handleMoveItem: PropTypes.func.isRequired,
    handleUpdateItem: PropTypes.func.isRequired
};