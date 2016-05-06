import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, deletePost, togglePost } from '../../actions/posts';
import { Link } from 'react-router';
import Item from './../../components/posts/Item/index';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableHeader from 'material-ui/lib/table/table-header';
import TableBody from 'material-ui/lib/table/table-body';
import TableRow from 'material-ui/lib/table/table-row';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

const inlineStyles = {
  floatButton: {
    position: 'fixed',
    zIndex: 100,
    bottom: '5%',
    right: '5%'
  }
};

class PostsIndex extends Component {

  constructor(props) {
    super(...props);
    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.handleTogglePost = this.handleTogglePost.bind(this);
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  handleDeletePost(post_id) {
    this.props.deletePost(post_id)
      .then(() => {
        this.context.router.push('/cms/posts');
      });
  }

  handleTogglePost(post_id) {
    this.props.togglePost(post_id)
      .then(this.context.router.push('/cms/posts'));
  }

  render() {
    return (
      <section>
        <Link to="/cms/posts/new">
          <FloatingActionButton style={inlineStyles.floatButton}>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
        <Table fixedHeader={true}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow selectable={false}>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Description</TableHeaderColumn>
              <TableHeaderColumn>Published Date</TableHeaderColumn>
              <TableHeaderColumn>Published Status</TableHeaderColumn>
              <TableHeaderColumn>Action</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.props.posts.map((post, index) => (
              <Item
                post={post}
                key={index}
                handleDeletePost={this.handleDeletePost}
                handleTogglePost={this.handleTogglePost}
              />
            ))}
          </TableBody>
        </Table>
      </section>
    );
  }
}


function mapStateToProps(state) {
  return { posts: state.posts.all }
}

export default connect(mapStateToProps, { fetchPosts, deletePost, togglePost })(PostsIndex);