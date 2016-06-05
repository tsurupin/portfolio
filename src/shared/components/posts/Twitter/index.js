import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';
import TweetEmbed from  './TweetEmbed/index'

class Twitter extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className={styles.root}>
          <TweetEmbed id={this.props.twitterId}/>
        </div>
    );
  }
}

Twitter.propTypes = {
  twitterId: PropTypes.string.isRequired
};


export default Twitter

