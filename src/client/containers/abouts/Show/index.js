import React, { Component, PropTypes } from 'react';
import { fetchAbout } from 'clientActions/abouts';
import { connect } from 'react-redux';
import SocialAccount from 'clientComponents/abouts/shows/SocialAccount/index';
import TextDisplay from 'sharedComponents/textEditors/Display/index';
import styles from './styles.scss';

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
      return(
        <div className={styles.description}>
          <TextDisplay description={this.props.about.description} />
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
      </section>
    )
  }

}

AboutShow.propTypes = {
  about: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
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

export default connect(mapStateToProps, { fetchAbout })(AboutShow);
