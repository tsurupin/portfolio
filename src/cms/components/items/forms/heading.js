import React, { Component, PropTypes } from 'react';
import { capitalize } from '../../../utilities';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentAddCircle from 'material-ui/lib/svg-icons/content/add-circle';
import { reduxForm } from 'redux-form';

class ItemFormHeading extends Component {

  constructor(props) {
    super(...props);

    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  handleUpdateItem(props) {
    this.props.handleUpdateItem({ title: props.title })
  }

  render() {
    const { handleSubmit, submitting, fields: { title } } = this.props;
    return (
      <div className="item-form">
        <div className="item-form__name">{capitalize(this.props.type)}</div>
        <TextField
          className="item-form__input-text"
          {...title}
          hintText='Enter the title'
          fullWidth={true}
          errorText={title.touched && title.error ? title.error : ''}
        />
        <div className="item-form__submit-box">
          <RaisedButton
            label={this.props.submitButtonLabel}
            labelPosition="after"
            icon={<ContentAddCircle />}
            disabled={submitting}
            onClick={handleSubmit(this.handleUpdateItem)}
          />
          {this.props.cancelButton}
        </div>
      </div>
    );
  }
}

ItemFormHeading.propTypes = {
  type: PropTypes.string.isRequired,
  submitButtonLabel: PropTypes.string.isRequired,
  cancelButton: PropTypes.object.isRequired,
  handleUpdateItem: PropTypes.func.isRequired
};

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'Enter heading'
  }
  return errors;
}

export default reduxForm({
  form: 'ItemFormHeading',
  fields: ['title'],
  validate
})(ItemFormHeading);

