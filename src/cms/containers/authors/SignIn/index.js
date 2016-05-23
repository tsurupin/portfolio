import React, { Component, PropTypes } from 'react';
import { signIn } from '../../../actions/auths';
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
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if(this.props.authenticated) {
      this.context.router.push('/cms')
    }
  }

  handleSubmit(props) {
    this.props.signIn({ author: props });
  }

  renderError() {
    if (this.props.errorMessage) {
      return <span className={styles.error}>{this.props.errorMessage}</span>
    }
  }

  render() {
    const { handleSubmit, fields: { email, password } }  = this.props;
    return(
      <form onSubmit={handleSubmit(this.handleSubmit)} className={styles.root}>
        <h2 className={styles.heading}>Sign In</h2>
        <TextField
          {...email}
          type="email"
          hintText="Enter Your Email"
          fullWIdth={true}
          errorText={email.touched && email.error ? email.error : ''}
        />
        <TextField
          {...password}
          type="password"
          hintText="Enter password"
          fullWIdth={true}
          errorText={password.touched && password.error ? password.error : ''}
        />
        <br />
        {this.renderError()}
        <RaisedButton
          type="submit"
          label="SignIn"
          secondary={true}
          style={inlineStyles.submitButton}
        />
      </form>)
  }
};


function validate(values) {
  const errors = {};

  if(!values.password || values.password.length < 6) {
    errors.password = 'Enter Password with more than 6 characters'
  }

  if(!values.email) {
    errors.password = 'Enter Your Email'
  }
  return errors;
}
export const fields = [
  'email', 'password'
];

function mapStateToProps(state) {
  return {
    authenticated: state.auths.authenticated,
    errorMessage: state.auths.error
  }
}

AuthorsSignIn.propTypes = {
  fields: PropTypes.object.isRequired,
  signIn: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

export default reduxForm({
  form: 'SignIn',
  fields,
  validate
}, mapStateToProps, {
  signIn
})(AuthorsSignIn);