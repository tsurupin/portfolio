import React, { Component, PropTypes } from 'react';
import { fetchProject, fetchNewProject, saveProject, changeProject } from '../../../actions/projects';
import { createTag, deleteTag } from '../../../actions/tags';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import DropzoneImage from '../../../components/shared/DropzoneImage/index';
import TextField from 'material-ui/TextField';
import TextEditor from 'sharedComponents/textEditors/Editor/index'
import RaisedButton from 'material-ui/RaisedButton';
import TagField from '../../../components/shared/TagField/index';
import styles from './styles.scss';

const propTypes = {
  fields: PropTypes.object.isRequired,
  params: PropTypes.object,
  fetchProject: PropTypes.func.isRequired,
  fetchNewProject: PropTypes.func.isRequired,
  saveProject: PropTypes.func.isRequired,
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

class ProjectForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit       = this.handleSubmit.bind(this);
    this.handleAddTag       = this.handleAddTag.bind(this);
    this.handleDeleteTag    = this.handleDeleteTag.bind(this);
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
  
  render() {
   
    const headerLabel = this.props.params.id ? 'Update Project' : 'Create New Project';
    const submitButtonLabel = this.props.params.id ? 'Update' : 'Create';
    const { handleSubmit, fields: { title, caption, sourceUrl, image, description } } = this.props;

    return (
      <form className={styles.root} onSubmit={handleSubmit(this.handleSubmit)}>
        <h2 className={styles.heading}>{headerLabel}</h2>
        <TextField
          {...title}
          floatingLabelText="Title"
          hintText="Enter Title"
          fullWidth={true}
          errorText={title.touched && title.error ? title.error : ''}
        />
        <br/>
        <TextEditor
          {...description}
          handleUpdate={ (value) => { description.onChange(value) }}
        />
        <br/>
        <TextField
          {...sourceUrl}
          floatingLabelText="SourceURL"
          hintText="Enter SourceURL"
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
          {...image}
          handleUpdate={ (file) => image.onChange(file) }
        />
        <TextField
          {...caption}
          floatingLabelText="Caption"
          hintText="Enter Caption"
          fullWidth={true}
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
  'id', 'title', 'sourceUrl', 'caption', 'image', 'description'
];

function mapStateToProps(state) {
  return {
    initialValues: state.projects.project,
    tags: state.tags.tags,
    tagSuggestions: state.tags.tagSuggestions
  }
}

ProjectForm.propTypes = propTypes;

export default reduxForm({
  form: 'ProjectForm',
  fields,
  validate
}, mapStateToProps, {
  fetchProject,
  fetchNewProject,
  saveProject,
  createTag,
  deleteTag
})(ProjectForm);