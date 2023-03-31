import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GroupsContext } from "./context components/GroupsContext";
import { UserContext } from "./context components/UserContext";
import GroupForm from "./NewGroupForm";

function Groups(){

    const { groups, memeberships } = useContext(GroupsContext)
    const { user } = useContext(UserContext)

    function GroupCards(){
        if (groups.length <= 0){
            return (
            <div>No groups made yet. </div>
            )
        }
        else{
            return groups.map( individualGroup=>{
                    return(
                        <li key={individualGroup.id} className={"group"} >
                            <h3>{individualGroup.name}</h3>
                            Game Master: <span style={{fontWeight:'bold'}}>{individualGroup.game_master.name}</span>
                            <br />
                            <Link to={`/groups/${individualGroup.id}`}>{individualGroup.name}'s Full Info</Link>
                        </li>
                    )
        } )
    }}

    function GroupComponent(){
        return(
            <div>
                <h1>Groups</h1>
                {user? <div>Create a new group below</div> : "" }
                {user? <GroupForm /> : "" }
                <h2>Group List</h2>
                <ul>
                    {groups? GroupCards() : ""}
                </ul>
            </div>
        )
    }

    return(
        <div>
            <GroupComponent />
        </div>
    )
}

export default Groups;