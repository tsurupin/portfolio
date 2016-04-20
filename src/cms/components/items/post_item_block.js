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
                handleCancelItem={this.props.handleCancelItem}
                handleUpdateItem={this.props.handleUpdateItem}
            />
          );
        }

        return (
            <PostItemCell
                sortRank={this.props.sortRank}
                item={this.props.item}
                totalCount={this.props.totalCount}
                handleUpdateItem={this.props.handleUpdateItem}
            />
        );
    }
    render() {
        return(
            <li>
                {this.renderComponent()}
            </li>
        );
    }
}
