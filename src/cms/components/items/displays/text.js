import React, { Component, PropTypes } from 'react';
import TextDisplay from '../../shares/text_display';

export default class ItemText extends Component {

  constructor(props) {
    super(...props);
  }

  render() {

    return (
      <div className="item-text">
        <TextDisplay description={this.props.description} />
      </div>
    );
  }
}

ItemText.propTypes = {
  description: PropTypes.string.isRequired
};


