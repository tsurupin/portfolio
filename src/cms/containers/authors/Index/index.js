import React, { Component, PropTypes } from 'react';
import { fetchAuthor } from '../../../actions/authors';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import styles from './styles.scss'


class AuthorsIndex extends Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    this.props.fetchAuthor();
  }
  
  render() {
    return (
      <section className={styles.root}></section>
    )
  }
}

AuthorsIndex.propTypes = {
  author: PropTypes.object
};

function mapStateToProps(state) {
  return {
    author: state.authors.author,
    socialAccounts: state.socialAccounts
  }
}

export default connect(mapStateToProps, { fetchAuthor })(AuthorsIndex);
