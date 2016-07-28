import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import gitHubIcon from './git-hub-icon.png';
import facebookIcon from './facebook-icon.png';
import linkedInIcon from './linked-in-icon.png';
import twitterIcon from './twitter-icon.png';

const propTypes = {
  accountType: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

function getAccountIconImage(accountType) {
  switch (accountType) {
    case 'git_hub':
      return gitHubIcon;
    case 'facebook':
      return facebookIcon;
    case 'linked_in':
      return linkedInIcon;
    case 'twitter':
      return twitterIcon;
    default:
  }
}

function Item({ url, accountType }) {
  return (
    <li>
      <a href={url} >
        <IconButton >
          <img src={getAccountIconImage(accountType)} role="presentation" />
        </IconButton>
      </a>
    </li>
  );
}

Item.propTypes = propTypes;

export default Item;
