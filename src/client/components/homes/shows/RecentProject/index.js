import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import styles from './styles.scss';

const propTypes = {
  project: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })
};

const inlineStyles ={
  button: {

  }
};

class RecentProject extends Component {

  constructor(props){
    super(props)
  }

  render() {
    console.log(this.props.project)
    return(
      <div className={styles.root}>
        <h3 className={styles.title}>RECENT PROJECTS</h3>
        <img 
          className={styles.image}
          src={this.props.project.image} 
          alt={this.props.project.title}
        />
        <Link to="/projects" className={styles.button}>
          <FlatButton label="ALL POSTS" style={inlineStyles.button} />
        </Link>
      </div>
    );
  }
}


RecentProject.propTypes = propTypes;

export default RecentProject;

