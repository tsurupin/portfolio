// import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
// //import { deleteAlert } from '../../../actions/alerts';
// import styles from './styles.scss';
//
// export default function(ComposedComponent) {
//   class Alert extends Component {
//     constructor(props) {
//       super(props)
//     }
//     //
//     // componentWillMount() {
//     //
//     //
//     //   // if(this.props.hasAlert) {
//     //   //   setTimeout(() => {
//     //   //     console.log('hoge')
//     //   //     this.props.deleteAlert();
//     //   //   }, 500)
//     //   // }
//     // }
//
//
//
//     render() {
//       // console.log('hoge')
//       // if (this.props.hasAlert) {
//       //   return (
//       //     <div className={styles.root} >
//       //       <div className={styles.alert}>
//       //         {this.props.message}
//       //       </div>
//       //       <ComposedComponent {...this.props} />
//       //     </div>
//       //   )
//       // } else {
//         return <ComposedComponent {...this.props} />
//       // }
//     }
//   }
//
//   function mapStateToProps(state) {
//     return {
//       hasAlert: state.alert.hasAlert,
//       message: state.alert.message,
//       kind: state.alert.kind
//     }
//   }
//
//   return connect(mapStateToProps)(Alert)
// }

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


export default function(ComposedComponent) {
  class Alert extends Component {
    constructor(props) {
      super(props)
    }

    static contextTypes = {
      router: PropTypes.object
    };


    

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.auths.authenticated
    }
  }

  return connect(mapStateToProps)(Alert)
}

