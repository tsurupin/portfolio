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
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!props.soureTitle) {
          reject({ sourceTitle: 'sourceTitle is empty' })
        }
        else if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/is.test(props.sourceURL)) {
          reject({ sourceURL: 'URL is not valid' })
        } else {
          this.props.handleUpdateItem({ sourceURL: props.sourceURL, sourceTitle: props.sourceTitle });
          resolve();
        }
      }, 1000)
    })
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
  sourceURL: PropTypes.string,
  sourceTitle: PropTypes.string,
  submitButtonLabel: PropTypes.string.isRequired,
  cancelButton: PropTypes.object.isRequired,
  handleUpdateItem: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'ItemFormLink',
  fields: ['sourceURL', 'sourceTitle']
})(ItemFormLink);

