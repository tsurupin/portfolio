import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { fetchPosts } from 'client/actions/posts';
import Item from 'client/components/posts/indexes/Item/index';
import NoContent from 'shared/components/NoContent/index';
import shallowCompare from 'react-addons-shallow-compare';
import Infinite from 'react-infinite';
import styles from './styles';


const propTypes = {
  params: PropTypes.object,
  location: PropTypes.object,
  posts: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  finishLoading: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    posts: state.posts.posts,
    loading: state.posts.loading,
    page: state.posts.page,
    limit: state.posts.limit,
    total: state.posts.total,
  };
}

class PostIndex extends Component {

  constructor(props) {
    super(props);

    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount() {
    const params = { page: 1 };
    if (this.props.hasOwnProperty('location')) {
      params.tagId = this.props.location.query['tag-id'];
    }
    this.props.fetchPosts(params)
      .then(() => {
        this.props.finishLoading();
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query['tag-id'] !== this.props.location.query['tag-id']) {
      nextProps.fetchPosts({ page: 1, tagId: nextProps.location.query['tag-id'] });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleLoad() {
    if (this.canLoad) {
      const params = { page: this.props.page + 1 };

      if (this.props.params.hasOwnProperty('location')) {
        params.tagId = this.props.params.location.query['tag-id'];
      }
      this.props.fetchPosts(params);
    }
  }

  get canLoad() {
    return (this.props.total - (this.props.limit * this.props.page)) > 0;
  }

  renderItems() {
    return (
      <Infinite
        className={styles.list}
        infiniteLoadBeginEdgeOffset={500}
        onInfiniteLoad={this.handleLoad}
        containerHeight={1000}
        preloadBatchSize={Infinite.containerHeightScaleFactor(10)}
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
    if (this.props.loading) {
      return (
        <section>
          <Helmet title="Posts" />
        </section>
      );
    }

    if (!this.props.posts.length) {
      return (
        <section >
          <Helmet title="Posts" />
          <NoContent pageName="posts" />
        </section>
      );
    }

    return (
      <section>
        <Helmet title="Posts" />
        <h1 className={styles.heading}>Posts</h1>
        {this.renderItems()}
      </section>
    );
  }
}

PostIndex.propTypes = propTypes;

export default connect(mapStateToProps, { fetchPosts })(PostIndex);
