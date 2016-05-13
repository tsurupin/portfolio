import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchProjects } from '../../../actions/projects';

class ProjectsIndex extends Component {
  constructor(props) {
    super(...props);


  }

  componentWillMount() {
    this.props.fetchProjects();
  }

  renderProject() {
    console.log(this.props.projects.length)
    return(
      this.props.projects.map((project, index) => {
        return (
          <div
            style={{height: 100, color: 'red', background: 'white'}}
            key={index}>
            {project.title}
          </div>);
      })
    )
  }

  render() {
    return (
      <div>
        {this.renderProject()}
      </div>
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
