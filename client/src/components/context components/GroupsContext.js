import React, { useState } from "react";

const GroupsContext = React.createContext();

function GroupsProvider( { children } ){
    
    const [ groups, setGroups ] = useState(null);
    const [ memberships, setMemberships ] = useState([]);

    return(
        <GroupsContext.Provider value={ { groups, setGroups, memberships, setMemberships } }>
            { children }
        </GroupsContext.Provider>
    )
}

export { GroupsContext, GroupsProvider }