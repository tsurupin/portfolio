import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchProjects } from '../../../actions/projects';
import ItemRow from '../../../components/projects/indexes/ItemRow/index';

class ProjectsIndex extends Component {
  constructor(props) {
    super(...props);


  }

  componentWillMount() {
    this.props.fetchProjects();
  }
  
  render() {
    return (
      <section>
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
