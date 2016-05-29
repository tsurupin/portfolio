import React, { Component, PropTypes } from 'react';
import NavigationBar from '../NavigationBar/index';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyRawTheme from '../../theme';
import styles from './styles.scss';


class App extends Component {

  getChildContext() {
    return {
      muiTheme: getMuiTheme(MyRawTheme)
    };
  }

  render() {
    return (
      <div>
        <NavigationBar />
        <div className={styles.root}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};


export default App;