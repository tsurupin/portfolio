import React, { Component, PropTypes } from 'react';
import { fetchPostForm, fetchNewPost, savePost } from 'cmsActions/posts';
import { createItem, updateItem, deleteItem, moveItem } from 'cmsActions/items';
import { createTag, deleteTag } from 'cmsActions/tags';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import EditBox from '../../../components/posts/forms/Item/Form/EditBox/index';
import TextField from 'material-ui/TextField';
import DatePicker from '../../../components/shared/CustomDatePicker/index';
import RaisedButton from 'material-ui/RaisedButton';
import Item from '../../../components/posts/forms/Item/index';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import TagField from '../../../components/shared/TagField/index';
import styles from './styles.scss';


const propTypes = {
  fields: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  params: PropTypes.object,
  fetchPost: PropTypes.func.isRequired,
  fetchNewPost: PropTypes.func.isRequired,
  savePost: PropTypes.func.isRequired,
  createItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  moveItem: PropTypes.func.isRequired,
  createTag: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired
};

const inlineStyles = {
  submitButton: {
    position: 'absolute', 
    bottom: 10, 
    right: 15
  },
  indicator: {
    display: 'inline-block', 
    position: 'relative'
  }
};

class PostForm extends Component {

  constructor(props) {
    super(props);

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
      this.props.fetchPostForm(this.props.params.id)
    } else {
      this.props.fetchNewPost()
    }
  }

  handleSubmit(props) {
    this.props.savePost(
      { 
        post: { 
          ...props, 
          itemsAttributes: this.props.items, 
          taggingsAttributes: this.props.tags
        }
      }
    );
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
      <section className={styles.itemContainer}>
        <ul className={styles.itemList}>
          {this.props.items.map((item, index) => {
            return (
              <Item
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
          style={inlineStyles.indicator}
        />
      );
    }
  }

  
  render() {
    const submitButtonLabel = this.props.params.id ? 'Update' : 'Create';
    const { handleSubmit, fields: { title, publishedAt } } = this.props;
    
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)} className={styles.root}>
        {this.renderLoadingIndicator()}
        <h2 className={styles.heading}>Create New Post</h2>
        <TextField
          {...title}
          floatingLabelText="Title"
          hintText="Enter Title"
          fullWidth={true}
          errorText={title.touched && title.error ? title.error : ''}
        />
        <br/>
        <br/>
        <label className={styles.label}>Published At</label>
        <DatePicker
          className={styles.datapicker}
          container="inline"
          autoOk={true}
          placeholder="PublishedAt"
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
        <EditBox handleAddItem={this.handleAddItem}/>
        <br />
        <br />
        <RaisedButton
          type="submit"
          label={submitButtonLabel}
          secondary={true}
          style={inlineStyles.submitButton}
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
  'id', 'title', 'publishedAt'
];

function mapStateToProps(state) {
  return {
    initialValues: state.posts.postForm,
    items: state.items,
    tags: state.tags.tags,
    tagSuggestions: state.tags.tagSuggestions
  }
}

PostForm.propTypes = propTypes;


export default reduxForm({
  form: 'PostForm',
  fields,
  validate
}, mapStateToProps, {
  fetchPostForm,
  fetchNewPost,
  savePost,
  createItem,
  deleteItem,
  updateItem,
  moveItem,
  createTag,
  deleteTag
})(PostForm);