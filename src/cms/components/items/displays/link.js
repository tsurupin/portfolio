import React, { Component, PropTypes } from 'react';

export default class ItemLink extends Component {

  constructor(props) {
    super(...props);
  }

  render() {
    return (
      <div className="item-link">
        <a
          className="item-link__title"
          href={this.props.sourceURL}
          target="_blank"
        >{this.props.sourceTitle}</a>
      </div>
    );
  }
}

ItemLink.propTypes = {
  sourceURL: PropTypes.string.isRequired,
  sourceTitle: PropTypes.string.isRequired
};


