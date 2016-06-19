import React, { Component, PropTypes } from 'react';
import NavigationBar from '../../components/NavigationBar/index';
import { Footer } from 'sharedComponents/Footer/index';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyRawTheme from 'shared/theme';
import styles from './styles.scss';


class App extends Component {

  getChildContext() {
    return {
      muiTheme: getMuiTheme(MyRawTheme)
    };
  }

  render() {
    return (
      <div className={styles.root}>
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