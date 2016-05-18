import React, { Component, PropTypes } from 'react';
import DropzoneImage from '../../../../../shared/DropzoneImage/index';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentAddCircle from 'material-ui/lib/svg-icons/content/add-circle';
import styles from '../shared/styles.scss';

const inlineStyles = {
  submitButton: {
    marginLeft: 12
  }
};



export default class ItemFormImage extends Component {

  constructor(props) {
    super(...props);

    this.state = {
      image: props.image,
      errorMessage: ''
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  handleUpdate(image) {
    this.setState(image);
  }

  handleUpdateItem() {
    if (!this.state.image) {
      return this.showErrorMessage('Please upload image');
    }
    this.props.handleUpdateItem({ image: this.state.image })
  }


  showErrorMessage(errorMessage) {
    this.setState({ errorMessage })
  }

  renderErrorMessage() {
    if (this.state.errorMessage) {
      return <span className={styles.errorMessage}>{this.state.errorMessage}</span>;
    }
  }

  render() {
    return (
      <div className={styles.root}>
        <DropzoneImage
          image={this.state.image}
          handleUpdate={this.handleUpdate}
        />
        {this.renderErrorMessage()}
        <div className={styles.submitBox}>
          {this.props.cancelButton}
          <RaisedButton
            className={styles.submitButton}
            label='Save'
            labelPosition='after'
            icon={<ContentAddCircle />}
            style={inlineStyles.submitButton}
            onClick={this.handleUpdateItem}
          />
        </div>
      </div>
    );
  }
}

ItemFormImage.propTypes = {
  image: PropTypes.string,
  cancelButton: PropTypes.element.isRequired,
  handleUpdateItem: PropTypes.func.isRequired
};

