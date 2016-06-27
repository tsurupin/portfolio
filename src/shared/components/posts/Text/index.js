import React, { PropTypes } from 'react';
import TextDisplay from 'shared/components/textEditors/Display/index';
import styles from './styles';

const propTypes = {
  description: PropTypes.string.isRequired
};

function Text({ description }) {
  return (
    <div className={styles.root}>
      <TextDisplay description={description} />
    </div>
  );
}

Text.propTypes = propTypes;

export default Text;
