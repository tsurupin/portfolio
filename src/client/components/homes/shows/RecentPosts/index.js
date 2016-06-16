import React, { Component, PropTypes } from 'react';
import Item from './Item/index';
import { Link } from 'react-router';
import styles from './styles.scss';

const propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired
    })
  )
};

class RecentProjects extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className={styles.root}>
        <h3 className={styles.title}>RECENT POSTS</h3>
        <ul className={styles.list} >
          {this.props.posts.map(post => {
            return <Item key={post.id} post={post} />;
          })}
        </ul>
        <Link to="/posts" className={styles.button}>
          ALL POSTS
        </Link>
      </div>
    );
  }

}

RecentProjects.propTypes = propTypes;

export default RecentProjects;