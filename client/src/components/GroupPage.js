import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { GroupsContext } from "./context components/GroupsContext";
import { UserContext } from "./context components/UserContext";
import MembershipForm from "./MembershipForm";
import SignUpLogIn from "./SignUpLogIn";

function GroupPage(){
    const { id } = useParams();
    const { groups } = useContext(GroupsContext);
    const { user } = useContext(UserContext);

    
    function FormContainer(){
        return(
            <div>
                <p>
                    Want to join?
                    <br />
                    Enter your experience level and press Submit!
                </p>
                <br />
                <MembershipForm groupId={id} userId={user.id} />
            </div>
        )
    }
    
    function GroupPageComponent(){
        const group = groups.find( crew => crew.id == id );
        return(
            <div>
                <h2>{group.name}</h2>
                <h4>Game Master: {group.game_master.name}</h4>
                <br />
                <p>
                    We play {group.game} on {group.game_day}.
                    <br />
                    <br />
                </p>
                    <h3>Members:</h3>
                <ul>
                    {group.players.map(player=>{
                        const membership = group.memberships.find(m=>{
                            return m.player_id === player.id;
                        })
                        return(
                            <li key={player.id}>
                                Player: <span style={{fontWeight:"bold", fontSize:"20px"}}>{player.name}</span>
                                <br />
                                Experience: <span style={{fontWeight:"bold"}}>{membership.player_experience_summary}</span>
                                <br />
                                <br />
                            </li>
                        )
                    })}
                </ul>
                <br />
                <br />
                {user? <FormContainer /> : "" }
                <br />
                <Link to={"/groups"} style={{fontWeight: 'bold'}}>Back to Groups List</Link>
            </div>
        )
    }

    return(
        <div>
            {groups? <GroupPageComponent /> : <SignUpLogIn />}
        </div>
    )

    // return(
    //     <div>
    //         <h2>{group.name}</h2>
    //         <h4>Game Master: {group.game_master.name}</h4>
    //         <br />
    //         <p>
    //             We play {group.game} on {group.game_day}.
    //             <br />
    //             <br />
    //         </p>
    //             <h3>Members:</h3>
    //         <ul>
    //             {group.players.map(player=>{
    //                 const membership = group.memberships.find(m=>{
    //                     return m.player_id == player.id;
    //                 })
    //                 return(
    //                     <li key={player.id}>
    //                         Player: <span style={{fontWeight:"bold", fontSize:"20px"}}>{player.name}</span>
    //                         <br />
    //                         Experience: <span style={{fontWeight:"bold"}}>{membership.player_experience_summary}</span>
    //                         <br />
    //                         <br />
    //                     </li>
    //                 )
    //             })}
    //         </ul>
    //         <br />
    //         <br />
    //         {user? <FormContainer /> : "" }
    //         <br />
    //         <Link to={"/groups"} style={{fontWeight: 'bold'}}>Back to Groups List</Link>
    //     </div>
    // )
}

export default GroupPage;