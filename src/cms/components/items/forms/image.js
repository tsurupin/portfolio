import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import { capitalize } from '../../../utilities';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentAddCircle from 'material-ui/lib/svg-icons/content/add-circle';
import Paper from 'material-ui/lib/paper';

const style = {
  submitButton: {
    marginLeft: 12
  },
  paper: {
    margin: '10px 0'
  }
};



export default class ItemFormImage extends Component {

  constructor(props) {
    super(...props);

    this.state = {
      image: props.image,
      errorMessage: ''
    };

    this.handleDrop = this.handleDrop.bind(this);
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  handleUpdateItem() {
    if (!this.state.image) {
      return this.showErrorMessage('Please upload image');
    }
    this.props.handleUpdateItem({ image: this.state.image })
  }

  handleDrop(files) {
    const self = this;
    const reader = new FileReader();
    const file = files[0];

    reader.onload = function (upload) {
      self.setState({
        image: upload.target.result,
        errorMessage: ''
      });
    };

    reader.onerror = function () {
      self.showErrorMessage('Cannot upload image file')
    };

    reader.readAsDataURL(file);
  }

  showErrorMessage(errorMessage) {
    this.setState({ errorMessage })
  }

  renderImageBox() {
    if (this.state.image) {
      return <img className='item-form__preview-image' src={this.state.image} width='100'/>;
    }
  }

  renderErrorMessage() {
    if (this.state.errorMessage) {
      return <span className='item-form__error-message'>{this.state.errorMessage}</span>;
    }
  }


  render() {
    return (
      <div className='item-form'>
        <label className="item-form__header">Image</label>
        <Paper zDepth={1} rounded={false} style={style.paper}>
          <Dropzone
            className="item-form__dropzone"
            accepte='image/*'
            multipe={false}
            onDrop={this.handleDrop}>
            <div className="item-form__dropzone-help">Drop file here or click to upload.</div>
          </Dropzone>
        </Paper>
        {this.renderImageBox()}
        {this.renderErrorMessage()}
        <div className='item-form__submit-box'>
          {this.props.cancelButton}
          <RaisedButton
            className='item-form__submit-button'
            label='Save'
            labelPosition='after'
            icon={<ContentAddCircle />}
            style={style.submitButton}
            onClick={this.handleUpdateItem}
          />
        </div>
      </div>
    );
  }
}

ItemFormImage.propTypes = {
  targetType: PropTypes.string.isRequired,
  image: PropTypes.string,
  cancelButton: PropTypes.element.isRequired,
  handleUpdateItem: PropTypes.func.isRequired
};

