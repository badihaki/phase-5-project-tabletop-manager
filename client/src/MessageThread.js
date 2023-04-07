import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GroupsContext } from "./components/context components/GroupsContext";
import { UserContext } from "./components/context components/UserContext";

function MessageThread({ message }){
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const { groups, setGroups } = useContext(GroupsContext);
    // const message = ()=>{
    //     if(messages!=null){
    //         return messages.find( data=> data.id == id);
    //     }
    //     else return null;
    // }
    // find a way to bring back message without it being null. then bring back replies. reincorporate both
    console.log(groups);
    
    function ThreadComponent(){
        
        function CommentForm(){
            const [ commentForm, setCommentForm ] = useState({
                "content": "",
                "user_id": user.id,
                "group_id": message.group_id,
                "quoted_comment_id": message.id,
                "comment_id": message.id
            })
    
            function handleCommentFormSubmit(e){
                e.preventDefault();
                // console.log(replyForm)
                fetch("/api/group_messages", {
                    method: 'POST',
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(commentForm)
                }).then(r=>r.json()).then(data =>{
                    console.log(data);
                    const newGroupsList = groups.map(group=>{
                        if(group.id == data.group_id){
                            group.group_messages.push(data);
                        }
                        return group;
                    })
                    debugger;
                    setCommentForm({
                        "content": "",
                        "user_id": user.id,
                        "group_id": message.group_id,
                        "quoted_comment_id": id,
                        "comment_id": id
                    })
                    setGroups(newGroupsList);
                    });
            }
    
            function handleCommentFormChange(e){
                const key = e.target.name;
                const value = e.target.value;
                const newForm = {...commentForm};
                newForm[key] = value;
                setCommentForm(newForm);
            }

            return(
                <form onSubmit={handleCommentFormSubmit}>
                    <div>Replying as <span style={{ fontWeight:"bold", fontSize: "18px" }}>{user.name}</span></div>
                    <input type={"text"} name={"content"} style={{width: '300px', height: '100px'}} value={commentForm.content} onChange={handleCommentFormChange} />
                    <br />
                    <button type={"submit"}>Submit</button>
                </form>
            )
        }

        function Comment({ comment }){
            return(
                <div className="message">
                    {comment.content}
                </div>
            )
        }

        const replies = message.replies.map(reply=>{
            return <Comment key={reply.id} comment={reply} />
        })

        // const replies = messages.filter(message=>{
        //     return message.quoted_comment_id == id
        // }).map(reply=>{
        //     return <Comment key={reply.id} message={reply} />
        // })

        return(
            <div>
                <span style={{ fontWeight:"bold", fontSize:"20px" }}>Replies:</span>
                {replies}
                <br />
                <CommentForm />
                <br />
                <Link to={`/groups/${message.group_id}/messages`}>Back</Link>
            </div>
        )
    }
    
    if(message != null){
        return(<ThreadComponent />)
    }
    else{
        return(
            <div>Loading...</div>
        )
    }

}

export default MessageThread;