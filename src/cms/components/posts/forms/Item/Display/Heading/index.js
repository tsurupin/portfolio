import React, { Component, PropTypes } from 'react';
import { TARGET_TYPES } from '../../../../../../constants';
import styles from './styles.scss';

export default class Heading extends Component {

  constructor(props) {
    super(...props);
  }

  renderTitle() {
    if (this.props.targetType === TARGET_TYPES.HEADING.NAME) {
      return <h2 className={styles.heading}>{this.props.title}</h2>;
    }
    return <h3 className={styles.subHeading}>{this.props.title}</h3>;
  }

  render() {

    return <div>{this.renderTitle()}</div>;
  }
}

Heading.propTypes = {
  targetType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
