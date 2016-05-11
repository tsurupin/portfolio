import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    constructor(props) {
      super(...props)
    }

    static contextTypes = {
      router: PropTypes.object
    };


    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/cms/sign-in')
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.tuhenticated) {
        this.context.router.push('/cms/sign-in')
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateTopProps(state) {
    return {
      authenticated: state.authors.authenticated
    }
  }

  return connect(mapStateTopProps)(Authentication)
}

