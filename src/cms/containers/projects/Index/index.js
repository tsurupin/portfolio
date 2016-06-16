import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchProjects, toggleProject, deleteProject } from '../../../actions/projects';
import ItemRow from '../../../components/projects/indexes/ItemRow/index';
import Tooltip from '../../../components/projects/indexes/Tooltip/index';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import styles from './styles.scss';


const propTypes =  {
  projects: PropTypes.array.isRequired,
  fetchProjects: PropTypes.func.isRequired
};

const inlineStyles = {
  submitButton: {
    position: 'absolute',
    bottom: 10,
    right: 15
  },
  indicator: {
    display: 'inline-block',
    position: 'relative'
  }
};


class ProjectIndex extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.handleEdit   = this.handleEdit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    this.props.fetchProjects();
  }

  componentWillReceiveProps(nextProps) {

  }

  handleEdit(id) {
    this.context.router.push(`/cms/projects/${id}/edit`)
  }
  
  handleToggle(id) {
    this.props.toggleProject(id);
  }
  
  handleDelete(id) {
    this.props.deleteProject(id);
  }
  
  render() {

    console.log(this.props.projects)
    // TODO: show nice apology message when there is no project
    //if (this.props.projects.length === 0 ) { return <div></div> }
    return (
      <section className={styles.root}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.description}>Overall description about my projects</p>
        <ul>
          {this.props.projects.map((project) => {
          return (
            <li key={project.id}>
              <Tooltip
                id={project.id}
                accepted={project.accepted}
                handleEdit={this.handleEdit}
                handleToggle={this.handleToggle}
                handleDelete={this.handleDelete}
              />
              <ItemRow
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                sourceUrl={project.sourceUrl}
                sampleUrl={project.sampleUrl}
              />
            </li>
          );
        })}
        </ul>
        <Link to="/cms/projects/new">
          <FloatingActionButton style={inlineStyles.floatButton} secondary={true}>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
      </section>
    );
  }
}

ProjectIndex.propTypes = propTypes;
function mapStateToProps(state) {
  return {
    projects: state.projects.projects
  }
}
export default connect(mapStateToProps, { fetchProjects, toggleProject, deleteProject })(ProjectIndex)
