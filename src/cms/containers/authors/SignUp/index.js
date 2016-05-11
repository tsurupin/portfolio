import React, { Component, PropTypes } from 'react';
import { signUpAuthor } from '../../../actions/authors';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';
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

class AuthorsSignUp extends Component {

  static contextTypes = {
    router: PropTypes.object
  };


  constructor(props) {
    super(...props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(props) {
    this.props.signUpAuthor({
      author: props
    })
  }

  renderError() {
    if (this.props.error) {
      return<div>{this.props.error}</div>
    }
  }

  render() {
    const { handleSubmit, fields: { name, password, passwordConfirmation, email } }  = this.props;
    return(
      <form onSubmit={handleSubmit(this.handleSubmit)} className={styles.root}>
        {this.renderError()}
        <h2 className={styles.heading}>Sign Up</h2>
        <TextField
        {...name}
        hintText="Enter Your Name"
        fullWIdth={true}
        errorText={name.touched && name.error ? name.error : ''}
        />
        <TextField
          {...email}
          hintText="Enter Your Email"
          type="email"
          fullWIdth={true}
          errorText={email.touched && email.error ? email.error : ''}
        />
        <TextField
          {...password}
          hintText="Enter password"
          type="password"
          fullWIdth={true}
          errorText={password.touched && password.error ? password.error : ''}
        />
        <TextField
          {...passwordConfirmation}
          hintText="Enter password confirmation"
          type="password"
          fullWIdth={true}
          errorText={passwordConfirmation.touched && passwordConfirmation.error ? passwordConfirmation.error : ''}
        />
        <br />
        <RaisedButton
          type="submit"
          label="SignUp"
          secondary={true}
          style={inlineStyles.submitButton}
        />
    </form>)
  }
};

AuthorsSignUp.propTypes = {
  fields: PropTypes.object.isRequired,
  error: PropTypes.string,
  signUpAuthor: PropTypes.func.isRequired
};

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Enter your name'
  }

  if(!values.password || values.password.length < 6) {
    errors.password = 'Enter Password with more than 6 characters'
  }

  if(values.passwordConfirmation !== values.password) {
    errors.passwordConfirmation = 'PasswordConfirmation is different from Password'
  }

  if(!values.email) {
    errors.email = 'Enter Your Email'
  }

  return errors;
}
export const fields = [
  'name', 'email', 'password', 'passwordConfirmation'
];

function mapStateToProps(state) {
  return {
    authenticated: state.authors.authenticated,
    error: state.authors.error
  }
}


export default reduxForm({
  form: 'AuthorsSignUp',
  fields,
  validate
}, mapStateToProps, {
  signUpAuthor
})(AuthorsSignUp);