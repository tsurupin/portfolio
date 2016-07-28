import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import DropzoneImage from 'cms/components/shared/DropzoneImage/index';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import inlineStyles from 'shared/styles/MaterialUI/index';
import styles from '../shared/styles';


const propTypes = {
  fields: PropTypes.object.isRequired,
  cancelButton: PropTypes.element,
  deleteButton: PropTypes.element.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleUpdateItem: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const fields = ['image', 'caption'];

function validate(values) {
  const errors = {};
  if (!values.image) {
    errors.image = 'Entry image';
  }

  return errors;
}


class Image extends Component {

  constructor(props) {
    super(props);

    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  handleUpdateItem(props) {
    this.props.handleUpdateItem({ image: props.image, caption: props.caption });
  }

  renderErrorMessage() {
    if (this.props.fields.image.touched && this.props.fields.image.error) {
      return <span className={styles.errorMessage}>{this.props.fields.image.error}</span>;
    }
  }

  render() {
    const { handleSubmit, submitting, fields: { image, caption } } = this.props;

    return (
      <div className={styles.root}>
        <label className={styles.label}>Image</label>
        <DropzoneImage
          {...image}
          handleUpdate={(file) => image.onChange(file)}
        />
        {this.renderErrorMessage()}
        <TextField
          className={styles.inputText}
          {...caption}
          floatingLabelText="Caption"
          hintText="Enter the caption"
          fullWidth
        />
        <div className={styles.submitBox} >
          {this.props.cancelButton}
          {this.props.deleteButton}
          <IconButton
            disabled={submitting}
            tooltip="Save"
            tooltipPosition="bottom-center"
            name="save-item-button"
            disableTouchRipple
            onClick={handleSubmit(this.handleUpdateItem)}
          >
            <ContentSave color={inlineStyles.iconColor} />
          </IconButton>
        </div>
      </div>
    );
  }
}

Image.propTypes = propTypes;


export default reduxForm({
  form: 'ItemImageForm',
  fields,
  validate,
})(Image);

