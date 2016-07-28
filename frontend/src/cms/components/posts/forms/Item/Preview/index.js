import React, { Component, PropTypes } from 'react';
import TARGET_TYPES from 'shared/constants/targetTypes';
import Tooltip from './Tooltip/index';
import Image from 'shared/components/posts/Image/index';
import Twitter from 'shared/components/posts/Twitter/index';
import Text from 'shared/components/posts/Text/index';

const propTypes = {
  sortRank: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  handleMoveItem: PropTypes.func.isRequired,
  handleUpdateItem: PropTypes.func.isRequired
};

class Preview extends Component {
  constructor(props) {
    super(props);

    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  handleUpdateItem() {
    this.props.handleUpdateItem(this.props.sortRank, { ...this.props.item, editing: true })
  }

  renderComponent() {
    switch (this.props.item.targetType) {
      case TARGET_TYPES.IMAGE:
        return <Image {...this.props.item} />;
      case TARGET_TYPES.TWITTER:
        return <Twitter {...this.props.item} />;
      case TARGET_TYPES.TEXT:
        return <Text {...this.props.item} />;
      default:
        return;
    }
  }

  render() {
    return (
      <div>
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

Preview.propTypes = propTypes;

export default Preview