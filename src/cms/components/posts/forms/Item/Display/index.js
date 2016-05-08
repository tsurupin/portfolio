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
        return (
          <Heading
            title={this.props.item.title}
            targetType={this.props.item.targetType}
          />
        );

      case TARGET_TYPES.IMAGE.NAME:
        return <Image image={this.props.item.image} />;
      case TARGET_TYPES.TWITTER.NAME:
        return (
          <Twitter
            authorName={this.props.item.authorName}
            authorScreenName={this.props.item.authorScreenName}
            authorImageURL={this.props.item.authorImageURL}
            sourceURL={this.props.item.sourceURL}
            description={this.props.item.description}/>
        );
      case TARGET_TYPES.QUOTE.NAME:
        return (
          <Quote
            sourceURL={this.props.item.sourceURL}
            description={this.props.item.description}/>
        );
      case TARGET_TYPES.LINK.NAME:
        return (
          <Link
            sourceURL={this.props.item.sourceURL}
            sourceTitle={this.props.item.sourceTitle}/>
        );
      case TARGET_TYPES.TEXT.NAME:
        return (
          <Text
            style={this.props.item.style}
            description={this.props.item.description}/>
        );

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