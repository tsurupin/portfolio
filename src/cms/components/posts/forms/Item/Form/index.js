import React, { Component, PropTypes } from 'react';
import { TARGET_TYPES } from '../../../../../constants';
import RaisedButton from 'material-ui/RaisedButton';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import Image from './Image/index';
import Twitter from './Twitter/index';
import Text from './Text/index';
import styles from './shared/styles.scss';


const propTypes = {
  item: PropTypes.shape({
    targetType: PropTypes.string.isRequired,
    isNew: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    title: PropTypes.string
  }).isRequired,
  sortRank: PropTypes.number.isRequired,
  handleUpdateItem: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  handleCancelItem: PropTypes.func.isRequired
};

class PostItemForm extends Component {
  constructor(props) {
    super(props);

    this.handleUpdateItem = this.handleUpdateItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleCancelItem = this.handleCancelItem.bind(this);
  }

  handleUpdateItem(updatedProps) {
    this.props.handleUpdateItem(
      this.props.sortRank,
      { ...this.props.item, ...updatedProps, isNew: false, editing: false }
    )
  }

  handleDeleteItem() {
    this.props.handleDeleteItem(this.props.sortRank)
  }
  
  handleCancelItem() {
    this.props.handleCancelItem(
      this.props.sortRank, { ...this.props.item, editing: false }
    )
  }

  renderComponent() {
    switch (this.props.item.targetType) {
      case TARGET_TYPES.IMAGE.NAME:
        return (
          <Image
            formKey={this.props.sortRank.toString()}
            targetType={this.props.item.targetType}
            initialValues={{
              image: this.props.item.image,
              caption: this.props.item.caption
            }}
            handleUpdateItem={this.handleUpdateItem}
            deleteButton={this.renderDeleteButton()}
            cancelButton={this.renderCancelButton()}
          />
        );
      case TARGET_TYPES.TWITTER.NAME:
        return (
          <Twitter
            formKey={this.props.sortRank.toString()}
            targetType={this.props.item.targetType}
            initialValues={{sourceURL: this.props.item.tweetId}}
            sortRank={this.props.sortRank}
            handleUpdateItem={this.handleUpdateItem}
            deleteButton={this.renderDeleteButton()}
            cancelButton={this.renderCancelButton()}
          />
        );
      case TARGET_TYPES.TEXT.NAME:
        return (
          <Text
            targetType={this.props.item.targetType}
            initialValues={{description: this.props.item.description}}
            handleUpdateItem={this.handleUpdateItem}
            deleteButton={this.renderDeleteButton()}
            cancelButton={this.renderCancelButton()}
          />
        );
      default:
        return;
    }
  }
  

  renderDeleteButton() {
    return (
      <RaisedButton
        className={styles.cancelButton}
        label="Delete"
        labelPosition="after"
        icon={<ContentRemoveCircle />}
        onClick={this.handleDeleteItem}
      />
    );
  }

  renderCancelButton() {
    if (this.props.item.isNew) { return }
    return (
      <RaisedButton
        className={styles.cancelButton}
        label="Cancel"
        labelPosition="after"
        icon={<ContentRemoveCircle />}
        onClick={this.handleCancelItem}
      />
    );
  }

  render() {
    return this.renderComponent();
  }

}

PostItemForm.propTypes = propTypes;

export default PostItemForm;