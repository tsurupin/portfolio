import React, { Component, PropTypes } from 'react';
import { fetchProject, fetchNewProject, saveProject, resetProject } from '../../../actions/projects';
import { createTag, deleteTag } from '../../../actions/tags';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import DropzoneImage from '../../../components/shared/DropzoneImage/index';
import TextField from 'material-ui/TextField';
import TextEditor from 'sharedComponents/textEditors/Editor/index'
import TagField from '../../../components/shared/TagField/index';
import ErrorMessage from '../../../components/shared/ErrorMessage/index';
import styles from './styles.scss';

const propTypes = {
  fields: PropTypes.object.isRequired,
  params: PropTypes.object,
  fetchProject: PropTypes.func.isRequired,
  fetchNewProject: PropTypes.func.isRequired,
  saveProject: PropTypes.func.isRequired,
  createTag: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired,
  finishLoading: PropTypes.func.isRequired
};

const inlineStyles = {
  textField: {
    marginBottom: 10
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
        .then(() => setTimeout(() => {
          this.props.finishLoading()
        }, 2000))
    } else {
      this.props.fetchNewProject()
        .then(() => setTimeout(() => {
          this.props.finishLoading()
          }, 2000))
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

  renderErrorMessage() {
    if(this.props.errorMessage) {
      return <ErrorMessage message={this.props.errorMessage} />
    }
  }
  

  render() {
    const headerLabel = this.props.params.id ? 'Update Project' : 'Create New Project';
    const submitLabel = this.props.params.id ? 'Update' : 'Create';
    const { handleSubmit, submitting, fields: { title, caption, sourceUrl, image, description } } = this.props;
    
    return (
      <form className={styles.root} onSubmit={handleSubmit(this.handleSubmit)}>
        <h2 className={styles.heading}>{headerLabel}</h2>
        <TextField
          {...title}
          floatingLabelText="Title"
          hintText="Enter Title"
          fullWidth={true}
          style={inlineStyles.textField}
          errorText={title.touched && title.error ? title.error : ''}
        />
        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <TextEditor
            {...description}
            handleUpdate={ (value) => { description.onChange(value) }}
          />
        </div>
        <TextField
          {...sourceUrl}
          floatingLabelText="SourceURL"
          hintText="Enter SourceURL"
          fullWidth={true}
        />
        <div className={styles.formGroup}>
          <TagField
            tags={this.props.tags}
            suggestions={this.props.tagSuggestions}
            handleAddTag={this.handleAddTag}
            handleDeleteTag={this.handleDeleteTag}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Image</label>
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
        </div>
        {this.renderErrorMessage()}
        <button type="submit"
                disabled={submitting}
                className={styles.button}
        >
          {submitLabel}
        </button>
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
  "id", "title", "sourceUrl", "caption", "image", "description"
];



function mapStateToProps(state) {
  return {
    initialValues: state.projects.project,
    tags: state.tags.tags,
    tagSuggestions: state.tags.tagSuggestions,
    errorMessage: state.projects.errorMessage
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
  resetProject,
  createTag,
  deleteTag
})(ProjectForm);