import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';

export default class Quote extends Component {

  constructor(props) {
    super(...props);
  }

  render() {
    return (
      <div className={styles.root}>
        <a href={this.props.sourceURL} target="_blank">
          <blockquote className={styles.block}>
            <p className={styles.description}>{this.props.description}</p>
          </blockquote>
        </a>
      </div>
    );
  }
}

Quote.propTypes = {
  sourceURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};


