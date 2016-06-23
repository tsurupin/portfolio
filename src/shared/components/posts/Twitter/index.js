import React, { PropTypes } from 'react';
import styles from './styles.scss';
import TweetEmbed from  './TweetEmbed/index'

const propTypes = {
  twitterId: PropTypes.string.isRequired
};

function Twitter({twitterId}){
  return (
      <div className={styles.root}>
        <TweetEmbed id={twitterId}/>
      </div>
  );
}


Twitter.propTypes = propTypes;

export default Twitter

