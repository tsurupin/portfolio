import React, { PropTypes } from 'react';
import { TARGET_TYPES } from 'shared/constants';
import Text from 'sharedComponents/posts/Text/index';
import Twitter from 'sharedComponents/posts/Twitter/index';
import Image from 'sharedComponents/posts/Image/index';
import styles from './styles.scss';


const propTypes = { 
  item: PropTypes.object.isRequired
};

function Item({ item }) {
  return (
    <div className={styles.root}>
      {renderComponent(item)}
    </div>
  );
}

function renderComponent(item) {
  switch (item.targetType) {
    case TARGET_TYPES.IMAGE.NAME:
      return <Image {...item} />;
    case TARGET_TYPES.TWITTER.NAME:
      return <Twitter {...item} />;
    case TARGET_TYPES.TEXT.NAME:
      return <Text {...item} />;
    default:
      return;
  }
}

Item.propTypes = propTypes;

export default Item;