import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';

class Tag extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(){
    this.props.handleSearch(this.props.id)
  }
  
  render() {
    return(
      <div 
        className={styles.root}
        onClick={this.handleClick}
      >
        {this.props.name}
      </div>
    );
  }
}

Tag.propTpes = {
  id: PropTypes.number.isRequired,
  name : PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired
};
export default Tag