import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import { ACCOUNT_TYPE_ICONS } from '../../../../../constants';
import styles from './styles.scss';

const propTypes = {
  accountType: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

const inlineStyles = {
  button: {
    width: 32,
    height: 32
  }
};

function Item({ url, accountType }) {
  return(
    <li className={styles.root}>
      <a href={url} >
        <IconButton >
          <img src={getAccountIconImage(accountType)} />
        </IconButton>
      </a>
    </li>
  )
  
}

function getAccountIconImage(accountType) {
  switch(accountType) {
    case "github":
      return ACCOUNT_TYPE_ICONS.GITHUB;
    case "facebook":
      return ACCOUNT_TYPE_ICONS.FACEBOOK;
    case "linked_in":
      return ACCOUNT_TYPE_ICONS.LINKED_IN;
    case "twitter":
      return ACCOUNT_TYPE_ICONS.TWITTER;
    default:
  }
}

Item.propTypes = propTypes;
export default Item;