import React from "react";
import consumer from "../cable";


export default class GroupMessages extends React.Component{
    componentDidMount(){
        consumer.subscriptions.create(
            {
                channel: 'GroupChatChannel',
                // username: this.user.name
                username: this.props.user.name
            },
            {
                connected: ()=>console.log('connected'),
                disconnected: ()=>console.log('disconnected'),
                received: data=>console.log(data),
            }
        )
    };
    componentWillUnmount(){
        consumer.disconnect()
    };
    render(){
        return(
            <div>
                Messages
            </div>
        )
    }
}