import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar  from 'material-ui/AppBar'
import AvWeb from 'material-ui/svg-icons/av/web';
import ActionDescription from 'material-ui/svg-icons/action/description';
import SocialPerson from 'material-ui/svg-icons/social/person';
import IconButton from 'material-ui/IconButton';


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
    super(props);
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
    this.context.router.push('/');
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
                        <Link to="/about" >
                            <IconButton>
                                <SocialPerson />
                            </IconButton>
                        </Link>
                        <Link to="/posts" >
                            <IconButton>
                                <ActionDescription />
                            </IconButton>
                        </Link>
                        <Link to="/projects" >
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
