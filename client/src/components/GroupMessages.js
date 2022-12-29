import React, { useContext, useState } from "react";
import consumer from "../cable";
import { UserContext } from "./context components/UserContext";


export default class GroupMessages extends React.Component{
    componentDidMount(){
        console.log(this.props.user)
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
        // const [state, setState] = useState
        return(
            <div>
                Messages
            </div>
        )
    }
}