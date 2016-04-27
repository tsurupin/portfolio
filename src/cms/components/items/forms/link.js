import React, { Component, PropTypes } from 'react';
import { capitalize } from '../../../utilities';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentAddCircle from 'material-ui/lib/svg-icons/content/add-circle';
import { reduxForm } from 'redux-form';

class ItemFormLink extends Component {

  constructor(props) {
    super(...props);

    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  handleUpdateItem(props) {
    this.props.handleUpdateItem({ sourceURL: props.sourceURL, sourceTitle: props.sourceTitle });
  }

  render() {
    const { handleSubmit, submitting, fields: { sourceURL, sourceTitle } } = this.props;
    return (
      <div className="item-form">
        <div className="item-form__name">{capitalize(this.props.type)}</div>
        <TextField
          className="item-form__input-text"
          {...sourceURL}
          hintText='Enter the sourceURL'
          fullWidth={true}
          errorText={sourceURL.touched && sourceURL.error ? sourceURL.error : ''}
        />
        <TextField
          className="item-form__input-text"
          {...sourceTitle}
          hintText='Enter the sourceTitle'
          fullWidth={true}
          errorText={sourceTitle.touched && sourceTitle.error ? sourceTitle.error : ''}
        />
        <div className="item-form__submit-box">
          <RaisedButton
            className='item-form__submit-button'
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

ItemFormLink.propTypes = {
  type: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  submitButtonLabel: PropTypes.string.isRequired,
  cancelButton: PropTypes.object.isRequired,
  handleUpdateItem: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

function validate(values) {
  const errors = {};
  if (!values.sourceTitle) {
    errors.sourceTitle = 'Enter sourceTitle'
  }

  if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(values.sourceURL)) {
    errors.sourceURL = 'URL is not valid'
  }

  return errors;
}


export default reduxForm({
  form: 'ItemFormLink',
  fields: ['sourceURL', 'sourceTitle'],
  validate
})(ItemFormLink);

