import React, { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
// import GroupMessages from "./GroupMessages";
// import ActionCable, { ActionCableConsumer, ActionCableProvider } from 'react-actioncable-provider'
// import GroupMessageConnection from "./GroupMessagesConnection";
import { GroupsContext } from "./context components/GroupsContext";
import { UserContext } from "./context components/UserContext";
import Message from "./Message";
import MessageUpdater from "./MessageUpdater";
import SignUpLogIn from "./SignUpLogIn";

function MessageBoard(){
    const {user} = useContext(UserContext);
    const {groups, setGroups} = useContext(GroupsContext);
    const {id} = useParams();

    function MessageBoardComponent(){
        //
        const group = groups.find(group => group.id==id)
        // const group =()=> {
        //     if(groups != null){
        //         return groups.find(group => group.id==id)
        //     }
        //     else{
        //         return null
        //     }
        // }
        
        const [ messageForm, setMessageForm ] = useState({
            "content":"",
            "user_id": user.id,
            "group_id": id,
            "comment_id":""
        })

        /* // add new message funct
        function addNewMessage(message){
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
        */
    
        const groupMessages = ()=>{
            if(group.group_messages.length <= 0){
                return (<li key={"noId"}>No mesaages</li>)
            }
            else{
                return group.group_messages.filter(message=>{
                    if(message.quoted_comment_id == null) return message;
                }).map(message=>{
                    return(
                        <Message key={message.id} message={message} />
                    )
                })
            }
        }
    
        /* // handle recieve broadcast funct...
       function handleRecieveBroadcast(data){
        console.log(data);
       }
       */
    
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
                    //
                    //
                    //
                    const updatedGroup = group;
                    group.group_messages.push(data);
                    const newGroupList = groups.map(listedGroup=>{
                        if(group.id == listedGroup.id){
                            return listedGroup = group;
                        }
                        else{
                            return listedGroup;
                        }
                    })
                    setGroups(newGroupList);
                    // setMessages([...messages, data]);
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
    function NotLoggedInComponent(){
        return(
            <div>
                Error: Not logged in
                <br />
                <SignUpLogIn />
            </div>
        )
    }

    return(
        <div>
            { groups? <MessageBoardComponent /> : <NotLoggedInComponent /> }
        </div>
    )
}

export default MessageBoard;