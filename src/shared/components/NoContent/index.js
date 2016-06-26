import React, { PropTypes } from 'react';
import styles from './styles';

const propTypes = {
  name: PropTypes.string.isRequired
};

function NoContent({ name }) {
  return (
    <div className={styles.root}>
      <p className={styles.text}>{`we couldn't find any ${name}`}</p>
    </div>
  )
}

NoContent.propTypes = propTypes;
export default NoContent;