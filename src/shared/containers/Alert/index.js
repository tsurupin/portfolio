import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteAlert } from 'sharedActions/alerts'
import styles from './styles.scss';


export default function(ComposedComponent) {

  function mapStateToProps(state) {
    return {
      hasAlert: state.alerts.hasAlert,
      message: state.alerts.message,
      kind: state.alerts.kind
    }
  }
  
  class Alert extends Component {
    constructor(props) {
      super(props)
    }


    componentWillMount() {
      this.deleteAlertIfNeeded(this.props);
    }

    componentWillReceiveProps(nextProps) {
      this.deleteAlertIfNeeded(nextProps);
    }

    deleteAlertIfNeeded(props) {
      if(props.hasAlert) {
        setTimeout(() => {
          this.props.deleteAlert();
        }, 1500)
      }
    }

    render() {
      if (this.props.hasAlert) {
        return (
          <div className={styles.root}>
            <div className={styles[`${this.props.kind}`]}>
              {this.props.message}
            </div>
            <ComposedComponent {...this.props} />
          </div>
        )
      } else {
        return <ComposedComponent {...this.props} />
      }

    }
  }

  return connect(mapStateToProps, { deleteAlert })(Alert)
}

