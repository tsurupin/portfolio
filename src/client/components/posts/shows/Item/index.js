import React, { Component, PropTypes } from 'react';
import { TARGET_TYPES } from 'shared/constants';
import Text from 'sharedComponents/posts/Text/index';
import Twitter from 'sharedComponents/posts/Twitter/index';
import Image from 'sharedComponents/posts/Image/index';
import styles from './styles.scss';


const propTypes = { 
  item: PropTypes.object.isRequired
};

class Item extends Component {
  constructor(props) {
    super(props);
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
        {this.renderComponent()}
      </div>
    );
  }
}

Item.propTypes = propTypes;

export default Item;