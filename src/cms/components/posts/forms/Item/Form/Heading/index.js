import React, { Component, PropTypes } from 'react';
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

class Heading extends Component {

  constructor(props) {
    super(...props);

    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  handleUpdateItem(props) {
    this.props.handleUpdateItem({ title: props.title })
  }

  render() {
    const { handleSubmit, submitting, fields: { title } } = this.props;
    const label = this.props.targetType === 'ItemHeading' ? 'Heading' : 'SubHeading';

    return (
      <div className={styles.root}>
        <TextField
          className={styles.inputText}
          {...title}
          floatingLabelText={ label }
          hintText='Enter the title'
          fullWidth={true}
          errorText={title.touched && title.error ? title.error : ''}
        />
        <div className={styles.submitBox}>
          {this.props.cancelButton}
          <RaisedButton
            className={styles.submitButton}
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

Heading.propTypes = {
  targetType: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  cancelButton: PropTypes.object.isRequired,
  handleUpdateItem: PropTypes.func.isRequired
};

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'Enter heading'
  }
  return errors;
}

export default reduxForm({
  form: 'ItemHeadingForm',
  fields: ['title'],
  validate
})(Heading);

