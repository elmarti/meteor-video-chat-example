import React from 'react';
import { Modal } from 'antd';
export default class extends React.Component {

    componentWillReceiveProps(){

    }


    render() {
        if(this.props.show)
            Meteor.VideoCallServices.call(this.props.show,
                this.refs.caller, this.refs.target
            )
        return (<Modal visible={this.props.show}>
                <video ref="caller"/>
                <video ref="target"/>
            </Modal>

        );
    }
}