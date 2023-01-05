import React, { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { GroupsContext } from "./context components/GroupsContext";
import { UserContext } from "./context components/UserContext";
import GroupMessages from "./GroupMessages";

function MessageBoard(){
    const {user} = useContext(UserContext);
    const {groups} = useContext(GroupsContext)
    const {id} = useParams();

    const group = groups.find(group => group.id==id)
    
    const [ form, setForm ] = useState({
        "content":"",
        "user_id": user.id,
        "group_id": id,
        "comment_id":""
    })

    if(user!=null && group != null){

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
            }).then(r=>r.json()).then(data => console.log(data))
        }
        
        return(
            <div>
                <h3>
                    {group.name}'s Message Board
                    <GroupMessages group={group} user={user} />
                    <br />
                    <br />
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
                </h3>
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