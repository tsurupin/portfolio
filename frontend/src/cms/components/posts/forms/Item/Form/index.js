import React, { Component, PropTypes } from 'react';
import TARGET_TYPES from 'shared/constants/targetTypes';
import IconButton from 'material-ui/IconButton';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import ContentDeleteSweep from 'material-ui/svg-icons/content/delete-sweep';
import Image from './Image/index';
import Twitter from './Twitter/index';
import Text from './Text/index';
import inlineStyles from 'shared/styles/MaterialUI/index';


const propTypes = {
  item: PropTypes.shape({
    targetType: PropTypes.string.isRequired,
    isNew: PropTypes.bool,
    editing: PropTypes.bool.isRequired,
    title: PropTypes.string
  }).isRequired,
  sortRank: PropTypes.number.isRequired,
  handleUpdateItem: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired
};

class Form extends Component {
  constructor(props) {
    super(props);

    this.handleUpdateItem = this.handleUpdateItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleCancelItem = this.handleCancelItem.bind(this);
  }

  // update with some change
  handleUpdateItem(updatedProps) {
    this.props.handleUpdateItem(
      this.props.sortRank,
      { ...this.props.item, ...updatedProps, isNew: false, editing: false }
    )
  }

  // update without any change
  handleCancelItem() {
    this.props.handleUpdateItem(
      this.props.sortRank, 
      { ...this.props.item, editing: false }
    )
  }

  handleDeleteItem() {
    this.props.handleDeleteItem(this.props.sortRank)
  }
  
  renderComponent() {
    switch (this.props.item.targetType) {
      case TARGET_TYPES.IMAGE:
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
      case TARGET_TYPES.TWITTER:
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
      case TARGET_TYPES.TEXT:
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
      <IconButton
        tooltip="Delete"
        tooltipPosition="bottom-center"
        name="delete-item-button"
        disableTouchRipple={true}
        onClick={this.handleDeleteItem}
      >
        <ContentDeleteSweep color={inlineStyles.iconColor} />
      </IconButton>
    )
  }

  renderCancelButton() {
    if (this.props.item.isNew) { return }
    return (
      <IconButton
        tooltip="Cancel"
        tooltipPosition="bottom-center"
        name="cancel-item-button"
        disableTouchRipple={true}
        onClick={this.handleCancelItem}
      >
        <ContentRemoveCircle color={inlineStyles.iconColor} />
      </IconButton>
    )
  }

  render() {
    return this.renderComponent();
  }

}

Form.propTypes = propTypes;

export default Form;