import React, { Component, PropTypes } from 'react';
import TextEditor from '../../../../../shared/text_editor';
import styles from '../shared/styles.scss';


export default class ItemFormText extends Component {

  constructor(props) {
    super(...props);

    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  handleUpdateItem(description) {
    this.props.handleUpdateItem({ description });
  }


  render() {
    return (
      <div className={styles.root}>
        <label className={styles.header}>Text</label>
        <TextEditor
          description={this.props.description}
          handleUpdate={this.handleUpdateItem}
          cancelButton={this.props.cancelButton}
        />
      </div>
    );
  }
}


ItemFormText.propTypes = {
  targetType: PropTypes.string.isRequired,
  description: PropTypes.string,
  cancelButton: PropTypes.object.isRequired,
  handleUpdateItem: PropTypes.func.isRequired
};

