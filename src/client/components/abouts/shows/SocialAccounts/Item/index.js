import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import gitHubIcon from './git-hub-icon.png';
import facebookIcon from './facebook-icon.png';
import linkedInIcon from './linked-in-icon.png';
import twitterIcon from './twitter-icon.png';

const propTypes = {
  accountType: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

function Item({ url, accountType }) {
  return(
    <li>
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
    case "git_hub":
      return gitHubIcon;
    case "facebook":
      return facebookIcon;
    case "linked_in":
      return linkedInIcon;
    case "twitter":
      return twitterIcon;
    default:
  }
}

Item.propTypes = propTypes;
export default Item;