import React, { Component, PropTypes } from 'react';
import { capitalize } from '../../../utilities';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentAddCircle from 'material-ui/lib/svg-icons/content/add-circle';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { reduxForm } from 'redux-form';
import TextEditor from '../../utilities/text_editor';

const style = {
  marginLeft: 12
};


export default class ItemFormText extends Component {

  constructor(props) {
    super(...props);
    this.handleUpdateText = this.handleUpdateText.bind(this);
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  handleUpdateItem(props) {
    this.props.handleUpdateItem({
      description: props.description
    });
  }
  
  handleUpdateText(callback) {
    this.props.handleUpdateItem({ description: callback})
  }
  

  render() {
    return (
      <div className="item-form">
        <TextEditor
          description={this.props.description}
          handleUpdateText={this.handleUpdateText}
        />
        <div className="item-form__submit-box">
          {this.props.cancelButton}
          <RaisedButton
            className='item-form__submit-button'
            label='Save'
            labelPosition="after"
            icon={<ContentAddCircle />}
            style={style}
            onClick={this.handleUpdateItem}
          />
        </div>
      </div>
    );
  }
}


ItemFormText.propTypes = {
  targetType: PropTypes.string.isRequired,
  description: PropTypes.string,
  cancelButton: PropTypes.object.isRequired,
  handleUpdateItem: PropTypes.func.isRequired
};

