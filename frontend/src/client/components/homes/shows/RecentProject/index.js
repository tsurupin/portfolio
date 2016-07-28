import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './styles';

const propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

function RecentProject({ image, title }) {
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>RECENT PROJECTS</h3>
      <img
        className={styles.image}
        src={image}
        alt={title}
      />
      <Link to="/projects" className={styles.button}>
        ALL PROJECTS
      </Link>
    </div>
  );
}

RecentProject.propTypes = propTypes;

export default RecentProject;

