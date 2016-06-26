import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from 'client/actions/projects';
import Item from 'client/components/projects/indexes/Item/index';
import NoContent from 'shared/components/NoContent/index';
import shallowCompare from 'react-addons-shallow-compare';
import styles from'./styles.scss';

const propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      image: PropTypes.string,
      caption: PropTypes.string,
      sourceUrl: PropTypes.string,
      tags: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired
        }).isRequired
      ).isRequired
    }).isRequired
  ).isRequired,
  fetchProjects: PropTypes.func.isRequired
};


function mapStateToProps(state) {
  return { 
    projects: state.projects.projects 
  }
}

const cmsRegexp = /^(\/cms)*/;


class ProjectIndex extends Component {
  
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    let params = {};
    if (this.props.hasOwnProperty("location")) {
      params.tag = this.props.location.query.tag
    }
    this.props.fetchProjects(params)
      .then(() => {
        this.props.finishLoading();
        this.setState({ loading: false })
      });
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.location.query.tag !== this.props.location.query.tag) {
      nextProps.fetchProjects({ tag: nextProps.location.query.tag })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  get adminPath() {
    const paths = this.props.location.pathname.match(cmsRegexp);
    return paths[0] ? paths[0] : '';
  }

  render() {
    if (this.state.loading) {
      return <section />
    }
    if(this.props.projects.length === 0 ) {
      return (
        <section className={styles.root}>
          <NoContent pageName="projects" />
        </section>
      )
    }

    return (
      <section className={styles.root}>
        <h1 className={styles.title}>Projects</h1>
        <div className={styles.list}>
          {this.props.projects.map((project) => {
            return <Item key={project.id} adminPath={this.adminPath} {...project} />
          })}
        </div>
      </section>
    );
  }
}

ProjectIndex.propTypes = propTypes;

export default connect(mapStateToProps, { fetchProjects })(ProjectIndex);