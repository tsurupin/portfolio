import React, { Component, PropTypes } from 'react';
import MenuItem from 'material-ui/lib/menus/menu-item';
import ModeEdit from 'material-ui/lib/svg-icons/editor/mode-edit';
import Clear from 'material-ui/lib/svg-icons/content/clear';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import ExpandMore from 'material-ui/lib/svg-icons/navigation/expand-more';
import ActionVisibility from 'material-ui/lib/svg-icons/action/visibility';
import ActionVisibilityOff from 'material-ui/lib/svg-icons/action/visibility-off';

import IconButton from 'material-ui/lib/icon-button';
import styles from './styles.scss';

class Tooltip extends Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  

  handleEdit() {
    this.props.handleEdit(this.props.id);
  }
  
  handleToggle() {
    this.props.handleToggle(this.props.id);
  }

  handleDelete() {
    this.props.handleDelete(this.props.id);
  }
  
  renderToggleItem() {
    let label;
    let rightIcon;
    if(this.props.accepted) {
      label = 'Unpublished';
      rightIcon = <ActionVisibilityOff />
    } else {
      label = 'Published';
      rightIcon = <ActionVisibility />
    }
    return (
      <MenuItem
        className={styles.editButton}
        primaryText={label}
        onClick={this.handleEdit}
        rightIcon={rightIcon}/>
    )
  }
  
  

  render() {
    return (
      <div className={styles.root}>
        <IconMenu
          className={styles.list}
          iconButtonElement={<IconButton className={styles.listButton}><ExpandMore /></IconButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}>
          {this.renderToggleItem()}
          <MenuItem
            className={styles.editButton}
            primaryText="Edit"
            onClick={this.handleEdit}
            rightIcon={<ModeEdit />}/>
          <MenuItem
            className={styles.deleteButton}
            primaryText="Delete"
            rightIcon={<Clear />}
            onClick={this.handleDelete}/>
        </IconMenu>
      </div>
    )
  }
}

Tooltip.propTypes = {
  id: PropTypes.number.isRequired,
  accepted: PropTypes.bool.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default Tooltip;
