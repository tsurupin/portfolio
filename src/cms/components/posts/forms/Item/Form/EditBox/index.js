import React, { Component, PropTypes } from 'react';
import { TARGET_TYPES } from '../../../../../../constants';
import List from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ContentAddCircleOutLine from 'material-ui/svg-icons/content/add-circle-outline';
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off';
import Subheader from 'material-ui/Subheader';
import EditBoxItem from './EditBoxItem/index';
import styles from './styles.scss';


const propTypes = {
  handleAddItem: PropTypes.func.isRequired
};

const TARGET_TYPE_LIST = [
  TARGET_TYPES.TEXT,
  TARGET_TYPES.IMAGE,
  TARGET_TYPES.TWITTER
];

const inlineStyles = {
  button: {
    width: 60,
    height: 60
  },
  toggleIcon: {
    height: 36,
    width: 36
  }
};

class EditBox extends Component {

  constructor(props) {
    super(props);
    this.state = { isOpen: false }
  }

  renderToggleButton() {
    if (!this.state.isOpen) {
      return (
        <IconButton 
          style={inlineStyles.button} 
          iconStyle={inlineStyles.toggleIcon} 
          onClick={() => this.setState({ isOpen: true })}
        >
          <ContentAddCircleOutLine color="8F8F8F" />
        </IconButton>
      )
    } else {
      return (
        <IconButton 
          style={inlineStyles.button} 
          iconStyle={inlineStyles.toggleIcon} 
          onClick={() => this.setState({ isOpen: false })}
        >
          <ActionHighlightOff color="8F8F8F" />
        </IconButton>
      )
    }
  }

  renderEditMenu() {
    if (this.state.isOpen) {
      return (
        <ul className={styles.list}>
          {TARGET_TYPE_LIST.map((targetType, index) => {
            return (
              <EditBoxItem
                key={index}
                name={targetType.NAME}
                handleAddItem={this.props.handleAddItem}
              />
            );
          })}
        </ul>
      );
    }
  }

  render() {
    return (
      <List className={styles.root}>
        {this.renderToggleButton()}
        {this.renderEditMenu()}
      </List>
    );
  }
}

EditBox.propTypes = propTypes;

export default EditBox;