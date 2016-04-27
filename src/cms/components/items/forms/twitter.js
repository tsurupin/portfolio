import React, { Component, PropTypes } from 'react';
import { capitalize } from '../../../utilities';
import TextField from 'material-ui/lib/text-field';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentAddCircle from 'material-ui/lib/svg-icons/content/add-circle';
import { fetchTweet } from '../../../actions/items';
import { reduxForm } from 'redux-form';

class ItemFormTwitter extends Component {

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
          style={{display: 'inline-block', position: 'relative'}}
        />
      );
    }
  }

  render() {
    const { handleSubmit, submitting, fields: { sourceURL } } = this.props;
    return (
      <div className="item-form" style={{position: 'relative'}}>
        {this.renderLoadingIndicator()}
        <div className="item-form__name">{capitalize(this.props.type)}</div>
        <TextField
          className="item-form__input-text"
          {...sourceURL}
          hintText='Enter the sourceURL'
          fullWidth={true}
          errorText={sourceURL.touched && sourceURL.error ? sourceURL.error : ''}
        />
        <div className="item-form__submit-box">
          <RaisedButton
            className='item-form__submit-button'
            label={this.props.submitButtonLabel}
            labelPosition="after"
            icon={<ContentAddCircle />}
            disabled={submitting}
            onClick={handleSubmit(this.handleUpdateItem)}
          />
          {this.props.cancelButton}
        </div>
      </div>
    );
  }
}

ItemFormTwitter.propTypes = {
  type: PropTypes.string.isRequired,
  sortRank: PropTypes.number.isRequired,
  authorImageURL: PropTypes.string,
  authorName: PropTypes.string,
  authorScreenName: PropTypes.string,
  description: PropTypes.string,
  submitButtonLabel: PropTypes.string.isRequired,
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
}, null, { fetchTweet })(ItemFormTwitter);

