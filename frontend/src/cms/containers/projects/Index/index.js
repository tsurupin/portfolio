import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchProjects, toggleProject } from 'cms/actions/projects';
import Item from 'cms/components/projects/indexes/Item/index';
import NoContent from 'shared/components/NoContent/index';
import {
  Table,
  TableHeaderColumn,
  TableHeader,
  TableBody,
  TableRow,
} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import inlineStyles from 'shared/styles/MaterialUI/index';
import styles from './styles';


const propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      accepted: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  fetchProjects: PropTypes.func.isRequired,
  toggleProject: PropTypes.func.isRequired,
  finishLoading: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    projects: state.projects.projects,
  };
}
class ProjectIndex extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };

    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    this.props.fetchProjects()
      .then(() => {
        this.props.finishLoading();
        this.setState({ loading: false });
      });
  }

  handleToggle(sortRank, id) {
    this.props.toggleProject(sortRank, id);
  }


  render() {
    if (this.state.loading) {
      return <section />;
    }

    const newButton = (
      <Link to="/cms/projects/new">
        <FloatingActionButton style={inlineStyles.floatButton} disableTouchRipple primary>
          <ContentAdd />
        </FloatingActionButton>
      </Link>
    );

    if (!this.props.projects.length) {
      return (
        <section>
          {newButton}
          <NoContent pageName="projects" />
        </section>
      );
    }

    return (
      <section>
        {newButton}
        <h1 className={styles.title}>Project</h1>
        <Table fixedHeader fixedFooter>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow selectable={false}>
              <TableHeaderColumn colSpan="1" style={inlineStyles.headerColumn}>
                ID
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="6" style={inlineStyles.headerColumn}>
                Title
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="1" style={inlineStyles.headerColumn}>
                Status
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="2" style={inlineStyles.headerColumn}>
                Action
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.props.projects.map((project, index) => (
              <Item
                {...project}
                key={project.id}
                sortRank={index}
                handleToggle={this.handleToggle}
              />
            ))}
          </TableBody>
        </Table>
      </section>
    );
  }
}

ProjectIndex.propTypes = propTypes;

export default connect(mapStateToProps, { fetchProjects, toggleProject })(ProjectIndex);
