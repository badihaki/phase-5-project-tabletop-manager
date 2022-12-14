import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { GroupsContext } from "./context components/GroupsContext";

function GroupPage(){
    const { groupId } = useParams();
    const { groups } = useContext(GroupsContext);

    const group = groups.find(group=>group.id == groupId);

    return(
        <div>
            <h2>{group.name}</h2>
            <br />
            <Link to={"/groups"}>Back</Link>
        </div>
    )
}

export default GroupPage;