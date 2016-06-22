import React, { PropTypes } from 'react';
import TARGET_TYPES from 'shared/constants/target_types';
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
    case TARGET_TYPES.IMAGE:
      return <Image {...item} />;
    case TARGET_TYPES.TWITTER:
      return <Twitter {...item} />;
    case TARGET_TYPES.TEXT:
      return <Text {...item} />;
    default:
      return;
  }
}

Item.propTypes = propTypes;

export default Item;