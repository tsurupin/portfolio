import React, { PropTypes } from 'react';
import Item from './Item/index';
import styles from './styles';

const propTypes = {
  socialAccounts: PropTypes.arrayOf(
    PropTypes.shape({
      accountType: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

function SocialAccounts({ socialAccounts }) {
  return (
    <ul className={styles.root}>
      {socialAccounts.map((account) => {
        return <Item key={account.id} {...account} />;
      })}
    </ul>
  );
}

SocialAccounts.propTypes = propTypes;

export default SocialAccounts;
