import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class ItemText extends Component {

  constructor(props) {
    super(...props);
  }

  render() {
    const textClassName = classnames({
      'item-text__description': true
    });
    return (
      <div className="item-text">
        <p className={textClassName}>{this.props.description}</p>
      </div>
    );
  }
}

ItemText.propTypes = {
  style: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired
};


