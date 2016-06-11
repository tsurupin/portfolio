import React, { Component, PropTypes } from 'react';
import { fetchAbout } from 'clientActions/abouts';
import { connect } from 'react-redux';
import SocialAccount from 'clientComponents/abouts/shows/SocialAccountList/index';
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

  renderSocialAccounts() {
    return(
      <ul className={styles.socialAccountList}>
        {this.props.socialAccounts.map(account => {
          return(
            <SocialAccount
              key={account.id}
              accountType={account.accountType}
              url={account.url}
            />
          );
        })}
      </ul>
    )
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
    return(
      <section className={styles.root}>
        <h1 className={styles.title}>ABOUT</h1>
        {this.renderText()}
        {this.renderSocialAccounts()}
        <h2 className={styles.subHeading}>About this Site</h2>
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
