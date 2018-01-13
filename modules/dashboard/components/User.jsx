import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Row, Col, Card } from 'antd';
import { CallUsers } from '../../users';
export default class  extends React.Component{
    goTo(path){
        FlowRouter.go(path)
    }
    render(){
        return (
           <CallUsers/>
        )
    }
}
