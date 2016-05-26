import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ContentClear from 'material-ui/svg-icons/content/clear';
import AvAirplay from 'material-ui/svg-icons/av/airplay';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import ActionVisibilityOff from 'material-ui/svg-icons/action/visibility-off';

import styles from './styles.scss';

class ItemRow extends Component {

  constructor(props) {
    super(props);

    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.handleTogglePost = this.handleTogglePost.bind(this);
  }

  handleDeletePost() {
    this.props.handleDeletePost(this.props.post.id);
  }

  handleTogglePost() {
    this.props.handleTogglePost(this.props.post.id);
  }
  
  render() {
    let publishIcon;
    if (this.props.post.accepted) {
      publishIcon =  <ActionVisibility className={styles.visibleIcon} />;
    } else {
      publishIcon = <ActionVisibilityOff className={styles.inVisibleIcon} />;
    }

    return (
      <TableRow>
        <TableRowColumn colSpan="1">{this.props.post.id}</TableRowColumn>
        <TableRowColumn colSpan="3">{this.props.post.title}</TableRowColumn>
        <TableRowColumn colSpan="1">{this.props.post.status}</TableRowColumn>
        <TableRowColumn colSpan="1">{this.props.post.publishedAt}</TableRowColumn>
        <TableRowColumn colSpan="3">
          <Link to={`/cms/posts/${this.props.post.id}`}>
            <IconButton className={styles.button}>
              <AvAirplay />
            </IconButton>
          </Link>
          <Link to={`/cms/posts/${this.props.post.id}/edit`}>
            <IconButton className={styles.button}>
              <EditorModeEdit />
            </IconButton>
          </Link>
          <IconButton className={styles.toggleButton} onClick={this.handleTogglePost}>
            {publishIcon}
          </IconButton>
          <IconButton className={styles.deleteButton} onClick={this.handleDeletePost}>
            <ContentClear />
          </IconButton>
        </TableRowColumn>
      </TableRow>
    )
  }
};

ItemRow.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    publishedAt: PropTypes.string,
    accepted: PropTypes.bool.isRequired
  }).isRequired,
  handleDeletePost: PropTypes.func.isRequired,
  handleTogglePost: PropTypes.func.isRequired
};

export default ItemRow;
