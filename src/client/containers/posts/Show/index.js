import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from 'clientActions/posts';
import Tag from 'clientComponents/posts/shows/Tag/index';
import Item from 'clientComponents/posts/shows/Item/index';
import Pagination from 'clientComponents/posts/shows/Pagination/index';
import ActionSchedule from 'material-ui/svg-icons/action/schedule'
import styles from './styles.scss';

const inlineStyles = {
  dateTimeLogo:{
    verticalAlign: 'middle',
    height: 18,
    width: 18
  }
};

class PostShow extends  Component {

  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.props.fetchPost(this.props.params.id)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      nextProps.fetchPost(nextProps.params.id)
     }
  }

  renderTags() {
    return(
      <section className={styles.tagContainer}>
        {this.props.tags.map(tag => {
        return(
          <Tag
            key={tag.id}
            id={tag.id}
            name={tag.name}

          />
        );
        })}
      </section>
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
  
  renderPagination() {
    if (this.props.post.prevId || this.props.post.nextId) {
      return (
        <Pagination
          prevId={this.props.post.prevId}
          prevTitle={this.props.post.prevTitle}
          nextId={this.props.post.nextId}
          nextTitle={this.props.post.nextTitle}
        />
      );
    }
  }
  
  render() {
    return (
      <section className={styles.root}>
        <h1 className={styles.title}>{this.props.post.title} </h1>
        <div className={styles.dateTime}>
          <ActionSchedule color='#8F8F8F' style={inlineStyles.dateTimeLogo} />
          <span className={styles.time}>{this.props.post.publishedAt}</span>
        </div>
        {this.renderItems()}
        {this.renderTags()}
        {this.renderPagination()}
      </section>
    )
  }
}

PostShow.propTypes = {
  post : PropTypes.shape({
    title: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
    prevId: PropTypes.number,
    prevTitle: PropTypes.string,
    nextId: PropTypes.number,
    nextTitle: PropTypes.string
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

export default connect(mapStateToProps, { fetchPost })(PostShow)