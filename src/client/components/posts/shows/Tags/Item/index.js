import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './styles.scss';

const propTypes = {
  id: PropTypes.number.isRequired,
  name : PropTypes.string.isRequired
};

function Item({ adminPath, id, name }) {
  return(
    <Link to={`${adminPath}/posts?tag=${id}`} className={styles.root}>
      {name}
    </Link>
  );

}

Item.propTpes = propTypes;

export default Item