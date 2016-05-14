import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import Paper from 'material-ui/lib/paper';
import styles from './styles.scss';

const inlineStyles = {
  paper: {
    margin: '10px 0'
  }
};

class DropzoneImage extends Component {

  constructor(props) {
    super(props);
    
    this.handleDrop = this.handleDrop.bind(this);
  }
  
  handleDrop(files) {
    const self = this;
    const reader = new FileReader();
    const file = files[0];

    reader.onload = function (upload) {
      self.props.handleUpdate({
        image: upload.target.result,
        errorMessage: ''
      })
    };

    reader.onerror = function () {
      self.props.handleUpdate({
        errorMessage: 'Cannot upload image file'
      })
    };

    reader.readAsDataURL(file);
  }
  
  renderImageBox() {
    if (this.props.image) {
      return <img className={styles.previewImage} src={this.props.image} width='100'/>;
    }
  }

  renderErrorMessage() {
    if (this.props.errorMessage) {
      return <span className={styles.errorMessage}>{this.props.errorMessage}</span>;
    }
  }

  render() {
    return (
      <div className={styles.root}>
        <Paper zDepth={1} rounded={false} style={inlineStyles.paper}>
          <Dropzone
            className={styles.dropzone}
            accepte='image/*'
            multipe={false}
            onDrop={this.handleDrop}>
            <div className={styles.dropzoneHelp}>Drop file here or click to upload.</div>
          </Dropzone>
        </Paper>
        {this.renderImageBox()}
        {this.renderErrorMessage()}
      </div>
    );
  }
}

DropzoneImage.propTypes = {
  image: PropTypes.string,
  errorMessage: PropTypes.string,
  handleUpdate: PropTypes.func.isRequired
};


export default DropzoneImage;
