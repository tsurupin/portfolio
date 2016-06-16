import React, { Component, PropTypes } from 'react';
import { fetchHome } from 'clientActions/homes';
import { connect } from 'react-redux';
import TextDisplay from 'sharedComponents/textEditors/Display/index';
import RecentPosts from 'clientComponents/homes/shows/RecentPosts/index';
import RecentProject from 'clientComponents/homes/shows/RecentProject/index';
import styles from './styles.scss';

const propTypes = {
  home: PropTypes.shape({
    introduction: PropTypes.string,
    image: PropTypes.string,
    latestPosts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired
    })),
    latestProject: PropTypes.shape({
      image: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    })
  }).isRequired
};

class HomeShow extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchHome();
  }
  
  renderText() {
    if (this.props.home.introduction) {
      return (
        <div className={styles.introduction}>
          <TextDisplay description={this.props.home.introduction}/>
        </div>
      )
    }
  }

  renderRecentPosts() {
    if (this.props.home.latestPosts) {
      return (<RecentPosts posts={this.props.home.latestPosts} />)
    }
  }

  renderRecentProject() {
    if (this.props.home.latestProject) {
      return <RecentProject project={this.props.home.latestProject} />;
    }
  }


  render() {
    // TODO: figure out how to specify image path after assets processing
    return(
      <section className={styles.root}>
        <img
          className={styles.image}
          src='images/sample.png'
          alt="main image"
        />
        {this.renderText()}
        <div className={styles.listContainer} >
          {this.renderRecentPosts()}
          {this.renderRecentProject()}
        </div>
      </section>
    )
  }

}

HomeShow.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    home: state.home
  }
}

export default connect(mapStateToProps, { fetchHome })(HomeShow);
