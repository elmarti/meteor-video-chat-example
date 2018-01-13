import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { User } from '../../../lib/collections';
import { Menu, Icon, Spin} from 'antd';

class CallUsers extends React.Component {
    constructor(){
        super();
    }
    callUser( { key } ){
        this.props.callUser(key);
    }
    render(){
        return (
            <Spin spinning={this.props.usersLoading}>
                <Menu onClick={this.callUser.bind(this)}>
                    {
                        this.props.users.map(user => (
                            <Menu.Item key={user._id}>
                                <Icon style={{ color : user.status ? user.status.online ?
                                "green" : "red" : "blue" }} type="user"/>
                                {user.username}
                            </Menu.Item>
                        ))
                    }
                </Menu>
            </Spin>
        );
    }
}

export default withTracker(()=>{
    const usersLoading = !Meteor.subscribe("all_users").ready();
    const users = User.find({
        _id:{
            $ne : Meteor.userId()
        }
    }).fetch();
    return {
        usersLoading,
        users
    };
})(CallUsers);