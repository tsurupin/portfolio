import React, { PropTypes } from 'react';
import Item from './Item/index';
import styles from './styles';

const propTypes = {
  adminPath: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

function Tags({ tags, adminPath }) {
  return (
    <section className={styles.root}>
      {tags.map((tag) => {
        return (
          <Item
            key={tag.id}
            adminPath={adminPath}
            {...tag}
          />
        );
      })}
    </section>
  );
}

Tags.propTypes = propTypes;
export default Tags;
