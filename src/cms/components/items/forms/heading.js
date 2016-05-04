import React, { Component, PropTypes } from 'react';
import { capitalize } from '../../../utilities';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentAddCircle from 'material-ui/lib/svg-icons/content/add-circle';
import { reduxForm } from 'redux-form';

const style = {
  marginLeft: 12
};

class ItemFormHeading extends Component {

  constructor(props) {
    super(...props);

    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  handleUpdateItem(props) {
    this.props.handleUpdateItem({ title: props.title })
  }

  render() {
    const { handleSubmit, submitting, fields: { title } } = this.props;
    return (
      <div className="item-form">
        <TextField
          className="item-form__input-text"
          {...title}
          floatingLabelText={ this.props.targetType == 'ItemHeading' ? 'Heading' : 'SubHeading' }
          hintText='Enter the title'
          fullWidth={true}
          errorText={title.touched && title.error ? title.error : ''}
        />
        <div className="item-form__submit-box">
          {this.props.cancelButton}
          <RaisedButton
            className='item-form__submit-button'
            label='Save'
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

ItemFormHeading.propTypes = {
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
  form: 'ItemFormHeading',
  fields: ['title'],
  validate
})(ItemFormHeading);

