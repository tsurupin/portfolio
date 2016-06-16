import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './styles.scss';

const propTypes = {
  project: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })
};

class RecentProject extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return(
      <div className={styles.root}>
        <h3 className={styles.title}>RECENT PROJECTS</h3>
        <img 
          className={styles.image}
          src={this.props.project.image} 
          alt={this.props.project.title}
        />
        <Link to="/projects" className={styles.button}>
          ALL PROJECTS
        </Link>
      </div>
    );
  }
}


RecentProject.propTypes = propTypes;

export default RecentProject;

