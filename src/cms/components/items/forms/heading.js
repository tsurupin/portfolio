import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { capitalize } from '../../../utilities';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentAddCircle from 'material-ui/lib/svg-icons/content/add-circle';

import { reduxForm } from 'redux-form';

const propTypes = {
    sortRank: PropTypes.number,
    type: PropTypes.string,
    cancelButton: PropTypes.object,
    handleSubmit: PropTypes.func
};


class ItemFormHeading extends Component {

    constructor(props) {
        super(...props);
    }

    onSubmit(props) {
        this.props.handleUpdateItem(this.props.sortRank, props);
    }

    render() {
        const { handleSubmit, fields: { title } } = this.props;
        const buttonLabel = this.props.isNew ? 'Create' : 'Update';
        return (
            <div className="item-form-component">
                <div className="item-form__input-label">{capitalize(this.props.type)}</div>
                <TextField
                    hintText="Enter Heading"
                    fullWidth={true}
                    errorText={title.touched && title.error ? title.error : ''}
                />
                <div className="item-form__submit-box">
                    <RaisedButton
                        label={buttonLabel}
                        labelPosition="after"
                        icon={<ContentAddCircle />}
                        onTouchStart={handleSubmit(this.onSubmit.bind(this))}
                    />
                {this.props.cancelButton}
                </div>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};
    if(!values.title) {
        errors.title = 'Enter heading'
    }
    return errors;
}

const fields = ['title'];

ItemFormHeading.propTypes = propTypes;

export default reduxForm({
    form: 'ItemFormHeading',
    fields,
    validate
})(ItemFormHeading);

