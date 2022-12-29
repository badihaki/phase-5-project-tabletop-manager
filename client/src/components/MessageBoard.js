import React, { useContext } from "react";
import { UserContext } from "./context components/UserContext";
import GroupMessages from "./GroupMessages";

function MessageBoard({ group }){
    const {user} = useContext(UserContext);

    return(
        <div>
            <h3>
                {group.name}'s Message Board
                <GroupMessages group={group} user={user} />
            </h3>
        </div>
    )
}

export default MessageBoard;