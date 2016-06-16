import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, togglePost } from '../../../actions/posts';
import { Link } from 'react-router';
import ItemRow from '../../../components/posts/indexes/ItemRow/index';
import { Table, TableHeaderColumn, TableHeader, TableBody, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Pagination from '../../../components/shared/Pagination/index';
import styles from'./styles.scss';


const propTypes = {
  posts: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  togglePost: PropTypes.func.isRequired
};

const inlineStyles = {
  floatButton: {
    position: 'fixed',
    zIndex: 100,
    bottom: '5%',
    right: '3%'
  },
 
  headerColumn: {
    color: '#B3B3B3',
    fontWeight: 'bold'
  }
};

class PostIndex extends Component {
  
  constructor(props) {
    super(props);
    
    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.handleTogglePost = this.handleTogglePost.bind(this);
    this.handleMovePage = this.handleMovePage.bind(this);
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  handleDeletePost(post_id) {
    this.props.deletePost(post_id);
  }

  handleTogglePost(post_id) {
    this.props.togglePost(post_id);
  }
  
  handleMovePage(page) {
    this.props.fetchPosts(page);
  }

  render() {
    if(this.props.posts.length === 0 ) { return <div></div> }
    return (
      <section className={styles.root}>
        <Link to="/cms/posts/new">
          <FloatingActionButton style={inlineStyles.floatButton} secondary={true}>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
        <Table fixedHeader={true} fixedFooter={true}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow selectable={false}>
              <TableHeaderColumn colSpan="1" style={inlineStyles.headerColumn}>ID</TableHeaderColumn>
              <TableHeaderColumn colSpan="3" style={inlineStyles.headerColumn}>Title</TableHeaderColumn>
              <TableHeaderColumn colSpan="1" style={inlineStyles.headerColumn}>Status</TableHeaderColumn>
              <TableHeaderColumn colSpan="1" style={inlineStyles.headerColumn}>Date</TableHeaderColumn>
              <TableHeaderColumn colSpan="3" style={inlineStyles.headerColumn}>Action</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.props.posts.map((post, index) => (
              <ItemRow
                post={post}
                key={index}
                handleDeletePost={this.handleDeletePost}
                handleTogglePost={this.handleTogglePost}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableRowColumn>
                <Pagination
                  page={this.props.page}
                  total={this.props.total}
                  limit={this.props.limit}
                  onPageClick={this.handleMovePage}
                />
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </section>
    );
  }
}

PostIndex.propTypes = propTypes;

function mapStateToProps(state) {
  return { 
    posts: state.posts.posts, 
    page: state.posts.page, 
    limit: state.posts.limit, 
    total: state.posts.total 
  }
}

export default connect(mapStateToProps, { fetchPosts, togglePost })(PostIndex);