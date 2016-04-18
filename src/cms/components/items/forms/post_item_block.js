import React, { Component, PropTypes } from 'react';
import PostItemCell from './post_item_cell';
import PostItemForm from './post_item_form';


export default class PostItemBlock extends Component {

    renderComponent() {
        if (this.props.item.editing) {
          return (
            <PostItemForm
                item={this.props.item}
                handleCancelItem={this.props.handleCancelItem}
                handleUpdateItem={this.props.handleUpdateItem}
            />
          );
        }

        return (
            <PostItemCell
                item={this.props.item}
            />
        );
    }
    render() {
        console.log(this.props)
        return(
            <li>
                {this.renderComponent()}
            </li>
        );
    }
}
