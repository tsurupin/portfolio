import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './styles';


const propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  leadSentence: PropTypes.string,
};

function Item({ id, title, leadSentence }) {
  return (
    <li className={styles.root}>
      <Link to={`/posts/${id}`} className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.leadSentence}>{leadSentence}</p>
      </Link>
    </li>
  );
}

Item.propTypes = propTypes;
export default Item;
