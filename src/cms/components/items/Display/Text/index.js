import React, { Component, PropTypes } from 'react';
import TextDisplay from '../../../shares/text_display';
import styles from './styles.scss';


export default class Text extends Component {

  constructor(props) {
    super(...props);
  }

  render() {

    return (
      <div className={styles.root}>
        <TextDisplay description={this.props.description} />
      </div>
    );
  }
}

Text.propTypes = {
  description: PropTypes.string.isRequired
};


