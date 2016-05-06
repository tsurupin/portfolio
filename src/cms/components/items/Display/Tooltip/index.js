import React, { Component, PropTypes } from 'react';
import { MOVE_ITEM_TOP, MOVE_ITEM_UP, MOVE_ITEM_DOWN, MOVE_ITEM_BOTTOM } from '../../../../constants';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Divider from 'material-ui/lib/divider';
import ArrowUpword from 'material-ui/lib/svg-icons/navigation/arrow-upward';
import ArrowDownword from 'material-ui/lib/svg-icons/navigation/arrow-downward';
import SwapVert from 'material-ui/lib/svg-icons/action/swap-vert';
import ModeEdit from 'material-ui/lib/svg-icons/editor/mode-edit';
import Clear from 'material-ui/lib/svg-icons/content/clear';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import ExpandMore from 'material-ui/lib/svg-icons/navigation/expand-more';
import IconButton from 'material-ui/lib/icon-button';
import styles from './styles.scss';

export default class Tooltip extends Component {
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
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}>
          <MenuItem 
            className={styles.topButton}
            primaryText="Move Top"
            rightIcon={<ArrowUpword />}
            onClick={this.handleMove.bind(this, MOVE_ITEM_TOP)}
            disabled={this.props.sortRank === 0} />
          <MenuItem
            className={styles.upButton}
            primaryText="Move Up"
            rightIcon={<SwapVert />}
            onClick={this.handleMove.bind(this, MOVE_ITEM_UP)}
            disabled={this.props.sortRank === 0} />
          <MenuItem
            className={styles.downButton}
            primaryText="Move Down"
            rightIcon={<SwapVert />}
            onClick={this.handleMove.bind(this, MOVE_ITEM_DOWN)}
            disabled={this.props.sortRank === (this.props.totalCount)} />
          <MenuItem
            className={styles.bottomButton}
            primaryText="Move Bottom"
            rightIcon={<ArrowDownword />}
            onClick={this.handleMove.bind(this, MOVE_ITEM_BOTTOM)}
            disabled={this.props.sortRank === (this.props.totalCount)} />
          <Divider />
          <MenuItem
            className={styles.editButton}
            primaryText="Edit"
            onClick={this.handleUpdateItem}
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
  sortRank: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  handleUpdateItem: PropTypes.func.isRequired,
  handleMoveItem: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired
};
