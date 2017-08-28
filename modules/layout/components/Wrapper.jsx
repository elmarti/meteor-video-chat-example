import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Layout, Icon, Modal, Row, Col, Card } from 'antd';
const {Content} = Layout;
import {Header, Footer} from '../';
import { CallUsers } from '../../users';
const confirm = Modal.confirm;

class Wrapper extends React.Component{
    constructor(){
        super();

        Meteor.VideoCallServices.RTCConfiguration = {"iceServers":[{urls:'stun:stun.l.google.com:19302'}]};
        Meteor.VideoCallServices.onError = (err, data)=>{
            RavenLogger.log(err, data);
        };
        Meteor.VideoCallServices.onReceivePhoneCall = (_id) => {
            this.setState({
                showChat: _id
            });
            const { caller, target } = this.refs;
            confirm({
                title: 'You are receiving a phone call',
                onOk() {
                    Meteor.VideoCallServices.answerPhoneCall(caller, target);
                },
                okText : "Answer",
                cancelText : "Ignore",
                onCancel() {
                    Meteor.VideoCallServices.endPhoneCall();
                },
            });
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
        Meteor.VideoCallServices.call(showChat, this.refs.caller, this.refs.target);
    }
    render(){
        const { WrapperContent } = this.props;

        return (  <Layout className="layout">
            <Header/>
            <Content style={{ padding: '0 50px' }}>
                <Row style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    <Col span="11">
                        <CallUsers callUser={this.callUser.bind(this)}/>
                    </Col>
                    <Col span="2"></Col>
                    <Col span="11">
                        <Card title="Extension overview">
                            <Row>
                                Hey there, thanks for taking a look at this project! I really want to make it the best choice for WebRTC video chat in Meteor, so if you find any issues or want to request any features, do so <a href="https://github.com/elmarti/meteor-video-chat/issues">here</a>.
                            </Row>
                            <Row>
                                If you find any bugs or have any suggestions for this template, log an issue <a href="https://github.com/elmarti/meteor-video-chat-example">here</a>.
                            </Row>
                            <Row>
                                To test video calling, you'll need 2 users and 2 browsers. Once you've logged in to both, you will be able to click the user name to dial the other browser.
                            </Row>
                            <p><Icon style={{ color :"blue"}} type="user"/>: never logged in</p>
                            <p><Icon style={{ color :"red"}} type="user"/>: offline</p>
                            <p><Icon style={{ color :"green"}} type="user"/>: online</p>
                            <Row>
                                User accounts are automatically deleted every day.
                            </Row>
                        </Card>
                    </Col>

                </Row>
            </Content>
        <Footer/>
            <video ref="caller"/>
            <video ref="target"/>
        </Layout>);
    }
}
export default createContainer(()=>{
    if(!(Meteor.loggingIn() || Meteor.user()))
        FlowRouter.go("/login");
    return {

    };
}, Wrapper);