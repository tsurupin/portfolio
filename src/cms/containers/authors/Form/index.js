import React, { Component, PropTypes } from 'react';
import { fetchAuthor, updateAuthor } from '../../../actions/authors';
import { updateSocialAccount } from '../../../actions/socialAccounts';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import DropzoneImage from '../../../components/shared/DropzoneImage/index';
import TextField from 'material-ui/TextField';
import TextEditor from 'sharedComponents/textEditors/Editor/index'
import SocialAccount from '../../../components/authors/forms/SocialAccount/index';
import ErrorMessage from '../../../components/shared/ErrorMessage/index';

import styles from './styles.scss';


const propTypes = {
  fields: PropTypes.object.isRequired,
  socialAccounts: PropTypes.arrayOf(
    PropTypes.shape({
      accountType: PropTypes.string.isRequired,
      url: PropTypes.string,
      id: PropTypes.number,
      authorId: PropTypes.number
    })),
  params: PropTypes.object,
  fetchAuthor: PropTypes.func.isRequired,
  updateAuthor: PropTypes.func.isRequired,
  updateSocialAccount: PropTypes.func.isRequired
};


const inlineStyles = {
  textField: {
    marginBottom: 10
  }
};

class AuthorForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit               = this.handleSubmit.bind(this);
    this.handleUpdateSocialAccount  = this.handleUpdateSocialAccount.bind(this);

  }

  componentWillMount() {
    this.props.fetchAuthor()
  }

  handleSubmit(props) {
    this.props.updateAuthor(
      {
        author: {
          ...props,
          socialAccountsAttributes: this.props.socialAccounts
        }
      }
    );
  }
 
  handleUpdateSocialAccount(sortRank, url) {
    this.props.updateSocialAccount(sortRank, url)
  }

  renderSocialAccounts() {
    return(
      this.props.socialAccounts.map((account, index) => {
        return (
          <SocialAccount
            key={index}
            sortRank={index}
            accountType={account.accountType}
            url={account.url}
            handleUpdate={this.handleUpdateSocialAccount}
          />
        )
      })
    );
  }

  renderErrorMessage() {
    if(this.props.errorMessage) {
      return <ErrorMessage message={this.props.errorMessage} />
    }
  }

  render() {
    const { handleSubmit, submitting, fields: { name, image, description, introduction } } = this.props;
    
    return (
      <form className={styles.root} onSubmit={handleSubmit(this.handleSubmit)}>
        <h2 className={styles.heading}>Update About</h2>
        <TextField
          {...name}
          floatingLabelText="name"
          hintText="Enter name"
          fullWidth={true}
          style={inlineStyles.textField}
          errorText={name.touched && name.error ? name.error : ''}
        />
        <div className={styles.item}>
          <label className={styles.label}>Description</label>
          <TextEditor
            key="description"
            {...description}
            handleUpdate={ (value) => { description.onChange(value) }}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Introduction</label>
          <TextEditor
            key="introduction"
            {...introduction}
            handleUpdate={ (value) => { introduction.onChange(value) }}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Image</label>
          <DropzoneImage
            {...image}
            handleUpdate={ (file) => image.onChange(file) }
          />
        </div>
        {this.renderSocialAccounts()}
        {this.renderErrorMessage()}
        <button type="submit"
                disabled={submitting}
                className={styles.button}
        >
          Update
        </button>
      </form>

    );
  }
}


function validate(values) {
  const errors = {};
  if(!values.name) {
    errors.name = "Entry name"
  }

  return errors;
}

const fields = [
  "id", "name", "image", "description", "introduction"
];

function mapStateToProps(state) {
  return {
    initialValues: state.authors.author,
    socialAccounts: state.socialAccounts,
    errorMessage: state.authors.errorMessage
  }
}

AuthorForm.propTypes = propTypes;

export default reduxForm({
  form: "AuthorForm",
  fields,
  validate
}, mapStateToProps, {
  fetchAuthor,
  updateAuthor,
  updateSocialAccount
})(AuthorForm);