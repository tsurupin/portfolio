import React, { Component, PropTypes } from 'react';
import { TARGET_TYPES } from '../../../../../constants';
import Tooltip from './Tooltip/index';
import Image from 'sharedComponents/posts/Image/index';
import Twitter from 'sharedComponents/posts/Twitter/index';
import Text from 'sharedComponents/posts/Text/index';
import styles from './styles.scss';

const propTypes = {
  sortRank: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  handleMoveItem: PropTypes.func.isRequired,
  handleUpdateItem: PropTypes.func.isRequired
};

class PostItemCell extends Component {
  constructor(props) {
    super(props);

    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  handleUpdateItem() {
    this.props.handleUpdateItem(this.props.sortRank, { ...this.props.item, editing: true })
  }

  renderComponent() {
    switch (this.props.item.targetType) {
      case TARGET_TYPES.IMAGE.NAME:
        return <Image {...this.props.item} />;
      case TARGET_TYPES.TWITTER.NAME:
        return <Twitter {...this.props.item} />;
      case TARGET_TYPES.TEXT.NAME:
        return <Text {...this.props.item} />;
      default:
        return;
    }
  }

  render() {
    return (
      <div className={styles.root}>
        <Tooltip
          sortRank={this.props.sortRank}
          totalCount={this.props.totalCount}
          handleUpdateItem={this.handleUpdateItem}
          handleDeleteItem={this.props.handleDeleteItem}
          handleMoveItem={this.props.handleMoveItem}
        />
        {this.renderComponent()}
      </div>
    );
  }
}

PostItemCell.propTypes = propTypes;

export default PostItemCell