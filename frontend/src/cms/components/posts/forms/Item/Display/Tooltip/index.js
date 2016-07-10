import React, { Component, PropTypes } from 'react';
import {
  MOVE_ITEM_TOP,
  MOVE_ITEM_UP,
  MOVE_ITEM_DOWN,
  MOVE_ITEM_BOTTOM,
} from 'shared/constants/actions';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowUpword from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDownword from 'material-ui/svg-icons/navigation/arrow-downward';
import SwapVert from 'material-ui/svg-icons/action/swap-vert';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Clear from 'material-ui/svg-icons/content/clear';
import IconMenu from 'material-ui/IconMenu';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import IconButton from 'material-ui/IconButton';
import styles from './styles';


const propTypes = {
  sortRank: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  handleUpdateItem: PropTypes.func.isRequired,
  handleMoveItem: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
};

class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  handleMove(type) {
    this.props.handleMoveItem(this.props.sortRank, type);
  }


  handleUpdateItem() {
    this.props.handleUpdateItem();
  }

  handleDelete() {
    this.props.handleDeleteItem(this.props.sortRank);
  }

  render() {
    return (
      <div className={styles.root}>
        <IconMenu
          className={styles.list}
          iconButtonElement={<IconButton className={styles.listButton}><ExpandMore /></IconButton>}
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        >
          <MenuItem
            name="top-button"
            primaryText="Move Top"
            rightIcon={<ArrowUpword />}
            onClick={this.handleMove.bind(this, MOVE_ITEM_TOP)}
            disabled={this.props.sortRank === 0}
          />
          <MenuItem
            name="up-button"
            primaryText="Move Up"
            rightIcon={<SwapVert />}
            onClick={this.handleMove.bind(this, MOVE_ITEM_UP)}
            disabled={this.props.sortRank === 0}
          />
          <MenuItem
            name="down-button"
            primaryText="Move Down"
            rightIcon={<SwapVert />}
            onClick={this.handleMove.bind(this, MOVE_ITEM_DOWN)}
            disabled={this.props.sortRank === (this.props.totalCount)}
          />
          <MenuItem
            name="bottom-button"
            primaryText="Move Bottom"
            rightIcon={<ArrowDownword />}
            onClick={this.handleMove.bind(this, MOVE_ITEM_BOTTOM)}
            disabled={this.props.sortRank === (this.props.totalCount)}
          />
          <Divider />
          <MenuItem
            name="edit-button"
            primaryText="Edit"
            onClick={this.handleUpdateItem}
            rightIcon={<ModeEdit />}
          />
          <MenuItem
            name="delete-button"
            primaryText="Delete"
            rightIcon={<Clear />}
            onClick={this.handleDelete}
          />
        </IconMenu>
      </div>
    );
  }
}

Tooltip.propTypes = propTypes;

export default Tooltip;
