import React, { useContext } from "react";
import { useResolvedPath } from "react-router-dom";
import { UserContext } from "./context components/UserContext";

function UserInfo(){
    const { user } = useContext(UserContext)
    
    const masteredGroups = user.mastered_groups.map(group=>{
        return(
            <li>{group.name}</li>
        )
    })
    const userGroups = user.groups.map(group=>{
        return(
            <li>{group.name}</li>
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