import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from 'clientActions/posts';
import Tag from 'clientComponents/posts/shows/Tag/index';
import Item from 'clientComponents/posts/shows/Item/index';

import styles from './styles.scss';

class Show extends  Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }
  
  handleSearch() {
    
  }
  
  componentWillMount() {
    this.props.fetchPost(this.props.params.id)
  }

  renderTags() {
    return(
      this.props.tags.map(tag => {
        return(
          <Tag
            key={tag.id}
            id={tag.id}
            name={tag.name}
            handleSearch={this.handleSearch}
          />
        )
      })
    );
  }

  renderItems() {
    return(
      this.props.items.map(item => {
        return (
          <Item
            key={item.id}
            item={item}
          />
        )
      })
    )
  }

  render() {
    return (
      <section className={styles.root}>
        <h1 className={styles.title}>{this.props.post.title} </h1>
        <div className={styles.dateTime}> {this.props.post.publishedAt} </div>
        {this.renderItems()}
        {this.renderTags()}
      </section>
    )
  }
}

Show.propTypes = {
  post : PropTypes.shape({
    title: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired
  }).isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  fetchPost: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    post: state.posts.post,
    tags: state.tags,
    items: state.items
  }
}

export default connect(mapStateToProps, { fetchPost })(Show)