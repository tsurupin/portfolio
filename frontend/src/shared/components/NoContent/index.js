import React, { PropTypes } from 'react';
import styles from './styles';

const propTypes = {
  pageName: PropTypes.string.isRequired,
};

function NoContent({ pageName }) {
  return (
    <div className={styles.root}>
      <p className={styles.text}>{`we couldn't find any ${pageName}`}</p>
    </div>
  );
}

NoContent.propTypes = propTypes;
export default NoContent;
