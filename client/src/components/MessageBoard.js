import React, { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { GroupsContext } from "./context components/GroupsContext";
import { MessagesContext } from "./context components/MessagesContext";
import { UserContext } from "./context components/UserContext";
import GroupMessages from "./GroupMessages";
import Message from "./Message";

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
        const updatedMessageList = [...messages];
        let listNeedsToUpdate = true;
        for (let index = 0; index < updatedMessageList.length; index++) {
            const element = updatedMessageList[index];
            if(element.id == message.id) 
            {
                listNeedsToUpdate = false;
                debugger;
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
            }).map(message=>{
                // debugger;
                /*
                Put in new message component here!! vVv
                */
                return(
                    // <li key={message.id}>
                    //     {console.log(message)}
                    //     {message.content}
                    // </li>
                    <Message message={message} />
                )
            })
        }
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
            fetch("/group_messages", {
                method: 'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(messageForm)
            }).then(r=>r.json()).then(data =>{
                // console.log(data);
                setMessageForm({
                    "content":"",
                    "user_id": user.id,
                    "group_id": id,
                    "comment_id":""
                })
                })
        }
        return(
            <div>
                <GroupMessages group={group} user={user} messages={messages} setMessages={addNewMessage} />
                <br />
                <br />
                <ul>
                    {groupMessages()}
                </ul>
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