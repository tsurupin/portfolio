import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchProjects, toggleProject } from '../../../actions/projects';
import Item from '../../../components/projects/indexes/Item/index';
import { Table, TableHeaderColumn, TableHeader, TableBody, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import styles from './styles.scss';


const propTypes =  {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      accepted: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired,
  fetchProjects: PropTypes.func.isRequired
};

const inlineStyles = {
  floatButton: {
    position: 'fixed',
    zIndex: 100,
    bottom: '5%',
    right: '3%'
  },

  headerColumn: {
    color: '#B3B3B3',
    fontWeight: 'bold'
  }
};

class ProjectIndex extends Component {
  
  constructor(props) {
    super(props);
    
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    this.props.fetchProjects();
  }
  
  handleToggle(sortRank, id) {
    this.props.toggleProject(sortRank, id);
  }
  

  render() {
    if(this.props.projects.length === 0 ) {
      return <section />
    }
    return (
      <section className={styles.root}>
        <Link to="/cms/projects/new">
          <FloatingActionButton style={inlineStyles.floatButton} primary={true}>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
        <h1 className={styles.title}>Project</h1>
        <Table fixedHeader={true} fixedFooter={true}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow selectable={false}>
              <TableHeaderColumn colSpan="1" style={inlineStyles.headerColumn}>ID</TableHeaderColumn>
              <TableHeaderColumn colSpan="6" style={inlineStyles.headerColumn}>Title</TableHeaderColumn>
              <TableHeaderColumn colSpan="1" style={inlineStyles.headerColumn}>Status</TableHeaderColumn>
              <TableHeaderColumn colSpan="2" style={inlineStyles.headerColumn}>Action</TableHeaderColumn>
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
function mapStateToProps(state) {
  return {
    projects: state.projects.projects
  }
}
export default connect(mapStateToProps, { fetchProjects, toggleProject })(ProjectIndex)
