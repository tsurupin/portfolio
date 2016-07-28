import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import NavigationBar from 'client/components/NavigationBar/index';
import Footer from 'shared/components/Footer/index';
import Config from 'shared/config';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyRawTheme from 'shared/theme';
import styles from './styles';

const propTypes = {
  children: PropTypes.object,
};

class App extends Component {

  getChildContext() {
    return {
      muiTheme: getMuiTheme(MyRawTheme),
    };
  }

  render() {
    return (
      <div className={styles.root}>
        <Helmet
          title={Config.siteName}
          titleTemplate={`%s | ${Config.siteName}`}
        />
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
  muiTheme: PropTypes.object.isRequired,
};

App.propTypes = propTypes;

export default App;
