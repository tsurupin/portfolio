import React, { Component } from 'react';
import { Link } from 'react-router';


import AppBar  from 'material-ui/lib/app-bar'
import AvWeb from 'material-ui/lib/svg-icons/av/web';
import ActionDescription from 'material-ui/lib/svg-icons/action/description';
import SocialPerson from 'material-ui/lib/svg-icons/social/person';
import IconButton from 'material-ui/lib/icon-button';
const styles = {
    appBar: {
        backgroundColor: '#fff',
        height: 50,
        minHeight: 50
    },
    title: {
        color: '#69808c',
        fontSize: '1.6rem',
        fontFamily: 'Raleway,sans-serif',
        lineHeight: '5.0rem'
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
    }

    handleMove(e) {
        location.href = e.target.href;
    }

    render() {
        return (
            <AppBar
                showMenuIconButton={false}
                title="TOMOAKI TSURUTA"
                style={styles.appBar}
                titleStyle={styles.title}
                iconStyleRight={styles.elementRight}
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
                        <a href="https://github.com/tsurupin" onClick={this.handleMove} >
                            <IconButton iconClassName="muidocs-icon-custom-github"/>
                        </a>
                    </div>
                    }
            />

        );
    }
};

export default NavigationBar;
