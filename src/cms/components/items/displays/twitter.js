import React, { Component, PropTypes } from 'react';

export default class ItemTwitter extends Component {

  constructor(props) {
    super(...props);
  }

  render() {
    return (<img
      className="item-image__frame"
      src={this.props.image}
      alt={this.props.image}
    />);
  }
}

ItemTwitter.propTypes = {
  image: PropTypes.string.isRequired
};