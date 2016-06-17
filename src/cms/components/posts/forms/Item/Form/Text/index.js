import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import TextEditor from 'sharedComponents/textEditors/Editor/index';
import { reduxForm } from 'redux-form';
import styles from '../shared/styles.scss';


const propTypes = {
  targetType: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  cancelButton: PropTypes.object.isRequired,
  handleUpdateItem: PropTypes.func.isRequired
};

const inlineStyles = {
  submitButton: { marginLeft: 12 }
};


class Text extends Component {

  constructor(props) {
    super(props);
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  handleUpdateItem(props) {
    this.props.handleUpdateItem({ description: props.description });
  }
  
  renderErrorMessage() {
    if (this.props.fields.description.touched && this.props.fields.description.error) {
      return <span className={styles.errorMessage}>{this.props.fields.description.error}</span>;
    }
  }

  render() {
    
    const { handleSubmit, submitting, fields: { description } } = this.props;
    return (
      <div className={styles.root}>
        <label className={styles.header}>Text</label>
        <TextEditor
          {...description}
          handleUpdate={ (value) => { description.onChange(value) }}
        />
        {this.renderErrorMessage()}
        <div className={styles.submitBox}>
          {this.props.cancelButton}
          <RaisedButton
            className={styles.submitButton}
            label='Save'
            labelPosition="after"
            icon={<ContentAddCircle />}
            disabled={submitting}
            style={inlineStyles.submitButton}
            onClick={handleSubmit(this.handleUpdateItem)}/>
        </div>
      </div>
    );
  }
}


Text.propTypes = propTypes;

function validate(values) {
  const errors = {};
  if (!values.description) {
    errors.description = 'Enter description'
  }

  return errors;
}

export default reduxForm({
  form: 'ItemTextForm',
  fields: ['description'],
  validate
})(Text);

