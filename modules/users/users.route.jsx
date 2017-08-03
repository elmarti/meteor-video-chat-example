import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { Wrapper } from '../layout';
import { Users, CallUsers } from './';
FlowRouter.route("/users", {
    name:"users",
    action(){
        mount(Wrapper,{
            WrapperContent:Users
        })
    }
});
FlowRouter.route("/users_list",{
   name:"users_list",
    action(){
       mount(Wrapper,{
           WrapperContent:CallUsers
       });
    }
});