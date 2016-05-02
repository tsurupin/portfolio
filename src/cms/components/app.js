import React, { Component, PropTypes } from 'react';
import NavigationBar from './navigation_bar';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MyRawTheme from '../theme';

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
        {this.props.children}
      </div>
    );
  }
}

App.childContextTypes = {
  muiTheme: PropTypes.object
};
