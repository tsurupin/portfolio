import React, { Component, PropTypes } from 'react';
import { signInAuthor } from '../../../actions/authors';
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

class AuthorsSignIn extends Component {

  static contextTypes = {
    router: PropTypes.object
  };


  constructor(props) {
    super(...props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(props) {
    this.props.signInAuthor({
      author: props
    }).then(this.context.router.push('/cms'));
  }


  render() {
    const { handleSubmit, fields: { email, password } }  = this.props;
    return(
      <form onSUbmit={handleSubmit(this.handleSubmit)} className={styles.root}>
        <h2 className={styles.heading}>Sign In</h2>
        <TextField
          {...email}
          hintText="Enter Your Email"
          fullWIdth={true}
          errorText={email.touched && email.error ? email.error : ''}
        />
        <TextField
          {...password}
          hintText="Enter password"
          fullWIdth={true}
          errorText={password.touched && password.error ? password.error : ''}
        />
        <br />
        <RaisedButton
          type="submit"
          label="SignIn"
          secondary={true}
          style={inlineStyles.submitButton}
        />
      </form>)
  }
};

AuthorsSignIn.propTypes = {
  fields: PropTypes.object.isRequired,
  signInAuthor: PropTypes.func.isRequired
};

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Enter your name'
  }

  if(!values.password || values.password.length < 6) {
    errors.password = 'Enter Password with more than 6 characters'
  };

  if(!values.email) {
    errors.password = 'Enter Your Email'
  };
}
export const fields = [
  'name', 'email', 'password'
];

export default reduxForm({
  form: 'AuthorsSignIn',
  fields,
  validate
}, null, {
  signInAuthor
})(AuthorsSignIn);