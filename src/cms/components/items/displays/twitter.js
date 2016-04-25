import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/lib/avatar';

export default class ItemTwitter extends Component {

  constructor(props) {
    super(...props);
  }

  render() {
    return (
        <blockquote className="item-twitter__link">
          <a className="item-twitter__author-name"
             href={this.props.sourceURL}
             ref="nofollow"
             target="_blank">
              <div className="item-twitter__header">
                <Avatar src={this.props.authorImageURL} />
                {this.props.authorName}
                <p className="item-twitter__author-screen-name">{`@${this.props.authorScreenName}`}</p>
              </div>
            <cite className="item-twitter__description">{this.props.description}</cite>
          </a>
        </blockquote>
    );
  }
}

ItemTwitter.propTypes = {
  authorName: PropTypes.string.isRequired,
  authorScreenName: PropTypes.string,
  authorImageURL: PropTypes.string.isRequired,
  sourceURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};


