import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import AppBar  from 'material-ui/lib/app-bar'
import AvWeb from 'material-ui/lib/svg-icons/av/web';
import ActionDescription from 'material-ui/lib/svg-icons/action/description';
import SocialPerson from 'material-ui/lib/svg-icons/social/person';
import IconButton from 'material-ui/lib/icon-button';

const inlineStyles = {
  appBar: {
    backgroundColor: '#fff',
    height: 50,
    minHeight: 50
  },
  title: {
    color: '#00796B',
    fontSize: '1.6rem',
    fontFamily: 'Raleway,sans-serif',
    lineHeight: '5.0rem',
    cursor: 'pointer'
  },
  elementRight: {
    height: 50,
    minHeight: 50,
    marginTop: 0
  }
};

class NavigationBar extends Component {

  constructor(props) {
    super(...props);
    this.handleMove = this.handleMove.bind(this);
    this.handleHome = this.handleHome.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  };


  handleMove(e) {
    location.href = e.target.href;
  }

  handleHome() {
    this.context.router.push('/cms');
  }

  render() {
    return (
      <AppBar
        showMenuIconButton={false}
        title="Tomoaki Tsuruta"
        style={inlineStyles.appBar}
        titleStyle={inlineStyles.title}
        onTitleTouchTap={this.handleHome}
        iconStyleRight={inlineStyles.elementRight}
        iconElementRight={
                    <div>
                        <Link to="/cms/posts/new" >
                            <IconButton>
                                <SocialPerson />
                            </IconButton>
                        </Link>
                        <Link to="/cms/posts/new" >
                            <IconButton>
                                <ActionDescription />
                            </IconButton>
                        </Link>
                        <Link to="/cms/posts/new" >
                            <IconButton>
                                <AvWeb />
                            </IconButton>
                        </Link>
                        <a href="https://github.com/tsurupin" onClick={this.handleMove} >
                            <IconButton iconClassName="muidocs-icon-custom-github"/>
                        </a>
                    </div>
                    }
      />

    );
  }
}
;

export default NavigationBar;
