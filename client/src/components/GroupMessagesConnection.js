import React, { Component } from "react";
import consumer from "../cable";

class GroupMessageConnection extends Component{
    componentDidMount(){
        consumer.subscriptions.create({channel: 'GroupChatChannel', username: this.props.username},{
            received: handleReceivedData            
        })

        consumer.connect();

        function handleReceivedData(data){
            console.log(data);
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

export default GroupMessageConnection;