import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';

class Link extends Component {

  constructor(props) {
    super(...props);
  }

  render() {
    return (
      <div className={styles.root}>
        <a
          className={styles.title}
          href={this.props.sourceUrl}
          target="_blank"
        >
          {this.props.sourceTitle}
        </a>
      </div>
    );
  }
}

Link.propTypes = {
  sourceUrl: PropTypes.string.isRequired,
  sourceTitle: PropTypes.string.isRequired
};

export default Link;


