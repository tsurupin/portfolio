import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import ActionVisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import ContentFlag from 'material-ui/svg-icons/content/flag';
import NotificationPriorityHigh from 'material-ui/svg-icons/notification/priority-high';
import styles from './styles.scss';

const propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
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

class Item extends Component {

  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
  }


  handleToggle() {
    this.props.handleToggle(this.props.id);
  }
  
  render() {
    let publishActionIcon;
    let statusIcon;
    if (this.props.accepted) {
      publishActionIcon =  <ActionVisibilityOff className={styles.inVisibleIcon} />;
      statusIcon = <ContentFlag />;
    } else {
      publishActionIcon = <ActionVisibility className={styles.visibleIcon} />;
      statusIcon = <NotificationPriorityHigh />;
    }

    return (
      <TableRow>
        <TableRowColumn colSpan="1" style={inlineStyles.rowColumn} >{this.props.id}</TableRowColumn>
        <TableRowColumn colSpan="6" style={inlineStyles.rowColumn} >{this.props.title}</TableRowColumn>
        <TableRowColumn colSpan="1" style={inlineStyles.rowColumn} >{statusIcon}</TableRowColumn>
        <TableRowColumn colSpan="2" style={inlineStyles.rowColumn} >
          <Link to={`/cms/projects/${this.props.id}/edit`}>
            <IconButton className={styles.button}>
              <EditorModeEdit />
            </IconButton>
          </Link>
          <IconButton className={styles.toggleButton} onClick={this.handleToggle} >
            {publishActionIcon}
          </IconButton>
        </TableRowColumn>
      </TableRow>
    )
  }
};

Item.propTypes = propTypes;

export default Item;
