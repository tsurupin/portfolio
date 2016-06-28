import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from 'client/actions/posts';
import Item from 'client/components/posts/indexes/Item/index';
import NoContent from 'shared/components/NoContent/index';
import shallowCompare from 'react-addons-shallow-compare';
import Infinite from 'react-infinite';
import styles from'./styles';



const propTypes = {
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

class PostIndex extends Component {
  
  constructor(props) {
    super(props);
    this.state = { loading: true };

    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount() {
    let params = { page: 1 };
    if (this.props.hasOwnProperty("location")) {
      params.tag = this.props.location.query.tag
    }
    this.props.fetchPosts(params)
      .then(() => {
        this.props.finishLoading();
        this.setState({ loading: false })
      });
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.location.query.tag !== this.props.location.query.tag) {
      nextProps.fetchPosts({ page: 1, tag: nextProps.location.query.tag })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  
  handleLoad() {
    if (this.canLoad) {
      let params = { page: this.props.page + 1 };
      
      if (this.props.params.hasOwnProperty("location")) {
        params.tag = this.props.params.location.query.tag
      }
      this.props.fetchPosts(params);
    }
  }

  get canLoad() {
    return (this.props.total - (this.props.limit * this.props.page)) > 0
  }

  renderItems() {
    return (
      <Infinite
        className={styles.list}
        infiniteLoadBeginEdgeOffset={400}
        onInfiniteLoad={this.handleLoad}
        containerHeight={700}
        elementHeight={100}
        useWindowAsScrollContainer
      >
        {this.props.posts.map((post) => {
          return <Item key={post.id} {...post} />;
        })}
      </Infinite>
    );
  }

  render() {
    if (this.state.loading) {
      return <section />
    }

    if(this.props.posts.length) {
      return (
        <section >
          <NoContent pageName="posts" />
        </section>
      )
    }
   
    return (
      <section>
        <h1 className={styles.heading}>Posts</h1>
        {this.renderItems()}
      </section>
    );
  }
}

PostIndex.propTypes = propTypes;

export default connect(mapStateToProps, { fetchPosts })(PostIndex);