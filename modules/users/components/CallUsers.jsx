import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { User } from '../../../lib/collections';
import { Menu, Icon, Spin} from 'antd';

class CallUsers extends React.Component {
    render(){
        return (
            <Spin spinning={this.props.usersLoading}>
                <Menu>
                    {
                        this.props.users.map(user => (
                            <Menu.Item key={user._id}>
                                <Icon type="user"/>
                                {user.emails[0].address}
                            </Menu.Item>
                        ))
                    }
                </Menu>
            </Spin>
        );
    }
}

export default createContainer(()=>{
    const usersLoading = !Meteor.subscribe("all_users").ready();
    const users = User.find().fetch();
    return {
        usersLoading,
        users
    };
}, CallUsers);