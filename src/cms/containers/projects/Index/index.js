import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchProjects } from '../../../actions/projects';
import ItemRow from '../../../components/projects/indexes/ItemRow/index';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import styles from './styles.scss';

const inlineStyles = {
  floatButton: {

  }
};

class ProjectsIndex extends Component {
  constructor(props) {
    super(...props);

  }

  componentWillMount() {
    this.props.fetchProjects();
  }
  
  render() {
    //if (this.props.projects.length === 0 ) { return <div></div> }
    return (
      <section className={styles.root}>
        <Link to="/cms/projects/new">
          <FloatingActionButton style={inlineStyles.floatButton} secondary={true}>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
        <h2 className={styles.title}>Projects</h2>
        <p className={styles.description}>Overall description about my projects</p>
        {this.props.projects.map((project, index) => {
          return (
            <ItemRow
              key={index}
              title={project.title}
              description={project.description}
              sourceURL={project.sourceURL}/>
          );
        })}
      </section>
    );
  }
}

ProjectsIndex.propTypes = {
  projects: PropTypes.array.isRequired,
  fetchProjects: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    projects: state.projects.projects
  }
}
export default connect(mapStateToProps, { fetchProjects })(ProjectsIndex)
