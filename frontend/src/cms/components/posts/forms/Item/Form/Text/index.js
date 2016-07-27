import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import TextEditor from 'shared/components/textEditors/Editor/index';
import IconButton from 'material-ui/IconButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import inlineStyles from 'shared/styles/MaterialUI/index';
import styles from '../shared/styles';


const propTypes = {
  targetType: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  cancelButton: PropTypes.object,
  deleteButton: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleUpdateItem: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

function validate(values) {
  const errors = {};
  if (!values.description) {
    errors.description = 'Enter description';
  }

  return errors;
}


const fields = ['description'];


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
        <label className={styles.label}>Text</label>
        <TextEditor
          {...description}
          handleUpdate={(value) => { description.onChange(value); }}
        />
        {this.renderErrorMessage()}
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


Text.propTypes = propTypes;

export default reduxForm({
  form: 'ItemTextForm',
  fields,
  validate,
})(Text);

