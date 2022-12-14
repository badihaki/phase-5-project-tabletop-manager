import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { GroupsContext } from "./context components/GroupsContext";
import { UserContext } from "./context components/UserContext";
import MembershipForm from "./MembershipForm";

function GroupPage(){
    const { groupId } = useParams();
    const { groups } = useContext(GroupsContext);
    const { user } = useContext(UserContext);

    const group = groups.find(group=>group.id == groupId);

    function FormContainer(){
        return(
            <div>
                <p>
                    Want to join?
                    <br />
                    Enter your experience level and press Submit!
                </p>
                <br />
                <MembershipForm groupId={groupId} userId={user.id} />
            </div>
        )
    }

    return(
        <div>
            <h2>{group.name}</h2>
            <h4>Game Master: {group.game_master.name}</h4>
            <br />
            <p>
                We play {group.game} on {group.game_day}.
                <br />
                <br />
                <h4>Members:</h4>
                <ul>
                    {group.players.map(player=>{
                        console.log(group)
                        debugger;
                        return(
                            <li key={player.id}>
                                {player.name}
                            </li>
                        )
                    })}
                </ul>
                <br />
                <br />
                {user? <FormContainer /> : "" }
            </p>
            <br />
            <Link to={"/groups"} style={{fontWeight: 'bold'}}>Back to Groups List</Link>
        </div>
    )
}

export default GroupPage;