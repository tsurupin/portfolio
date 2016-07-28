import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import styles from './styles';

const propTypes = {
  value: PropTypes.string,
  handleUpdate: PropTypes.func.isRequired,
};

class DropzoneImage extends Component {

  constructor(props) {
    super(props);

    this.state = { errorMessage: '' };
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrop(files) {
    const file = files[0];

    if (!(/.*image\/(gift|jpg|jpeg|png)$/i).test(file.type)) {
      return this.setState({ errorMessage: 'Cannot upload image file' });
    }

    const self = this;
    const reader = new FileReader();

    reader.onload = (upload) => {
      self.props.handleUpdate(upload.target.result);
      self.setState({ errorMessage: '' });
    };

    reader.onerror = () => {
      self.setState({ errorMessage: 'Cannot upload image file' });
    };

    reader.readAsDataURL(file);
  }

  renderImageBox() {
    if (this.props.value) {
      return (
        <img
          className={styles.previewImage}
          src={this.props.value}
          width="100"
          alt=""
        />
      );
    }
  }

  renderErrorMessage() {
    if (this.state.errorMessage) {
      return <span className={styles.errorMessage}>{this.state.errorMessage}</span>;
    }
  }

  renderPlaceholder() {
    if (!this.props.value) {
      return <span className={styles.placeholder}>Drop file here or click to upload.</span>;
    }
  }

  render() {
    return (
      <div className={styles.root}>
        <Dropzone
          name="image"
          className={styles.dropzone}
          activeClassName={styles.dropzoneActive}
          accept="image/*"
          multipe={false}
          onDrop={this.handleDrop}
        >
          {this.renderPlaceholder()}
          {this.renderImageBox()}
          {this.renderErrorMessage()}
        </Dropzone>
      </div>
    );
  }
}

DropzoneImage.propTypes = propTypes;

export default DropzoneImage;
