import React, { Component, PropTypes } from 'react';
import { fetchProject, fetchNewProject, saveProject } from '../../../actions/projects';
import { createTag, deleteTag } from '../../../actions/tags';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import DropzoneImage from '../../../components/shared/DropzoneImage/index';
import TextField from 'material-ui/lib/text-field';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';
import TagField from '../../../components/shared/TagField/index';
import RaisedButton from 'material-ui/lib/raised-button';

import styles from './styles.scss';

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

class ProjectsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: props.image,
      errorImage: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.handleDeleteTag = this.handleDeleteTag.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

  }

  componentWillMount() {
    if (this.props.params.id) {
      this.props.fetchProject(this.props.params.id)
    } else {
      this.props.fetchNewProject()
    }
  }

  handleSubmit(props) {
    this.props.saveProject(
      {
        project: {
          ...props,
          image: this.state.image,
          projectTaggingsAttributes: this.props.tags
        }
      }
    );
  }

  handleAddTag(tag) {
    this.props.createTag(tag);
  }

  handleDeleteTag(sortRank) {
    this.props.deleteTag(sortRank);
  }

  handleUpdate(props) {
    let params = { errorMessage: props.errorMessage };
    if(props.image) {
      params = { ...params, image: props.image }
    }
    
    this.setState(params);
  }

  render() {
    const submitButtonLabel = this.props.params.id ? 'Update' : 'Create';
    const { handleSubmit, fields: { title, description, image, sampleURL, sourceURL } } = this.props
    return (
      <form className={styles.root} onSubmit={handleSubmit(this.handleSubmit)}>
        <h2 className={styles.heading}>Create New Project</h2>
        <TextField
          {...title}
          floatingLabelText="Title"
          hintText="Enter Title"
          fullWidth={true}
          errorText={title.touched && title.error ? title.error : ''}
        />
        <br/>
        <TextField
          {...description}
          floatingLabelText="Description"
          hintText="Enter Description"
          multiLine={true}
          fullWidth={true}
          rows={2}
        />
        <br/>
        <TextField
          {...sourceURL}
          floatingLabelText="SourceURL"
          hintText="Enter SourceURL"
          multiLine={true}
          fullWidth={true}
        />
        <TextField
          {...sampleURL}
          floatingLabelText="SampleURL"
          hintText="Enter SampleURL"
          multiLine={true}
          fullWidth={true}
        />
        <TagField
          tags={this.props.tags}
          suggestions={this.props.tagSuggestions}
          handleAddTag={this.handleAddTag}
          handleDeleteTag={this.handleDeleteTag}
        />
        <br />
        <br />
        <DropzoneImage
          image={this.state.image}
          errorMessage={this.state.errorMessage}
          handleUpdate={this.handleUpdate}
        />
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
  if(!values.title) {
    errors.title = 'Entry title'
  }

  return errors;
}

const fields = [
  'title', 'description', 'image', 'sourceURL', 'sampleURL'
];

function mapStateToProps(state) {
  return {
    initialValues: state.projects.project,
    tags: state.tags.tags,
    tagSuggestions: state.tags.tagSuggestions
  }
}

ProjectsForm.propTypes = {
  fields: PropTypes.object.isRequired,
  params: PropTypes.object,
  fetchProject: PropTypes.func.isRequired,
  fetchNewProject: PropTypes.func.isRequired,
  saveProject: PropTypes.func.isRequired,
  createTag: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'ProjectsForm',
  fields,
  validate
}, mapStateToProps, {
  fetchProject,
  fetchNewProject,
  saveProject,
  createTag,
  deleteTag
})(ProjectsForm);