import React, { PropTypes } from 'react';
import TextDisplay from 'shared/components/textEditors/Display/index';

const propTypes = {
  description: PropTypes.string.isRequired,
};

function Text({ description }) {
  return <TextDisplay description={description} />;
}

Text.propTypes = propTypes;

export default Text;
