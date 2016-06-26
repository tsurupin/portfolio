import React, { Component, PropTypes } from 'react';
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
    description: PropTypes.string
  }).isRequired,
  socialAccounts: PropTypes.arrayOf(PropTypes.shape({ 
    accountType: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })).isRequired
};

function mapStateToProps(state) {
  return {
    about: state.about,
    socialAccounts: state.socialAccounts
  }
}

class AboutShow extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAbout()
      .then(() => this.props.finishLoading());
  }


  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  renderText() {
    if (this.props.about.description) {
      return (
        <div className={styles.description}>
          <TextDisplay description={this.props.about.description}/>
        </div>
      )
    }
  }

  render() {
    if (!this.props.about) {
      return <seciont className={styles.root} />
    }

    return(
      <section className={styles.root}>
        <h1 className={styles.title}>About</h1>
        {this.renderText()}
        <SocialAccounts socialAccounts={this.props.socialAccounts} />
        <h2 className={styles.subHeading}>{config.siteName}</h2>
        <div className={styles.siteDescription}>
          <p className={styles.text}>{config.siteDescription}</p>
        </div>
      </section>
    )
  }

}

AboutShow.propTypes = propTypes;

export default connect(mapStateToProps, { fetchAbout })(AboutShow);
