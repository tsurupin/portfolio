import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from 'client/actions/posts';
import Tags from 'client/components/posts/shows/Tags/index';
import Item from 'client/components/posts/shows/Item/index';
import Pagination from 'client/components/posts/shows/Pagination/index';
import ActionSchedule from 'material-ui/svg-icons/action/schedule'
import styles from './styles.scss';

const cmsRegexp = /^(\/cms)*/;
const propTypes = {
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
    tags: state.tags.tags,
    items: state.items
  }
}

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
      .then(() => this.props.finishLoading());
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      nextProps.fetchPost(nextProps.params.id)
     }
  }

  get adminPath() {
    const paths = this.props.location.pathname.match(cmsRegexp);
    return paths[0] ? paths[0] : '';
  }
  
  renderPagination() {
    if (this.props.post.prevId || this.props.post.nextId) {
      return (
        <Pagination
          adminPath={this.adminPath}
          prevId={this.props.post.prevId}
          prevTitle={this.props.post.prevTitle}
          nextId={this.props.post.nextId}
          nextTitle={this.props.post.nextTitle}
        />
      );
    }
  }
  
  render() {
    if (!this.props.post) { return <section className={styles.root} /> }
    return (
      <section className={styles.root}>
        <div className={styles.heading}>
          <h1 className={styles.title}>{this.props.post.title} </h1>
          <div className={styles.dateTime}>
            <ActionSchedule color='#8F8F8F' style={inlineStyles.dateTimeLogo} />
            <span className={styles.time}>{this.props.post.publishedAt}</span>
          </div>
        </div>
        {this.props.items.map((item) => {
          return <Item key={item.id} item={item} />
        })}
        <Tags adminPath={this.adminPath} tags={this.props.tags} />
        {this.renderPagination()}
      </section>
    )
  }
}

PostShow.propTypes = propTypes;

export default connect(mapStateToProps, { fetchPost })(PostShow)