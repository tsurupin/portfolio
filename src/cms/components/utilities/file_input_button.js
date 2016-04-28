import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/lib/flat-button';

export default class FileButton extends Component {
  constructor(props) {
    super(...props);

    this.state = {
      imagePath: props.imagePath
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleClick() {
    const fileUploadDom = React.findDOMNode(this.refs.fileUpload);
    fileUploadDom.click();
  }

  handleUploadImage(event) {
    const self = this;
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onload = function (upload) {
      self.setState({ imagePath: upload.target.result });
      self.setState({ imageURL: null });
    };

    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div>
        <FlatButton
          label="Upload file"
          onClick={this.handleClick}/>
        <input
          ref='fileUpload'
          type='file'
          style={{'display': 'none'}}
          accept="image/*"
          onChange={this.handleUploadImage}/>
      </div>
    );
  }
}