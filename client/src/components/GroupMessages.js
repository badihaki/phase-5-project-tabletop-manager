import React from "react";
import consumer from "../cable";


export default class GroupMessages extends React.Component{
    componentDidMount(){
        consumer.subscriptions.create(
            {
                channel: 'GroupChatChannel',
                username: this.props.username
            },
            {
                connected: ()=>console.log('connected'),
                disconnected: ()=>console.log('disconnected'),
                received: data=>{
                    handleReceivedData(data);
                },
            }
            )
            
            
            function handleReceivedData(data){
                debugger;
                console.log(data);
                
                if(data.id != null){
                    // this.props.setMessages(data);
                }
        }
    }

    componentWillUnmount(){
        consumer.disconnect()
    }

    render(){
        return(
            <ul>
                {this.props.messageList}
            </ul>
        )
    }
}