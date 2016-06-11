import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './styles.scss';


const propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  })
};

class Item extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.title}>
          <Link to={`/posts/${this.props.post.id}`}>
            <p className={styles.text}>{this.props.post.title}</p>
          </Link>
        </div>
      </div>
    )
  }
};

Item.propTypes = propTypes;
export default Item;
