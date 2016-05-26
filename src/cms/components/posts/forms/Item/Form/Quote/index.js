import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import { reduxForm } from 'redux-form';
import styles from '../shared/styles.scss';


const inlineStyles = {
  submitButton : {
    marginLeft: 12
  }
};


class Quote extends Component {

  constructor(props) {
    super(props);

    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  handleUpdateItem(props) {
    this.props.handleUpdateItem({ sourceUrl: props.sourceUrl, description: props.description });
  }

  render() {
    const { handleSubmit, submitting, fields: { sourceUrl, description } } = this.props;
    return (
      <div className={styles.root}>
        <TextField
          className={styles.inputText}
          {...description}
          floatingLabelText="Quote"
          hintText='Enter the description'
          fullWidth={true}
          rows={4}
          errorText={description.touched && description.error ? description.error : ''}
        />
        <TextField
          className={styles.inputText}
          {...sourceUrl}
          floatingLabelText="SourceURL"
          hintText='Enter the sourceURL'
          fullWidth={true}
          errorText={sourceUrl.touched && sourceUrl.error ? sourceUrl.error : ''}
        />
        <div className={styles.submitBox}>
          {this.props.cancelButton}
          <RaisedButton
            className='hoge2'
            label='Save'
            labelPosition="after"
            icon={<ContentAddCircle />}
            disabled={submitting}
            style={inlineStyles.submitButton}
            onClick={handleSubmit(this.handleUpdateItem)}
          />
        </div>
      </div>
    );
  }
}

Quote.propTypes = {
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

  if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(values.sourceUrl)) {
    errors.sourceUrl = 'URL is not valid'
  }

  return errors;
}

export default reduxForm({
  form: 'ItemQuoteForm',
  fields: ['sourceUrl', 'description'],
  validate
})(Quote);

