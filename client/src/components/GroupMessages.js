import React, { useContext } from "react";
import consumer from "../cable";
import { UserContext } from "./context components/UserContext";

export default class GroupMessages extends React.Component{
    user = useContext(UserContext);
    componentDidMount(){
        consumer.subscriptions.create(
            {
                channel: 'GroupChatChannel',
                username: this.user.name
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
}