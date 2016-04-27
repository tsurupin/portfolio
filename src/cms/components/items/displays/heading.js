import React, { Component, PropTypes } from 'react';
import { TARGET_TYPES } from '../../../constants';

export default class ItemHeading extends Component {

  constructor(props) {
    super(...props);
  }

  renderTitle() {
    if (this.props.targetType === TARGET_TYPES.HEADING.NAME) {
      return <h2 className="item-heading__title">{this.props.title}</h2>;
    }
    return <h3 className="item-heading__sub-title">{this.props.title}</h3>;
  }

  render() {

    return <div>{this.renderTitle()}</div>;
  }
}

ItemHeading.propTypes = {
  targetType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
