import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import styles from './styles.scss';

class DropzoneImage extends Component {

  constructor(props) {
    super(props);
    
    this.state = { errorMessage: '' };
    
    this.handleDrop = this.handleDrop.bind(this);
  }
  
  handleDrop(files) {
    const file = files[0];

    if (!(/.*image\/(gift|jpg|jpeg|png)$/i).test(file.type)) {
      return this.setState({ errorMessage: 'Cannot upload image file' })
    }

    const self = this;
    const reader = new FileReader();

    reader.onload = function (upload) {
      self.props.handleUpdate({ image: upload.target.result })
      self.setState({ errorMessage: '' })
    };

    reader.onerror = function () {
      self.setState({ errorMessage: 'Cannot upload image file' })
    };

    reader.readAsDataURL(file);
  }
  
  renderImageBox() {
    if (this.props.image) {
      return <img className={styles.previewImage} src={this.props.image} width='100'/>;
    }
  }

  renderErrorMessage() {
    if (this.state.errorMessage) {
      return <span className={styles.errorMessage}>{this.state.errorMessage}</span>;
    }
  }
  
  renderPlaceholder() {
    if (!this.props.image) {
      return <span className={styles.placeholder}>Drop file here or click to upload.</span>
    }
  }

  render() {
    return (
      <div className={styles.root}>
        <label className={styles.header}>Image</label>
        <Dropzone
          name="image"
          className={styles.dropzone}
          activeClassName={styles.dropzoneActive}
          accept='image/*'
          multipe={false}
          onDrop={this.handleDrop}>
          {this.renderPlaceholder()}
          {this.renderImageBox()}
          {this.renderErrorMessage()}
        </Dropzone>
      </div>
    );
  }
}

DropzoneImage.propTypes = {
  image: PropTypes.string,
  handleUpdate: PropTypes.func.isRequired
};


export default DropzoneImage;
