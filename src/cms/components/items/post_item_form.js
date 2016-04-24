import React, { Component, PropTypes } from 'react';
import { TARGET_TYPES } from '../../constants';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentRemoveCircle from 'material-ui/lib/svg-icons/content/remove-circle';
import Heading from './forms/heading';
import Image from './forms/image';

export default class PostItemForm extends Component {
    constructor(props) {
        super(...props);

        this.handleUpdateItem = this.handleUpdateItem.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
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

    renderComponent() {
        switch(this.props.item.type) {
            case TARGET_TYPES.HEADING.NAME:
            case TARGET_TYPES.SUB_HEADING.NAME:
                return (
                    <Heading
                        type={this.props.item.type}
                        initialValues={{title: this.props.item.title}}
                        submitButtonLabel={this.renderSubmitButtonLabel()}
                        handleUpdateItem={this.handleUpdateItem}
                        cancelButton={this.renderCancelButton()}
                    />
                );
            case TARGET_TYPES.IMAGE.NAME:
                return (
                    <Image
                        type={this.props.item.type}
                        image={this.props.item.image}
                        submitButtonLabel={this.renderSubmitButtonLabel()}
                        handleUpdateItem={this.handleUpdateItem}
                        cancelButton={this.renderCancelButton()}
                    />
                );
            default:
                return;
        }
    }
    
    renderSubmitButtonLabel() {
        return (this.props.item.isNew ? 'Create' : 'Update');
    }
    
    renderCancelButton() {
        return (
            <RaisedButton
                className="item-form__cancel-button"
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

