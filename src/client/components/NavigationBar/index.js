import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar  from 'material-ui/AppBar'
import AvWeb from 'material-ui/svg-icons/av/web';
import ActionDescription from 'material-ui/svg-icons/action/description';
import SocialPerson from 'material-ui/svg-icons/social/person';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import config from 'shared/config';

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
  iconStyles: {
    height: 48,
    marginTop: 0
  }
};

class NavigationBar extends Component {

  constructor(props) {
    super(props);
  }

  static contextTypes = {
    router: PropTypes.object
  };
  
  render() {
    return (
      <AppBar
        showMenuIconButton={false}
        title={config.authorName}
        style={inlineStyles.appBar}
        titleStyle={inlineStyles.title}
        onTitleTouchTap={()=> this.context.router.push('/')}
        zDepth={0}
        iconStyleRight={inlineStyles.elementRight}
        iconElementRight={
                    <div>
                        <Link to="/about" >
                            <IconButton name="about-button">
                                <SocialPerson color={iconColor} />
                            </IconButton>
                        </Link>
                        <Link to="/posts" >
                            <IconButton name="post-button">
                                <ActionDescription color={iconColor} />
                            </IconButton>
                        </Link>
                        <Link to="/projects" >
                            <IconButton name="project-button">
                                <AvWeb color={iconColor} />
                            </IconButton>
                        </Link>
                        <a href={config.gitHubUrl} >
                            <IconButton iconStyle={inlineStyles.gitHubButton} name="git-hub-button" >
                              <FontIcon className="muidocs-icon-custom-git-hub" style={inlineStyles.iconStyles} />
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
