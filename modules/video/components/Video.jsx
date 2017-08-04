import React from 'react';
import { Modal } from 'antd';
export default class extends React.Component {

    componentWillReceiveProps(){

    }


    render() {
        return (<Modal visible={this.props.show}>
                <video ref="caller"/>
                <video ref="target"/>
            </Modal>

        );
    }
}