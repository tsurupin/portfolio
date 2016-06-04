import React, { Component, PropTypes } from 'react';
import DropzoneImage from '../../../../../shared/DropzoneImage/index';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import { reduxForm } from 'redux-form';
import styles from '../shared/styles.scss';

const inlineStyles = {
  submitButton: {
    marginLeft: 12
  }
};


class Image extends Component {

  constructor(props) {
    super(props);
   
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }
  
  handleUpdateItem(props) {
    this.props.handleUpdateItem({ image: props.image, caption: props.caption })
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
        <DropzoneImage
          {...image}
          handleUpdate={ (file) => image.onChange(file) }
        />
        {this.renderErrorMessage()}
        <TextField
          className={styles.inputText}
          {...caption}
          floatingLabelText="Caption"
          hintText='Enter the caption'
          fullWidth={true}
        />
        <div className={styles.submitBox}>
          {this.props.cancelButton}
          <RaisedButton
            className={styles.submitButton}
            label='Save'
            labelPosition='after'
            disabled={submitting}
            icon={<ContentAddCircle />}
            style={inlineStyles.submitButton}
            onClick={handleSubmit(this.handleUpdateItem)}
          />
        </div>
      </div>
    );
  }
}

Image.propTypes = {
  fields: PropTypes.object.isRequired,
  cancelButton: PropTypes.element.isRequired,
  handleUpdateItem: PropTypes.func.isRequired
};

function validate(values) {
  const errors = {};
  if(!values.image) {
    errors.image = 'Entry image'
  }

  return errors;
}

export default reduxForm({
  form: 'ItemImageForm',
  fields: ['image', 'caption'],
  validate
})(Image);



