import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './styles.scss';

const propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

class Tag extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Link to={`/projects?tag=${this.props.id}`} className={styles.root}>
        <span className={styles.name}>{this.props.name}</span>
      </Link>
    )
  }
}

Tag.propTypes = propTypes;

export default Tag;