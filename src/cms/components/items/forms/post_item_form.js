import React, { Component, PropTypes } from 'react';
import { TARGET_TYPES } from '../../../constants';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentRemoveCircle from 'material-ui/lib/svg-icons/content/remove-circle';
import ItemFormHeading from './heading';

class PostItemForm extends Component {
    constructor(props) {
        super(...props);

        this.handleCancelItem = this.handleCancelItem.bind(this);
    }

    renderItemFormComponent() {
        switch(this.props.item.type) {
            case TARGET_TYPES.HEADING.name:
            case TARGET_TYPES.SUB_HEADING.name:
                return (
                    <ItemFormHeading
                        type={this.props.item.type}
                        isNew={this.props.item.isNew}
                        handleUpdateItem={this.props.handleUpdateItem}
                        cancelButton={this.renderCancelButton()}
                    />
                    );
            default:
                return;
        }

    }

    handleCancelItem() {
        this.props.handleCancelItem(this.props.sortRank)
    }


    renderCancelButton() {
        <RaisedButton
            label="Cancel"
            labelPosition="after"
            icon={<ContentRemoveCircle />}
            onTouchStart={this.handleCancelItem}
        />
    }

    render() {
        return this.renderItemFormComponent();
    }

}

export default PostItemForm;