import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import styles from './styles.scss';

class Item extends Component {

  constructor(props) {
    super(props);
  }

  handleClickTag(tagId) {
    this.props.handleSearch({tagId})
  }
  
  render() {
    return (
      <Link to={`/posts/${this.props.post.id}`}>
        <div className={styles.root}>
          <div className={styles.title}>
            <div className={styles.text}>{this.props.post.title}</div>
            <div className={styles.tagList}>
              {this.props.post.tags.map((tag) => {
              return (
                <span 
                  key={tag.id} 
                  className={styles.tagItem} 
                  onClick={this.handleClickTag.bind(tag.id, this)}
                >
                  {tag.name}
                </span>
              )}
              )}
            </div>
          </div>
          <div className={styles.publishDate}>{this.props.post.publishedAt}</div>
        </div>
      </Link>
    )
  }
};

Item.propTypes = {
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
  }).isRequired,
  handleSearch: PropTypes.func.isRequired
};

export default Item;
