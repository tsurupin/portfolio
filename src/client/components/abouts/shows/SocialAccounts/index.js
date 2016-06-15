import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';
import Item from './Item/index';

const propTypes = {
  socialAccounts: PropTypes.arrayOf(
    PropTypes.shape({
      accountType: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

class SocialAccounts extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <ul className={styles.root}>
        {this.props.socialAccounts.map(account => {
          return(
            <Item
              key={account.id}
              accountType={account.accountType}
              url={account.url}
            />
          );
        })}
      </ul>
    );
  }
}

SocialAccounts.propTypes = propTypes;

export default SocialAccounts;
