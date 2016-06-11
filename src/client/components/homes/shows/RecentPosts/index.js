import React, { Component, PropTypes } from 'react';
import Item from './Item/index';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import styles from './styles.scss';

const propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired
    })
  )
};

const inlineStyles ={
  button: {

  }
};

class RecentProjects extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className={styles.root}>
        <h3 className={styles.title}>RECENT POSTS</h3>
        {this.props.posts.map(post => {
          return <Item key={post.id} post={post} />;
        })}
        <Link to="/posts" className={styles.button}>
          <FlatButton label="ALL POSTS" style={inlineStyles.button} />
        </Link>
      </div>
    );
  }

}

RecentProjects.propTypes = propTypes;

export default RecentProjects;