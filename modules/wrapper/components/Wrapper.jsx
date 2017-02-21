import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

class Wrapper extends Component {

    constructor() {
        super();
    }

    render() {

        return {
            <MuiThemeProvider>
                <AppBar
                    title="Meteor Video Chat"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
            </MuiThemeProvider>

        };
    }

}


export default createContainer(() => {
    return {
        user: Meteor.user()
    };
}, App);