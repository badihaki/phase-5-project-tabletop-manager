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
                received: data=>{
                    if(data.id != null){
                        console.log(data);
                        this.props.setMessages(data);
                    }
                },
            }
        )
    };
    componentWillUnmount(){
        consumer.disconnect()
    };
    render(){
        return(
            <h2>
                {this.props.group.name}'s Message Board
            </h2>
        )
    }
}