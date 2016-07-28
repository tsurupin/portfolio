import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './styles';
import TagList from 'shared/components/TagList/index';

const propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  leadSentence: PropTypes.string,
  publishedAt: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

function Item({ id, title, leadSentence, publishedAt, tags }) {
  return (
    <div className={styles.root}>
      <Link to={`/posts/${id}`}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.leadSentence}>{leadSentence}</p>
      </Link>
      <TagList tags={tags} path="/posts" />
      <div className={styles.publishDate}>{publishedAt}</div>
    </div>
  );
}

Item.propTypes = propTypes;
export default Item;
