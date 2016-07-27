import React, { PropTypes } from 'react';
import TARGET_TYPES from 'shared/constants/targetTypes';
import Text from 'shared/components/posts/Text/index';
import Twitter from 'shared/components/posts/Twitter/index';
import Image from 'shared/components/posts/Image/index';

const propTypes = {
  item: PropTypes.shape({
    twitterId: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    caption: PropTypes.string,
  }),
};

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

function Item({ item }) {
  return <div>{renderComponent(item)}</div>;
}


Item.propTypes = propTypes;

export default Item;
