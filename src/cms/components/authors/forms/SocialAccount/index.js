import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/textField';
import styles from './styles.scss';

class SocialAccount extends Component {
  constructor(props) {
    super(props);
    
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.handleUpdate(this.props.sortRank, event.target.value);
  }

  
  render() {
    return (
      <div className={styles.root}>
        <TextField
          value={this.props.url}
          className={styles.inputText}
          name="url"
          floatingLabelText={`${this.props.accountType} URL`}
          hintText="Enter "
          fullWidth={true}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

SocialAccount.propTypes = {
  sortRank: PropTypes.number.isRequired,
  url: PropTypes.string,
  accountType: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func.isRequired
};

export default SocialAccount;
