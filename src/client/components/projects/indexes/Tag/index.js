import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';

class Tag extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.props.handleSearch(this.props.id)
  }
  
  render() {
    return (
      <div
        className={styles.root}
        onClick={this.handleClick} >
        <span className={styles.name}>{this.props.name}</span>
      </div>
    )
  }
}

Tag.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired
};
export default Tag;