import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GroupsContext } from "./context components/GroupsContext";
import { UserContext } from "./context components/UserContext";
import GroupForm from "./NewGroupForm";

function Groups(){

    const { groups } = useContext(GroupsContext)
    const { user } = useContext(UserContext)

    function GroupCards(){
        if (groups.length <= 0){
            return (
            <div>No groups made yet. </div>
            )
        }
        else{
            return groups.map(group=>{
                if(group.is_active == false || group.is_active == null){
                    return(<div className="group">
                        {group.name}
                        <br />
                        <div className="error">This group isn't active right now</div>
                    </div>)
                }
                else{
                    return(
                        <li key={group.id} className={"group"} >
                            <h3>{group.name}</h3>
                            Game Master: <span style={{fontWeight:'bold'}}>{group.game_master.name}</span>
                            <br />
                            <Link to={`/groups/${group.id}`}>{group.name}'s Full Info</Link>
                        </li>
                    )
                }
            })}
        }

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