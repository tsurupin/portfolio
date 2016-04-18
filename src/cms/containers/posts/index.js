import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/posts';
import { Link } from 'react-router';
import PostItem from './item';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableHeader from 'material-ui/lib/table/table-header';
import TableBody from 'material-ui/lib/table/table-body';
import TableRow from 'material-ui/lib/table/table-row';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

const styles = {
    floatButton: {
        position: 'fixed',
        zIndex: 100,
        bottom: '5%',
        right: '5%'
    }
};

class PostsIndex extends Component {
    componentWillMount() {
        this.props.fetchPosts();
    }

    render() {
        return (
          <section>
              <Link to="/cms/posts/new">
                  <FloatingActionButton style={styles.floatButton}>
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
                    {this.props.posts.map( (post, index) => (
                        <PostItem post={post} key={index} />
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

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);