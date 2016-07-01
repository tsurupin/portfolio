import React, { Component, PropTypes } from 'react';
import styles from './styles';

const propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  style: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
};

class StyleButton extends Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(event) {
    event.preventDefault();
    this.props.onToggle(this.props.style);
  }

  render() {
    let className;
    if (this.props.active) {
      className = styles.activeButton;
    } else {
      className = styles.button;
    }

    return (
      <span className={className} onMouseDown={this.handleToggle}>
        {this.props.label}
      </span>
    );
  }
}

StyleButton.propTypes = propTypes;

export default StyleButton;
