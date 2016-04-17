import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { deleteArticle, toggleArticle } from '../../actions/articles';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import IconButton from 'material-ui/lib/icon-button';
import EditorModeEdit from 'material-ui/lib/svg-icons/editor/mode-edit';
import ContentClear from 'material-ui/lib/svg-icons/content/clear';
import AvAirplay from 'material-ui/lib/svg-icons/av/airplay';
import ActionVisibility from 'material-ui/lib/svg-icons/action/visibility';
import ActionVisibilityOff from 'material-ui/lib/svg-icons/action/visibility-off';

class ArticleItem  extends Component {

    constructor(props) {
        super(...props);

        this.handleDelete = this.handleDelete.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object
    };


    handleDelete() {
        this.props.deleteArticle(this.props.id)
            .then( () => {
                this.context.router.push('/cms/articles');
            });
    }

    handleToggle() {
        this.props.toggleArticle(this.props.id)
            .then( this.context.router.push('/cms/articles') );
    }

    publishIcon() {
        if (this.props.article.published) {
            return <ActionVisibility />;
        } else {
            return <ActionVisibility />;
        }
    }

    render() {
        return (
            <TableRow>
                <TableRowColumn>{this.props.article.id}</TableRowColumn>
                <TableRowColumn>{this.props.article.title}</TableRowColumn>
                <TableRowColumn>{this.props.article.description}</TableRowColumn>
                <TableRowColumn>Published</TableRowColumn>
                <TableRowColumn>Published Status</TableRowColumn>
                <TableRowColumn>
                    <Link to={`/cms/articles/${this.props.article.id}`}>
                        <IconButton>
                            <AvAirplay />
                        </IconButton>
                    </Link>
                    <Link to={`/cms/articles/${this.props.article.id}/edit`}>
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

export default connect(null, { deleteArticle, toggleArticle })(ArticleItem);