import React, { Component, PropTypes } from 'react';
import { capitalize } from '../../../utilities';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentAddCircle from 'material-ui/lib/svg-icons/content/add-circle';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { reduxForm } from 'redux-form';

const style = {
  marginLeft: 12
};


class ItemFormText extends Component {

  constructor(props) {
    super(...props);
    this.state = { style: props.style };
    this.handleChange     = this.handleChange.bind(this);
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  handleUpdateItem(props) {
    this.props.handleUpdateItem({
      style: this.state.style,
      description: props.description
    });
  }
  
  handleChange(event, index, value) {
    this.setState({ style: value })
  }

  render() {
    const { handleSubmit, submitting, fields: { description } } = this.props;
    return (
      <div className="item-form">
        <SelectField
          value={this.state.style}
          floatingLabelText="Text Type"
          onChange={this.handleChange}
        >
          <MenuItem value={1} primaryText="Never"/>
          <MenuItem value={2} primaryText="Every Night"/>
          <MenuItem value={3} primaryText="Weeknights"/>
          <MenuItem value={4} primaryText="Weekends"/>
          <MenuItem value={5} primaryText="Weekly"/>
        </SelectField>
        <TextField
          className="item-form__input-text"
          {...description}
          floatingLabelText='Text'
          hintText='Enter the text'
          fullWidth={true}
          rows={2}
          errorText={description.touched && description.error ? description.error : ''}
        />
        <div className="item-form__submit-box">
          {this.props.cancelButton}
          <RaisedButton
            className='item-form__submit-button'
            label={this.props.submitButtonLabel}
            labelPosition="after"
            icon={<ContentAddCircle />}
            disabled={submitting}
            style={style}
            onClick={handleSubmit(this.handleUpdateItem)}
          />
        </div>
      </div>
    );
  }
}

ItemFormText.defaultProps = {
  style: 1
};

ItemFormText.propTypes = {
  targetType: PropTypes.string.isRequired,
  style: PropTypes.number,
  description: PropTypes.string,
  cancelButton: PropTypes.object.isRequired,
  handleUpdateItem: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

function validate(values) {
  const errors = {};
  if (!values.description) {
    errors.description = 'Enter description'
  }

  return errors;
}

export default reduxForm({
  form: 'ItemFormText',
  fields: ['description'],
  validate
})(ItemFormText);
