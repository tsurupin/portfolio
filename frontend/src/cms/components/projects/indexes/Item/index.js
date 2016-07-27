import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import ActionVisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import ContentFlag from 'material-ui/svg-icons/content/flag';
import NotificationPriorityHigh from 'material-ui/svg-icons/notification/priority-high';
import inlineStyles from 'shared/styles/MaterialUI/index';
import styles from './styles.scss';

const propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
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
    let statusIcon;
    if (this.props.accepted) {
      publishActionIcon = <ActionVisibilityOff name="in-visible-icon" />;
      statusIcon = <ContentFlag name="accepted-icon" />;
    } else {
      publishActionIcon = <ActionVisibility name="visible-icon" />;
      statusIcon = <NotificationPriorityHigh name="unaccepted-icon" />;
    }

    return (
      <TableRow style={inlineStyles.row} >
        <TableRowColumn colSpan="1" style={inlineStyles.rowColumn} >
          {this.props.id}
        </TableRowColumn>
        <TableRowColumn colSpan="6" style={inlineStyles.rowColumn} >
          {this.props.title}
        </TableRowColumn>
        <TableRowColumn colSpan="1" style={inlineStyles.rowColumn} >
          {statusIcon}
        </TableRowColumn>
        <TableRowColumn colSpan="2" style={inlineStyles.rowColumn} >
          <Link to={`/cms/projects/${this.props.id}/edit`}>
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
