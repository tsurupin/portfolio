import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentAddCircle from 'material-ui/lib/svg-icons/content/add-circle';
import TextEditor from '../../../../../shared/TextEditor/Editor/index';
import styles from '../shared/styles.scss';

const inlineStyles = {
  submitButton: { marginLeft: 12 }
};


class ItemFormText extends Component {

  constructor(props) {
    super(...props);
    this.state = { description: props.description };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  handleUpdate(description) {
    this.setState(description)
  }

  handleUpdateItem() {
    this.props.handleUpdateItem({ description: this.state.description });
  }

  render() {
    return (
      <div className={styles.root}>
        <label className={styles.header}>Text</label>
        <TextEditor
          description={this.state.description}
          handleUpdate={this.handleUpdate}
        />
        <div className={styles.submitBox}>
          {this.props.cancelButton}
          <RaisedButton
            className={styles.submitButton}
            label='Save'
            labelPosition="after"
            icon={<ContentAddCircle />}
            style={inlineStyles.submitButton}
            onClick={this.handleUpdateItem}/>
        </div>
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

export default ItemFormText;