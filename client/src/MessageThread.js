import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MessagesContext } from "./components/context components/MessagesContext";
import { UserContext } from "./components/context components/UserContext";
import Message from "./components/Message";

function MessageThread(){
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const { messages, setMessages } = useContext(MessagesContext);
    const message = ()=>{
        if(messages!=null){
            return messages.find( data=> data.id == id);
        }
        else return null;
    }
    
    function ThreadComponent(){
        
        function CommentForm(){
            const [ replyForm, setReplyForm ] = useState({
                "content": "",
                "user_id": user.id,
                "group_id": message().group_id,
                "quoted_comment_id": id,
                "comment_id": id
            })
    
            function handleSubmit(e){
                e.preventDefault();
                console.log(replyForm)
                fetch("/api/group_messages", {
                    method: 'POST',
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(replyForm)
                }).then(r=>r.json()).then(data =>{
                    setMessages([...messages, data]);
                    setReplyForm({
                        "content": "",
                        "user_id": user.id,
                        "group_id": message().group_id,
                        "quoted_comment_id": id,
                        "comment_id": id
                    })
                    })
            }
    
            function handleFormChange(e){
                const key = e.target.name;
                const value = e.target.value;
                const newForm = {...replyForm};
                newForm[key] = value;
                setReplyForm(newForm);
            }

            return(
                <form onSubmit={handleSubmit}>
                    <div>Replying as <span style={{ fontWeight:"bold", fontSize: "18px" }}>{user.name}</span></div>
                    <input type={"text"} name={"content"} style={{width: '300px', height: '100px'}} value={replyForm.content} onChange={handleFormChange} />
                    <br />
                    <button type={"submit"}>Submit</button>
                </form>
            )
        }

        function Comment({ message }){
            return(
                <div className="message">
                    <Link to={`/messages/${message.id}`}>{message.content}</Link>
                </div>
            )
        }

        // const replies = message().replies.map(reply=>{
        //     return <Comment key={reply.id} message={reply} />
        // })

        const replies = messages.filter(message=>{
            return message.quoted_comment_id == id
        }).map(reply=>{
            return <Comment key={reply.id} message={reply} />
        })

        return(
            <div>
                <span style={{ fontWeight:"bold", fontSize:"25px" }}>{message().user.name}</span> says:
                <br />
                <br />
                {message().content}
                <br />
                <br />
                <span style={{ fontWeight:"bold", fontSize:"20px" }}>Replies:</span>
                {replies}
                <br />
                <CommentForm />
                <br />
                <Link to={`/groups/${message().group_id}/messages`}>Back</Link>
            </div>
        )
    }
    
    if(message()!=null){
        return(<ThreadComponent />)
    }
    else{
        return(
            <div>Loading...</div>
        )
    }

}

export default MessageThread;