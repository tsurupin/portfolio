import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { fetchAbout } from 'client/actions/abouts';
import { connect } from 'react-redux';
import SocialAccounts from 'client/components/abouts/shows/SocialAccounts/index';
import TextDisplay from 'shared/components/textEditors/Display/index';
import shallowCompare from 'react-addons-shallow-compare';
import config from 'shared/config';
import styles from './styles';

const propTypes = {
  about: PropTypes.shape({
    image: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  socialAccounts: PropTypes.arrayOf(PropTypes.shape({
    accountType: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,

  fetchAbout: PropTypes.func.isRequired,
  finishLoading: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
    about: state.about,
    socialAccounts: state.socialAccounts,
  };
}

class AboutShow extends Component {

  componentDidMount() {
    this.props.fetchAbout()
      .then(() => this.props.finishLoading());
  }


  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    if (!this.props.about) {
      return <seciont />;
    }

    if (this.props.about.description == null) {
      return <seciont />;
    }

    return (
      <section>
        <Helmet title="About" />
        <h1 className={styles.heading}>About</h1>
        <TextDisplay description={this.props.about.description} />
        <SocialAccounts socialAccounts={this.props.socialAccounts} />
        <h2 className={styles.subHeading}>{config.siteName}</h2>
        <div className={styles.siteDescription}>
          <p className={styles.text}>{config.siteDescription}</p>
        </div>
      </section>
    );
  }

}

AboutShow.propTypes = propTypes;

export default connect(mapStateToProps, { fetchAbout })(AboutShow);
