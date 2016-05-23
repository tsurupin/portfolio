import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentAddCircle from 'material-ui/lib/svg-icons/content/add-circle';
import { reduxForm } from 'redux-form';
import styles from '../shared/styles.scss';

const inlineStyles = {
  submitButton: { marginLeft: 12 }
};


class Link extends Component {

  constructor(props) {
    super(...props);
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  handleUpdateItem(props) {
    this.props.handleUpdateItem({ sourceUrl: props.sourceUrl, sourceTitle: props.sourceTitle });
  }

  render() {
    const { handleSubmit, submitting, fields: { sourceUrl, sourceTitle } } = this.props;
    return (
      <div className={styles.root}>
        <TextField
          className={styles.inputText}
          {...sourceUrl}
          floatingLabelText="SourceURL"
          hintText='Enter the sourceURL'
          fullWidth={true}
          errorText={sourceUrl.touched && sourceUrl.error ? sourceUrl.error : ''}
        />
        <TextField
          className={styles.inputText}
          {...sourceTitle}
          floatingLabelText="SourceTitle"
          hintText='Enter the sourceTitle'
          fullWidth={true}
          errorText={sourceTitle.touched && sourceTitle.error ? sourceTitle.error : ''}
        />
        <div className={styles.submitBox}>
          {this.props.cancelButton}
          <RaisedButton
            className={styles.submitButton}
            label="Save"
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

Link.propTypes = {
  targetType: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  cancelButton: PropTypes.object.isRequired,
  handleUpdateItem: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

function validate(values) {
  const errors = {};
  if (!values.sourceTitle) {
    errors.sourceTitle = 'Enter sourceTitle'
  }

  if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(values.sourceUrl)) {
    errors.sourceUrl = 'URL is not valid'
  }

  return errors;
}



export default reduxForm({
  form: 'ItemLinkForm',
  fields: ['sourceUrl', 'sourceTitle'],
  validate
})(Link);

