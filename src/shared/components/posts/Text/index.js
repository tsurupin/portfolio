import React, { PropTypes } from 'react';
import TextDisplay from '../../textEditors/Display/index';
import styles from './styles.scss';

const propTypes = {
  description: PropTypes.string.isRequired
};

function Text({ description}) {
  return (
    <div className={styles.root}>
      <TextDisplay description={description} />
    </div>
  );
}

Text.propTypes = propTypes;

export default Text;
