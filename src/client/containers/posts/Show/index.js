import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from 'clientActions/posts';
import Tag from 'clientComponents/posts/shows/Tag/index';
import Item from 'clientComponents/posts/shows/Item/index';
import ActionSchedule from 'material-ui/svg-icons/action/schedule'
import styles from './styles.scss';

const inlineStyles = {
  dateTimeLogo:{
    verticalAlign: 'middle',
    height: 18,
    width: 18
  }
};

class Show extends  Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }
  
  handleSearch(tagId) {
    
    
  }
  
  componentWillMount() {
    this.props.fetchPost(this.props.params.id)
  }

  renderTags() {
    console.log(this.props.tags)
    return(
      <div>
        return(
        {this.props.tags.map(tag => {
        return(
          <Tag
            key={tag.id}
            id={tag.id}
            name={tag.name}
            handleSearch={this.handleSearch}
          />
        )})})
        </div>
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
    console.log(this.renderTags())
    return (
      <section className={styles.root}>
        <h1 className={styles.title}>{this.props.post.title} </h1>
        <div className={styles.dateTime}>
          <ActionSchedule color='#8F8F8F' style={inlineStyles.dateTimeLogo} />
          <span className={styles.time}>{this.props.post.publishedAt}</span>
        </div>
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