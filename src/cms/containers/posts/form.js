import React, { Component, PropTypes } from 'react';
import { createPost } from '../../actions/posts';
import { createItem } from '../../actions/items';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import ItemFormEditBox from '../../components/items/forms/edit_box';
import TextField from 'material-ui/lib/text-field';
import DatePicker from '../../components/date_picker_wrapper';
import RaisedButton from 'material-ui/lib/raised-button';

export const fields = [
    'title', 'description', 'publishedAt'
];

class PostsForm extends Component {

    constructor(props) {
        super(...props);

        this.handleAddItem = this.handleAddItem.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        console.log(this.props)
    }

    handleAddItem(type) {
        this.props.createItem(type);
    }

    onSubmit(props) {
        console.log(props);
        this.props.createPost(props)
            .then(this.context.router.push('/cms/posts'));
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

export default reduxForm({
    form: 'PostsNew',
    fields,
    validate
}, null, { createPost, createItem })(PostsForm);