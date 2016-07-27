import React, { Component, PropTypes } from 'react';
import TARGET_TYPES from 'shared/constants/targetTypes';
import List from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ContentAddCircleOutLine from 'material-ui/svg-icons/content/add-circle-outline';
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off';
import EditBoxItem from './EditBoxItem/index';
import inlineStyles from 'shared/styles/MaterialUI/index';
import styles from './styles.scss';


const propTypes = {
  handleAddItem: PropTypes.func.isRequired,
};

const TARGET_TYPE_LIST = [
  TARGET_TYPES.TEXT,
  TARGET_TYPES.IMAGE,
  TARGET_TYPES.TWITTER,
];

class EditBox extends Component {

  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  renderToggleButton() {
    if (!this.state.isOpen) {
      return (
        <IconButton
          style={inlineStyles.largeButton}
          name="add-item-button"
          iconStyle={inlineStyles.toggleIcon}
          disableTouchRipple
          onClick={() => this.setState({ isOpen: true })}
        >
          <ContentAddCircleOutLine color={inlineStyles.iconColor} />
        </IconButton>
      );
    }

    return (
      <IconButton
        style={inlineStyles.largeButton}
        name="close-add-item-button"
        iconStyle={inlineStyles.toggleIcon}
        disableTouchRipple
        onClick={() => this.setState({ isOpen: false })}
      >
        <ActionHighlightOff color={inlineStyles.iconColor} />
      </IconButton>
    );
  }

  renderEditMenu() {
    if (this.state.isOpen) {
      return (
        <ul className={styles.list}>
          {TARGET_TYPE_LIST.map((targetType, index) => {
            return (
              <EditBoxItem
                key={index}
                name={targetType}
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
