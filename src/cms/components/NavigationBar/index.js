import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import AppBar  from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import AvWeb from 'material-ui/svg-icons/av/web';
import ActionDescription from 'material-ui/svg-icons/action/description';
import SocialPerson from 'material-ui/svg-icons/social/person';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import config from 'shared/config';
import { signOut } from 'cmsActions/auths';

const iconColor = '#8F8F8F';
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
    color: iconColor,
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
  gitHubButton: {
    color: iconColor,
    margin: 0
  },
  iconStyle: {
    height: 48,
    marginTop: 0
  }
};


class NavigationBar extends Component {

  constructor(props) {
    super(props);
    this.handleHome = this.handleHome.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  };


  handleHome() {
    this.context.router.push('/cms');
  }

  handleSignOut(){
    this.props.signOut();
  }

  render() {
    return (
      <AppBar
        showMenuIconButton={false}
        title={config.authorName}
        style={inlineStyles.appBar}
        titleStyle={inlineStyles.title}
        onTitleTouchTap={this.handleHome}
        zDepth={0}
        iconStyleRight={inlineStyles.elementRight}
        iconElementRight={
                    <div>
                        <IconMenu
                          iconButtonElement={<IconButton> <SocialPerson color={iconColor} /></IconButton>}
                          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                          targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        >
                          <Link to="/cms/about/edit" >
                            <MenuItem primaryText="Edit" />
                          </Link>
                          <Link to="/cms/about" >
                            <MenuItem primaryText="Preview" />
                          </Link>
                        </IconMenu>
                        <Link to="/cms/posts" >
                            <IconButton>
                                <ActionDescription color={iconColor} />
                            </IconButton>
                        </Link>
                        <IconMenu
                          iconButtonElement={<IconButton><AvWeb color={iconColor}/></IconButton>}
                          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                          targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        >
                          <Link to="/cms/projects" >
                            <MenuItem primaryText="Edit" />
                          </Link>
                          <Link to="/cms/projects/preview" >
                            <MenuItem primaryText="Preview" />
                          </Link>
                        </IconMenu>
                        <a href={config.gitHubUrl} >
                            <IconButton iconStyle={inlineStyles.gitHubButton}>
                              <FontIcon className="muidocs-icon-custom-github" style={inlineStyles.iconStyles} />
                            </IconButton>
                        </a>
                        <IconButton name="signOut" onClick={this.handleSignOut}>
                            <ActionExitToApp color={iconColor} />
                        </IconButton>
                    </div>
                    }
      />

    );
  }
}
;

export default connect(null, { signOut })(NavigationBar);
