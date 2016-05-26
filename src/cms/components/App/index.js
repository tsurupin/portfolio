import React, { Component, PropTypes } from 'react';
import NavigationBar from '../NavigationBar/index';
import ThemeManager from 'material-ui/styles/themeManager';
import MyRawTheme from '../../theme';
import styles from './styles.scss';

export default class App extends Component {

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(MyRawTheme)
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
  muiTheme: PropTypes.object
};
