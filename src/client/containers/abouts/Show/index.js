import React, { Component, PropTypes } from 'react';
import { fetchAbout } from 'clientActions/abouts';
import { connect } from 'react-redux';
import SocialAccounts from 'clientComponents/abouts/shows/SocialAccounts/index';
import TextDisplay from 'sharedComponents/textEditors/Display/index';
import styles from './styles.scss';

const propTypes = {
  about: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    siteDescription: PropTypes.string
  }).isRequired,
  socialAccounts: PropTypes.arrayOf(PropTypes.shape({ 
    accountType: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })).isRequired
};

class AboutShow extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAbout();
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
        <h2 className={styles.subHeading}>Portfolio</h2>
        <div className={styles.siteDescription}>
          <p className={styles.text}>This website is written in ruby</p>
        </div>
      </section>
    )
  }

}

AboutShow.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    about: state.about,
    socialAccounts: state.socialAccounts
  }
}

export default connect(mapStateToProps, { fetchAbout })(AboutShow);
