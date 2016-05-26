import React, { Component, PropTypes } from 'react';
import DropzoneImage from '../../../../../shared/DropzoneImage/index';
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
    super(...props);
   
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }
  
  handleUpdateItem(props) {
    this.props.handleUpdateItem({ image: props.image })
  }

  renderErrorMessage() {
    if (this.props.fields.image.touched && this.props.fields.image.error) {
      return <span className={styles.errorMessage}>{this.props.fields.image.error}</span>;
    }
  }

  render() {

    const { handleSubmit, submitting, fields: { image } } = this.props;

    return (
      <div className={styles.root}>
        <DropzoneImage
          {...image}
          handleUpdate={ (file) => image.onChange(file) }
        />
        {this.renderErrorMessage()}
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
  fields: ['image'],
  validate
})(Image);



