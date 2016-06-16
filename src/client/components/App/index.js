import React, { Component, PropTypes } from 'react';
import NavigationBar from '../NavigationBar/index';
import { Footer } from 'sharedComponents/Footer/index';
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
    let rootStyle;
    switch (this.props.location.pathname) {
      case '/posts':
      case '/projects':
        rootStyle = styles.rootIndex;
        break;
      default:
        rootStyle = styles.root
    };

    return (
      <div className={rootStyle}>
        <NavigationBar />
        <div className={styles.container}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

App.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};


export default App;