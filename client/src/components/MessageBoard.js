import React, { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { GroupsContext } from "./context components/GroupsContext";
import { MessagesContext } from "./context components/MessagesContext";
import { UserContext } from "./context components/UserContext";
import GroupMessages from "./GroupMessages";
import Message from "./Message";
import ActionCable, { ActionCableConsumer, ActionCableProvider } from 'react-actioncable-provider'
import MessageUpdater from "./MessageUpdater";
// import GroupMessageConnection from "./GroupMessagesConnection";

function MessageBoard(){
    const {user} = useContext(UserContext);
    const {groups} = useContext(GroupsContext);
    const {messages, setMessages} = useContext(MessagesContext);
    const {id} = useParams();

    const group = groups.find(group => group.id==id)
    
    const [ messageForm, setMessageForm ] = useState({
        "content":"",
        "user_id": user.id,
        "group_id": id,
        "comment_id":""
    })

    function addNewMessage(message){
        // debugger
        const updatedMessageList = [...messages];
        let listNeedsToUpdate = true;
        for (let index = 0; index < updatedMessageList.length; index++) {
            const element = updatedMessageList[index];
            if(element.id == message.id) 
            {
                listNeedsToUpdate = false;
                // debugger;
                break;
            }
        }
        if(listNeedsToUpdate == true){
            updatedMessageList.push(message);
            setMessages(updatedMessageList);
        }
        // debugger;
    }

    const groupMessages = ()=>{
        if(messages.length <= 0){
            return (<li key={"noId"}>No mesaages</li>)
        }
        else{
            return messages.filter(message=>{
                return message.group_id == id;
            }).filter(message=>{
                console.log(message);
                if(message.quoted_comment_id == null) return message;
            }).map(message=>{
                // debugger;
                return(
                    // <li key={message.id}>
                    //     {console.log(message)}
                    //     {message.content}
                    // </li>
                    <Message key={message.id} message={message} />
                )
            })
        }
    }

   function handleRecieveBroadcast(data){
    console.log(data);
   }

    if(user != null && group != null){

        function handleFormChange(event){
            const newForm = {...messageForm};
            const key = event.target.name;
            const value = event.target.value;
            newForm[key] = value;
            setMessageForm(newForm);
        }

        function handleSubmit(event){
            event.preventDefault();
            fetch("/api/group_messages", {
                method: 'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(messageForm)
            }).then(r=>r.json()).then(data =>{
                setMessages([...messages, data]);
                setMessageForm({
                    "content":"",
                    "user_id": user.id,
                    "group_id": id,
                    "comment_id":""
                })
                })
        }

        // const cable = ActionCable.createConsumer("ws://localhost:3000/cable");
        // const cable = ActionCable.createConsumer("ws://localhost:3000/cable");

//        return(
//            <ActionCableProvider url="ws://localhost:3000/cable" >
//                <div>
//                    <ActionCableConsumer
//                    channel={{channel: "GroupChatChannel", username: user.name}}
//                    onConnected={()=>{
//                        // console.log("connected")
//                    }}
//                    onDisconected={()=>{
//                        console.log("disconnected")
//                    }}
//                    onReceived={handleRecieveBroadcast}
//                    />
//                        {/* <GroupMessages group={group} user={user} messages={messages} setMessages={addNewMessage} /> */}
//                        <br />
//                        <br />
//                        <ul>
//                            {/* groupMessages() */}
//                        </ul>
//                            { groupMessages() }
//                        <form onSubmit={handleSubmit}>
//                            <h4>New Message:</h4>
//                            <div>Posting as <span style={{ fontWeight:"bold" }}>{user.name}</span></div>
//                            <input type={"text"} name={"content"} style={{width: '300px', height: '100px'}} value={messageForm.content} onChange={handleFormChange} />
//                            <br />
//                            <br />
//                            <button type="submit">Submit</button>
//                        </form>
//                        <br />
//                        <br />
//                        <Link to={"/dashboard"}> Back </Link>
//                </div>
//            </ActionCableProvider>
//        )
return(
                <div>
                    {/* <GroupMessages messageList={groupMessages()} username={user.name} setMessages={addNewMessage} /> */}
                    <br />
                    <br />
                    <ul>
                        {/* groupMessages() */}
                    </ul>
                        { groupMessages() }
                    <br />
                    <MessageUpdater />
                    <br />
                    <form onSubmit={handleSubmit}>
                        <h4>New Message:</h4>
                        <div>Posting as <span style={{ fontWeight:"bold" }}>{user.name}</span></div>
                        <input type={"text"} name={"content"} style={{width: '300px', height: '100px'}} value={messageForm.content} onChange={handleFormChange} />
                        <br />
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                    <br />
                    <br />
                    <Link to={"/dashboard"}> Back </Link>
                </div>
        )
    }
    else{
        return(
            <div>
                <Link to={"/dashboard"}><button>Back</button></Link>
            </div>
        )
    }
}

export default MessageBoard;