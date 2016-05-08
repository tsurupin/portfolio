import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import TableRow from '../../../../../../node_modules/material-ui/lib/table/table-row';
import TableRowColumn from '../../../../../../node_modules/material-ui/lib/table/table-row-column';
import IconButton from '../../../../../../node_modules/material-ui/lib/icon-button';
import EditorModeEdit from '../../../../../../node_modules/material-ui/lib/svg-icons/editor/mode-edit';
import ContentClear from '../../../../../../node_modules/material-ui/lib/svg-icons/content/clear';
import AvAirplay from '../../../../../../node_modules/material-ui/lib/svg-icons/av/airplay';
import ActionVisibility from '../../../../../../node_modules/material-ui/lib/svg-icons/action/visibility';
import ActionVisibilityOff from '../../../../../../node_modules/material-ui/lib/svg-icons/action/visibility-off';
import styles from './styles.scss';

export default class Item extends Component {

  constructor(props) {
    super(...props);

    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.handleTogglePost = this.handleTogglePost.bind(this);
  }

  handleDeletePost() {
    this.props.handleDeletePost(this.props.post.id);
  }

  handleTogglePost() {
    this.props.handleTogglePost(this.props.post.id);
  }

  publishIcon() {
    if (this.props.post.published) {
      return <ActionVisibility className={styles.visibleIcon} />;
    } else {
      return <ActionVisibilityOff className={styles.inVisibleIcon} />;
    }
  }

  render() {
    return (
      <TableRow>
        <TableRowColumn>{this.props.post.id}</TableRowColumn>
        <TableRowColumn>{this.props.post.title}</TableRowColumn>
        <TableRowColumn>{this.props.post.description}</TableRowColumn>
        <TableRowColumn>Published</TableRowColumn>
        <TableRowColumn>Published Status</TableRowColumn>
        <TableRowColumn>
          <Link to={`/cms/posts/${this.props.post.id}`}>
            <IconButton>
              <AvAirplay />
            </IconButton>
          </Link>
          <Link to={`/cms/posts/${this.props.post.id}/edit`}>
            <IconButton>
              <EditorModeEdit />
            </IconButton>
          </Link>
          <IconButton className={styles.toggleButton} onClick={this.handleTogglePost}>
            {this.publishIcon()}
          </IconButton>
          <IconButton className={styles.deleteButton} onClick={this.handleDeletePost}>
            <ContentClear />
          </IconButton>
        </TableRowColumn>
      </TableRow>
    )
  }
};

Item.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    published: PropTypes.bool.isRequired
  }).isRequired,
  handleDeletePost: PropTypes.func.isRequired,
  handleTogglePost: PropTypes.func.isRequired
};
