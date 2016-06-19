import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import AvAirplay from 'material-ui/svg-icons/av/airplay';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import ActionVisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import ActionDone from 'material-ui/svg-icons/action/done';
import ContentFlag from 'material-ui/svg-icons/content/flag';
import NotificationPriorityHigh from 'material-ui/svg-icons/notification/priority-high';
import styles from './styles.scss';

const propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  publishedAt: PropTypes.string,
  status: PropTypes.number.isRequired,
  accepted: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired
};

const inlineStyles = {
  rowColumn:{
    height: 70,
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 14,
    whiteSpace: 'normal',
    overFlow: 'visible'
  }
};

class ItemRow extends Component {

  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
  }


  handleToggle() {
    this.props.handleToggle(this.props.id);
  }
  
  render() {
    let publishIcon;
    if (this.props.accepted) {
      publishIcon =  <ActionVisibility className={styles.visibleIcon} />;
    } else {
      publishIcon = <ActionVisibilityOff className={styles.inVisibleIcon} />;
    }

    // 0: not accepted, 1: will publish, 2: publishing
    let statusIcon;
    switch (this.props.status) {
      case 0:
        statusIcon = <NotificationPriorityHigh />;
        break;
      case 1:
        statusIcon = <ActionDone />;
        break;
      case 2:
        statusIcon = <ContentFlag />;
        break;
    }

    return (
      <TableRow>
        <TableRowColumn colSpan="1" style={inlineStyles.rowColumn} >{this.props.id}</TableRowColumn>
        <TableRowColumn colSpan="4" style={inlineStyles.rowColumn} >{this.props.title}</TableRowColumn>
        <TableRowColumn colSpan="1" style={inlineStyles.rowColumn} >{statusIcon}</TableRowColumn>
        <TableRowColumn colSpan="2" style={inlineStyles.rowColumn} >{this.props.publishedAt}</TableRowColumn>
        <TableRowColumn colSpan="3" style={inlineStyles.rowColumn} >
          <Link to={`/cms/posts/${this.props.id}`}>
            <IconButton className={styles.button}>
              <AvAirplay />
            </IconButton>
          </Link>
          <Link to={`/cms/posts/${this.props.id}/edit`}>
            <IconButton className={styles.button}>
              <EditorModeEdit />
            </IconButton>
          </Link>
          <IconButton className={styles.toggleButton} onClick={this.handleToggle}>
            {publishIcon}
          </IconButton>
        </TableRowColumn>
      </TableRow>
    )
  }
};

ItemRow.propTypes = propTypes;

export default ItemRow;
