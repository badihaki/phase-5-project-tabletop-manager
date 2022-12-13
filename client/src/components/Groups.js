import React, { useContext } from "react";
import { GroupsContext } from "./context components/GroupsContext";
import { UserContext } from "./context components/UserContext";
import GroupForm from "./NewGroupForm";

function Groups(){

    const { groups } = useContext(GroupsContext)
    const { user } = useContext(UserContext)

    const groupCards = groups.map( individualGroup=>{
        return(
            <li>
                <div>
                    {individualGroup.name}
                </div>
            </li>
        )
    })

    return(
        <div>
            <h1>Groups</h1>
            {user? <GroupForm /> : "" }
            <h2>Group List</h2>
            <ul>
                {groupCards}
            </ul>
        </div>
    )
}

export default Groups;