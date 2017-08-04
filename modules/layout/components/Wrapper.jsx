import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Layout, Icon } from 'antd';
const {Content} = Layout;
import {Header, Footer} from '../';
import { Video } from '../../video';

class Wrapper extends React.Component{
    constructor(){
        super();
        Meteor.VideoCallServices.onReceivePhoneCall = (showChat) => {
            this.setState({
                showChat
            });
            Meteor.VideoCallServices.answerPhoneCall(this.refs.local, this.refs.remote);
        };
        this.state = {
          showChat:false
        };
    }
    callUser(showChat){
        const user = Meteor.users.findOne({
            _id:showChat
        });
        if(!user || !user.status.online)
            throw new Meteor.Error(500, "user offline");
        this.setState({
            showChat
        });
        Meteor.VideoCallServices.call(showChat, this.refs.local, this.refs.remote);
    }
    render(){
        const { WrapperContent } = this.props;

        return (  <Layout className="layout">
            <Header/>
            <Content style={{ padding: '0 50px' }}>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    <WrapperContent callUser={this.callUser.bind(this)}/>
                    <Video show={this.state.showChat} />

                </div>
            </Content>
        <Footer/>
        </Layout>);
    }
}
export default createContainer(()=>{
    if(!(Meteor.loggingIn() || Meteor.user()))
        FlowRouter.go("/login");
    return {

    };
}, Wrapper);