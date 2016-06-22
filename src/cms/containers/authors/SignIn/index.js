import React, { Component, PropTypes } from 'react';
import { signIn } from '../../../actions/auths';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ErrorMessage from '../../../components/shared/ErrorMessage/index';
import styles from './styles.scss';


const propTypes = {
  fields: PropTypes.object.isRequired,
  signIn: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

const inlineStyles = {
  textField: {
    marginBottom: 10
  }
};

class AuthorSignIn extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // if(this.props.authenticated) {
    //   this.context.router.push("/cms")
    // }
  }

  handleSubmit(author) {
    this.props.signIn({ author });
  }

  renderErrorMessage() {
    if(this.props.errorMessage) {
      return <ErrorMessage message={this.props.errorMessage} />
    }
  }

  render() {
    const { handleSubmit, submitting, fields: { email, password } }  = this.props;
    return(
      <form onSubmit={handleSubmit(this.handleSubmit)} className={styles.root}>
        <h2 className={styles.heading}>Sign In</h2>
        <TextField
          {...email}
          type="email"
          hintText="Enter Your Email"
          fullWidth={true}
          errorText={email.touched && email.error ? email.error : ''}
          style={inlineStyles.textField}
        />
        <TextField
          {...password}
          type="password"
          hintText="Enter password"
          fullWidth={true}
          errorText={password.touched && password.error ? password.error : ''}
          style={inlineStyles.textField}
        />
        {this.renderErrorMessage()}
        <button type="submit"
                disabled={submitting}
                className={styles.button}
        >
          SignIn
        </button>
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
    errorMessage: state.auths.errorMessage
  }
}

AuthorSignIn.propTypes = propTypes;

export default reduxForm({
  form: 'SignIn',
  fields,
  validate
}, mapStateToProps, {
  signIn
})(AuthorSignIn);