import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { signOut } from 'cms/actions/auths';

export default function(ComposedComponent) {
  
  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated
    }
  }
  
  class Authentication extends Component {
    constructor(props) {
      super(props)
    }

    static contextTypes = {
      router: PropTypes.object
    };


    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/cms/sign-in')
      }
      
      if (typeof localStorage.getItem('accessToken') === "undefined") {
        this.props.signOut()
      }

    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/cms/sign-in')
      };
      if (typeof localStorage.getItem('accessToken') === "undefined") {
        this.props.signOut()
      }

    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }
  

  return connect(mapStateToProps, { signOut })(Authentication)
}

