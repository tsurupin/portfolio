import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LinearProgress from 'material-ui/LinearProgress';

const inlineStyles = {
  progressBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    zIndex: 10000
  }
};


export default function(ComposedComponent) {
  class ProgressBar extends Component {
    constructor(props) {
      super(props);
      this.state = { loading: true };
      this.finishLoading = this.finishLoading.bind(this)
    }

    finishLoading() {
      this.setState({ loading: false })
    }

    renderProgressBar() {
      if (this.state.loading) {
        return (
          <LinearProgress 
            mode="indeterminate" 
            min={70} 
            max={75}
            color="#48E79A"
            style={inlineStyles.progressBar} 
          />
        );
      }
    }
    
    
    render() {
      return (
      <div>
        {this.renderProgressBar()}
        <ComposedComponent { ...this.props } finishLoading={this.finishLoading} />
      </div>
      )
    }
  }
  

  return ProgressBar
}

