import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';

class Image extends Component {

  constructor(props) {
    super(props);
  }
  
  renderCaption() {
    if (this.props.caption) {
      return  <span className={styles.caption}>{this.props.caption}</span>;
    }
  }

  render() {
    return (
      <div className={styles.root}>
        <img
          className={styles.root}
          src={this.props.image}
          alt={this.props.image}
        />;
        {this.renderCaption()}       
      </div>
    );
  }
}

Image.propTypes = {
  image: PropTypes.string.isRequired,
  caption: PropTypes.string
};

export default Image