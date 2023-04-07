import React, { useContext, useState } from "react";
import { GroupsContext } from "./context components/GroupsContext";

function MessageUpdater(){
    const { setGroups } = useContext(GroupsContext);
    const [ disabledButton, setDisableButton ] = useState(false);

    function handleButtonClick(e){
        e.preventDefault();
        setDisableButton(true);
        fetch("/api/groups/").then(r=>r.json()).then(
            data => {
                console.log(data)
                setGroups(data);
            }
        ).then(()=>setDisableButton(false))
    }

    return(
        <button type={"button"} disabled={disabledButton} onClick={handleButtonClick}>Update Messages</button>
    )
}

export default MessageUpdater;