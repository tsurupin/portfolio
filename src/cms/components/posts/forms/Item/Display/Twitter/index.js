import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import styles from './styles.scss';

class Twitter extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <blockquote className={styles.root}>
          <a className={styles.authorName}
             href={this.props.sourceUrl}
             ref="nofollow"
             target="_blank">
              <div className={styles.header}>
                <Avatar src={this.props.authorImageUrl} />
                {this.props.authorName}
                <p className={styles.screenName}>{`@${this.props.authorScreenName}`}</p>
              </div>
            <cite className={styles.description}>{this.props.description}</cite>
          </a>
        </blockquote>
    );
  }
}

Twitter.propTypes = {
  authorName: PropTypes.string.isRequired,
  authorScreenName: PropTypes.string,
  authorImageUrl: PropTypes.string.isRequired,
  sourceUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};


export default Twitter

