import React, { Component, PropTypes } from 'react';
import { fetchAuthor, saveAuthor } from '../../../actions/authors';
import { createSocialAccount, updateSocialAccount, deleteSocialAccount } from '../../../actions/socialAccounts';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import DropzoneImage from '../../../components/shared/DropzoneImage/index';
import TextField from 'material-ui/lib/text-field';
import TextEditor from '../../../components/shared/TextEditor/Editor/index'
import SocialAccount from '../../../components/authors/forms/SocialAcount/index';
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

class AuthorsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '',
      description: ''
    };

    this.handleSubmit       = this.handleSubmit.bind(this);
    this.handleCreateSocialAccount    = this.handleCreateSocialAccount.bind(this);
    this.handleUpdateSocialAccount    = this.handleUpdateSocialAccount.bind(this);
    this.handleDeleteSocialAccount    = this.handleDeleteSocialAccount.bind(this);
    this.handleUpdateImage  = this.handleUpdateImage.bind(this);
    this.handleUpdateText   = this.handleUpdateText.bind(this);
  }

  componentWillMount() {
    this.props.fetchAuthor(this.props.params.id)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      image: nextProps.image,
      description: nextProps.description
    })
  };

  handleSubmit(props) {
    console.log(props)
    this.props.saveAuthor(
      {
        author: {
          ...props,
          image: this.state.image,
          description: this.state.description,
          socialAccountAttributes: this.props.socialAccount
        }
      }
    );
  }
  
  handleCreateSocialAccount() {
    this.props.createSocialAccount();
  }
  
  handleUpdateSocialAccount(params) {
    this.props.updateSocialAccount(params)
  }
  
  handleDeleteSocialAccount(sortRank) {
    this.props.deleteSocialAccount(sortRank)
  }

  handleUpdateSNS(accountInfo) {
    //this.props.createTag(tag);
  }


  handleUpdateImage(image) {
    this.setState(image);
  }

  handleUpdateText(text) {
    this.setState(text);
  }
  
  renderSocialAccounts() {
    if (this.props.socialAccounts.length > 0) {
      {this.props.socialAccounts.map((account, index) => {
        return (
          <SocialAccount
            key={index}
            socialAccount={account}
            handleUpdate={this.handleUpdateSocialAccount}
            handleDelete={this.handleDeleteSocialAccount}
          />
        )
      })
    }
  }

  render() {

    console.log(this.state)

    const { handleSubmit, fields: { name, githubUrl } } = this.props;

    return (
      <form className={styles.root} onSubmit={handleSubmit(this.handleSubmit)}>
        <h2 className={styles.heading}>Update About</h2>
        <TextField
          {...name}
          floatingLabelText="name"
          hintText="Enter name"
          fullWidth={true}
          errorText={name.touched && name.error ? name.error : ''}
        />
        <br/>
        <TextEditor
          description={this.state.description}
          handleUpdate={this.handleUpdateText}
        />
        <TextField
          {...githubUrl}
          floatingLabelText="GitHub URL"
          hintText="Enter GitHub URL"
          fullWidth={true}
          errorText={githubUrl.touched && githubUrl.error ? githubUrl.error : ''}
        />
        <br/>
        <br />
        <DropzoneImage
          image={this.state.image}
          handleUpdate={this.handleUpdateImage}
        />
        <br />
        <br />
        {this.renderSocialAccounts()}
        <RaisedButton
          type="submit"
          label='Update'
          secondary={true}
          style={inlineStyles.submitButton}
        />
      </form>

    );
  }
}


function validate(values) {
  const errors = {};
  if(!values.name) {
    errors.name = 'Entry name'
  }

  return errors;
}

const fields = [
  'id', 'name', 'githubUrl'
];

function mapStateToProps(state) {
  return {
    initialValues: state.authors.author,
    image: state.authors.author.image,
    description: state.authors.author.description,
    socialAccounts: state.socialAccounts
  }
}

AuthorsForm.propTypes = {
  fields: PropTypes.object.isRequired,
  image: PropTypes.string,
  description: PropTypes.string,
  socialAccounts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      sourceUrl: PropTypes.string,
      image: PropTypes.string
  })),
  params: PropTypes.object,
  fetchAuthor: PropTypes.func.isRequired,
  saveAuthor: PropTypes.func.isRequired,
  createSocialAccount: PropTypes.func.isRequired,
  updateSocialAccount: PropTypes.func.isRequired,
  deleteSocialAccount: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'AuthorsForm',
  fields,
  validate
}, mapStateToProps, {
  fetchAuthor,
  saveAuthor,
  createSocialAccount,
  updateSocialAccount,
  deleteSocialAccount
})(AuthorsForm);