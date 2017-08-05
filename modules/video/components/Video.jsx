import React from 'react';
import { Modal } from 'antd';
export default class extends React.Component{
    constructor(){
        super();
        this.Caller = <video ref="caller"/>;
        this.Target =<video ref="target"/>;
    }


    render() {
        const { Caller, Target } = this;
        return (<Modal visible={this.props.show}>
                {Caller}
            {Target}
            </Modal>

        );
    }
}