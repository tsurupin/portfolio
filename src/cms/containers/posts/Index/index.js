import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, togglePost } from 'cms/actions/posts';
import { Link } from 'react-router';
import Item from 'cms/components/posts/indexes/Item/index';
import NoContent from 'shared/components/NoContent/index';
import { 
  Table, 
  TableHeaderColumn, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableRowColumn, 
  TableFooter 
} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Pagination from 'cms/components/shared/Pagination/index';
import styles from'./styles.scss';


const propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      publishedAt: PropTypes.string,
      status: PropTypes.number.isRequired,
      accepted: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  togglePost: PropTypes.func.isRequired,
  finishLoading: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    posts: state.posts.posts,
    page: state.posts.page,
    limit: state.posts.limit,
    total: state.posts.total
  }
}

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
    this.state = { loading: true };

    
    this.handleToggle = this.handleToggle.bind(this);
    this.handleMovePage = this.handleMovePage.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts()
      .then(() => {
        this.props.finishLoading();
        this.setState({ loading: false });
      });
  }
  
  handleToggle(sortRank, post_id) {
    this.props.togglePost(sortRank, post_id);
  }
  
  handleMovePage(page) {
    this.props.fetchPosts(page);
  }

  render() {
    if (this.state.loading) {
      return <section />
    }

    if (this.props.posts.length === 0 ) {
      return (
        <section className={styles.root}>
          <NoContent pageName="posts" />
        </section>
      );
    }

    return (
      <section className={styles.root}>
        <Link to="/cms/posts/new">
          <FloatingActionButton style={inlineStyles.floatButton} primary={true}>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
        <h1 className={styles.title}>Post</h1>
        <Table fixedHeader={true} fixedFooter={true}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow selectable={false}>
              <TableHeaderColumn colSpan="1" style={inlineStyles.headerColumn}>ID</TableHeaderColumn>
              <TableHeaderColumn colSpan="4" style={inlineStyles.headerColumn}>Title</TableHeaderColumn>
              <TableHeaderColumn colSpan="1" style={inlineStyles.headerColumn}>Status</TableHeaderColumn>
              <TableHeaderColumn colSpan="2" style={inlineStyles.headerColumn}>Date</TableHeaderColumn>
              <TableHeaderColumn colSpan="3" style={inlineStyles.headerColumn}>Action</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.props.posts.map((post, index) => (
              <Item
                {...post}
                key={post.id}
                sortRank={index}
                handleToggle={this.handleToggle}
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

export default connect(mapStateToProps, { fetchPosts, togglePost })(PostIndex);