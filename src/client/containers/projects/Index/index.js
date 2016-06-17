import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from 'clientActions/projects';
import Item from 'clientComponents/projects/indexes/Item/index';
import styles from'./styles.scss';

const propTypes = {
  projects: PropTypes.array.isRequired,
  fetchProjects: PropTypes.func.isRequired
};

class ProjectIndex extends Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let params = {};
    if (this.props.hasOwnProperty("location")) {
      params.tag = this.props.location.query.tag
    }
    this.props.fetchProjects(params);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.location.query.tag !== this.props.location.query.tag) {
      nextProps.fetchProjects({ tag: nextProps.location.query.tag })
    }
  }


  render() {
    if(this.props.projects.length === 0 ) { return <div></div> }
    return (
      <section className={styles.root}>
        <h1 className={styles.title}>Projects</h1>
        <div className={styles.list}>
          {this.props.projects.map((project) => {
            return <Item key={project.id} project={project} />
          })}
        </div>
      </section>
    );
  }
}

ProjectIndex.propTypes = propTypes;

function mapStateToProps(state) {
  return { projects: state.projects.projects }
}

export default connect(mapStateToProps, { fetchProjects })(ProjectIndex);