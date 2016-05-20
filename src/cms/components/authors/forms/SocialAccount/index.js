import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import DropzoneImage from '../../../../../shared/DropzoneImage/index';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentAddCircle from 'material-ui/lib/svg-icons/content/add-circle';
import ContentRemoveCircle from 'material-ui/lib/svg-icons/content/remove-circle';
import styles from '/styles.scss';

const inlineStyles = {
  submitButton: { marginLeft: 12 }
};

class SocialAccount extends Component {
  constructor(props) {
    super(props);

    this.state = { image: '' };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdateImage  = this.handleUpdateImage.bind(this);
  }
  handleDeleteItem() {
    this.props.handleDeleteItem(id);
  }
  
  handleUpdateItem(props) {
    this.props.handleUpdateItem({ name: props.name, url: props.url });
  }

  handleUpdateImage(image) {
    this.setState(image);
  }
  
  render() {
    const { handleSubmit, submitting, fields: { name, url }} = this.props;
    return (
      <div className={styles.root}>
        <TextField
          className={styles.inputText}
          {...name}
          floatingLabelText="Name"
          hintText="Enter name"
          fullWidth={true}
          errorText={name.touched && name.error ? name.error : ''} 
        />
        <TextField
          className={styles.inputText}
          {...url}
          floatingLabelText="URL"
          hintText="Enter "
          fullWidth={true}
          errorText={url.touched && url.error ? url.error : ''}
        />
        <DropzoneImage
          image={this.state.image}
          handleUpdate={this.handleUpdateImage}
        />
        <div className={styles.submitBox}>
          <RaisedButton
            className={styles.cancelButton}
            label="Cancel"
            labelPosition="after"
            icon={<ContentRemoveCircle />}
            onClick={this.handleDeleteItem}
          />
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
    )
  }
}

const fields = [
  'name', 'url'
];

function validate(values) {
  const errors = {};
  if (!values.name) {
    errors.name = 'Enter name'
  }
  
  if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(values.url)) {
    errors.url = 'Url is not valid'
  }
  
  return errors;
}

function mapStateToProps(state) {
  return {
    name: state.socialAccount.name,
    image: state.socialAccount.image,
    sourceUrl: state.socialAccount.socialUrl
  }
}

SocialAccount.propTypes = {
  image: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired      
};

export default reduxForm({
  form: 'SocialAccountForm',
  fields,
  validate
}, mapStateToProps, {
})(SocialAccount)