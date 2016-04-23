import React, { Component, PropTypes } from 'react';
import { TARGET_TYPES } from '../../constants';
import RaisedButton from '../../../../node_modules/material-ui/lib/raised-button';
import ContentRemoveCircle from '../../../../node_modules/material-ui/lib/svg-icons/content/remove-circle';
import Heading from './forms/heading';

class PostItemForm extends Component {
    constructor(props) {
        super(...props);

        this.handleUpdateItem = this.handleUpdateItem.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }

    renderComponent() {
        switch(this.props.item.type) {
            case TARGET_TYPES.HEADING.NAME:
            case TARGET_TYPES.SUB_HEADING.NAME:
                return (
                    <Heading
                        type={this.props.item.type}
                        isNew={this.props.item.isNew}
                        initialValues={{title: this.props.item.title}}
                        handleUpdateItem={this.handleUpdateItem}
                        cancelButton={this.renderCancelButton()}
                    />
                    );
            default:
                return;
        }

    }

    handleUpdateItem(callbackProps) {
        this.props.handleUpdateItem(
            this.props.sortRank,
            {...this.props.item, ...callbackProps, isNew: false, editing: false}
        )
    }

    handleDeleteItem() {
        this.props.handleDeleteItem(this.props.sortRank)
    }


    renderCancelButton() {
        return (
            <RaisedButton
                label="Cancel"
                labelPosition="after"
                icon={<ContentRemoveCircle />}
                onClick={this.handleDeleteItem}
            />
        );
    }

    render() {
        return this.renderComponent();
    }

}

PostItemForm.propTypes = {
    item: PropTypes.shape({
        type: PropTypes.string.isRequired,
        isNew: PropTypes.bool.isRequired,
        editing: PropTypes.bool.isRequired,
        title: PropTypes.string
    }).isRequired,
    sortRank: PropTypes.number.isRequired,
    handleUpdateItem: PropTypes.func.isRequired,
    handleDeleteItem: PropTypes.func.isRequired
};

export default PostItemForm;