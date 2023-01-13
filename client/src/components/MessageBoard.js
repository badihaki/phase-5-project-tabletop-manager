import React, { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { GroupsContext } from "./context components/GroupsContext";
import { MessagesContext } from "./context components/MessagesContext";
import { UserContext } from "./context components/UserContext";
import GroupMessages from "./GroupMessages";

function MessageBoard(){
    const {user} = useContext(UserContext);
    const {groups} = useContext(GroupsContext);
    const {messages, setMessages} = useContext(MessagesContext);
    const {id} = useParams();

    const group = groups.find(group => group.id==id)
    
    const [ form, setForm ] = useState({
        "content":"",
        "user_id": user.id,
        "group_id": id,
        "comment_id":""
    })

    function addNewMessage(message){
        const updatedMessageList = [...messages];
        updatedMessageList.push(message);
        // debugger;
        setMessages(updatedMessageList);
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
                return(
                    <li key={message.id}>
                        {message.content}
                    </li>
                )
            })
        }
    }

    if(user != null && group != null){

        function handleFormChange(event){
            const newForm = {...form};
            const key = event.target.name;
            const value = event.target.value;
            newForm[key] = value;
            setForm(newForm);
        }

        function handleSubmit(event){
            event.preventDefault();
            fetch("/group_messages", {
                method: 'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(form)
            }).then(r=>r.json()).then(data =>{
                // console.log(data);
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
                    <input type={"text"} name={"content"} style={{width: '300px', height: '100px'}} onChange={handleFormChange} />
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