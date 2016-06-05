import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './styles.scss';

class Tag extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <Link to={`/posts?tag=${this.props.id}`} className={styles.root}>
        {this.props.name}
      </Link>
    );
  }
}

Tag.propTpes = {
  id: PropTypes.number.isRequired,
  name : PropTypes.string.isRequired
};

export default Tag