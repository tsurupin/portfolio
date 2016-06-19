import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './styles.scss';
import TagList from 'sharedComponents/TagList/index';

const propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    publishedAt: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }).isRequired
};

class Item extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    console.log(this.props.post)
    return (
        <div className={styles.root}>
          <Link to={`/posts/${this.props.post.id}`}>
            <h3 className={styles.title}>{this.props.post.title}</h3>
            <p className={styles.leadSentence}>{this.props.post.leadSentence}</p>
          </Link>
          <TagList tags={this.props.post.tags} path="posts" />
        <div className={styles.publishDate}>{this.props.post.publishedAt}</div>
      </div>
    )
  }
};

Item.propTypes = propTypes;
export default Item;
