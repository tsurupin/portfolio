import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './styles.scss';
import LabelOutline from 'material-ui/svg-icons/action/label-outline';

const inlineStyles ={
  tagIcon: {
    marginLeft: 0,
    width: 18,
    height: 18
  }
};

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
    return (
        <div className={styles.root}>
          <Link to={`/posts/${this.props.post.id}`}>
            <p className={styles.title}>{this.props.post.title}</p>
            <p className={styles.leadSentence}>{this.props.post.leadSentence}</p>
          </Link>
          {this.props.post.tags.map((tag) => {
          return (
            <Link key={tag.id} to={`/posts?tag=${tag.id}`} className={styles.tagItem}>
              <LabelOutline color='#00AB6B' style={inlineStyles.tagIcon}/>
              <span className={styles.tagName}>{tag.name}</span>
            </Link>
          )})}
        <div className={styles.publishDate}>{this.props.post.publishedAt}</div>
      </div>
    )
  }
};

Item.propTypes = propTypes;
export default Item;
