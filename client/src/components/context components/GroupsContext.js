import React, { useState } from "react";

const GroupsContext = React.createContext();

function GroupsProvider( { children } ){
    
    const [ groups, setGroups ] = useState(null);

    return(
        <GroupsContext.Provider value={ { groups, setGroups } }>
            { children }
        </GroupsContext.Provider>
    )
}

export { GroupsContext, GroupsProvider }