import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';

const propTypes = {
  image: PropTypes.string.isRequired,
  caption: PropTypes.string
};

class Image extends Component {

  constructor(props) {
    super(props);
  }
  
  renderCaption() {

      return  <figcaption className={styles.caption}>item image</figcaption>;

  }

  render() {
    return (
      <figure className={styles.root}>
        <img
          className={styles.image}
          src={this.props.image}
          alt=''
        />
        {this.renderCaption()}       
      </figure>
    );
  }
}

Image.propTypes = propTypes;

export default Image