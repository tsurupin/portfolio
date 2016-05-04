import React, { Component, PropTypes } from 'react';
import { capitalize } from '../../../utilities';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentAddCircle from 'material-ui/lib/svg-icons/content/add-circle';
import { reduxForm } from 'redux-form';


const style = {
  marginLeft: 12
};


class ItemFormQuote extends Component {

  constructor(props) {
    super(...props);

    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  handleUpdateItem(props) {
    this.props.handleUpdateItem({ sourceURL: props.sourceURL, description: props.description });
  }

  render() {
    const { handleSubmit, submitting, fields: { sourceURL, description } } = this.props;
    return (
      <div className="item-form">
        <TextField
          className="item-form__input-text"
          {...description}
          floatingLabelText="Quote"
          hintText='Enter the description'
          fullWidth={true}
          rows={4}
          errorText={description.touched && description.error ? description.error : ''}
        />
        <TextField
          className="item-form__input-text"
          {...sourceURL}
          floatingLabelText="SourceURL"
          hintText='Enter the sourceURL'
          fullWidth={true}
          errorText={sourceURL.touched && sourceURL.error ? sourceURL.error : ''}
        />
        <div className="item-form__submit-box">
          {this.props.cancelButton}
          <RaisedButton
            className='item-form__submit-button'
            label={this.props.submitButtonLabel}
            labelPosition="after"
            icon={<ContentAddCircle />}
            disabled={submitting}
            style={style}
            onClick={handleSubmit(this.handleUpdateItem)}
          />
        </div>
      </div>
    );
  }
}

ItemFormQuote.propTypes = {
  targetType: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  cancelButton: PropTypes.object.isRequired,
  handleUpdateItem: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

function validate(values) {
  const errors = {};
  if (!values.description) {
    errors.description = 'Enter description'
  }

  if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(values.sourceURL)) {
    errors.sourceURL = 'URL is not valid'
  }

  return errors;
}

export default reduxForm({
  form: 'ItemFormQuote',
  fields: ['sourceURL', 'description'],
  validate
})(ItemFormQuote);

