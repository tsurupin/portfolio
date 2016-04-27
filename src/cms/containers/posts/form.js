import React, { Component, PropTypes } from 'react';
import { fetchPost, createPost, deletePost } from '../../actions/posts';
import { fetchItems, createItem, updateItem, deleteItem, moveItem } from '../../actions/items';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import ItemFormEditBox from '../../components/items/forms/edit_box';
import TextField from 'material-ui/lib/text-field';
import DatePicker from '../../components/utilities/date_picker_wrapper';
import RaisedButton from 'material-ui/lib/raised-button';
import PostItemBlock from '../../components/items/post_item_block';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';

class PostsForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(...props);

    this.handleSubmit  = this.handleSubmit.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleMoveItem = this.handleMoveItem.bind(this);
  }

  componentWillMount() {
    if (this.props.params.id) {
      this.props.fetchPost(this.props.params.id)
        .then((post) => {
            this.props.fetchItems(post.items)
          }
        )
    }
  }

  handleSubmit(props) {
    console.log(props);
    console.log(this.props.items);
    this.props.createPost({ post: { ...props, itemsAttributes: this.props.items }})
      .then(this.context.router.push('/cms'));
  }

  handleAddItem(type) {
    this.props.createItem(type);
  }

  handleUpdateItem(sortRank, item) {
    this.props.updateItem(sortRank, item);
  }

  handleDeleteItem(sortRank) {
    this.props.deleteItem(sortRank);
  }

  handleMoveItem(sortRank, type) {
    this.props.moveItem(sortRank, type)
  }


  renderItems() {
    return (
      <section className="l-post-item-container">
        <ul className="post-item-block">
          {this.props.items.map((item, index) => {
            return (
              <PostItemBlock
                key={index}
                sortRank={index}
                item={item}
                totalCount={this.props.items.length-1}
                handleUpdateItem={this.handleUpdateItem}
                handleDeleteItem={this.handleDeleteItem}
                handleMoveItem={this.handleMoveItem}
              />
            );
          })}
        </ul>
      </section>
    );
  }

  renderLoadingIndicator() {
    if (this.props.loading) {
      return (
        <RefreshIndicator
          size={40}
          left={100}
          top={100}
          loadingColor={"#FF9800"}
          status="loading"
          style={{display: 'inline-block', position: 'relative'}}
        />
      );
    }
  }

  render() {
    const { handleSubmit, fields: { title, description, publishedAt } } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)} className="form">
        {this.renderLoadingIndicator()}
        <h2 className="form-heading">Create New Post</h2>
        <TextField
          {...title}
          hintText="Title"
          fullWidth={true}
          errorText={title.touched && title.error ? title.error : ''}
        />
        <br/>
        <TextField
          {...description}
          hintText="Description"
          multiLine={true}
          fullWidth={true}
          rows={4}
        />
        <br/>
        <DatePicker
          container="inline"
          autoOk={true}
          defaultDate={new Date()}
          errorText={publishedAt.touched && publishedAt.error ? publishedAt.error : ''}
          {...publishedAt}
        />
        {this.renderItems()}
        <ItemFormEditBox handleAddItem={this.handleAddItem}/>
        <RaisedButton
          type="submit"
          label="Create"
          secondary={true}
        />
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'Enter title'
  }
  if (!values.publishedAt) {
    errors.publishedAt = 'Enter published at'
  }
  return errors;
}

export const fields = [
  'title', 'description', 'publishedAt'
];

function mapStateToProps(state) {
  return { post: state.posts.post, items: state.items }
}

PostsForm.propTypes = {
  fields: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  params: PropTypes.object,
  fetchPost: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  fetchItems: PropTypes.func.isRequired,
  createItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  moveItem: PropTypes.func.isRequired
};


export default reduxForm({
  form: 'PostsNew',
  fields,
  validate
}, mapStateToProps, {
  fetchPost,
  createPost,
  deletePost,
  fetchItems,
  createItem,
  deleteItem,
  updateItem,
  moveItem
})(PostsForm);