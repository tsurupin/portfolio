import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';

export default class Image extends Component {

  constructor(props) {
    super(...props);
  }

  render() {
    return (
      <img
        className={styles.imageFrame}
        src={this.props.image}
        alt={this.props.image}
      />);
  }
}

Image.propTypes = {
  image: PropTypes.string.isRequired
};