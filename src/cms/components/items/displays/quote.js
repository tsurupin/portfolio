import React, { Component, PropTypes } from 'react';

export default class ItemQuote extends Component {

  constructor(props) {
    super(...props);
  }

  render() {
    return (
      <div className="item-quote">
        <a href={this.props.sourceURL} target="_blank">
          <blockquote className="item-quote__content">
            <p className="item-quote__description">{this.props.description}</p>
          </blockquote>
        </a>
      </div>
    );
  }
}

ItemQuote.propTypes = {
  sourceURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};


