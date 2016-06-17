import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar  from 'material-ui/AppBar'
import AvWeb from 'material-ui/svg-icons/av/web';
import ActionDescription from 'material-ui/svg-icons/action/description';
import SocialPerson from 'material-ui/svg-icons/social/person';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { teal500 } from 'material-ui/styles/colors';
import styles from  './styles.scss';
const iconStyles = {
  height: 48,
  marginTop: 0
};


const inlineStyles = {
  appBar: {
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    height: 56,
    minHeight: 56,
    padding: '4px 10%',
    border: '1px solid #f3f3f3'
  },
  title: {
    color: '#8F8F8F',
    fontSize: '1.6rem',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif',
    lineHeight: '5.0rem',
    cursor: 'pointer'
  },
  elementRight: {
    height: 48,
    minHeight: 48,
    marginTop: 0
  },
  githubButton: {
    color: '#8F8F8F',
    margin: 0
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
        title="TOMOAKI TSURUTA"
        style={inlineStyles.appBar}
        titleStyle={inlineStyles.title}
        onTitleTouchTap={this.handleHome}
        zDepth={0}
        iconStyleRight={inlineStyles.elementRight}
        iconElementRight={
                    <div>
                        <Link to="/about" >
                            <IconButton>
                                <SocialPerson color='#8F8F8F' />
                            </IconButton>
                        </Link>
                        <Link to="/posts" >
                            <IconButton>
                                <ActionDescription color='#8F8F8F' />
                            </IconButton>
                        </Link>
                        <Link to="/projects" >
                            <IconButton>
                                <AvWeb color='#8F8F8F'/>
                            </IconButton>
                        </Link>
                        <a href="https://github.com/tsurupin" onClick={this.handleMove} >

                            <IconButton iconStyle={inlineStyles.githubButton}>
                              <FontIcon className="muidocs-icon-custom-github" style={iconStyles} />
                            </IconButton>
                        </a>
                    </div>
                    }
      />

    );
  }
}
;

export default NavigationBar;
