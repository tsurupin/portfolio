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
      <li className={styles.root}>
        <Link to={`/posts/${this.props.post.id}`} className={styles.content}>
          <p className={styles.title}>{this.props.post.title}</p>
          <p className={styles.leadSentence}>{this.props.post.leadSentence}</p>
        </Link>
      </li>
    )
  }
};

Item.propTypes = propTypes;
export default Item;
