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
            <p className={styles.text}>{this.props.post.title}</p>
            <div className={styles.tagList}>
              {this.props.post.tags.map((tag) => {
              return (
                <div
                  key={tag.id} 
                  className={styles.tagItem}
                  onClick={this.handleClickTag.bind(tag.id, this)} >
                  <LabelOutline color='#307EA9' style={inlineStyles.tagIcon}/>
                  <span className={styles.tagName}>{tag.name}</span>
                </div>
              )})}
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
