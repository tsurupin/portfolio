import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../../actions/posts';
import { Link } from 'react-router';
import Item from '../../../components/posts/indexes/Item/index';
import styles from'./styles.scss';
import Infinite from 'react-infinite';
class PostsIndex extends Component {
  
  constructor(props) {
    super(props);

    this.handleInfiniteLoad = this.handleInfiniteLoad.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentWillMount() {
    this.props.fetchPosts();
  }
  
  handleInfiniteLoad() {
    if (this.props.total - (this.props.limit*this.props.page) > 0) {
      this.props.fetchPosts(this.props.page + 1);
    }
  }
  
  handleSearch(props) {
    this.props.fetchPosts(props);
  }

  renderItems() {
    return (
      <Infinite
        infiniteLoadBeginEdgeOffset={400}
        onInfiniteLoad={this.handleInfiniteLoad}
        containerHeight={700}
        elementHeight={100}
        useWindowAsScrollContainer
      >
        {this.props.posts.map((post, index) => {
          return (
            <Item
              key={index}
              post={post}
              handleSearch={this.handleSearch}
            />
          );
        })}
      </Infinite>
    );
  }

  render() {
    if(this.props.posts.length === 0 ) { return <div></div> }
    return (
      <section className={styles.root}>
        {this.renderItems()}
      </section>
    );
  }
}

PostsIndex.propTypes = {
  posts: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  fetchPosts: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return { 
    posts: state.posts.posts, 
    page: state.posts.page, 
    limit: state.posts.limit, 
    total: state.posts.total 
  }
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);