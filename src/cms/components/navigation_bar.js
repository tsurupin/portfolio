import React, { Component } from 'react';
import { Link } from 'react-router';


import AppBar  from 'material-ui/lib/app-bar'
import AvWeb from 'material-ui/lib/svg-icons/av/web';
import ActionDescription from 'material-ui/lib/svg-icons/action/description';
import SocialPerson from 'material-ui/lib/svg-icons/social/person';
import IconButton from 'material-ui/lib/icon-button';
import {red500, yellow500, blue500} from 'material-ui/lib/styles/colors';
//import FontIcon from 'material-ui'
import FontIcon from 'material-ui/lib/font-icon';
const styles = {
    title: {
        color: '#69808c',
        fontFamily: 'Raleway,sans-serif',
        height: '50px',
        lineHeight: '50px',
        fontSize: '1.6px'
    }
};
const iconStyles = {
    marginRight: 24
};
class NavigationBar extends Component {

    render() {
        return (
            <AppBar
                showMenuIconButton={false}
                title="TOMOAKI TSURUTA"
                style={styles.title}
                iconElementRight={
                    <div>
                        <Link to="/cms/articles/new" >
                            <IconButton>
                                <SocialPerson />
                            </IconButton>
                        </Link>
                        <Link to="/cms/articles/new" >
                            <IconButton>
                                <ActionDescription />
                            </IconButton>
                        </Link>
                        <Link to="/cms/articles/new" >
                            <IconButton>
                                <AvWeb />
                            </IconButton>
                        </Link>
                        <Link to="/cms/articles/new" >
                            <IconButton iconClassName="muidocs-icon-custom-github" />
                        </Link>
                    </div>
                    }
            />

        );
    }
};

export default NavigationBar;
