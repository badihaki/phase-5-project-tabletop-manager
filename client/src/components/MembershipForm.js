import React, { useContext, useState } from "react";
import { GroupsContext } from "./context components/GroupsContext";
import { UserContext } from "./context components/UserContext";

function MembershipForm({ userId=0, groupId }){

    const [form, setForm] = useState({
        "group_id":groupId,
        "player_id":userId,
        "player_experience_summary":"New Player"
    })

    const { user, setUser } = useContext(UserContext);
    const { memberships, setMemberships } = useContext(GroupsContext);
    const [ messages, setMessages ] = useState([""]);

    function handleSubmit(e){
        e.preventDefault();
        fetch('/api/memberships',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        }).then(r=>{
            if(r.ok){
                r.json().then(data=>{
                    const newMembershipList = [...memberships, data];
                    setMemberships(newMembershipList);
                    setMessages([""]);
                    setForm({
                        "group_id":groupId,
                        "player_id":userId,
                        "player_experience_summary":"New Player"
                    });
                    const updatedUser = user;
                    updatedUser.groups.push(data.group);
                    setUser(updatedUser);
                })
            }
            else{
                r.json().then(data=>{
                    const errorArray = [];
                    for (const key in data.errors) {
                        for (const message of data.errors[key]) {
                            errorArray.push(message)
                        }
                    }
                    setMessages(errorArray);
                    setForm({
                        "group_id":groupId,
                        "player_id":userId,
                        "player_experience_summary":"New Player"
                    });
                });
            }
        })
    }
    
    function handleChange(e){
        const newForm = {...form};
        newForm.player_experience_summary = e.target.value;
        setForm(newForm);
    }

    const pageMessages = messages.map(message=>{
        return(
            <div key={message}>
                {message}
            </div>
        )
    })

    return(
        <form onSubmit={handleSubmit}>
            Experience Level<span> : </span>
            <select value={form.player_experience_summary} onChange={handleChange} >
                <option value={"New Player"}>New Player</option>
                <option value={"Journeyman"}>Journeyman</option>
                <option value={"Veteran"}>Veteran</option>
                <option value={"Master"}>Master</option>
            </select>
            <br />
            <button type="submit">Submit</button>
            {pageMessages}
        </form>
    )
}

export default MembershipForm;