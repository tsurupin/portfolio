import React, { Component, PropTypes } from 'react';
import { fetchPost, createPost, deletePost, updatePost } from '../../actions/posts';
import { fetchItems, createItem, updateItem, deleteItem, moveItem } from '../../actions/items';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import ItemFormEditBox from '../../components/items/forms/edit_box';
import TextField from 'material-ui/lib/text-field';
import DatePicker from '../../components/utilities/date_picker_wrapper';
import RaisedButton from 'material-ui/lib/raised-button';
import PostItemBlock from '../../components/items/post_item_block';

export const fields = [
    'title', 'description', 'publishedAt'
];


class PostsForm extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props) {
        super(...props);

        this.handleAddItem      = this.handleAddItem.bind(this);
        this.handleUpdateItem   = this.handleUpdateItem.bind(this);
        this.handleDeleteItem   = this.handleDeleteItem.bind(this);
        this.handleMoveItem     = this.handleMoveItem.bind(this);
    }

    componentWillMount() {
        if (this.props.params.id) {
            this.props.fetchPost(this.props.params.id)
                .then( (post) => {
                    this.props.fetchItems(post.items)
                }
            )
        }

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


    onSubmit(props) {
        console.log(props);
        this.props.createPost(props)
            .then(this.context.router.push('/cms/posts'));
    }

    renderItems() {
        return(
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

    render() {
        const { handleSubmit, fields: { title, description, publishedAt } } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="form">
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
                <ItemFormEditBox handleAddItem={this.handleAddItem} />
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
    if(!values.title) {
        errors.title = 'Enter title'
    }
    if(!values.publishedAt) {
        errors.publishedAt = 'Enter published at'
    }
    return errors;
}

function mapStateToProps(state) {
    return { post: state.posts.post, items: state.items }
}

export default reduxForm({
    form: 'PostsNew',
    fields,
    validate
}, mapStateToProps, { fetchPost, createPost, deletePost, updatePost, fetchItems, createItem, deleteItem, updateItem, moveItem })(PostsForm);