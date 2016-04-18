import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'edux-form';

class PostsForm extends Component {

    static contextTypes = {
        router: PropTypes.object
    };


    componentWillMount() {
        console.log('hog')
    }

    onSubmit(props) {
        this.props.createPost(props)
            .then(() => {
                this.context.router.push('/cms/posts');
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form">
                <h2 className="form-heading">Create New Post</h2>


            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    if(!values.title) {
        errors.title = 'Enter title'
    }
}

export default reduxForm({
    form: 'PostNew',
    fields: ['title', 'description', 'publishedAt'],
    validate
}, null, { createPost })(PostsForm);