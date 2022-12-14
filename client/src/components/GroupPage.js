import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { GroupsContext } from "./context components/GroupsContext";
import JoinGroupForm from "./JoinGroupForm";

function GroupPage(){
    const { groupId } = useParams();
    const { groups } = useContext(GroupsContext);

    const group = groups.find(group=>group.id == groupId);

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
                        return(
                            <li key={player.id}>
                                {player.name}
                            </li>
                        )
                    })}
                </ul>
                <br />
                <br />
                <p>
                    Want to join?
                    <br />
                    Enter your experience level and press Submit!
                </p>
                <br />
                <JoinGroupForm />
            </p>
            <br />
            <Link to={"/groups"} style={{fontWeight: 'bold'}}>Back to Groups List</Link>
        </div>
    )
}

export default GroupPage;