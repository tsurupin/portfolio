import React, { Component, PropTypes } from 'react';
import { fetchPost, fetchNewPost, createPost, deletePost } from '../../actions/posts';
import { createItem, updateItem, deleteItem, moveItem } from '../../actions/items';
import { createTag, deleteTag } from '../../actions/tags';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import ItemFormEditBox from '../../components/items/forms/edit_box';
import TextField from 'material-ui/lib/text-field';
import DatePicker from '../../components/utilities/date_picker_wrapper';
import RaisedButton from 'material-ui/lib/raised-button';
import PostItemBlock from '../../components/items/post_item_block';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';
import TagField from '../../components/utilities/tag_field';

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
    this.handleAddTag = this.handleAddTag.bind(this);
    this.handleDeleteTag = this.handleDeleteTag.bind(this);
  }

  componentWillMount() {
    if (this.props.params.id) {
      this.props.fetchPost(this.props.params.id)
    } else {
      this.props.fetchNewPost()
    }
  }

  handleSubmit(props) {
    this.props.createPost(
      { 
        post: { 
          ...props, 
          itemsAttributes: this.props.items, 
          postTaggingsAttributes: this.props.tags
        }
      }
    ).then(this.context.router.push('/cms'));
  }

  handleAddItem(targetType) {
    this.props.createItem(targetType);
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

  handleAddTag(tag) {
    this.props.createTag(tag);
  }

  handleDeleteTag(sortRank) {
    this.props.deleteTag(sortRank);
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
    console.log(this.props)
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
        <TagField
          tags={this.props.tags}
          suggestions={this.props.tagSuggestions}
          handleAddTag={this.handleAddTag}
          handleDeleteTag={this.handleDeleteTag}
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
  'title', 'description', 'publishedAt', 'id'
];

function mapStateToProps(state) {
  console.log(state.posts.post);
  console.log(state.items);
  return {
    initialValues: state.posts.post,
    items: state.items,
    tags: state.tags.tags,
    tagSuggestions: state.tags.tagSuggestions
  }
}

PostsForm.propTypes = {
  fields: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  params: PropTypes.object,
  fetchPost: PropTypes.func.isRequired,
  fetchNewPost: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  createItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  moveItem: PropTypes.func.isRequired,
  createTag: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired
};


export default reduxForm({
  form: 'PostsNew',
  fields,
  validate
}, mapStateToProps, {
  fetchPost,
  fetchNewPost,
  createPost,
  deletePost,
  createItem,
  deleteItem,
  updateItem,
  moveItem,
  createTag,
  deleteTag
})(PostsForm);