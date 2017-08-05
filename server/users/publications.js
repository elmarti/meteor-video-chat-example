import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { tablePublish } from '../helpers';
import { User } from '../../lib/collections';
tablePublish('users/list', 'User', {}, {
    fields: {
        "profile.createdAt": 1,
        _id: 1,
        emails: 1,
        roles: 1,
        profile: 1
    }
}, 'admin');
Meteor.publish("all_users", function(){
   return User.find({},{
       fields:{
           emails:1,
           _id:1,
           status:1
       }
   });
});