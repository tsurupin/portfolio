import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentAddCircle from 'material-ui/lib/svg-icons/content/add-circle';
import { fetchTweet } from '../../../../../../actions/items';
import { reduxForm } from 'redux-form';
import styles from '../shared/styles.scss';


const inlineStyles = {
  submitButton: { marginLeft: 12 },
  indicator: {display: 'inline-block', position: 'relative'}
};


class Twitter extends Component {

  constructor(props) {
    super(...props);
    this.state = { loading: false };

    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  handleUpdateItem(props) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        
        this.setState({ loading: true });
        this.props.fetchTweet(props.sourceURL, this.props.sortRank).then(
          () => {
            this.setState({ loading: false });
            this.props.handleUpdateItem({});
            resolve();
          }
        ).catch(error => {
          this.setState({ loading: false });
          reject({ sourceURL: error })
        })
        
      }, 1000)
    })
  }

  renderLoadingIndicator() {
    if (this.state.loading) {
      return (
        <RefreshIndicator
          size={40}
          left={100}
          top={100}
          loadingColor={"#FF9800"}
          status="loading"
          style={inlineStyles.indicator}
        />
      );
    }
  }

  render() {
    const { handleSubmit, submitting, fields: { sourceURL } } = this.props;
    return (
      <div className={styles.root}>
        {this.renderLoadingIndicator()}
        <TextField
          className={styles.inputText}
          {...sourceURL}
          floatingLabelText="Twitter"
          hintText='Enter the sourceURL'
          fullWidth={true}
          errorText={sourceURL.touched && sourceURL.error ? sourceURL.error : ''}
        />
        <div className={styles.submitBox}>
          {this.props.cancelButton}
          <RaisedButton
            className={styles.submitButton}
            label={this.props.submitButtonLabel}
            labelPosition="after"
            icon={<ContentAddCircle />}
            disabled={submitting}
            style={inlineStyles.submitButton}
            onClick={handleSubmit(this.handleUpdateItem)}/>
        </div>
      </div>
    );
  }
}

Twitter.propTypes = {
  targetType: PropTypes.string.isRequired,
  sortRank: PropTypes.number.isRequired,
  authorImageURL: PropTypes.string,
  authorName: PropTypes.string,
  authorScreenName: PropTypes.string,
  description: PropTypes.string,
  cancelButton: PropTypes.object.isRequired,
  handleUpdateItem: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

function validate(values) {
  const errors = {};
  if (!/https?:\/\/twitter.com\/[\w]+\/status\/[\d]+$/ig.test(values.sourceURL)) {
    errors.sourceURL = 'URL is not valid'
  }

  return errors;
}

export default reduxForm({
  form: 'ItemFormTwitter',
  fields: ['sourceURL'],
  validate
}, null, { fetchTweet })(Twitter);

