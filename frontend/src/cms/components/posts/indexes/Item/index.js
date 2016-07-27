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
import inlineStyles from 'shared/styles/MaterialUI/index';
import styles from './styles';

const propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  publishedAt: PropTypes.string,
  status: PropTypes.number.isRequired,
  accepted: PropTypes.bool.isRequired,
  sortRank: PropTypes.number.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

class Item extends Component {

  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.props.handleToggle(this.props.sortRank, this.props.id);
  }

  render() {
    let publishActionIcon;
    if (this.props.accepted) {
      publishActionIcon = <ActionVisibilityOff name="in-visible-icon" />;
    } else {
      publishActionIcon = <ActionVisibility name="visible-icon" />;
    }

    // 0: not accepted, 1: will publish, 2: publishing
    let statusIcon;
    switch (this.props.status) {
      case 0:
        statusIcon = <NotificationPriorityHigh name="unaccepted-icon" />;
        break;
      case 1:
        statusIcon = <ActionDone name="accepted-icon" />;
        break;
      case 2:
        statusIcon = <ContentFlag name="publishing-icon" />;
        break;
      default:
        break;
    }

    return (
      <TableRow style={inlineStyles.row}>
        <TableRowColumn colSpan="1" style={inlineStyles.rowColumn} >
          {this.props.id}
        </TableRowColumn>
        <TableRowColumn colSpan="4" style={inlineStyles.rowColumn} >
          {this.props.title}
        </TableRowColumn>
        <TableRowColumn colSpan="1" style={inlineStyles.rowColumn} >
          {statusIcon}
        </TableRowColumn>
        <TableRowColumn colSpan="2" style={inlineStyles.rowColumn} >
          {this.props.publishedAt}
        </TableRowColumn>
        <TableRowColumn colSpan="3" style={inlineStyles.rowColumn} >
          <Link to={`/cms/posts/${this.props.id}/preview`}>
            <IconButton className={styles.button} disableTouchRipple >
              <AvAirplay />
            </IconButton>
          </Link>
          <Link to={`/cms/posts/${this.props.id}/edit`}>
            <IconButton className={styles.button} disableTouchRipple >
              <EditorModeEdit />
            </IconButton>
          </Link>
          <IconButton
            name="toggle-button"
            onClick={this.handleToggle}
            disableTouchRipple
          >
            {publishActionIcon}
          </IconButton>
        </TableRowColumn>
      </TableRow>
    );
  }
}

Item.propTypes = propTypes;

export default Item;
