import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { fetchProjects } from 'client/actions/projects';
import Item from 'client/components/projects/indexes/Item/index';
import NoContent from 'shared/components/NoContent/index';
import shallowCompare from 'react-addons-shallow-compare';
import styles from './styles';

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
          name: PropTypes.string.isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired
  ).isRequired,
  location: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  finishLoading: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
    projects: state.projects.projects,
    loading: state.projects.loading,
  };
}

const cmsRegexp = /^(\/cms)*/;


class ProjectIndex extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    const params = {};
    if (this.props.hasOwnProperty('location')) {
      params.tagId = this.props.location.query['tag-id'];
    }
    this.props.fetchProjects(params)
      .then(() => {
        this.props.finishLoading();
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query['tag-id'] !== this.props.location.query['tag-id']) {
      nextProps.fetchProjects({ tagId: nextProps.location.query['tag-id'] });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  // add adminPath to tell admin's preview from ordinal user's view
  get adminPath() {
    const paths = this.props.location.pathname.match(cmsRegexp);
    return paths[0] ? paths[0] : '';
  }

  render() {
    if (this.props.loading) {
      return (
        <section>
          <Helmet title="Projects" />
        </section>
      );
    }

    if (!this.props.projects.length) {
      return (
        <section>
          <Helmet title="Projects" />
          <NoContent pageName="projects" />
        </section>
      );
    }

    return (
      <section>
        <Helmet title="Projects" />
        <h1 className={styles.heading}>Projects</h1>
        <div className={styles.list}>
          {this.props.projects.map((project) => {
            return <Item key={project.id} adminPath={this.adminPath} {...project} />;
          })}
        </div>
      </section>
    );
  }
}

ProjectIndex.propTypes = propTypes;

export default connect(mapStateToProps, { fetchProjects })(ProjectIndex);
