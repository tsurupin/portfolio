import React, { Component, PropTypes } from 'react';
import { fetchHome } from 'client/actions/homes';
import { connect } from 'react-redux';
import TextDisplay from 'shared/components/textEditors/Display/index';
import RecentPosts from 'client/components/homes/shows/RecentPosts/index';
import RecentProject from 'client/components/homes/shows/RecentProject/index';
import mainImage from './sample.png';
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

function mapStateToProps(state) {
  return {
    home: state.home
  }
}

class HomeShow extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchHome()
      .then(() => this.props.finishLoading());
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
      return <RecentProject {...this.props.home.latestProject} />;
    }
  }


  render() {
    // TODO: figure out how to specify image path after assets processing
    if (!this.props.home) {
      return <sectioon className={styles.root} />
    }
    return(
      <section className={styles.root}>
        <img
          className={styles.image}
          src={mainImage}
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

export default connect(mapStateToProps, { fetchHome })(HomeShow);
