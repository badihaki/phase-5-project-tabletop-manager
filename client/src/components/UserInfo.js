import React, { useContext, useState } from "react";
import { Link, useResolvedPath } from "react-router-dom";
import { GroupsContext } from "./context components/GroupsContext";
import { UserContext } from "./context components/UserContext";
import GroupUpdateForm from "./GroupUpdateForm";
import MessageBoard from "./MessageBoard";

function UserInfo(){
    const { user } = useContext(UserContext);
    const { groups, setGroups, memberships } = useContext(GroupsContext);

    function updateGroup(form){
        fetch(`/api/groups/${form.id}`,{
            method: "PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(form)
        }).then(r=>{
            if(r.ok || r.accepted){
                r.json().then(data=>{
                    const newGroupsList = [...groups];
                    setGroups(newGroupsList.map(group=>{
                        if(group.id == data.id){
                            return group = data;
                        }
                        else return group;
                    }))
                })
            }
        })
    }

    function deleteGroup(group){
        console.log(group);
        fetch(`users/${user.id}/groups/${group.id}`,{
            method: "DELETE"
        }).then(r=>{
            if(r.accepted){
                r.json().then(()=>{
                    const newGroupsList = [...groups];
                    newGroupsList.filter(listedGroup=>{
                        return group.id != listedGroup.id
                    });
                    setGroups(newGroupsList);
                })
            }
        })
    }

    const masteredGroups = user.mastered_groups.map(group=>{
        function handleDeleteButton(){deleteGroup(group)}
        return(
            <li key={group.id}>
                <span style={{fontWeight:'bold'}}>{group.name}</span> <button onClick={handleDeleteButton}>Delete Group</button>
                <br />
                <GroupUpdateForm updateFunction={updateGroup} group={group} />
                <br />
                <Link to={`/groups/${group.id}/messages`}>Check the Board!</Link>
                <br />
                <br />
            </li>
        )
    })
    
    const userGroups = user.groups.map(group=>{
        return(
            <li key={group.id}>
                <span style={{fontWeight:'bold'}}>{group.name}</span>
                <br />
                <Link to={`/groups/${group.id}/messages`}>Check the Board!</Link>
            </li>
        )
    })

    return(
        <div>
            <h1>{user.name}</h1>
            <h3>Groups you Started</h3>
            <ul>
                {user.mastered_groups.length!=0? masteredGroups : <li>No created groups yet. Go be a leader!</li>}
            </ul>
            <h3>Groups you Joined</h3>
            <ul>
                {user.groups.length!=0? userGroups : <li>No groups joined yet. Go be social!</li>}
            </ul>
        </div>
    )
}

export default UserInfo;