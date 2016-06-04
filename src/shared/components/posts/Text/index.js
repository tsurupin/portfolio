import React, { Component, PropTypes } from 'react';
import TextDisplay from '../../../../cms/components/shared/TextEditor/Display/index';
import styles from './styles.scss';


class Text extends Component {

  constructor(props) {
    super(props);
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

export default Text;
