import React, { Component, PropTypes } from 'react';
import { fetchProject, fetchNewProject, saveProject, changeProject } from '../../../actions/projects';
import { createTag, deleteTag } from '../../../actions/tags';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import DropzoneImage from '../../../components/shared/DropzoneImage/index';
import TextField from 'material-ui/lib/text-field';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';
import TextEditor from '../../../components/shared/TextEditor/Editor/index'
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
      description: props.description
    };

    this.handleSubmit       = this.handleSubmit.bind(this);
    this.handleAddTag       = this.handleAddTag.bind(this);
    this.handleDeleteTag    = this.handleDeleteTag.bind(this);
    this.handleUpdateImage  = this.handleUpdateImage.bind(this);
    this.handleUpdateText   = this.handleUpdateText.bind(this);
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
          description: this.state.description,
          taggingsAttributes: this.props.tags
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

  handleUpdateImage(image) {
    this.setState(image);
  }
  
  handleUpdateText(text) {
    this.setState(text);
  }

  render() {
   
    const submitButtonLabel = this.props.params.id ? 'Update' : 'Create';
    const { handleSubmit, fields: { title, sampleUrl, sourceUrl } } = this.props;

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
        <TextEditor
          description={this.state.description}
          handleUpdate={this.handleUpdateText}
        />
        <br/>
        <TextField
          {...sourceUrl}
          floatingLabelText="SourceURL"
          hintText="Enter SourceURL"
          fullWidth={true}
        />
        <TextField
          {...sampleUrl}
          floatingLabelText="SampleURL"
          hintText="Enter SampleURL"
          fullWidth={true}
        />
        <TagField
          tags={this.props.tags}
          suggestions={this.props.tagSuggestions}
          handleAddTag={this.handleAddTag}
          handleDeleteTag={this.handleDeleteTag}
        />
        <br />
        <DropzoneImage
          image={this.state.image}
          handleUpdate={this.handleUpdateImage}
        />
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
  if(!values.title) {
    errors.title = 'Entry title'
  }

  return errors;
}

const fields = [
  'title', 'sourceUrl', 'sampleUrl'
];

function mapStateToProps(state) {
  console.log(state.projects.project);
  return {
    initialValues: state.projects.project,
    image: state.projects.project.image,
    description: state.projects.project.description,
    tags: state.tags.tags,
    tagSuggestions: state.tags.tagSuggestions
  }
}

ProjectsForm.propTypes = {
  fields: PropTypes.object.isRequired,
  image: PropTypes.string,
  description: PropTypes.string,
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