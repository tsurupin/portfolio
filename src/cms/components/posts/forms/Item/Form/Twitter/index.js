import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import { fetchTweet } from '../../../../../../actions/items';
import { reduxForm } from 'redux-form';
import styles from '../shared/styles.scss';


const inlineStyles = {
  submitButton: { marginLeft: 12 },
  indicator: {display: 'inline-block', position: 'relative'}
};


class Twitter extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: false };

    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  handleUpdateItem(props) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        
        this.setState({ loading: true });
        this.props.fetchTweet(props.sourceUrl, this.props.sortRank).then(
          () => {
            this.setState({ loading: false });
            this.props.handleUpdateItem({});
            resolve();
          }
        ).catch(error => {
          this.setState({ loading: false });
          reject({ sourceUrl: error })
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
    const { handleSubmit, submitting, fields: { sourceUrl } } = this.props;
    return (
      <div className={styles.root}>
        {this.renderLoadingIndicator()}
        <TextField
          className={styles.inputText}
          {...sourceUrl}
          floatingLabelText="Twitter"
          hintText='Enter the sourceURL'
          fullWidth={true}
          errorText={sourceUrl.touched && sourceUrl.error ? sourceUrl.error : ''}
        />
        <div className={styles.submitBox}>
          {this.props.cancelButton}
          <RaisedButton
            className={styles.submitButton}
            label='Save'
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
  if (!/https?:\/\/twitter.com\/[\w]+\/status\/[\d]+$/ig.test(values.sourceUrl)) {
    errors.sourceUrl = 'URL is not valid'
  }

  return errors;
}

export default reduxForm({
  form: 'ItemFormTwitter',
  fields: ['sourceUrl'],
  validate
}, null, { fetchTweet })(Twitter);

