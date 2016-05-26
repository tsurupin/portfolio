import React, { Component, PropTypes } from 'react';
import { TARGET_TYPES } from '../../../../../constants';
import RaisedButton from 'material-ui/RaisedButton';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import Heading from './Heading/index';
import Image from './Image/index';
import Twitter from './Twitter/index';
import Quote from './Quote/index';
import Link from './Link/index';
import Text from './Text/index';
import styles from './shared/styles.scss';

class PostItemForm extends Component {
  constructor(props) {
    super(...props);

    this.handleUpdateItem = this.handleUpdateItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
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

  renderComponent() {
    switch (this.props.item.targetType) {
      case TARGET_TYPES.HEADING.NAME:
      case TARGET_TYPES.SUB_HEADING.NAME:
        return (
          <Heading
            formKey={this.props.sortRank.toString()}
            targetType={this.props.item.targetType}
            initialValues={{title: this.props.item.title}}
            handleUpdateItem={this.handleUpdateItem}
            cancelButton={this.renderCancelButton()}
          />
        );
      case TARGET_TYPES.IMAGE.NAME:
        return (
          <Image
            formKey={this.props.sortRank.toString()}
            targetType={this.props.item.targetType}
            image={this.props.item.image}
            handleUpdateItem={this.handleUpdateItem}
            cancelButton={this.renderCancelButton()}
          />
        );
      case TARGET_TYPES.TWITTER.NAME:
        return (
          <Twitter
            formKey={this.props.sortRank.toString()}
            targetType={this.props.item.targetType}
            initialValues={{sourceURL: this.props.item.sourceURL}}
            sortRank={this.props.sortRank}
            handleUpdateItem={this.handleUpdateItem}
            cancelButton={this.renderCancelButton()}
          />
        );
      case TARGET_TYPES.QUOTE.NAME:
        return (
          <Quote
            formKey={this.props.sortRank.toString()}
            targetType={this.props.item.targetType}
            initialValues={{ sourceURL: this.props.item.sourceURL, description: this.props.item.description }}
            handleUpdateItem={this.handleUpdateItem}
            cancelButton={this.renderCancelButton()}
          />
        );
      case TARGET_TYPES.LINK.NAME:
        return (
          <Link
            formKey={this.props.sortRank.toString()}
            targetType={this.props.item.targetType}
            initialValues={{ sourceURL: this.props.item.sourceURL, sourceTitle: this.props.item.sourceTitle }}
            handleUpdateItem={this.handleUpdateItem}
            cancelButton={this.renderCancelButton()}
          />
        );
      case TARGET_TYPES.TEXT.NAME:
        return (
          <Text
            targetType={this.props.item.targetType}
            description={this.props.item.description}
            handleUpdateItem={this.handleUpdateItem}
            cancelButton={this.renderCancelButton()}
          />
        );
      default:
        return;
    }
  }
  

  renderCancelButton() {
    return (
      <RaisedButton
        className={styles.cancelButton}
        label="Cancel"
        labelPosition="after"
        icon={<ContentRemoveCircle />}
        onClick={this.handleDeleteItem}
      />
    );
  }

  render() {
    return this.renderComponent();
  }

}

PostItemForm.propTypes = {
  item: PropTypes.shape({
    targetType: PropTypes.string.isRequired,
    isNew: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    title: PropTypes.string
  }).isRequired,
  sortRank: PropTypes.number.isRequired,
  handleUpdateItem: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired
};

export default PostItemForm;