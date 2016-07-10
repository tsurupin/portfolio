import React, { PropTypes } from 'react';
import Item from './Item/index';
import { Link } from 'react-router';
import styles from './styles';

const propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      leadSentence: PropTypes.string,
    })
  ),
};

function RecentProjects({ posts }) {
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>RECENT POSTS</h3>
      <ul className={styles.list} >
        {posts.map(post => {
          return <Item key={post.id} {...post} />;
        })}
      </ul>
      <Link to="/posts" className={styles.button}>
        ALL POSTS
      </Link>
    </div>
  );
}

RecentProjects.propTypes = propTypes;

export default RecentProjects;
