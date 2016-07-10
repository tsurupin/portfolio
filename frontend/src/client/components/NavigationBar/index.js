import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar  from 'material-ui/AppBar'
import AvWeb from 'material-ui/svg-icons/av/web';
import ActionDescription from 'material-ui/svg-icons/action/description';
import SocialPerson from 'material-ui/svg-icons/social/person';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import config from 'shared/config';
import inlineStyles from 'shared/styles/MaterialUI/index';

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
        style={inlineStyles.appBar.root}
        titleStyle={inlineStyles.appBar.title}
        onTitleTouchTap={()=> this.context.router.push('/')}
        zDepth={0}
        iconStyleRight={inlineStyles.appBar.elementRight}
        iconElementRight={
                    <div>
                        <Link to="/about" >
                            <IconButton name="about-button" disableTouchRipple={true} >
                                <SocialPerson color={inlineStyles.iconColor} />
                            </IconButton>
                        </Link>
                        <Link to="/posts" >
                            <IconButton name="post-button" disableTouchRipple={true} >
                                <ActionDescription color={inlineStyles.iconColor} />
                            </IconButton>
                        </Link>
                        <Link to="/projects" >
                            <IconButton name="project-button" disableTouchRipple={true} >
                                <AvWeb color={inlineStyles.iconColor} />
                            </IconButton>
                        </Link>
                        <a href={config.gitHubUrl} >
                            <IconButton
                            iconStyle={inlineStyles.appBar.gitHubButton}
                            name="git-hub-button"
                            disableTouchRipple={true}
                            >
                              <FontIcon className="muidocs-icon-custom-git-hub" style={inlineStyles.appBar.iconStyles} />
                            </IconButton>
                        </a>
                    </div>
                    }
      />

    );
  }
}

export default NavigationBar;
