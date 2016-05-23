import React, { Component, PropTypes } from 'react';
import { TARGET_TYPES } from '../../../../../constants';
import Tooltip from './Tooltip/index';
import Heading from './Heading/index';
import Image from './Image/index';
import Twitter from './Twitter/index';
import Quote from './Quote/index';
import Link from './Link/index';
import Text from './Text/index';
import styles from './styles.scss';

export default class PostItemCell extends Component {
  constructor(props) {
    super(...props);
    this.state = { hovering: false };

    this.handleUpdateItem = this.handleUpdateItem.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleUpdateItem() {
    this.props.handleUpdateItem(this.props.sortRank, { ...this.props.item, editing: true })
  }

  handleMouseEnter() {
    if (this.state.hovering) {
      return;
    }
    this.setState({ hovering: true })
  }

  handleMouseLeave() {
    if (!this.state.hovering) {
      return;
    }
    this.setState({ hovering: false })
  }

  renderComponent() {
    switch (this.props.item.targetType) {
      case TARGET_TYPES.HEADING.NAME:
      case TARGET_TYPES.SUB_HEADING.NAME:
        return <Heading {...this.props.item} />;
      case TARGET_TYPES.IMAGE.NAME:
        return <Image {...this.props.item} />;
      case TARGET_TYPES.TWITTER.NAME:
        return <Twitter {...this.props.item} />;
      case TARGET_TYPES.QUOTE.NAME:
        return <Quote {...this.props.item} />;
      case TARGET_TYPES.LINK.NAME:
        return <Link {...this.props.item} />;
      case TARGET_TYPES.TEXT.NAME:
        return <Text {...this.props.item} />;
      default:
        return;
    }
  }

  renderTooltip() {
    // if (!this.state.hovering) {
    //   return;
    // }
    return (
      <Tooltip
        sortRank={this.props.sortRank}
        totalCount={this.props.totalCount}
        handleUpdateItem={this.handleUpdateItem}
        handleDeleteItem={this.props.handleDeleteItem}
        handleMoveItem={this.props.handleMoveItem}
      />
    )
  }

  render() {
    return (
      <div className={styles.root} 
           onMouseEnter={this.handleMouseEnter} 
           onMouseLeave={this.handleMouseLeave}
      >
        {this.renderTooltip()}
        {this.renderComponent()}
      </div>
    );
  }
}

PostItemCell.propTypes = {
  sortRank: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  handleMoveItem: PropTypes.func.isRequired,
  handleUpdateItem: PropTypes.func.isRequired
};