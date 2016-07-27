import React, { PropTypes } from 'react';
import TweetEmbed from './TweetEmbed/index';
import styles from './styles';

const propTypes = {
  twitterId: PropTypes.string.isRequired,
};

function Twitter({ twitterId }) {
  return (
    <div className={styles.root}>
      <TweetEmbed id={twitterId} />
    </div>
  );
}


Twitter.propTypes = propTypes;

export default Twitter;

