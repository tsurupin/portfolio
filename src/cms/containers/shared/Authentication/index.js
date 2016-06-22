import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../../actions/auths';

export default function(ComposedComponent) {
  class Authentication extends Component {
    constructor(props) {
      super(props)
    }

    static contextTypes = {
      router: PropTypes.object
    };


    componentWillMount() {
      console.log(typeof localStorage.getItem('accessToken') === 'undefined')
      console.log(this.props.authenticated)
      console.log(localStorage.getItem('accessToken'));
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

  function mapStateToProps(state) {
    return {
      authenticated: state.auths.authenticated
    }
  }

  return connect(mapStateToProps, { signOut })(Authentication)
}

