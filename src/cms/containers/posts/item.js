import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { deletePost, togglePost } from '../../actions/posts';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import IconButton from 'material-ui/lib/icon-button';
import EditorModeEdit from 'material-ui/lib/svg-icons/editor/mode-edit';
import ContentClear from 'material-ui/lib/svg-icons/content/clear';
import AvAirplay from 'material-ui/lib/svg-icons/av/airplay';
import ActionVisibility from 'material-ui/lib/svg-icons/action/visibility';
import ActionVisibilityOff from 'material-ui/lib/svg-icons/action/visibility-off';

class PostItem  extends Component {

    constructor(props) {
        super(...props);

        this.handleDelete = this.handleDelete.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object
    };


    handleDelete() {
        this.props.deletePost(this.props.id)
            .then( () => {
                this.context.router.push('/cms/posts');
            });
    }

    handleToggle() {
        this.props.togglePost(this.props.id)
            .then( this.context.router.push('/cms/posts') );
    }

    publishIcon() {
        if (this.props.post.published) {
            return <ActionVisibility />;
        } else {
            return <ActionVisibility />;
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
                    <IconButton onClick={this.handleToggle}>
                        {this.publishIcon()}
                    </IconButton>
                    <IconButton onClick={this.handleDelete}>
                        <ContentClear />
                    </IconButton>
                </TableRowColumn>
            </TableRow>
        )
    }
};

export default connect(null, { deletePost, togglePost })(PostItem);