import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GroupsContext } from "./context components/GroupsContext";
import { UserContext } from "./context components/UserContext";
import GroupForm from "./NewGroupForm";

function Groups(){

    const { groups } = useContext(GroupsContext)
    const { user } = useContext(UserContext)

    const groupCards = groups.map( individualGroup=>{
        return(
            <li key={individualGroup.id}>
                <div >
                    <h3>{individualGroup.name}</h3>
                    Game Master: <span style={{fontWeight:'bold'}}>{individualGroup.game_master.name}</span>
                    <br />
                    <Link to={`/groups/${individualGroup.id}`}>{individualGroup.name}'s Full Info</Link>
                </div>
                <br />
            </li>
        )
    })

    return(
        <div>
            <h1>Groups</h1>
            {user? <GroupForm /> : "" }
            <h2>Group List</h2>
            <ul>
                {groups? groupCards : ""}
            </ul>
        </div>
    )
}

export default Groups;